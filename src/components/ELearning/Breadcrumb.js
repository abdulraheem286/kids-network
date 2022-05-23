import React from "react";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBContainer,
} from "mdbreact";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ bcl1, bcpt1, bcl2, bcpt2, bcl3, bcpt3, bcpt4 }) => {
  return (
    <>
      <MDBContainer>
        <MDBBreadcrumb className="breadcrumb_main">
          <MDBBreadcrumbItem active>
            <Link to={bcl1} className="breadcrumb_link">
              {bcpt1}
            </Link>
            <Link to={bcl2} className="breadcrumb_link">
              {bcpt2}
            </Link>
            <Link to={bcl3} className="breadcrumb_link">
              {bcpt3}
            </Link>
            <Link to="" className="breadcrumb_link">
              {bcpt4}
            </Link>
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </MDBContainer>
    </>
  );
};

export default Breadcrumb;
