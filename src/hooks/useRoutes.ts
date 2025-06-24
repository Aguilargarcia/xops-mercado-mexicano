
import { useNavigate } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/mockData';

export const useRoutes = () => {
  const navigate = useNavigate();

  const goTo = {
    home: () => navigate(SITE_CONFIG.routes.home),
    login: () => navigate(SITE_CONFIG.routes.login),
    adminLogin: () => navigate(SITE_CONFIG.routes.adminLogin),
    dashboard: () => navigate(SITE_CONFIG.routes.dashboard),
    brands: () => navigate(SITE_CONFIG.routes.brands),
    cart: () => navigate(SITE_CONFIG.routes.cart),
    profile: () => navigate(SITE_CONFIG.routes.profile),
  };

  return { goTo, routes: SITE_CONFIG.routes };
};
