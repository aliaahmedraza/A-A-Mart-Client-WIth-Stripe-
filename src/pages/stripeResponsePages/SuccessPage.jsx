// src/pages/SuccessPage.jsx
import React from 'react';
import { Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sessionId = new URLSearchParams(search).get('session_id');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
      {sessionId && (
        <p className="mb-6">
          Your session ID: <code>{sessionId}</code>
        </p>
      )}
      <Button type="primary" onClick={() => navigate('/dashboard')}>
        Back to Home
      </Button>
    </div>
  );
};

export default SuccessPage;
