import AppRoutes from "@/routes";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";

/**
 * Main App component
 * Renders the application routes and router setup
 */
function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
