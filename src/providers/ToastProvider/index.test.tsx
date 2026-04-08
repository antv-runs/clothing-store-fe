import { render, screen, act, waitFor } from "@testing-library/react";
import { ToastProvider } from "./index";
import httpClient, { __resetGlobalErrorTimeForTesting } from "@/lib/axios";
import MockAdapter from "axios-mock-adapter";

describe("ToastProvider", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(httpClient);
        __resetGlobalErrorTimeForTesting();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        mock.restore();
        mock.reset();
        jest.useRealTimers();
    });

    it("renders an error toast when receiving global-api-error event", async () => {
        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        act(() => {
            window.dispatchEvent(
                new CustomEvent("global-api-error", {
                    detail: { message: "Network Failed" },
                }),
            );
        });

        expect(await screen.findByText("Network Failed")).toBeInTheDocument();
    });

    it("auto dismisses the toast after the default duration", async () => {
        jest.useFakeTimers();

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        act(() => {
            window.dispatchEvent(
                new CustomEvent("global-api-error", {
                    detail: { message: "Auto dismiss test" },
                }),
            );
        });

        expect(await screen.findByText("Auto dismiss test")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        await waitFor(() => {
            expect(screen.queryByText("Auto dismiss test")).not.toBeInTheDocument();
        });
    });

    it("shows a global error toast when axios POST returns 500", async () => {
        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-500").reply(500);

        await act(async () => {
            await httpClient.post("/test-500", { foo: "bar" }).catch((e) => expect(e).toBeTruthy());
        });

        expect(
            await screen.findByText("Server error. Please try again in a moment."),
        ).toBeInTheDocument();
    });

    it("shows a global error toast when axios POST has a network error", async () => {
        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-network").networkError();

        await act(async () => {
            await httpClient.post("/test-network", { foo: "bar" }).catch((e) => expect(e).toBeTruthy());
        });

        expect(
            await screen.findByText(
                "Unable to connect. Please check your connection and try again.",
            ),
        ).toBeInTheDocument();
    });

    it("does not show a global error toast for GET requests, even on 500", async () => {
        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onGet("/test-get").reply(500);

        await act(async () => {
            await httpClient.get("/test-get").catch((e) => expect(e).toBeTruthy());
        });

        expect(
            screen.queryByText("Server error. Please try again in a moment."),
        ).not.toBeInTheDocument();
    });

    it("does not show a global error toast for 4xx mutation errors", async () => {
        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-404").reply(404);

        await act(async () => {
            await httpClient.post("/test-404", { foo: "bar" }).catch((e) => expect(e).toBeTruthy());
        });

        expect(
            screen.queryByText("Server error. Please try again in a moment."),
        ).not.toBeInTheDocument();
    });

    it("does not show a toast for successful mutation requests", async () => {
        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

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
        // Ensure initial Date.now() is high enough so it passes the 'now - 0 > 3000' logic
        jest.setSystemTime(10000);

        const dispatchSpy = jest.spyOn(window, "dispatchEvent");

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

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

        const { unmount } = render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

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