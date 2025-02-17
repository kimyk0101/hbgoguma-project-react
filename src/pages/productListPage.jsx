// @TODO - 상품 리스트 페이지 구현
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

const CATEGORY_ID = {
  0: "전자제품",
  1: "패션",
  2: "가구",
};

const products = [
  {
    id: 1,
    title: "아이폰 13",
    price: 800000,
    seller: "홍길동",
    image: "https://via.placeholder.com/150",
    category: CATEGORY_ID[0],
  },
  {
    id: 2,
    title: "닌텐도 스위치",
    price: 300000,
    seller: "김철수",
    image: "https://via.placeholder.com/150",
    category: CATEGORY_ID[0],
  },
  {
    id: 3,
    title: "책상",
    price: 50000,
    seller: "이영희",
    image: "https://via.placeholder.com/150",
    category: CATEGORY_ID[2],
  },
  {
    id: 4,
    title: "운동화",
    price: 70000,
    seller: "박준영",
    image: "https://via.placeholder.com/150",
    category: CATEGORY_ID[1],
  },
  {
    id: 5,
    title: "헤드폰",
    price: 150000,
    seller: "오수민",
    image: "https://via.placeholder.com/150",
    category: CATEGORY_ID[0],
  },
];

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.title.includes(search) && (category ? p.category === category : true)
  );

  return (
    <div className="flex p-6 bg-[#FFB347] min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">카테고리</h2>
        <RadioGroup onValueChange={setCategory}>
          <Label className="flex items-center space-x-2">
            <RadioGroupItem value="" checked={!category} /> <span>전체</span>
          </Label>
          <Label className="flex items-center space-x-2">
            <RadioGroupItem value="전자제품" /> <span>전자제품</span>
          </Label>
          <Label className="flex items-center space-x-2">
            <RadioGroupItem value="가구" /> <span>가구</span>
          </Label>
          <Label className="flex items-center space-x-2">
            <RadioGroupItem value="패션" /> <span>패션</span>
          </Label>
        </RadioGroup>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <Input
          className="w-full p-2 mb-4 rounded-md"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="p-2 bg-white shadow-md rounded-lg"
            >
              <CardContent className="flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <h3 className="font-bold mt-2">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.seller}</p>
                <p className="text-lg font-semibold text-[#FF7300]">
                  {product.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
