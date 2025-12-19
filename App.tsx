
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UnitPage from './components/UnitPage';
import ComplexityCalculator from './components/ComplexityCalculator';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/unit/:id" element={<UnitPage />} />
          <Route path="/calculator" element={<ComplexityCalculator />} />
          {/* Catch-all route to redirect to home */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
