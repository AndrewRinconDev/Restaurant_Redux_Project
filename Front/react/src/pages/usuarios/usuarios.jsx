import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as usuariosService from '../../services/usuarios/usuariosService'

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    handleGetUsuarios();
  }, []);

  const handleGetUsuarios = async () => {
    try {
      const result = await usuariosService.GetUsuarios();
      setUsuarios(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUsuarios = async (id) => {
    try {
      await usuariosService.DeleteUsuarios(id);
      handleGetUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <h3>Lista de Usuarios</h3>
        <p>
          Inicia sesión para una experiencia personalizada y administra tus
          usuarios.
        </p>
        <div className="col-md-2">
          <Link className="btn btn-success col-md-12" to={"/addUsuarios/"}>
            Agregar +
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 &&
                usuarios.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.nombres}</td>
                    <td>{data.apellidos}</td>
                    <td>{data.correo}</td>
                    <td>{data.role}</td>
                    <td>
                      <Link
                        className="btn btn-warning"
                        to={"/usuarios/" + data.id}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUsuarios(data.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsuariosPage;
