import React, { useCallback, useEffect, useState } from "react";
import * as clientesService from "../../services/clientes/clientesService";
import { setClienteAction, setStepAction } from "../../redux/slices/pedidoSlice";
import { useDispatch, useSelector } from "react-redux";

const SeleccionarClienteComponent = (props) => {
  const [clientes, setClientes] = useState(null);
  const pedido = useSelector((state) => state.pedidoStore.pedido);
  const [clienteId, setClienteId] = useState(pedido.clienteId);
  const [clienteError, setClienteError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getClientes();
  }, []);

  const handleSetCliente = useCallback(() => {
    if (!clienteId) {
      setClienteError("Selecciona un cliente");
      return;
    }
    dispatch(setClienteAction(clienteId));
    dispatch(setStepAction(2));
  }, [clienteId]);

  const getClientes = async () => {
    try {
      const result = await clientesService.GetClientes();
      setClientes(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3>Seleccionar Cliente</h3>
      <p>Selecciona un cliente para realizar la compra.</p>
      <div className="row">
        <select
          className="form-control"
          name="clienteId"
          id="clienteId"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        >
          <option value="">-- Selecciona un Cliente --</option>
          {clientes &&
            clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombres} {cliente.apellidos}
              </option>
            ))}
        </select>
      </div>
      <div className="row pt-3">
      <p className="text-danger">{clienteError}</p>
        <div className="col-12 justify-content-center">
          <button className="btn btn-success" onClick={handleSetCliente}>
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default SeleccionarClienteComponent;
