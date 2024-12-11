import React from "react";
import '../styles/AboutUs.css'

const AboutUs = () => {
  const team = [
    { name: "Great Osikhueme", role: "Developer" },
    { name: "Meetkumar Patel", role: "Developer" },
    { name: "Lidia Pena-Lauria", role: "Developer" },
    { name: "Isavella Sevastos", role: "Developer" },
    { name: "Mario Soto Sanchez", role: "Developer" },
  ];

  return (
    <div className="aboutus">
      <h1>About Us</h1>
      <p>We are a team of passionate developers building free educational tools.</p>
      <section className="team-section">
        {team.map((member, index) => (
          <div key={index} className="team-member">
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutUs;
