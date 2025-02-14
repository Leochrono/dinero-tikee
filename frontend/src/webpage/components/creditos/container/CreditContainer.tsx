import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/core/hooks/api/useAuth';
import { useCredit } from '@/src/core/hooks/api/use-credit';
import GreenLine from '@/components/greenline/greenline';
import Products from '@/components/home/products/products';
import BankLogos from '@/components/home/bankLogos,tsx/bankLogos';
import Footer from '@/components/footer/footer';
import { routesWebpage } from '@/components/contants/routes';

const CreditContainer: React.FC = () => {
  const { user } = useAuth();
  const { contextValue } = useCredit(user?.email, user?.cedula);
  const navigate = useNavigate();

  // Define el contexto con todas las propiedades necesarias
  const enhancedContextValue = {
    ...contextValue,
    onSelect: (institutionId: string) => {
      navigate(routesWebpage.creditoDetails, {
        state: { institutionId } // Pasa el ID de la institución
      });
    },
    onBack: () => {
      navigate(-1); // Volver a la página anterior
    },
  };

  return (
    <>
      <GreenLine />
      <Outlet context={enhancedContextValue} />
      <GreenLine />
      <Products />
      <GreenLine />
      <BankLogos />
      <GreenLine />
      <Footer />
    </>
  );
};

export default CreditContainer;