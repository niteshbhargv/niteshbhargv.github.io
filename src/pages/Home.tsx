import React from 'react';
import About from '../components/About';
import Posts from '../components/Posts';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';

const Home: React.FC = () => {
  return (
    <>
      <About />
      <Posts />
      <Experience />
      <Education />
      <Skills />
    </>
  );
};

export default Home;
