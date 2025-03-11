import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { WebSocketProvider } from './Context/WebSocketContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Header'
import Footer from './Footer'
import FaqPage from './FaqPage';
import DonatePage from './DonatePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebSocketProvider>
      <Router>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/donate" element={<DonatePage />} />
            {/* Other routes for home, docs, etc. */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </WebSocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
