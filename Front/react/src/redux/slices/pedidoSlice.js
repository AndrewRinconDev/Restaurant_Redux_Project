import { createSlice } from "@reduxjs/toolkit";

const defaultInitialState = {
  step: 1,
  cantidadProductos: 0,
  categoriaId: "",
  pedido: {
    clienteId: "",
    total: 0,
    subtotal: 0,
    pedidosItems: [],
  },
};

const pedidoSlice = createSlice({
  name: "pedidoSlice",
  initialState: defaultInitialState,
  reducers: {
    clearStateAction: () => {
      return defaultInitialState;
    },
    setStepAction: (state, action) => {
      return {
        ...state,
        step: action.payload,
      };
    },
    setCategoriaAction: (state, action) => {
      return {
        ...state,
        categoriaId: action.payload,
      };
    },
    setClienteAction: (state, action) => {
      console.log({ payload: action.payload });
      return {
        ...state,
        pedido: {
          ...state.pedido,
          clienteId: action.payload,
        },
      };
    },
    agregarProductoAction: (state, action) => {
      const pedidoItem = action.payload;
      console.log({ pedidoItem });
      const oldPedidoItem = state.pedido.pedidosItems.find(
        (p) => p.productoId === pedidoItem.productoId
      );

      if (oldPedidoItem) {
        const newPedidoItems = state.pedido.pedidosItems.map((p) => {
          if (p.productoId === pedidoItem.productoId) {
            return {
              ...p,
              cantidad: p.cantidad + pedidoItem.cantidad,
              subtotal: p.subtotal + pedidoItem.subtotal,
            };
          }
          return p;
        });
        const total = state.pedido.pedidosItems.reduce(
          (acc, item) => acc + Number(item.subtotal),
          0
        );
        const subtotal = total / 1.19;
        return {
          ...state,
          pedido: {
            ...state.pedido,
            total,
            subtotal,
            pedidosItems: newPedidoItems,
          },
        };
      }
      const newPedidoItems = [...state.pedido.pedidosItems, pedidoItem];
      const total = newPedidoItems.reduce(
        (acc, item) => acc + Number(item.subtotal),
        0
      );
      const subtotal = total / 1.19;
      return {
        ...state,
        cantidadProductos: state.cantidadProductos + 1,
        pedido: {
          ...state.pedido,
          total,
          subtotal,
          pedidosItems: newPedidoItems,
        },
      };
    },
    removerProductoAction: (state, action) => {
      const productoId = action.payload;
      const hasPedidoItem = state.pedido.pedidosItems.some(
        (p) => p.productoId === productoId
      );
      console.log({ hasPedidoItem });

      if (!hasPedidoItem) return state;

      const newPedidoItems = state.pedido.pedidosItems.filter(
        (p) => p.productoId !== productoId
      );
      const total = newPedidoItems.reduce(
        (acc, item) => acc + Number(item.subtotal),
        0
      );
      const subtotal = total / 1.19;

      return {
        ...state,
        cantidadProductos: state.cantidadProductos - 1,
        pedido: {
          ...state.pedido,
          total,
          subtotal,
          pedidosItems: newPedidoItems,
        },
      };
    },
    modificarCantidadProductoAction: (state, action) => {
      const pedidoItem = action.payload;
      const oldPedidoItem = state.pedido.pedidosItems.find(
        (p) => p.productoId === pedidoItem.productoId
      );

      if (!oldPedidoItem) return state;

      const newPedidoItems = state.pedido.pedidosItems.map((pi) => {
        if (pi.productoId === pedidoItem.productoId) {
          return {
            ...pi,
            cantidad: pedidoItem.cantidad,
            subtotal: pedidoItem.subtotal,
          };
        }
        return pi;
      });

      const total = newPedidoItems.reduce(
        (acc, item) => acc + Number(item.subtotal),
        0
      );
      const subtotal = total / 1.19;

      return {
        ...state,
        pedido: {
          ...state.pedido,
          total,
          subtotal,
          pedidosItems: newPedidoItems,
        },
      };
    },
  },
});

export const {
  clearStateAction,
  setStepAction,
  setCategoriaAction,
  setClienteAction,
  agregarProductoAction,
  removerProductoAction,
  modificarCantidadProductoAction,
} = pedidoSlice.actions;

export default pedidoSlice.reducer;
