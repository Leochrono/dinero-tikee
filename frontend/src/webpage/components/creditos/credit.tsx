import { useState, useCallback, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import CreditForm from "@/components/creditos/creditForm";
import CreditResults from "@/components/creditos/creditResults";
import CreditDetails from "@/components/creditos/creditDetails";
import CreditSuccess from "@/components/creditos/creditSucces";
import { CreditFormData } from "@/components/creditos/utils/types";
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

  // Estados
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

  // Actualizar datos cuando cambia el usuario
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        document: user.cedula || prev.document,
      }));
    }
  }, [user]);

  // Validar estado de la aplicación
  useEffect(() => {
    const currentPath = location.pathname;

    // Definir rutas válidas como una constante
    const pathsRequiringCredit = [
      routesWebpage.creditoResults,
      routesWebpage.creditoDetails,
    ] as const;

    // Validar que exista creditId para resultados y detalles
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

    // Validar que exista institución seleccionada para detalles
    if (currentPath === routesWebpage.creditoDetails) {
      if (!selectedInstitutionId) {
        toast.error("No se ha seleccionado una institución");
        navigate(routesWebpage.creditoResults);
        return;
      }
    }
  }, [location.pathname, creditId, selectedInstitutionId, navigate]);

  // Manejar el envío del formulario
  const handleFormSubmit = useCallback(
    (data: CreditFormData) => {
      try {
        // Validar datos requeridos
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

        // Guardar datos
        localStorage.setItem("creditFormData", JSON.stringify(data));
        setFormData(data);

        // Verificar creditId
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

  // Manejar selección de institución
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

  // Manejar navegación hacia atrás
  const handleBack = useCallback(() => {
    const currentPath = location.pathname;

    if (currentPath === routesWebpage.creditoResults) {
      navigate(routesWebpage.creditoForm);
    } else if (currentPath === routesWebpage.creditoDetails) {
      navigate(routesWebpage.creditoResults);
    }
  }, [location.pathname, navigate]);

  // Manejar aplicación del crédito
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

  // Manejar nueva búsqueda
  const handleNewSearch = useCallback(() => {
    try {
      // Limpiar localStorage
      localStorage.removeItem("currentCreditId");
      localStorage.removeItem("selectedInstitutionId");
      localStorage.removeItem("selectedInstitution");
      localStorage.removeItem("creditFormData");

      // Restablecer estados
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
