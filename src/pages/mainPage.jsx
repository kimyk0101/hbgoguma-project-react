// @TODO - 메인 페이지 구현
import React from "react";
import { useState } from "react";
import ProductList from "./productListPage";
import ProductDetailPage from "./productDetailPage";
// import loginPage from "./loginPage";
import ProductDetail from "./productDetailPage";
import UserNegoChat from "../components/userNegoChat";
import Footer from "../components/footer";
import Header from "../components/header";
import SellProductPage from "./sales";
import Advertise from "../components/advertise";

const MainPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <div>
      {/* <h1>메인 페이지</h1> */}
      <Header />
      <Advertise />
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <ProductList onSelectProduct={setSelectedProduct} />
      )}
      {/* <SellProductPage /> */}
      <Footer />
    </div>
  );
};

export default MainPage;
