import React from "react";
import "./FeatureSection.css";

const FeatureSection = () => {
  return (
    <div className="d-flex flex-column main_feature_div">
      <section className="h-50 w-100 d-flex align-items-center justify-content-between p-4">
        <div className="w-50">
          <h1 style={{ fontSize: "48px", lineHeight: "64px" }}>
            <span style={{ color: "#65daff" }}>ROLEPLAYING</span>
            <br /> Without a role... <br />
            it's just playing
          </h1>
        </div>
        <div className="w-50">
          <p
            style={{
              textAlign: "justify",
              fontSize: "20px",
              lineHeight: "32px",
            }}
          >
            Reprehenderit duis mollit laborum tempor reprehenderit. Velit non
            laboris fugiat elit quis cupidatat. Non laborum cillum reprehenderit
            aliqua non reprehenderit aute sit esse. Ut amet excepteur proident
            dolore in exercitation non mollit culpa non sit veniam. Lorem cillum
            fugiat proident nulla irure magna ex qui nisi ullamco exercitation
            non.
          </p>
        </div>
      </section>
      <section className="d-flex justify-content-center w-100">
        <FeatureSectionCard
          title={"Proven Strategy"}
          infoHead={"Step by Step Instruction"}
        />
        <FeatureSectionCard
          title={"Ongoing Support"}
          infoHead={"24/7 active support"}
        />
      </section>
    </div>
  );
};

export default FeatureSection;

function FeatureSectionCard({ title, info, infoHead }) {
  return (
    <div className="feature__card">
      <h1>{title}</h1>
      <h5>{infoHead}</h5>
    </div>
  );
}
