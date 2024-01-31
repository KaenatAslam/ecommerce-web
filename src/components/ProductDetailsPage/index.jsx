import React, { memo, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

function ProductDetailsPage() {
  const { products } = useContext(Context);
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const product = products.find((product) => product?.id === parseInt(id));

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

  if (!product) {
    return <Box>Product not found!</Box>;
  }

  const { name, category, description, price } = product;

  return (
    <Grid container spacing={2} p={2}>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        xs={12}
        md={6}
      >
        <Card
          sx={{
            textAlign: "center",
            width: "fit-content",
            padding: "14px",
          }}
        >
          <img
            alt="product"
            height="500px"
            width="500px"
            src={imageUrl}
            sx={{
              objectFit: "cover",
            }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6} height="500px">
        <Typography
          variant="h5"
          component="h2"
          fontWeight={600}
          textTransform="capitalize"
        >
          {name}
        </Typography>
        <Box py={2}>
          <Typography color="textSecondary" gutterBottom fontWeight={600}>
            Category:
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            fontWeight={600}
          >
            {category ?? "N/A"}
          </Typography>
        </Box>
        <Box py={2}>
          <Typography color="textSecondary" gutterBottom fontWeight={600}>
            Description:
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            fontWeight={600}
          >
            {description ?? "N/A"}
          </Typography>
        </Box>

        <Box py={2}>
          <Typography color="textSecondary" gutterBottom fontWeight={600}>
            Price:
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            PKR {price ?? 0}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            p: 2,
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#535659",
            },
          }}
        >
          Buy Now
        </Button>
      </Grid>
    </Grid>
  );
}

export default memo(ProductDetailsPage);
