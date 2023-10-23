import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React from 'react';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"

function App() {
  //load font on start of page
  React.useEffect(() => {
    webFont.load({//call function and inside describe which font to use
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, [])
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />


      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
