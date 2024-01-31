import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Box,
  Link,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  border: "1px solid black",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = ({ categories }) => {
  const navigate = useNavigate();
  const { cartProducts } = useContext(Context);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleAllProductsClick = () => {
    navigate("/");
  };
  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static" sx={containerStyles}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 600 }}>
          E-commerce
        </Typography>
        {/* Link to show all products */}
        <Typography variant="subtitle1" sx={{ marginRight: "20px" }}>
          <Link
            onClick={handleAllProductsClick}
            sx={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            All Products
          </Link>
        </Typography>

        {/* Categories */}
        {categories.map((category) => (
          <Typography
            key={category.id}
            variant="subtitle1"
            sx={{ marginRight: "20px", fontWeight: 600 }}
          >
            <Link
              onClick={() => handleCategoryClick(category.name.toLowerCase())}
              sx={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {category.name}
            </Link>
          </Typography>
        ))}

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, marginRight: "20px" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>

        {/* Cart Button */}
        <IconButton color="inherit" onClick={handleCartClick}>
          <Badge badgeContent={cartProducts?.length ?? 0} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const containerStyles = {
  color: "#000",
  backgroundColor: "#fffcfa",
  p: "10px",
};
