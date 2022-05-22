import React from "react";
import { Container } from "react-bootstrap";

const Header = ({ pageName, bgImage }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          height: 400,
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />

        <Container
          style={{ paddingTop: 100, position: "relative", zIndex: "100" }}
        >
          <h1
            style={{
              textUnderlineOffset: "8px",
              fontSize: "48px",
              fontFamily: "'Poppins', sans-serif",
              color: "white",
            }}
          >
            {pageName}
          </h1>
        </Container>
      </div>
    </>
  );
};

export default Header;
