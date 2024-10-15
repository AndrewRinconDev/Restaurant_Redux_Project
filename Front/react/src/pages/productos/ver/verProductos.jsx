import React, { useEffect, useState } from "react";
import * as productosService from "../../../services/productos/productosService";
import * as categoriaService from "../../../services/categorias/categoriasService";
import { Link, useNavigate, useParams } from "react-router-dom";

const VerProductosPage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    categoriaId: "",
    descripcion: "",
  });
  const [errorProducto, setErrorProducto] = useState(null);
  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    if (id) {
      getProductoById();
    }
    getCategorias();
  }, []);

  const getProductoById = async () => {
    try {
      const result = await productosService.GetProductosById(id);
      setProducto(result);
    } catch (error) {
      setErrorProducto("No se pudo obtener el producto");
      console.log(error);
    }
  };
  const getCategorias = async () => {
    try {
      const resultCategorias = await categoriaService.GetCategorias();
      setCategorias(resultCategorias);
    } catch (error) {
      setErrorProducto("No se pudo obtener las categorias");
      console.log(error);
    }
  };

  const saveProducto = async () => {
    try {
      if (
        producto.nombre === "" ||
        producto.precio <= 0 ||
        producto.imagen === "" ||
        producto.categoriaId === "" ||
        producto.descripcion === ""
      ) {
        setErrorProducto("Todos los campos son requeridos");
        return;
      }
      const bodyRequest = { ...producto, id: undefined };
      if (id) {
        await productosService.PutProductos(id, bodyRequest);
        navigate("/productos");
        return;
      }
      await productosService.PostProductos(bodyRequest);
      navigate("/productos");
    } catch (error) {
      setErrorProducto("No se pudo guardar la producto");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="form-outline mb-4">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={producto.nombre}
              onChange={(e) =>
                setProducto((prev) => ({ ...prev, nombre: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Imagen</label>
            <input
              type="text"
              name="imagen"
              className="form-control"
              value={producto.imagen}
              onChange={(e) =>
                setProducto((prev) => ({ ...prev, imagen: e.target.value }))
              }
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              name="descripcion"
              className="form-control"
              value={producto.descripcion}
              onChange={(e) =>
                setProducto((prev) => ({
                  ...prev,
                  descripcion: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-outline mb-4">
            <label className="form-label">Precio</label>
            <input
              type="number"
              name="precio"
              className="form-control"
              value={producto.precio}
              onChange={(e) =>
                setProducto((prev) => ({ ...prev, precio: e.target.value }))
              }
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label">Categoria</label>
            <select
              className="form-control"
              name="categoriaId"
              id="categoriaId"
              value={producto.categoriaId}
              onChange={(e) =>
                setProducto((prev) => ({
                  ...prev,
                  categoriaId: e.target.value,
                }))
              }
            >
              <option value="">-- Selecciona una Categoria --</option>
              {categorias &&
                categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-outline pt-4 justify-content-end gap-4 d-flex">
            <button className="btn btn-success" onClick={saveProducto}>
              Guardar
            </button>
            <Link className="btn btn-default" to="/productos">
              Regresar
            </Link>
          </div>
        </div>
        <p className="text-danger">{errorProducto}</p>
      </div>
    </div>
  );
};

export default VerProductosPage;
