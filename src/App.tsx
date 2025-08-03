import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogPost1 from './pages/BlogPost1';
import BlogPost2 from './pages/BlogPost2';
import BlogPost3 from './pages/BlogPost3';
import BlogPost4 from './pages/BlogPost4';
import BlogPost5 from './pages/BlogPost5';
import BlogPost6 from './pages/BlogPost6';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/blog/building-scalable-microservices-ai-integration" element={
          <Layout showBackButton={true}>
            <BlogPost1 />
          </Layout>
        } />
        <Route path="/blog/migrating-desktop-applications-cloud" element={
          <Layout showBackButton={true}>
            <BlogPost2 />
          </Layout>
        } />
        <Route path="/blog/qr-code-inventory-management-case-study" element={
          <Layout showBackButton={true}>
            <BlogPost3 />
          </Layout>
        } />
        <Route path="/blog/performance-testing-scale-vcbench-vcenter" element={
          <Layout showBackButton={true}>
            <BlogPost4 />
          </Layout>
        } />
        <Route path="/blog/graph-processing-optimization-gsoc-gephi" element={
          <Layout showBackButton={true}>
            <BlogPost5 />
          </Layout>
        } />
        <Route path="/blog/event-driven-architecture-automating-slot-assignment" element={
          <Layout showBackButton={true}>
            <BlogPost6 />
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
