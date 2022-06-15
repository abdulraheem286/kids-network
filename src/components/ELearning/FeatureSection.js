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
              "Provides Home Tutoring through online courses and videos that is accessible to everyone at anytime. Nourish your skills from home without any time limit."
            }
          />
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/02.png"
            }
            title={"Online Tutoring"}
            desc={
              "Provides Online Learning platform for courses and videos that can be accessed at anytime. Can be accessed from anywhere."
            }
          />
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/03.png"
            }
            title={"Feedbacks"}
            desc={
              "Provides Feedback on the enrolled courses for the authencity and better user experience. It enhances the quality and content of the course."
            }
          />
        </section>

        <section className="d-flex justify-content-center w-100">
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/01.png"
            }
            title={"Buy/Sell Products"}
            desc={
              "Provides e-Commerce platform to buy and sell products for the childern without purchasing any subscriptions. "
            }
          />
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/02.png"
            }
            title={"Community"}
            desc={
              "Provides a community platform for parents to dicuss daily life problems or issues related to their childern. Parents can find solutions as well. "
            }
          />
          <FeatureSectionCard
            icon={
              "https://www.s7template.com/tf/eduskills/assets/images/we-offer/03.png"
            }
            title={"Community Experts"}
            desc={
              "Provides experts to help parents in resolving the issues free of cost. Experts will be verified from Kids Network. "
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
      <img alt="icon" src={icon} />
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}
