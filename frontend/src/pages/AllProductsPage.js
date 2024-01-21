import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  loadingProducts,
} from "../features/Products/allProductsSlice";

function AllProductsPage() {
  // Redux Global Store State
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const { products, isLoading } = allProducts;

  // Derived State
  const books = products.filter((products) => products.category === "books");
  const candles = products.filter(
    (products) => products.category === "candles"
  );
  const bundles = products.filter(
    (products) => products.category === "bundles"
  );

  // Local State
  const [selectedCategory, setSelectedCategory] = useState("bundles");

  // Event Handler Functions
  function handleSelectCategory(category) {
    setSelectedCategory(category);
  }

  useEffect(() => {
    dispatch(loadingProducts());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <Table hover>
            <thead>
              <th>All Products</th>
            </thead>
            <tbody>
              <tr onClick={() => handleSelectCategory("bundles")}>
                <td className="ps-0">Bundles</td>
              </tr>
              <tr onClick={() => handleSelectCategory("candles")}>
                <td className="ps-0">Candles</td>
              </tr>
              <tr onClick={() => handleSelectCategory("books")}>
                <td className="ps-0">Books</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={9}>
          {isLoading ? (
            <h1>Loading all products</h1>
          ) : selectedCategory === "candles" ? (
            <Row>
              {candles.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : selectedCategory === "books" ? (
            <Row>
              {books.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Row>
              {bundles.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AllProductsPage;

// const [products, setProducts] = useState([]);
// const [bookProducts, setBookProducts] = useState([]);
// const [candleProducts, setCandleProducts] = useState([]);
// const [bundleProducts, setBundleProducts] = useState([]);
// const [selectedCategory, setSelectedCategory] = useState("bundles");

// useEffect(() => {
//   async function getProducts() {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/products");

//       if (!res.ok) {
//         throw new Error(res.status);
//       }

//       const data = await res.json();

//       // console.log("DATA: ", data);

//       setProducts(data);

//       const books = data.filter((product) => product.category === "books");
//       setBookProducts(books);

//       const candles = data.filter(
//         (product) => product.category === "candles"
//       );
//       setCandleProducts(candles);

//       const bundles = data.filter(
//         (product) => product.category === "bundles"
//       );
//       setBundleProducts(bundles);
//     } catch (error) {
//       console.log("CAUGHT ERROR: ", error);
//     }
//   }

//   getProducts();
// }, []);
