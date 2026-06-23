import { BrowserRouter } from 'react-router-dom';
import ToastContainer from './components/ui/Toast';
import { AuthProvider } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { ToastProvider } from './contexts/ToastContext';
import { UnitProvider } from './contexts/UnitContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <UnitProvider>
          <InventoryProvider>
            <ToastProvider>
              <AppRoutes />
              <ToastContainer />
            </ToastProvider>
          </InventoryProvider>
        </UnitProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
