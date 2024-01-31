import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import { Context } from "../../context/ContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { memo, useContext, useEffect, useState } from "react";

const CartProduct = ({ product, index }) => {
  const [imageUrl, setImageUrl] = useState("");
  const { id, name, price, image, quantity } = product;
  const [productQuantity, setProductQuantity] = useState(quantity ?? 1);
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useContext(Context);

  useEffect(() => {
    if (product) {
      if (product.image instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(product.image);
      } else {
        setImageUrl(product.image);
      }
    }
  }, [product]);

  const handleIncreaseQuantity = () => {
    increaseProductQuantity(product, 1);
    setProductQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      decreaseProductQuantity(product, 1);
      setProductQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleRemoveProduct = () => {
    removeProductFromCart(index);
  };

  return (
    <Box key={id} mb={2}>
      <Grid
        container
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px 10px",
          boxShadow: "0px 3px 16px #0000000A",
          alignItems: "center",
        }}
      >
        <Grid item xs={6} md={3}>
          <img
            src={imageUrl}
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "10px",
              marginTop: 6,
              objectFit: "contain",
            }}
            alt="product"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontWeight={500}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="subtitle1" fontWeight={500}>
            PKR {price}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={3}
          display="flex"
          gap={2}
          alignItems="baseline"
          justifyContent="end"
        >
          <Button
            variant="contained"
            onClick={handleIncreaseQuantity}
            sx={{
              color: "#fff",
              background: "#000",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#535659",
              },
            }}
          >
            +
          </Button>
          <Typography variant="subtitle1" fontWeight={600}>
            {productQuantity}
          </Typography>
          <Button
            variant="contained"
            onClick={handleDecreaseQuantity}
            sx={{
              color: "#fff",
              background: "#000",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#535659",
              },
            }}
          >
            -
          </Button>
          <IconButton onClick={handleRemoveProduct}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

const CartPage = () => {
  const { cartProducts, increaseProductQuantity, decreaseProductQuantity } =
    useContext(Context);

  const calculateTotal = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const calculateTotalProducts = () => {
    return cartProducts.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <Box className="cart-page" display="flex" backgroundColor="#fffcfa" p={5}>
      <Grid container spacing={2} minHeight="500px">
        <Grid item xs={12} md={8} pr={2}>
          <Typography variant="h4" textAlign="start" py={2} fontWeight={600}>
            Your Cart
          </Typography>
          <Grid
            container
            sx={{
              padding: "20px 10px",
            }}
          >
            <Grid item md={3}>
              <Typography variant="subtitle1" fontWeight={500}>
                Image
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="subtitle1" fontWeight={500}>
                Name
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="subtitle1" fontWeight={500}>
                Price
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                textAlign="center"
              >
                Quantity
              </Typography>
            </Grid>
          </Grid>
          {cartProducts &&
            cartProducts.map((product, index) => (
              <CartProduct key={product?.id} product={product} index={index} />
            ))}
        </Grid>

        <Grid
          item
          container
          xs={12}
          md={4}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 3px 16px #0000000A",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            <Typography variant="h4" textAlign="start" py={2} fontWeight={600}>
              Your Total
            </Typography>

            <Box
              p={2}
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography variant="body" fontWeight={500}>
                Total Products: x{calculateTotalProducts()}
              </Typography>
              <Typography variant="body" fontWeight={500}>
                PKR {calculateTotal()}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box p={2} display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight={600}>
                Total:
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                ${calculateTotal()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                color: "#fff",
                background: "#000",
                py: 1.5,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#535659",
                },
              }}
              fullWidth
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(CartPage);
