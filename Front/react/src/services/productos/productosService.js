import apiFetch from "../../utils/apiFetch";

const GetProductos = async () => {
  try {
    const { data } = await apiFetch().get("/productos");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetProductosById = async (id) => {
  try {
    const { data } = await apiFetch().get("/productos/" + id);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetProductosByCategoriaId = async (id) => {
  try {
    const { data } = await apiFetch().get("/productos/categoria/" + id);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PostProductos = async (payload) => {
  try {
    const { data } = await apiFetch().post("/productos", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PutProductos = async (id, payload) => {
  try {
    const { data } = await apiFetch().put("/productos/" + id, payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const DeleteProductos = async (id) => {
  try {
    const { data } = await apiFetch().delete("/productos/" + id);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  GetProductos,
  GetProductosById,
  GetProductosByCategoriaId,
  PostProductos,
  PutProductos,
  DeleteProductos,
};
