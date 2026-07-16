import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';

// The markdown renderer and syntax highlighter are most of the bundle, and only
// post pages need them. Keeps the homepage payload small.
const BlogPost = lazy(() => import('./pages/BlogPost'));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Layout variant="post">
              <Suspense fallback={null}>
                <BlogPost />
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
