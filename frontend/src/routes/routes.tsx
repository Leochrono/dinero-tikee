import React, { Suspense } from 'react';
import { RouteObject, useRoutes, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import Home from '@/webpage/pages/home/home';
import Login from '@/webpage/components/login/login';
import { routesWebpage } from '@/webpage/components/contants/routes';
import RecuperarPassword from '@/components/login/components/pages/recoveryPassword';
import Registro from '@/components/login/components/pages/register';
import CambiarPassword from '@/components/login/components/pages/changePassword';
import VerifyEmail from '@/components/login/components/pages/verifyEmail';
import UnlockAccount from '@/components/login/components/pages/unlockAccount';
import Usuario from '@/webpage/components/usuario/usuario';
import CreditContainer from '@/components/creditos/container/CreditContainer';
import CreditForm from '@/components/creditos/pages/creditForm';
import CreditResults from '@/components/creditos/pages/creditResults';
import CreditDetails from '@/components/creditos/pages/creditDetails';
import CreditSuccess from '@/components/creditos/pages/creditSucces';
import Configuracion from '@/webpage/components/usuario/components/design/configuration';
import Contacto from '@/webpage/components/usuario/components/design/contact';
import AcercaDe from '@/webpage/components/usuario/components/design/acercade';
import PrivateRoute from './privateRoute';
import { FullWidthLayout } from '@/webpage/layouts/full-width-layout/FullWidthLayout';
import Blog from '@/webpage/pages/blog/blog';
import { CreditFormData } from '@/src/core/types/types';

type CreditContextType = {
  formData: CreditFormData;
  initialData: CreditFormData;
  onSubmit: (data: CreditFormData) => void;
  onSelect: (institutionId: string) => void;
  onBack: () => void;
  onApply: () => void;
  onNewSearch: () => void;
  selectedInstitutionId: string;
  creditId: string;
};

const CreditFormWrapper = () => {
  const { onSubmit, initialData } = useOutletContext<CreditContextType>();
  return <CreditForm onSubmit={onSubmit} initialData={initialData} />;
};

const CreditResultsWrapper = () => {
  const { formData, onSelect, onBack } = useOutletContext<CreditContextType>();
  return <CreditResults formData={formData} onSelect={onSelect} onBack={onBack} />;
};

const CreditDetailsWrapper = () => {
  const { formData, onBack, onApply, selectedInstitutionId, creditId } = useOutletContext<CreditContextType>();
  return (
    <CreditDetails
      formData={formData}
      onBack={onBack}
      onApply={onApply}
      institutionId={selectedInstitutionId}
      creditId={creditId}
    />
  );
};

const CreditSuccessWrapper = () => {
  const { onNewSearch } = useOutletContext<CreditContextType>();
  return <CreditSuccess onNewSearch={onNewSearch} />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <FullWidthLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </FullWidthLayout>
    ),
    children: [
      {
        path: routesWebpage.inicio,
        element: <Home />,
      },
      {
        path: routesWebpage.creditos,
        children: [
          {
            path: '',
            element: <CreditContainer />,
            children: [
              {
                index: true,
                element: <Navigate to="solicitud" replace />,
              },
              {
                path: 'solicitud',
                element: <CreditFormWrapper />,
              },
              {
                path: 'resultados',
                element: <CreditResultsWrapper />,
              },
              {
                path: 'detalles',
                element: <CreditDetailsWrapper />,
              },
              {
                path: 'confirmacion',
                element: <CreditSuccessWrapper />,
              },
            ],
          },
        ],
      },
      {
        path: routesWebpage.blog,
        element: <Blog />,
      },
    ],
  },
  {
    path: routesWebpage.login,
    element: <Login />,
  },
  {
    path: routesWebpage.recuperarPassword,
    element: <RecuperarPassword />,
  },
  {
    path: routesWebpage.registro,
    element: <Registro />,
    children: [
      {
        path: 'verify',
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: routesWebpage.verificarEmail,
    element: <VerifyEmail />,
  },
  {
    path: routesWebpage.verificarEmailToken,
    element: <VerifyEmail />,
  },
  {
    path: routesWebpage.desbloquearCuenta,
    element: <UnlockAccount />,
  },
  {
    path: routesWebpage.cambiarPassword,
    element: (
      <PrivateRoute>
        <CambiarPassword />
      </PrivateRoute>
    ),
  },
  {
    path: routesWebpage.perfil,
    element: (
      <PrivateRoute>
        <Usuario />
      </PrivateRoute>
    ),
  },
  // Nuevas rutas para el sidebar
  {
    path: routesWebpage.configuracion,
    element: (
      <PrivateRoute>
        <Configuracion />
      </PrivateRoute>
    ),
  },
  {
    path: routesWebpage.contacto,
    element: <Contacto />,
  },
  {
    path: routesWebpage.acercaDe,
    element: <AcercaDe />,
  },
  {
    path: routesWebpage.notFound,
    element: <div>Página no encontrada</div>,
  },
  {
    path: '*',
    element: <Navigate to={routesWebpage.notFound} replace />,
  },
];

const Routes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routes;