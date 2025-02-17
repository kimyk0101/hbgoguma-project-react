// @TODO - 메인 페이지 구현
import React from "react";
import { useState } from "react";
import ProductList from "./productListPage";
// import loginPage from "./loginPage";

const MainPage = () => {
  return (
    <div>
      <h1>메인 페이지</h1>
      <ProductList />
    </div>
  );
};

export default MainPage;
