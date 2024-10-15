import { configureStore } from "@reduxjs/toolkit";
import demoSlice from "./slices/demoSlice";
import contactoComponentSlice from "./slices/contactoComponentSlice";
import usuarioSlice from "./slices/usuarioSlice";
import pedidoSlice from "./slices/pedidoSlice";

export const store = configureStore({
  reducer: {
    demoStore: demoSlice,
    usuarioStore: usuarioSlice,
    pedidoStore: pedidoSlice,
    contactoComponentStore: contactoComponentSlice,
  },
});
