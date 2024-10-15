import React, { useCallback, useEffect, useState } from "react";
import * as productosService from "../../services/productos/productosService";
import {
  agregarProductoAction,
  setStepAction,
} from "../../redux/slices/pedidoSlice";
import { useDispatch, useSelector } from "react-redux";
import "./seleccionarProductos.css";

const SeleccionarProductosComponent = () => {
  const [productos, setProductos] = useState([]);
  const { categoriaId } = useSelector((state) => state.pedidoStore);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetProductos();
  }, [categoriaId]);

  const handleGetProductos = async () => {
    try {
      const result = await productosService.GetProductosByCategoriaId(
        categoriaId
      );
      setProductos(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProducto = useCallback((producto) => {
    dispatch(
      agregarProductoAction({
        productoId: producto.id,
        cantidad: 1,
        subtotal: Number(producto.precio),
        producto,
      })
    );
  }, []);

  const handleSetProducto = () => {
    dispatch(setStepAction(4));
  };

  const handleRegresar = () => {
    dispatch(setStepAction(2));
  };

  return (
    <>
      <h3>Módulo de Productos</h3>
      <p>
        Explora nuestro menú diverso y delicioso, diseñado para satisfacer todos
        los gustos.
      </p>
      <div className="row card-container">
        {productos.map((producto) => (
          <div className="card-wrapper" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <button
              className="btn btn-block btn-primary"
              onClick={() => handleAddProducto(producto)}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      <div className="row pt-3">
        <div className="col-12 justify-content-center gap-3">
          <button className="btn btn-success" onClick={handleSetProducto}>
            Siguiente
          </button>
          <button className="btn btn-default" onClick={handleRegresar}>
            Anterior
          </button>
        </div>
      </div>
    </>
  );
};

export default SeleccionarProductosComponent;
