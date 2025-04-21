// src/pages/CancelPage.jsx
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="mb-6">You cancelled the payment. Feel free to try again.</p>
      <Button type="primary" onClick={() => navigate('/order')}>
        Return to Checkout
      </Button>
    </div>
  );
};

export default CancelPage;
