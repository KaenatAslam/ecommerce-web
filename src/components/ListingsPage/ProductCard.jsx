import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import { Context } from "../../context/ContextProvider";
import { ShoppingCart } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { id, name, category, description, price, image } = product;
  const { addProductToCart, cartProducts } = useContext(Context);
  const [isInCart, setIsInCart] = useState(
    cartProducts.some((item) => item.id === id)
  );
  const renderImage = () => {
    if (typeof image === "string") {
      return (
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt="product"
          style={{ objectFit: "contain" }}
        />
      );
    } else if (image instanceof Blob) {
      return (
        <CardMedia
          component="img"
          height="150"
          image={URL.createObjectURL(image)}
          alt="product"
          style={{ objectFit: "contain" }}
        />
      );
    } else {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="150px"
        >
          No Image Available
        </Box>
      );
    }
  };

  const handleAddToCart = () => {
    addProductToCart(product, 1);
    setIsInCart(true);
    toast.success(`${name} added to the cart!`);
  };

  const handleProductCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 200, height: "100%", padding: "10px" }}>
      <Link
        onClick={handleProductCardClick}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardActionArea>
          {renderImage()}
          <CardContent>
            <Typography variant="h6" gutterBottom noWrap>
              {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {category}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: 50,
                lineHeight: 1.2,
              }}
            >
              {description}
            </Typography>
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Price: PKR {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <Box p={1}>
        <Button
          fullWidth
          onClick={handleAddToCart}
          disabled={isInCart}
          sx={{
            padding: 1,
            color: "#fff",
            backgroundColor: "#000",
            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
              scale: 1.5,
            },
            "&:disabled": {
              backgroundColor: "#535659",
              color: "#fff",
              scale: 1.5,
            },
          }}
          endIcon={<ShoppingCart fill />}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
