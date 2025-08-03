import React from 'react';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  achievements: string[];
  logo?: string;
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      company: "Adobe",
      logo: "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg",
      role: "Software Development Engineer - IV",
      duration: "July 2021 - Present",
      achievements: [
        "<b>CPGenAI:</b> Architected and scaled CPGenAI, an advanced AI-powered microservice that generates multimodal content—including text, images, and videos—for Adobe Captivate.",
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
      logo: "https://www.bankbazaar.com/images/bankbazaar-logo.svg",
      duration: "November 2017 - December 2019",
      achievements: [
        "Enabled automated calls with ClearTouch integration using cron jobs for lead filtration through IVR (Groovy)",
        "Developed full-stack solutions to improve application flow, reducing call closure time and enhancing accessibility using React.js and Java",
        "Built framework for auto-fetching RMIS files from SFTP locations, enhancing service debuggability using Mockito, JUnit, and Sonar"
      ]
    },
    {
      company: "VMware",
      logo: "https://www.vmware.com/vm-favicon.png",
      role: "Member of Technical Staff",
      duration: "August 2014 - September 2015",
      achievements: [
        "Developed vcbench to generate background load for vCenter Server performance and scalability testing",
        "Created Hawkeye - first end-to-end performance suite appliance for vCenter Server, enabling engineers to benchmark and analyze VC deployments"
      ]
    },
    {
      company: "Google Inc.",
      logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
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
        <div className="experience-panels">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-panel fade-in">
              <div className="panel-header">
                <div className="company">
                  {exp.logo && (
                    <img 
                      src={exp.logo} 
                      alt={`${exp.company} logo`} 
                      className="company-logo"
                      style={{height: '24px', marginRight: '8px', verticalAlign: 'middle'}}
                    />
                  )}
                  {exp.company}
                </div>
                <div className="duration">{exp.duration}</div>
              </div>
              <div className="panel-content">
                <div className="role">{exp.role}</div>
                <ul className="achievements">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} dangerouslySetInnerHTML={{__html: achievement}} />
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