import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "./Breadcrumb";
import "./Header.css";

const Header = ({
  pageName,
  bgImage,
  bcl1,
  bcpt1,
  bcl2,
  bcpt2,
  bcl3,
  bcpt3,
  bcpt4,
}) => {
  return (
    <>
      <div
        style={{
          height: "400px",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: " 50% 20%",
        }}
      >
        <div className="overlay">
          <Container>
            <h1 className="headerTitle">{pageName}</h1>

            <Breadcrumb
              bcpt1={bcpt1}
              bcl1={bcl1}
              bcpt2={bcpt2}
              bcl2={bcl2}
              bcpt3={bcpt3}
              bcl3={bcl3}
              bcpt4={bcpt4}
            />
          </Container>
        </div>
      </div>
    </>
  );
};

export default Header;
