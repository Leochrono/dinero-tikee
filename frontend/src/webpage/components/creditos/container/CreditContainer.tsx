import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import { useCredit } from "@/src/core/hooks/api/use-credit";
import GreenLine from "@/components/greenline/greenline";
import Products from "@/components/home/products/products";
import BankLogos from "@/components/home/bankLogos,tsx/bankLogos";
import Footer from "@/components/footer/footer";
import { routesWebpage } from "@/components/contants/routes";

const CreditContainer: React.FC = () => {
  const { user } = useAuth();
  const { contextValue } = useCredit(user?.email, user?.cedula);
  const navigate = useNavigate();
  const location = useLocation();
  const enhancedContextValue = {
    ...contextValue,
    onSelect: (institutionId: string) => {
      localStorage.setItem("selectedInstitutionId", institutionId);
      navigate(routesWebpage.creditoDetails);
    },
    onBack: () => {
      const currentPath = location.pathname;
      if (currentPath === routesWebpage.creditoResults) {
        navigate(routesWebpage.creditoForm);
      } else if (currentPath === routesWebpage.creditoDetails) {
        navigate(routesWebpage.creditoResults);
      } else {
        navigate(-1);
      }
    },
    onApply: () => {
      navigate(routesWebpage.creditoSuccess);
    },
    onNewSearch: () => {
      localStorage.removeItem("currentCreditId");
      localStorage.removeItem("selectedInstitutionId");
      localStorage.removeItem("creditFormData");
      navigate(routesWebpage.creditoForm);
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
