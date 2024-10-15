import React, { useEffect, useState } from "react";
import * as clientesService from "../../../services/clientes/clientesService";
import { Link, useNavigate, useParams } from "react-router-dom";

const VerClientesPage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState({
    tipoDocumento: "",
    noDocumento: "",
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    notas: "",
    edad: 0,
  });
  const [errorCliente, setErrorCliente] = useState(null);

  useEffect(() => {
    if (id) {
      getClienteById();
    }
  }, []);

  const getClienteById = async () => {
    try {
      const result = await clientesService.GetClientesById(id);
      setCliente(result);
    } catch (error) {
      setErrorCliente("No se pudo obtener la cliente");
      console.error(error);
    }
  };

  const saveCliente = async () => {
    try {
      if (
        cliente.tipoDocumento === "" ||
        cliente.noDocumento === "" ||
        cliente.nombres === "" ||
        cliente.apellidos === "" ||
        cliente.correo === "" ||
        cliente.telefono === "" ||
        cliente.direccion === "" ||
        cliente.ciudad === "" ||
        cliente.notas === "" ||
        cliente.edad <= 0
      ) {
        setErrorCliente("Todos los campos son requeridos");
        return;
      }

      const bodyRequest = { ...cliente, id: undefined };
      if (id) {
        await clientesService.PutClientes(id, bodyRequest);
        navigate("/clientes");
        return;
      }
      await clientesService.PostClientes(bodyRequest);
      navigate("/clientes");
    } catch (error) {
      setErrorCliente("No se pudo guardar el cliente");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="form-outline mb-4">
          <label className="form-label">Tipo de documento</label>
            <select
              className="form-control"
              name="tipoDocumento"
              id="tipoDocumento"
              value={cliente.tipoDocumento}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, tipoDocumento: e.target.value }))
              }
            >
              <option value="">-- Selecciona un rol --</option>
              <option value="Cedula">Cédula</option>
              <option value="Cedula extranjeria">Cédula de extranjería</option>
              <option value="Nit">Nit</option>
            </select>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              name="nombres"
              className="form-control"
              value={cliente.nombres}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, nombres: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Correo</label>
            <input
              type="text"
              name="correo"
              className="form-control"
              value={cliente.correo}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, correo: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              name="direccion"
              className="form-control"
              value={cliente.direccion}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, direccion: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Edad</label>
            <input
              type="number"
              name="edad"
              className="form-control"
              value={cliente.edad}
              onChange={(e) => setCliente((prev) => ({ ...prev, edad: Number(e.target.value) }))}
            />
          </div>
        </div>
        <div className="col-lg-6">
        <div className="form-outline mb-4">
            <label className="form-label">Número de Documento</label>
            <input
              type="text"
              name="noDocumento"
              className="form-control"
              value={cliente.noDocumento}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, noDocumento: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              className="form-control"
              value={cliente.apellidos}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, apellidos: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Teléfono</label>
            <input
              type="number"
              name="telefono"
              className="form-control"
              value={cliente.telefono}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, telefono: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              className="form-control"
              value={cliente.ciudad}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, ciudad: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Notas</label>
            <input
              type="text"
              name="notas"
              className="form-control"
              value={cliente.notas}
              onChange={(e) =>
                setCliente((prev) => ({ ...prev, notas: e.target.value }))
              }
            />
          </div>
        </div>
<div className="row mb-5">
        <p className="text-danger text-center">{errorCliente}</p>
        <div className="col-lg-12 form-outline justify-content-center gap-4 d-flex">
          <button
            className="btn btn-success"
            onClick={saveCliente}
          >
            Guardar
          </button>
          <Link className="btn btn-default" to="/clientes">
            Regresar
          </Link>
        </div>
</div>
      </div>
    </div>
  );
};

export default VerClientesPage;
