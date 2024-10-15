import apiFetch from "../../utils/apiFetch";

const GetUsuarios = async () => {
  try {
    const { data } = await apiFetch().get("/usuarios");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetUsuariosById = async (id) => {
  try {
    const { data } = await apiFetch().get("/usuarios/" + id);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PostUsuarios = async (payload) => {
  try {
    const { data } = await apiFetch().post("/usuarios", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PutUsuarios = async (id, payload) => {
  try {
    const { data } = await apiFetch().put("/usuarios/" + id, payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const DeleteUsuarios = async (id) => {
  try {
    const { data } = await apiFetch().delete("/usuarios/" + id);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  GetUsuarios,
  GetUsuariosById,
  PostUsuarios,
  PutUsuarios,
  DeleteUsuarios,
};
