import React from "react";
import "./FeatureSection.css";

const FeatureSection = () => {
  return (
    <div className="main_feature_div">
      <div className="container">
        <h1
          style={{
            fontSize: "48px",
            lineHeight: "64px",
            textAlign: "center",
            color: "#113C49",
            fontFamily: "Poppins",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          What We Offer
        </h1>

        <section className="d-flex justify-content-center w-100">
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/01.png"
            }
            title={"Home Tutoring"}
            desc={
              "His exquisite sincerity education shameless ten earnestly breakfast. Scale began quiet up short wrong in Personal attention."
            }
          />
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/02.png"
            }
            title={"Online Tutoring"}
            desc={
              "His exquisite sincerity education shameless ten earnestly breakfast. Scale began quiet up short wrong in Personal attention."
            }
          />
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/03.png"
            }
            title={"Group Tutoring"}
            desc={
              "His exquisite sincerity education shameless ten earnestly breakfast. Scale began quiet up short wrong in Personal attention."
            }
          />
        </section>

        <section className="d-flex justify-content-center w-100">
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/01.png"
            }
            title={"Home Tutoring"}
            desc={
              "His exquisite sincerity education shameless ten earnestly breakfast. Scale began quiet up short wrong in Personal attention."
            }
          />
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/02.png"
            }
            title={"Online Tutoring"}
            desc={
              "His exquisite sincerity education shameless ten earnestly breakfast. Scale began quiet up short wrong in Personal attention."
            }
          />
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/03.png"
            }
            title={"Group Tutoring"}
            desc={
              "His exquisite sincerity education shameless ten earnestly breakfast. Scale began quiet up short wrong in Personal attention."
            }
          />
        </section>
      </div>
    </div>
  );
};

export default FeatureSection;

function FeatureSectionCard({ icon, title, desc }) {
  return (
    <div className="feature__card">
      <img src={icon} />
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}
