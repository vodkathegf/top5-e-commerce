import React from "react";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Col, Row, Container } from "reactstrap";

const BigContainer = () => {
  return (
    <div>
      {" "}
      <div>
        <Container>
          <Row>
            <Col xs="3">
              <CategoryList />
            </Col>
            <Col xs="9">
              <ProductList />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BigContainer;
