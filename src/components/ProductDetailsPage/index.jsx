import React, { memo, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
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
    <Grid container spacing={2} p={5}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component="img"
            alt="product"
            height="auto"
            image={imageUrl}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Category: {category}
            </Typography>
            <Typography variant="body2" component="p">
              Description: {description}
            </Typography>
            <Typography variant="body1" component="p">
              Price: PKR {price}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default memo(ProductDetailsPage);
