import React, { useEffect } from "react";
import {
  fetchCategories,
  selectCategory,
  selectCategoryId,
} from "../features/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { Label, ListGroup, ListGroupItem } from "reactstrap";
import { fetchProductsByCategoryId } from "../features/productSlice";

const CategoryList = () => {
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );

  const dispatch = useDispatch();

  const getCategoryName = (category) => {
    dispatch(selectCategory(category.categoryName));
    dispatch(selectCategoryId(category.id));
    dispatch(fetchProductsByCategoryId(category.id));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <ListGroup>
        <Label
          style={{
            fontSize: "2rem",
            fontSynthesis: "style weight",
          }}
        >
          {" "}
          Categories{" "}
        </Label>
        {Array.isArray(categories) &&
          categories.map((category) => (
            <ListGroupItem
              key={category.id}
              onClick={() => getCategoryName(category)}
              active={selectedCategory === category.categoryName}
              style={{ borderRadius: "10px" }}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        <Label style={{ fontSize: "1.2rem" }}>
          Selected Category: {selectedCategory && selectedCategory}
        </Label>
      </ListGroup>
    </div>
  );
};

export default CategoryList;
