import React, { useState } from "react";
import { Button, Container, Input, Row, Col } from "reactstrap";

function SearchComponent(props) {
  let { onHandleSearch } = props;

  // Lưu giá trị ô input Search
  let [valueSearch, setValueSearch] = useState("");

  // Xử lý khi click nút Search
  let handleSearch = () => {
    onHandleSearch(valueSearch);
  };
  return (
    <Container>
      <Row>
        {/* 2 cột trên giao diện, mỗi cột chiếm 6 ô */}
        <Col xs="6">
          <Input
            value={valueSearch}
            onChange={(event) => {
              setValueSearch(event.target.value);
            }}
          />
        </Col>
        <Col xs="6">
          <Button color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchComponent;
