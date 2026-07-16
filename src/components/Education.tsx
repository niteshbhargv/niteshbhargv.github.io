import React from 'react';

interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

const educationItems: EducationItem[] = [
  {
    degree: 'M.Tech, Computer Science and Engineering',
    school: 'Indian Institute of Technology, Madras',
    year: '2012 — 2014',
  },
  {
    degree: 'B.Tech, Information and Communication Technology',
    school: 'DA-IICT, Gandhinagar',
    year: '2008 — 2012',
  },
];

const Education: React.FC = () => {
  return (
    <section id="education">
      <h2 className="section-title">Education</h2>
      <ul className="cv">
        {educationItems.map((item) => (
          <li key={item.school} className="cv-entry">
            <div className="cv-head">
              <h3 className="cv-company">{item.school}</h3>
              <span className="cv-duration">{item.year}</span>
            </div>
            <p className="cv-role">{item.degree}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Education;
