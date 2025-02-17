import { useState, useCallback, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import CreditForm from "@/components/creditos/pages/creditForm";
import CreditResults from "@/components/creditos/pages/creditResults";
import CreditDetails from "./pages/creditDetails";
import CreditSuccess from "@/components/creditos/pages/creditSucces";
import { CreditFormData } from "@/src/core/types/types";
import { useAuth } from "@/src/core/hooks/api/useAuth";
import PrivateRoute from "@/src/routes/privateRoute";
import { routesWebpage } from "../contants/routes";
import toast from "react-hot-toast";

const initialFormData: CreditFormData = {
  amount: 5000,
  term: 24,
  income: 2500,
  location: "",
  document: "",
  email: "",
  termsAccepted: false,
};

const CreditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>(
    () => {
      return localStorage.getItem("selectedInstitutionId") || "";
    }
  );

  const [creditId, setCreditId] = useState<string>(() => {
    return localStorage.getItem("currentCreditId") || "";
  });

  const [formData, setFormData] = useState<CreditFormData>(() => {
    const savedData = localStorage.getItem("creditFormData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return {
        ...parsed,
        email: user?.email || parsed.email,
        document: user?.cedula || parsed.document,
      };
    }
    return {
      ...initialFormData,
      email: user?.email || "",
      document: user?.cedula || "",
    };
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        document: user.cedula || prev.document,
      }));
    }
  }, [user]);

  useEffect(() => {
    const currentPath = location.pathname;
    const pathsRequiringCredit = [
      routesWebpage.creditoResults,
      routesWebpage.creditoDetails,
    ] as const;
    if (
      pathsRequiringCredit.includes(
        currentPath as (typeof pathsRequiringCredit)[number]
      )
    ) {
      if (!creditId) {
        toast.error("No se encontró información del crédito");
        navigate(routesWebpage.creditoForm);
        return;
      }
    }
    if (currentPath === routesWebpage.creditoDetails) {
      if (!selectedInstitutionId) {
        toast.error("No se ha seleccionado una institución");
        navigate(routesWebpage.creditoResults);
        return;
      }
    }
  }, [location.pathname, creditId, selectedInstitutionId, navigate]);
  const handleFormSubmit = useCallback(
    (data: CreditFormData) => {
      try {
        if (
          !data.amount ||
          !data.term ||
          !data.income ||
          !data.location ||
          !data.email ||
          !data.document
        ) {
          throw new Error("Todos los campos son requeridos");
        }
        localStorage.setItem("creditFormData", JSON.stringify(data));
        setFormData(data);
        const newCreditId = localStorage.getItem("currentCreditId");
        if (!newCreditId) {
          throw new Error("Error al crear el crédito");
        }

        setCreditId(newCreditId);
        navigate(routesWebpage.creditoResults);
      } catch (error: any) {
        toast.error(error.message || "Error al procesar el formulario");
        console.error("Error en handleFormSubmit:", error);
      }
    },
    [navigate]
  );

  const handleOptionSelect = useCallback(
    (institutionId: string) => {
      try {
        if (!institutionId) {
          throw new Error("ID de institución requerido");
        }

        if (!creditId) {
          throw new Error("No se encontró información del crédito");
        }

        setSelectedInstitutionId(institutionId);
        localStorage.setItem("selectedInstitutionId", institutionId);

        navigate(routesWebpage.creditoDetails);
      } catch (error: any) {
        toast.error(error.message || "Error al seleccionar institución");
        console.error("Error en handleOptionSelect:", error);
      }
    },
    [creditId, navigate]
  );

  const handleBack = useCallback(() => {
    const currentPath = location.pathname;

    if (currentPath === routesWebpage.creditoResults) {
      navigate(routesWebpage.creditoForm);
    } else if (currentPath === routesWebpage.creditoDetails) {
      navigate(routesWebpage.creditoResults);
    }
  }, [location.pathname, navigate]);

  const handleApply = useCallback(() => {
    try {
      if (!creditId) {
        throw new Error("No se encontró información del crédito");
      }

      if (!selectedInstitutionId) {
        throw new Error("No se ha seleccionado una institución");
      }

      navigate(routesWebpage.creditoSuccess);
    } catch (error: any) {
      toast.error(error.message || "Error al aplicar el crédito");
      console.error("Error en handleApply:", error);
    }
  }, [creditId, selectedInstitutionId, navigate]);

  const handleNewSearch = useCallback(() => {
    try {
      localStorage.removeItem("currentCreditId");
      localStorage.removeItem("selectedInstitutionId");
      localStorage.removeItem("selectedInstitution");
      localStorage.removeItem("creditFormData");

      setFormData({
        ...initialFormData,
        email: user?.email || "",
        document: user?.cedula || "",
      });
      setSelectedInstitutionId("");
      setCreditId("");

      navigate(routesWebpage.creditoForm);
    } catch (error: any) {
      toast.error("Error al iniciar nueva búsqueda");
      console.error("Error en handleNewSearch:", error);
    }
  }, [user, navigate]);

  return (
    <Box sx={{ minHeight: "10vh" }}>
      <Routes>
        <Route
          path="solicitud"
          element={
            <CreditForm onSubmit={handleFormSubmit} initialData={formData} />
          }
        />
        <Route
          path="resultados"
          element={
            <PrivateRoute>
              <CreditResults
                formData={formData}
                onSelect={handleOptionSelect}
                onBack={handleBack}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="detalles"
          element={
            <PrivateRoute>
              <CreditDetails
                formData={formData}
                onBack={handleBack}
                onApply={handleApply}
                institutionId={selectedInstitutionId}
                creditId={creditId}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="confirmacion"
          element={
            <PrivateRoute>
              <CreditSuccess onNewSearch={handleNewSearch} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
};

export default CreditPage;
