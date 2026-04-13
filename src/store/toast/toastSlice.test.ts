import toastReducer, {
  addToast,
  dismissToast,
  clearToasts,
  type ToastState,
} from "./toastSlice";

describe("toastSlice", () => {
  const initialState: ToastState = { items: [] };

  describe("initialization", () => {
    it("returns initial state", () => {
      expect(toastReducer(undefined, { type: "unknown" })).toEqual(
        initialState,
      );
    });
  });

  describe("addToast", () => {
    it("adds a new toast to the items array", () => {
      const toast = { id: "1", message: "Hello", variant: "info" as const };
      const state = toastReducer(initialState, addToast(toast));

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(toast);
    });

    it("adds multiple toasts maintaining order", () => {
      let state = initialState;
      state = toastReducer(
        state,
        addToast({ id: "1", message: "First", variant: "info" as const }),
      );
      state = toastReducer(
        state,
        addToast({ id: "2", message: "Second", variant: "error" as const }),
      );

      expect(state.items).toHaveLength(2);
      expect(state.items[0].id).toBe("1");
      expect(state.items[1].id).toBe("2");
    });
  });

  describe("dismissToast", () => {
    it("removes a toast by id", () => {
      const startState: ToastState = {
        items: [
          { id: "1", message: "First", variant: "info" as const },
          { id: "2", message: "Second", variant: "error" as const },
        ],
      };

      const state = toastReducer(startState, dismissToast({ id: "1" }));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe("2");
    });

    it("does nothing if toast id doesn't exist", () => {
      const startState: ToastState = {
        items: [{ id: "1", message: "First", variant: "info" as const }],
      };

      const state = toastReducer(
        startState,
        dismissToast({ id: "nonexistent" }),
      );

      expect(state.items).toHaveLength(1);
    });
  });

  describe("clearToasts", () => {
    it("clears all toasts", () => {
      const startState: ToastState = {
        items: [
          { id: "1", message: "First", variant: "info" as const },
          { id: "2", message: "Second", variant: "error" as const },
        ],
      };

      const state = toastReducer(startState, clearToasts());

      expect(state.items).toHaveLength(0);
    });
  });
});
