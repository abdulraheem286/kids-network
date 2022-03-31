import React from "react";
import { Container } from "react-bootstrap";

const Header = ({ pageName }) => {
  return (
    <>
      <div style={{ backgroundColor: "#F5F5F5", height: 300 }}>
        <Container style={{ paddingTop: 100 }}>
          <h1>{pageName}</h1>
        </Container>
      </div>
    </>
  );
};

export default Header;
