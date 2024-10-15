import React, { useEffect, useState } from "react";
import * as pedidosService from "../../services/pedidos/pedidosService";
import { Link } from "react-router-dom";

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    handleGetPedidos();
  }, []);

  const handleGetPedidos = async () => {
    try {
      const result = await pedidosService.GetPedidos();
      console.log(result);
      setPedidos(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePedidos = async (id) => {
    try {
      await pedidosService.DeletePedidos(id);
      handleGetPedidos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
      <h3>Módulo de Pedidos</h3>
      <p>
        Explora nuestro menú diverso y delicioso, diseñado para satisfacer todos
        los gustos.
      </p>
        <div className="col-md-2">
          <Link className="btn btn-success col-md-12" to={"/carrito"}>
            Agregar +
          </Link>
        </div>
      </div>
      
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>ClienteID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Productos</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.clienteId}</td>
              <td>
                {pedido.cliente.nombres} {pedido.cliente.apellidos}
              </td>
              <td>{pedido.total}</td>
              <td>
                {pedido.pedidosItems && (
                  <ul>
                    {pedido.pedidosItems.map((pedidoItem, index) => (
                      <li
                        key={index}
                      >{`(${pedidoItem.cantidad}) ${pedidoItem.producto.nombre}`}</li>
                    ))}
                  </ul>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePedidos(pedido.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosPage;
