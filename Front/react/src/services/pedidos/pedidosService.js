import apiFetch from "../../utils/apiFetch";

const GetPedidos = async () => {
  try {
    const { data } = await apiFetch().get("/pedidos");
    console.log(data);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PostPedidos = async (payload) => {
  try {
    console.log({ payload });
    const newPedidoItems = payload.pedidosItems.map((item) => {
      return {
        productoId: item.productoId,
        cantidad: item.cantidad,
        subtotal: item.subtotal.toString(),
      };
    });

    console.log({ newPedidoItems });
    const requestData = {
      ...payload,
      total: payload.total.toString(),
      subtotal: payload.subtotal.toString(),
      pedidosItems: newPedidoItems,
    };

    const { data } = await apiFetch().post("/pedidos", requestData);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PutPedidos = async (id, payload) => {
  try {
    const { data } = await apiFetch().put("/pedidos/" + id, payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const DeletePedidos = async (id) => {
  try {
    const { data } = await apiFetch().delete("/pedidos/" + id);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { GetPedidos, PostPedidos, PutPedidos, DeletePedidos };
