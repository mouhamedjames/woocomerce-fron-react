import styled from "styled-components";


import Products from "../../components/product/productlist.js";
import axios from "axios"

import { mobile } from "../../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [cat, setcat] = useState("all");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>


      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products by categoriy:</FilterText>
          <Select onChange={(e) => setcat(e.target.value)}>
            <Option value="all">all</Option>
            <Option value="a">a </Option>
            <Option value="b">b</Option>
          </Select>
          
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products  sort={sort} cat={cat}/>
     
    </Container>
  );
};

export default ProductList;
