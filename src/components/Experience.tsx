import React from 'react';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  achievements: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      company: "Adobe",
      role: "Software Development Engineer - IV",
      duration: "July 2021 - Present",
      achievements: [
        "Leading the migration of Adobe Captivate from desktop-only to cloud, focusing on infrastructure, system design, and automation using Argo CI/CD deployment",
        "Implemented \"Share for Review\" feature using Node.js and DCX-js, enhancing collaborative capabilities and user feedback processes",
        "Owner of publishing module for AEM Guides plugin in Adobe Experience Manager, providing end-to-end enterprise CCMS for DITA-based content",
        "Developed end-to-end output generation flow using OSGI framework with single-click publishing for mobile responsive web formats"
      ]
    },
    {
      company: "Ninjacart",
      role: "Software Development Engineer - II",
      duration: "January 2020 - June 2021",
      achievements: [
        "Introduced QR code Stack GRN system for comprehensive inventory tracking and lifecycle management",
        "Built new microservice for quality reporting across operations to enhance \"FOOD-PRINT\" capabilities",
        "Automated slot assignment to executives using event handlers, reducing latency with mobile notifications and fair allocation algorithms"
      ]
    },
    {
      company: "Bankbazaar",
      role: "Software Development Engineer",
      duration: "November 2017 - December 2019",
      achievements: [
        "Enabled automated calls with ClearTouch integration using cron jobs for lead filtration through IVR (Groovy)",
        "Developed full-stack solutions to improve application flow, reducing call closure time and enhancing accessibility using React.js and Java",
        "Built framework for auto-fetching RMIS files from SFTP locations, enhancing service debuggability using Mockito, JUnit, and Sonar"
      ]
    },
    {
      company: "VMware",
      role: "Member of Technical Staff",
      duration: "August 2014 - September 2015",
      achievements: [
        "Developed vcbench to generate background load for vCenter Server performance and scalability testing",
        "Created Hawkeye - first end-to-end performance suite appliance for vCenter Server, enabling engineers to benchmark and analyze VC deployments"
      ]
    },
    {
      company: "Google Inc.",
      role: "Contract Developer",
      duration: "May 2013 - August 2013",
      achievements: [
        "Google Summer of Code participant working on GraphStore benchmark and tuning for Gephi",
        "Mentored by Mathieu Bastian (Founder, Gephi) on optimizing GraphStore performance",
        "Developed benchmarking suite to test operation speeds and identify bottlenecks in graph processing"
      ]
    }
  ];

  return (
    <section id="experience">
      <div className="section-content">
        <h2 className="section-title">Professional Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item fade-in">
              <div className="timeline-content">
                <div className="company">{exp.company}</div>
                <div className="role">{exp.role}</div>
                <div className="duration">{exp.duration}</div>
                <ul className="achievements">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 