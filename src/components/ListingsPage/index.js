import PropTypes from "prop-types";
import React, { memo, useContext, useState } from "react";
import { Box, Typography, Button, Dialog, Link } from "@mui/material";
import ProductCard from "./ProductCard";
import AddProductForm from "../AddProductForm";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function ListingsPage({ category }) {
  const navigate = useNavigate();

  const { addProduct, cartProducts, addProductToCart, products } =
    useContext(Context);
  console.log({ addProduct, cartProducts, addProductToCart });
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control visibility of AddProductForm

  // Function to open the AddProductForm dialog
  const openForm = () => {
    setIsFormOpen(true);
  };

  // Function to close the AddProductForm dialog
  const closeForm = () => {
    setIsFormOpen(false);
  };
  const handleAllProductsClick = () => {
    navigate("/");
  };
  const filteredProducts = category
    ? products.filter((product) => product?.category === category)
    : products;

  return (
    <Box className="listings-page" display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        px={4}
        my={1}
      >
        <Button
          variant="contained"
          onClick={openForm}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#535659",
            },
          }}
        >
          Add New
        </Button>
      </Box>
      <Typography variant="h3" textAlign="center" p={2}>
        {category ? (
          category
        ) : (
          <Link
            onClick={handleAllProductsClick}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Products
          </Link>
        )}
      </Typography>
      <Box
        p={2}
        className="product-list"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
      >
        {filteredProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </Box>
      {/* Render AddProductForm inside Dialog component */}
      <Dialog open={isFormOpen} onClose={closeForm}>
        <AddProductForm onClose={closeForm} products={products} />
      </Dialog>
    </Box>
  );
}

ListingsPage.propTypes = {
  products: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};

export default memo(ListingsPage);