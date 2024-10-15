import React, { useCallback } from "react";
import {
  modificarCantidadProductoAction,
  removerProductoAction,
} from "../../redux/slices/pedidoSlice";

import { useDispatch, useSelector } from "react-redux";
import "./carrito.css";
import { Link } from "react-router-dom";
import * as productosService from "../../services/productos/productosService";
import SeleccionarProductosComponent from "../../components/seleccionar-productos/seleccionarProductos";
import SeleccionarClienteComponent from "../../components/seleccionar-cliente/seleccionarCliente";
import RealizarPedidoComponent from "../../components/realizar-pedido/realizarPedido";
import SeleccionarCategoriaComponent from "../../components/seleccionar-categoria/seleccionarCategoria";

const CarritoPage = () => {
  const { step } = useSelector((state) => state.pedidoStore);

  return (
    <div className="container">
      {step === 1 && <SeleccionarClienteComponent />}
      {step === 2 && <SeleccionarCategoriaComponent />}
      {step === 3 && <SeleccionarProductosComponent />}
      {step === 4 && <RealizarPedidoComponent />}
    </div>
  );
};

export default CarritoPage;
