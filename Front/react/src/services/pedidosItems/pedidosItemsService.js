import apiFetch from "../../utils/apiFetch";

const GetItemsByIdPedidos = async (id) => {
  try {
    const data = await apiFetch().get("/pedidosItems/" + id);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PostPedidosItems = async (payload) => {
  try {
    const { data } = await apiFetch().post("/pedidosItems", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PutPedidosItems = async (id, payload) => {
  try {
    const { data } = await apiFetch().put("/pedidosItems/" + id, payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const DeletePedidosItems = async (id) => {
  try {
    const { data } = await apiFetch().delete("/pedidosItems/" + id);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  GetItemsByIdPedidos,
  PostPedidosItems,
  PutPedidosItems,
  DeletePedidosItems,
};
