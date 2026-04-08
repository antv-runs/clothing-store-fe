import { render, screen, act } from "@testing-library/react";
import { ToastProvider } from "./index";

describe("ToastProvider", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it("renders error toast when receiving global-api-error event", async () => {
        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>
        );

        act(() => {
            window.dispatchEvent(
                new CustomEvent("global-api-error", {
                    detail: { message: "Network Failed" },
                })
            );
        });

        expect(await screen.findByText("Network Failed")).toBeInTheDocument();
    });

    it("auto dismisses toast after duration", async () => {
        jest.useFakeTimers();

        render(
            <ToastProvider>
                <div />
            </ToastProvider>
        );

        act(() => {
            window.dispatchEvent(
                new CustomEvent("global-api-error", {
                    detail: { message: "Auto dismiss test" },
                })
            );
        });

        expect(await screen.findByText("Auto dismiss test")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        expect(screen.queryByText("Auto dismiss test")).not.toBeInTheDocument();

        jest.useRealTimers();
    });

    it("shows global error toast when axios mutation returns 500", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-500").reply(500);

        await expect(httpClient.post("/test-500", { foo: "bar" })).rejects.toBeTruthy();

        expect(
            await screen.findByText("Server error. Please try again in a moment."),
        ).toBeInTheDocument();

        mock.restore();
    });

    it("shows global error toast when axios mutation has network error", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-network").networkError();

        await expect(httpClient.post("/test-network", { foo: "bar" })).rejects.toBeTruthy();

        expect(
            await screen.findByText(
                "Unable to connect. Please check your connection and try again.",
            ),
        ).toBeInTheDocument();

        mock.restore();
    });

    it("does NOT show global error toast for GET requests", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onGet("/test-get").reply(500);

        await expect(httpClient.get("/test-get")).rejects.toBeTruthy();

        expect(
            screen.queryByText("Server error. Please try again in a moment."),
        ).not.toBeInTheDocument();

        mock.restore();
    });

    it("throttles global error toasts to 1 per 3 seconds", async () => {
        jest.useFakeTimers();

        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-throttle").reply(500);

        // First error - should show toast
        await expect(httpClient.post("/test-throttle")).rejects.toBeTruthy();
        expect(await screen.findByText("Server error. Please try again in a moment.")).toBeInTheDocument();

        // Second error immediately after - should NOT show new toast
        await expect(httpClient.post("/test-throttle")).rejects.toBeTruthy();

        // Should still only see one toast
        expect(
            screen.getAllByText("Server error. Please try again in a moment.").length,
        ).toBe(1);

        // Advance time past throttle
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        // Third error - should show new toast
        await expect(httpClient.post("/test-throttle")).rejects.toBeTruthy();
        expect(await screen.findByText("Server error. Please try again in a moment.")).toBeInTheDocument();

        jest.useRealTimers();
        mock.restore();
    });

    it("does not show toast for 4xx errors", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-404").reply(404);

        await expect(httpClient.post("/test-404")).rejects.toBeTruthy();

        expect(
            screen.queryByText("Server error. Please try again in a moment."),
        ).not.toBeInTheDocument();

        mock.restore();
    });

    it("shows toast for 503 service unavailable", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-503").reply(503);

        await expect(httpClient.post("/test-503")).rejects.toBeTruthy();

        expect(
            await screen.findByText("Server error. Please try again in a moment."),
        ).toBeInTheDocument();

        mock.restore();
    });

    it("shows toast for 504 gateway timeout", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-504").reply(504);

        await expect(httpClient.post("/test-504")).rejects.toBeTruthy();

        expect(
            await screen.findByText("Server error. Please try again in a moment."),
        ).toBeInTheDocument();

        mock.restore();
    });

    it("shows toast for 500 with custom error message", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-500-custom").reply(500, {
            error: {
                message: "Database connection failed",
            },
        });

        await expect(httpClient.post("/test-500-custom")).rejects.toBeTruthy();

        expect(
            await screen.findByText("Database connection failed"),
        ).toBeInTheDocument();

        mock.restore();
    });

    it("shows toast for network error with custom message", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-network-custom").networkError();

        await expect(httpClient.post("/test-network-custom")).rejects.toBeTruthy();

        expect(
            await screen.findByText("Unable to connect. Please check your connection and try again."),
        ).toBeInTheDocument();

        mock.restore();
    });

    it("does not show toast for successful requests", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-success").reply(200, { success: true });

        await httpClient.post("/test-success");

        expect(
            screen.queryByText("Server error. Please try again in a moment."),
        ).not.toBeInTheDocument();

        mock.restore();
    });

    it("shows toast for 500 even if response data is empty", async () => {
        const { default: httpClient } = await import("@/lib/axios");
        const MockAdapter = (await import("axios-mock-adapter")).default;

        const mock = new MockAdapter(httpClient);

        render(
            <ToastProvider>
                <div>Test App</div>
            </ToastProvider>,
        );

        mock.onPost("/test-500-empty").reply(500, {});

        await expect(httpClient.post("/test-500-empty")).rejects.toBeTruthy();

        expect(
            await screen.findByText("Server error. Please try again in a moment."),
        ).toBeInTheDocument();

        mock.restore();
    });
});