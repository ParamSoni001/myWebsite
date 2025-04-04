import React from "react";
import CertificationCard from "./CertificationCard";

export default function CertificationCardStoryboard() {
  return (
    <div className="p-8 bg-white">
      <CertificationCard
        title="Oracle Certified Professional Java SE11 Developer"
        issuer="Oracle University"
        date="April 2024"
        imageUrl="https://education.oracle.com/file/general/Oracle-Certification-badge.png"
        certificationUrl="https://catalog-education.oracle.com/ords/certview/sharebadge?id=AB1CBB48460B50E194663E42509D3D74FCCE2635A711CC8936AAEA2811B1BF96"
      />
    </div>
  );
}
