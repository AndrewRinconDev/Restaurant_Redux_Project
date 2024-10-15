import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as clientesService from '../../services/clientes/clientesService'

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    handleGetClientes();
  }, []);

  const handleGetClientes = async () => {
    try {
      const result = await clientesService.GetClientes();
      setClientes(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClientes = async (id) => {
    try {
      await clientesService.DeleteClientes(id);
      handleGetClientes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <h3>Lista de Clientes</h3>
        <p>
          Inicia sesión para una experiencia personalizada y administra tus
          clientes.
        </p>
        <div className="col-md-2">
          <Link className="btn btn-success col-md-12" to={"/addClientes/"}>
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
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length > 0 &&
                clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombres}</td>
                    <td>{cliente.apellidos}</td>
                    <td>{cliente.correo}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.direccion}</td>
                    <td>
                      <Link
                        className="btn btn-warning"
                        to={"/clientes/" + cliente.id}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClientes(cliente.id)}
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

export default ClientesPage;
