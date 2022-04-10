import React from "react";
import "./AboutSection.css";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from "mdbreact";

const AboutSection = () => {
  return (
    <div className="about__main">
      <section className="w-100 text-center p-5 align-items-center">
        <h1 style={{ color: "#7f7f7f" }}>
          <span className="about__main_heading">“People Helping People”</span> -
          The #1 Resource for Kids who want to make the transition onto the
          bigger stage and perform at the highest level
        </h1>
      </section>
      <section className="w-100">
        <CarouselPage />
      </section>
    </div>
  );
};

export default AboutSection;

const CarouselPage = () => {
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={false}
        showIndicators={false}
        className="z-depth-1"
        slide
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <CollaboratorCard
                name="John Doe"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,"
                imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <CollaboratorCard
                name="John Doe1"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,"
                imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20(21).jpg"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <CollaboratorCard
                name="John Doe2"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,"
                imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20(22).jpg"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};
function CollaboratorCard({ imgSrc, name, comment }) {
  return (
    <div className=" d-flex flex-column justify-content-center align-items-center">
      <img
        src={imgSrc}
        className="rounded-circle"
        style={{ width: "64px", height: "64px" }}
        alt=""
      />
      <h3>{name}</h3>
      <p style={{ fontStyle: "italic" }}>~{comment}</p>
    </div>
  );
}
