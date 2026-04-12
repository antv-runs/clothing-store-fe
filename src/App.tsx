import AppRoutes from "@/routes";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { ToastRuntime } from "@/components/organisms/ToastRuntime";
import { Provider } from "react-redux";
import { store } from "@/store";

/**
 * Main App component
 * Renders the application routes and router setup
 */
function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppRoutes />
        <ToastRuntime />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
