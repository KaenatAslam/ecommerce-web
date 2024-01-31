import PropTypes from "prop-types";
import React, { memo, useContext, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
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
    name: Yup.string().required("Product Name is required"),
    category: Yup.string().required("Product Category is required"),
    details: Yup.string().required("Product Details are required"),
    price: Yup.number()
      .required("Product Price is required")
      .positive("Price must be positive")
      .integer("Price must be an integer"),
  });

  const initialValues = {
    image: null,
    name: "",
    category: "",
    details: "",
    price: "",
    quantity: 1,
  };

  const handleSubmit = (values) => {
    const newProduct = {
      id: Date.now(),
      name: values.name,
      category: values.category,
      description: values.details,
      price: parseFloat(values.price),
      image: values.image,
    };

    addProduct(newProduct);

    onClose();
  };

  const fileInputRef = useRef();

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
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
                  startIcon={<AddIcon />}
                >
                  Upload Image
                </Button>
                <Box
                  mt={2}
                  sx={{
                    width: 250,
                    height: 250,
                    backgroundColor: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="product"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  ) : (
                    <Typography variant="body2" fontSize="18px">
                      +
                    </Typography>
                  )}
                </Box>
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
                <Button
                  onClick={onClose}
                  sx={{
                    color: "#000",
                    p: 1,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    p: 1,
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#535659",
                    },
                  }}
                >
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
