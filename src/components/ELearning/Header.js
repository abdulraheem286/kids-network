import React from "react";
import { Container } from "react-bootstrap";

const Header = ({ pageName, bgImage }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          height: 300,
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Container style={{ paddingTop: 100 }}>
          <h1
            style={{ textDecoration: "underline", textUnderlineOffset: "8px" }}
          >
            {pageName}
          </h1>
        </Container>
      </div>
    </>
  );
};

export default Header;
