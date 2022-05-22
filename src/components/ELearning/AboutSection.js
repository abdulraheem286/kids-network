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
      <div className="container">
        <h1
          style={{
            fontSize: "48px",
            lineHeight: "64px",
            textAlign: "center",
            color: "#fff",
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
        >
          Testimonials
        </h1>

        <section className="w-100 text-center p-2 align-items-center">
          <p style={{ color: "#fff" }}>
            Kids Network for kids is a non-profit organization providing free,
            fun, curriculum based quality primary education to all children
            world wide. The foundation was launched in the Pakistan in 2022.
          </p>
        </section>
        <section className="w-100 p-5">
          <CarouselPage />
        </section>
      </div>
    </div>
  );
};

export default AboutSection;

const CarouselPage = () => {
  return (
    <MDBContainer style={{}}>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
        slide
        dark
        fade
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <CollaboratorCard
                name="Abdul Rehman"
                comment="Kids Network is really fun! I've learned functions, loops, and conditionals, and I've built cool projects. I am also learning how coding for kids is helping my future!"
                imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <CollaboratorCard
                name="Ammar Uppal"
                comment="We love Kids Network! We couldn't even imagine a better experience. The people are amazing -- very warm, supportive and enthusiastic."
                imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20(21).jpg"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <CollaboratorCard
                name="Ibrahim Khan"
                comment="I'm a homeschooled student, and it's a miracle to have found Kids Network. I'm in 4th grade, and I can't wait to work on 5th grade math, science, social studies, and language arts."
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
    <div className="collab__card">
      <div className="container" style={{ borderRadius: "20px" }}>
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <img
            src={imgSrc}
            className="rounded-circle"
            style={{ width: "64px", height: "64px" }}
            alt=""
          />
          <h4 style={{ marginTop: "20px" }}>{name}</h4>
          <p style={{ textAlign: "center", marginTop: "5px", maxWidth: "80%" }}>
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
}
