import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Busca o token no localStorage
  const token = localStorage.getItem('token');

  // Debug rápido: abre o F12 -> Console e veja se aparece null no modo anônimo
  console.log("Status do Token no ProtectedRoute:", token);

  // 2. Validação rigorosa: se for null, undefined ou string vazia, BARRA O ACESSO
  if (!token || token === 'undefined' || token === 'null') {
    return <Navigate to="/auth" replace />;
  }

  // 3. Se tiver token, libera a página interna (/admin)
  return <Outlet />;
};

export default ProtectedRoute;