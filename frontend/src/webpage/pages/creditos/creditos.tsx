import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenLine from '@/components/greenline/greenline';
import Footer from '@/components/footer/footer';
import CreditPage from '@/components/creditos/credit';
import Products from '@/components/home/products/products';
import BankLogos from '@/components/home/bankLogos,tsx/bankLogos';

const Creditos: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <GreenLine />
      <CreditPage />
      <GreenLine />
      <Products />
      <GreenLine />
      <BankLogos />
      <GreenLine />
      <Footer />
    </>
  );
};

export default Creditos;