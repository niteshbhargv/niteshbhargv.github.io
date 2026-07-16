import React from 'react';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  achievements: React.ReactNode[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Arista Networks',
    role: 'Software Engineer',
    duration: 'November 2025 — Present',
    achievements: [],
  },
  {
    company: 'Adobe',
    role: 'Computer Scientist II',
    duration: 'July 2021 — November 2025',
    achievements: [
      <>
        <strong>CPGenAI:</strong> Architected and scaled an AI-powered microservice generating
        multimodal content — text, images, and video — for Adobe Captivate.
      </>,
      'Led the migration of Adobe Captivate from desktop-only to cloud, covering infrastructure, system design, and automation with Argo CI/CD.',
      'Implemented "Share for Review" using Node.js and DCX-js, improving collaboration and user feedback.',
      'Owned the publishing module for the AEM Guides plugin, providing an end-to-end enterprise CCMS for DITA-based content.',
      'Built the output generation flow on the OSGi framework, with single-click publishing to mobile-responsive web formats.',
    ],
  },
  {
    company: 'Ninjacart',
    role: 'Software Development Engineer II',
    duration: 'January 2020 — June 2021',
    achievements: [
      'Introduced a QR-code Stack GRN system for inventory tracking and lifecycle management.',
      'Built a microservice for quality reporting across operations, extending "FOOD-PRINT" capabilities.',
      'Automated slot assignment using event handlers, cutting latency with mobile notifications and fair allocation.',
    ],
  },
  {
    company: 'Bankbazaar',
    role: 'Software Development Engineer',
    duration: 'November 2017 — December 2019',
    achievements: [
      'Enabled automated calls via ClearTouch integration, using cron jobs for lead filtration through IVR (Groovy).',
      'Built full-stack features that reduced call closure time, using React.js and Java.',
      'Created a framework for auto-fetching RMIS files from SFTP, improving debuggability with Mockito, JUnit, and Sonar.',
    ],
  },
  {
    company: 'VMware',
    role: 'Member of Technical Staff',
    duration: 'August 2014 — September 2015',
    achievements: [
      'Developed vcbench, generating background load for vCenter Server performance and scalability testing.',
      'Created Hawkeye, the first end-to-end performance suite appliance for vCenter Server.',
    ],
  },
  {
    company: 'Google',
    role: 'Google Summer of Code',
    duration: 'May 2013 — August 2013',
    achievements: [
      'Worked on GraphStore benchmarking and tuning for Gephi, mentored by Mathieu Bastian.',
      'Built a benchmarking suite to measure operation speeds and find bottlenecks in graph processing.',
    ],
  },
];

const Experience: React.FC = () => {
  return (
    <section id="work">
      <h2 className="section-title">Work</h2>
      <ol className="cv">
        {experiences.map((exp) => (
          <li key={`${exp.company}-${exp.duration}`} className="cv-entry">
            <div className="cv-head">
              <h3 className="cv-company">{exp.company}</h3>
              <span className="cv-duration">{exp.duration}</span>
            </div>
            <p className="cv-role">{exp.role}</p>
            {exp.achievements.length > 0 && (
              <ul className="cv-notes">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
