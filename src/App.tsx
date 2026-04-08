import AppRoutes from "@/routes";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";
import { Provider } from 'react-redux';
import { store } from "@/store/cartStore";

/**
 * Main App component
 * Renders the application routes and router setup
 */
function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
