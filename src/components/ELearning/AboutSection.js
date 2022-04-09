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
              <h1>Collaborator 3</h1>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <h1>Collaborator 1</h1>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <h1>Collaborator 2</h1>
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};
