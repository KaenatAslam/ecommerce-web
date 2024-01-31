import React, { createContext, useState } from "react";

export const Context = createContext(null);

function ContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const addProduct = (product) => {
    setProducts((products) => [...products, product]);
  };

  const deleteProduct = (index) => {
    setProducts((products) => products.filter((_, idx) => idx !== index));
  };

  const addProductToCart = (product, quantity) => {
    setCartProducts((products) => [...products, { ...product, quantity }]);
  };

  const removeProductFromCart = (index) => {
    setCartProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };

  const increaseProductQuantity = (product, quantity) => {
    setCartProducts((products) =>
      products.map((_product) => {
        if (_product.id === product.id)
          return { ..._product, quantity: _product.quantity + quantity };
        else return _product;
      })
    );
  };

  const decreaseProductQuantity = (product, quantity) => {
    setCartProducts((products) =>
      products.map((_product) => {
        if (_product.id === product.id) {
          const newQuantity = _product.quantity - quantity;
          return { ..._product, quantity: newQuantity > 0 ? newQuantity : 0 };
        } else return _product;
      })
    );
  };

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        cartProducts,
        setCartProducts,
        addProduct,
        deleteProduct,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
