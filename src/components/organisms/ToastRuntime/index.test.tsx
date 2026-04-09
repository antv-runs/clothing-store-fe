import { cleanup, render, screen, act, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastRuntime } from "./index";
import httpClient, { __resetGlobalErrorTimeForTesting } from "@/lib/axios";
import MockAdapter from "axios-mock-adapter";
import { store } from "@/store/cartStore";
import { clearToasts } from "@/actions/toastAction";

jest.mock("@/components/organisms/ToastContainer", () => ({
  ToastContainer: ({ toasts }: { toasts: Array<{ id: string; message: ReactNode }> }) => {
    if (toasts.length === 0) {
      return null;
    }

    return (
      <div aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id}>{toast.message}</div>
        ))}
      </div>
    );
  },
}));

describe("ToastRuntime", () => {
  let mock: MockAdapter;

  const renderWithStore = (ui: ReactNode) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  beforeEach(() => {
    jest.useFakeTimers();
    mock = new MockAdapter(httpClient);
    __resetGlobalErrorTimeForTesting();
    jest.restoreAllMocks();
    store.dispatch(clearToasts());
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });

    cleanup();
    mock.restore();
    mock.reset();
    jest.useRealTimers();
  });

  it("renders an error toast when receiving global-api-error event", async () => {
    renderWithStore(<ToastRuntime />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent("global-api-error", {
          detail: { message: "Network Failed" },
        }),
      );
    });

    expect(screen.getByText("Network Failed")).toBeInTheDocument();
  });

  it("auto dismisses the toast after the default duration", async () => {
    jest.useFakeTimers();

    renderWithStore(<ToastRuntime />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent("global-api-error", {
          detail: { message: "Auto dismiss test" },
        }),
      );
    });

    expect(screen.getByText("Auto dismiss test")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Auto dismiss test")).not.toBeInTheDocument();
    });
  });

  it("shows a global error toast when axios POST returns 500", async () => {
    renderWithStore(<ToastRuntime />);

    mock.onPost("/test-500").reply(500);

    await act(async () => {
      await httpClient.post("/test-500", { foo: "bar" }).catch((e) => expect(e).toBeTruthy());
    });

    expect(
      screen.getByText("Server error. Please try again in a moment."),
    ).toBeInTheDocument();
  });

  it("shows a global error toast when axios POST has a network error", async () => {
    renderWithStore(<ToastRuntime />);

    mock.onPost("/test-network").networkError();

    await act(async () => {
      await httpClient.post("/test-network", { foo: "bar" }).catch((e) => expect(e).toBeTruthy());
    });

    expect(
      screen.getByText(
        "Unable to connect. Please check your connection and try again.",
      ),
    ).toBeInTheDocument();
  });

  it("does not show a global error toast for GET requests, even on 500", async () => {
    renderWithStore(<ToastRuntime />);

    mock.onGet("/test-get").reply(500);

    await act(async () => {
      await httpClient.get("/test-get").catch((e) => expect(e).toBeTruthy());
    });

    expect(
      screen.queryByText("Server error. Please try again in a moment."),
    ).not.toBeInTheDocument();
  });

  it("does not show a global error toast for 4xx mutation errors", async () => {
    renderWithStore(<ToastRuntime />);

    mock.onPost("/test-404").reply(404);

    await act(async () => {
      await httpClient.post("/test-404", { foo: "bar" }).catch((e) => expect(e).toBeTruthy());
    });

    expect(
      screen.queryByText("Server error. Please try again in a moment."),
    ).not.toBeInTheDocument();
  });

  it("does not show a toast for successful mutation requests", async () => {
    renderWithStore(<ToastRuntime />);

    mock.onPost("/test-success").reply(200, { success: true });

    await act(async () => {
      await httpClient.post("/test-success", { foo: "bar" });
    });

    expect(
      screen.queryByText("Server error. Please try again in a moment."),
    ).not.toBeInTheDocument();
  });

  it("throttles global error events to one toast within 3 seconds", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(10000);

    const dispatchSpy = jest.spyOn(window, "dispatchEvent");

    renderWithStore(<ToastRuntime />);

    mock.onPost("/test-throttle").reply(500);

    await act(async () => {
      await httpClient.post("/test-throttle").catch((e) => expect(e).toBeTruthy());
    });
    await act(async () => {
      await httpClient.post("/test-throttle").catch((e) => expect(e).toBeTruthy());
    });

    const globalErrorCallsBeforeAdvance = dispatchSpy.mock.calls.filter(
      ([event]) => event instanceof CustomEvent && event.type === "global-api-error",
    );

    expect(globalErrorCallsBeforeAdvance).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(3001);
    });

    await act(async () => {
      await httpClient.post("/test-throttle").catch((e) => expect(e).toBeTruthy());
    });

    const globalErrorCallsAfterAdvance = dispatchSpy.mock.calls.filter(
      ([event]) => event instanceof CustomEvent && event.type === "global-api-error",
    );

    expect(globalErrorCallsAfterAdvance).toHaveLength(2);
  });

  it("removes the window listener on unmount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderWithStore(<ToastRuntime />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "global-api-error",
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "global-api-error",
      expect.any(Function),
    );
  });
});
