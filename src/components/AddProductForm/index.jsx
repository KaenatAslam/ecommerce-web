import PropTypes from "prop-types";
import React, { memo, useContext, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { categories } from "../../data";
import { Context } from "../../context/ContextProvider";

function AddProductForm({ onClose, products }) {
  const { addProduct } = useContext(Context);
  const [imageUrl, setImageUrl] = useState(null);

  const validationSchema = Yup.object().shape({
    // Update validation schema to make image field optional
    name: Yup.string().required("Product Name is required"),
    category: Yup.string().required("Product Category is required"),
    details: Yup.string().required("Product Details are required"),
    price: Yup.number()
      .required("Product Price is required")
      .positive("Price must be positive")
      .integer("Price must be an integer"),
  });

  const initialValues = {
    image: null, // Initial value of image is null
    name: "",
    category: "",
    details: "",
    price: "",
    quantity: 1,
  };

  const handleSubmit = (values) => {
    console.log("Form submitted with data:", values);
    // Creating a new product object
    const newProduct = {
      id: Date.now(), // Using timestamp as a unique id for the new product
      name: values.name,
      category: values.category,
      description: values.details,
      price: parseFloat(values.price),
      image: values.image,
    };

    // Using the addProduct function from the context to add the new product
    addProduct(newProduct);

    onClose();
  };

  const fileInputRef = useRef();

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file); // Set the image field value to the selected file
    setImageUrl(URL.createObjectURL(file)); // Create a URL for the selected file
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Box mb={2}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
                <Button
                  variant="outlined"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Image
                </Button>
                {imageUrl && (
                  <Box mt={2}>
                    <img
                      src={imageUrl}
                      alt="product"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </Box>
                )}
                {errors.image && touched.image && (
                  <Typography color="error">{errors.image}</Typography>
                )}
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  select
                  label="Product Category"
                  variant="outlined"
                  name="category"
                  error={errors.category && touched.category}
                  helperText={
                    errors.category && touched.category && errors.category
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category?.id} value={category?.name}>
                      {category?.name}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  name="name"
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name && errors.name}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Product Details"
                  variant="outlined"
                  multiline
                  rows={4}
                  name="details"
                  error={errors.details && touched.details}
                  helperText={
                    errors.details && touched.details && errors.details
                  }
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Product Price"
                  variant="outlined"
                  type="number"
                  name="price"
                  error={errors.price && touched.price}
                  helperText={errors.price && touched.price && errors.price}
                />
              </Box>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Add Product
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

AddProductForm.propTypes = {
  onClose: PropTypes.func,
  products: PropTypes.array,
};

export default memo(AddProductForm);
