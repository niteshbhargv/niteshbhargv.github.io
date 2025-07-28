import React from 'react';

interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

const Education: React.FC = () => {
  const educationItems: EducationItem[] = [
    {
      degree: "M.Tech in Computer Science and Engineering",
      school: "Indian Institute of Technology, Madras",
      year: "2012 - 2014"
    },
    {
      degree: "B.Tech in Information and Communication Technology",
      school: "Dhirubhai Ambani Institute of Information and Communication Technology, Gandhinagar",
      year: "2008 - 2012"
    }
  ];

  return (
    <section id="education">
      <div className="section-content">
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {educationItems.map((education, index) => (
            <div key={index} className="education-card fade-in">
              <div className="degree">{education.degree}</div>
              <div className="school">{education.school}</div>
              <div className="year">{education.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 