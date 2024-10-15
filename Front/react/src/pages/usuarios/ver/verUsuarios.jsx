import React, { useEffect, useState } from "react";
import * as usuariosService from "../../../services/usuarios/usuariosService";
import { Link, useNavigate, useParams } from "react-router-dom";

const VerUsuariosPage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [usuario, setUsuario] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    clave: "",
    role: "",
  });
  const [errorUsuario, setErrorUsuario] = useState(null);

  useEffect(() => {
    if (id) {
      getUsuarioById();
    }
  }, []);

  const getUsuarioById = async () => {
    try {
      const result = await usuariosService.GetUsuariosById(id);
      setUsuario(result);
    } catch (error) {
      setErrorUsuario("No se pudo obtener la usuario");
      console.log(error);
    }
  };

  const saveUsuario = async () => {
    try {
      if (
        usuario.nombres === "" ||
        usuario.apellidos === "" ||
        usuario.correo === "" ||
        usuario.clave === "" ||
        usuario.role === ""
      ) {
        setErrorUsuario("Todos los campos son requeridos");
        return;
      }
      const bodyRequest = {...usuario, id: undefined};
      if (id) {
        await usuariosService.PutUsuarios(id, bodyRequest);
        navigate("/usuarios");
        return;
      }
      await usuariosService.PostUsuarios(bodyRequest);
      navigate("/usuarios");
    } catch (error) {
      setErrorUsuario("No se pudo guardar la usuario");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="form-outline mb-4">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              name="nombres"
              className="form-control"
              value={usuario.nombres}
              onChange={(e) => setUsuario((prev) => ({ ...prev, nombres: e.target.value }))}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Correo</label>
            <input
              type="text"
              name="correo"
              className="form-control"
              value={usuario.correo}
              onChange={(e) => setUsuario((prev) => ({ ...prev, correo: e.target.value }))}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Rol</label>
            <select
              className="form-control"
              name="rol"
              id="rol"
              value={usuario.role}
              onChange={(e) => setUsuario((prev) => ({ ...prev, role: e.target.value }))}
            >
              <option value="">-- Selecciona un rol --</option>
              <option value="Administrador">Administrador</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-outline mb-4">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              className="form-control"
              value={usuario.apellidos}
              onChange={(e) => setUsuario((prev) => ({ ...prev, apellidos: e.target.value }))}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Clave</label>
            <input
              type="password"
              name="clave"
              className="form-control"
              value={usuario.clave}
              disabled={!!id}
              onChange={(e) => {
                if (!id) setUsuario((prev) => ({ ...prev, clave: e.target.value }))
              }}
            />
          </div>
          <div className="form-outline pt-4 justify-content-end gap-4 d-flex">
            <button
              className="btn btn-success"
              onClick={saveUsuario}
            >
              Guardar
            </button>
            <Link className="btn btn-default" to="/usuarios">
              Regresar
            </Link>
          </div>
        </div>
        <p className="text-danger">{errorUsuario}</p>
      </div>
    </div>
  );
};

export default VerUsuariosPage;
