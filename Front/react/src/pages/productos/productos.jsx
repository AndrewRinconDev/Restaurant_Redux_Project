import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as productosService from '../../services/productos/productosService';
import "./productos.css";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    handleGetProductos();
  }, []);

  const handleGetProductos = async () => {
    try {
      const result = await productosService.GetProductos();
      setProductos(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProductos = async (id) => {
    try {
      await productosService.DeleteProductos(id);
      handleGetProductos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <h3>Lista de Productos</h3>
        <p>
          Inicia sesión para una experiencia personalizada y administra tus
          productos.
        </p>
        <div className="col-md-2">
          <Link className="btn btn-success col-md-12" to={"/addProductos/"}>
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
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 &&
                productos.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>
                      <img className="producto-image" src={data.imagen} alt={`${data.nombre}-image`} />
                    </td>
                    <td>{data.nombre}</td>
                    <td>${data.precio}</td>
                    <td>{data.categoria.nombre}</td>
                    <td>
                      <Link
                        className="btn btn-warning"
                        to={"/productos/" + data.id}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProductos(data.id)}
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

export default ProductosPage;
