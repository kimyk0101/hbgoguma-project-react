// @TODO - 메인 페이지 구현
import React from "react";
import { useState } from "react";
import ProductList from "./productListPage";
import ProductDetailPage from "./productDetailPage";
// import loginPage from "./loginPage";

const MainPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <div>
      <h1>메인 페이지</h1>
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <ProductList onSelectProduct={setSelectedProduct} />
      )}
    </div>
  );
};

export default MainPage;
