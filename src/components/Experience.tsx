import React from 'react';

// Adobe's own release notes. The CPGenAI and cloud claims below point at it so a
// reader can check them rather than take them on faith.
const CAPTIVATE_13_RELEASE =
  'https://helpx.adobe.com/captivate/help/adobe-captivate--13-0-update--release-notes.html';

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
        <strong>CPGenAI:</strong> Tech lead for a team of four building the generative-AI service
        behind{' '}
        <a href={CAPTIVATE_13_RELEASE} target="_blank" rel="noopener noreferrer">
          Adobe Captivate 13.0
        </a>
        , shipped November 2025 — course text, Firefly-powered images, and talking avatars with
        synchronized multilingual narration.
      </>,
      <>
        Led the design of Captivate's move from a desktop-only product to the cloud, which landed in
        that same 13.0 release. Owned the infrastructure, system design, and Argo CI/CD automation
        behind it.
      </>,
      'Implemented "Share for Review" using Node.js and DCX-js, improving collaboration and user feedback.',
      'Owned the publishing module of the AEM Guides plugin for two years — an end-to-end enterprise CCMS for DITA-based content.',
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
