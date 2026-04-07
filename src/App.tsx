import AppRoutes from "@/routes";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { ToastProvider } from "@/providers/ToastProvider";

/**
 * Main App component
 * Renders the application routes and router setup
 */
function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
