import logo from "./logo.svg";
import "./App.css";
import ListingsPage from "./components/ListingsPage";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./components/ProductDetailsPage";
import { categories } from "./data";
import AddProductForm from "./components/AddProductForm";
import CartPage from "./components/CartPage";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Header categories={categories} />
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          {categories.map((category) => (
            <Route
              key={category.id}
              path={`/category/${category.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              element={<ListingsPage category={category?.name} />}
            />
          ))}
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
