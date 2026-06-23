import { BrowserRouter } from 'react-router-dom';
import ToastContainer from './components/ui/Toast';
import { AuthProvider } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { ToastProvider } from './contexts/ToastContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <InventoryProvider>
          <ToastProvider>
            <AppRoutes />
            <ToastContainer />
          </ToastProvider>
        </InventoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
