import React, { useCallback, useState } from "react";
import {
  clearStateAction,
  modificarCantidadProductoAction,
  removerProductoAction,
  setStepAction,
} from "../../redux/slices/pedidoSlice";

import { useDispatch, useSelector } from "react-redux";
import "./realizarPedido.css";
import { Link, useNavigate } from "react-router-dom";
import * as pedidosService from "../../services/pedidos/pedidosService";

const RealizarPedidoComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pedido } = useSelector((state) => state.pedidoStore);
  const [pedidoError, setPedidoError] = useState("");
  const { pedidosItems, subtotal, total } = pedido;

  const handleRemoverProducto = useCallback((producto) => {
    dispatch(removerProductoAction(producto.id));
  }, []);

  const handleAgregarProducto = useCallback((pedidoItem) => {
    const nuevoSubtotal = pedidoItem.producto.precio * (pedidoItem.cantidad + 1);
    dispatch(
      modificarCantidadProductoAction({
        productoId: pedidoItem.producto.id,
        cantidad: pedidoItem.cantidad + 1,
        subtotal: nuevoSubtotal,
      })
    );
  }, []);

  const handleQuitarProducto = useCallback((pedidoItem) => {
    if (pedidoItem.cantidad === 1) {
      dispatch(removerProductoAction(pedidoItem.producto.id));
      return;
    }
    const nuevoSubtotal = pedidoItem.producto.precio * (pedidoItem.cantidad - 1);
    dispatch(
      modificarCantidadProductoAction({
        productoId: pedidoItem.producto.id,
        cantidad: pedidoItem.cantidad - 1,
        subtotal: nuevoSubtotal,
      })
    );
  }, []);

  const handleSetPedido = async () => {
    if (pedidosItems.length === 0) {
      setPedidoError("No hay productos en el carrito");
      return;
    }

    try {
      await pedidosService.PostPedidos(pedido);
      dispatch(clearStateAction());
      navigate("/pedidos");
    } catch (error) {
      setPedidoError("Error al guardar el pedido");
      console.error(error);
    }
  };

  const handleRegresar = () => {
    dispatch(setStepAction(3));
  };

  return (
    <>
      <h3>Carrito de compras</h3>
      <p>Revisa los productos que has agregado al carrito.</p>
      {pedidosItems.length === 0 && (
        <>
          <h3>No hay productos en el carrito</h3>
          <button onClick={handleRegresar} className="btn btn-primary" to="/productos">
            Ir a comprar
          </button>
        </>
      )}
      <div className="row">
        {pedidosItems.map((pedidoItem) => (
          <li className="row align-items-center" key={pedidoItem.productoId}>
            <div className="col-1">
              <button onClick={() => handleRemoverProducto(pedidoItem.producto)}>
                X
              </button>
            </div>
            <div className="col-4 d-flex align-items-center gap-4">
              <img
                className="car-item-image"
                src={pedidoItem.producto.imagen}
                alt={`${pedidoItem.producto.nombre}-image`}
              />
              <span style={{ width: "max-content" }}>
                {pedidoItem.producto.nombre}
              </span>
            </div>

            <div className="col-3 d-flex justify-content-end align-items-center gap-4">
              <button onClick={() => handleQuitarProducto(pedidoItem)}>
                -
              </button>
              <span style={{ width: "max-content" }}>
                {pedidoItem.cantidad}
              </span>
              <button onClick={() => handleAgregarProducto(pedidoItem)}>
                +
              </button>
            </div>
            <div className="col-2 d-flex justify-content-end">
              ${pedidoItem.producto.precio}
            </div>
            <div className="col-2 d-flex justify-content-end">
              ${pedidoItem.subtotal}
            </div>
          </li>
        ))}
        <div className="row d-flex justify-content-end">
          <span
            className="col-2 d-flex justify-content-end"
            style={{ width: "max-content" }}
          >
            <b>Subtotal</b>&nbsp;${Math.trunc(subtotal)}
          </span>
          <span
            className="col-2 d-flex justify-content-end"
            style={{ width: "max-content" }}
          >
            <b>Total</b>&nbsp;${total}
          </span>
        </div>
      </div>
      <div className="row pt-3">
        <p className="text-danger">{pedidoError}</p>
        <div className="col-12 justify-content-center gap-3">
          <button className="btn btn-success" onClick={handleSetPedido}>
            Guardar Pedido
          </button>
          <button className="btn btn-default" onClick={handleRegresar}>
            Anterior
          </button>
        </div>
      </div>
    </>
  );
};

export default RealizarPedidoComponent;
