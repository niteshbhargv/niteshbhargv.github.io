import React from 'react';

const groups: { label: string; items: string }[] = [
  { label: 'Backend', items: 'Java, Spring Boot, Node.js, Apache Sling, OSGi' },
  { label: 'Frontend', items: 'React, JavaScript, TypeScript, DCX-js' },
  { label: 'Infrastructure', items: 'AWS, Argo CI/CD, Docker' },
  { label: 'Data', items: 'SQL, Elasticsearch, Prometheus' },
];

const Skills: React.FC = () => {
  return (
    <section id="skills">
      <h2 className="section-title">Tools</h2>
      <dl className="skills">
        {groups.map((group) => (
          <div key={group.label} className="skill-row">
            <dt>{group.label}</dt>
            <dd>{group.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Skills;
