import React, { useCallback, useEffect, useState } from "react";
import * as categoriasService from "../../services/categorias/categoriasService";
import {
  setCategoriaAction,
  setStepAction,
} from "../../redux/slices/pedidoSlice";
import { useDispatch, useSelector } from "react-redux";

const SeleccionarCategoriaComponent = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.pedidoStore);
  const [categorias, setCategorias] = useState(null);
  const [categoriaId, setCategoriaId] = useState(store.categoriaId);
  const [categoriaError, setCategoriaError] = useState("");

  useEffect(() => {
    getCategorias();
  }, []);

  const handleSetCategoria = useCallback(() => {
    if (!categoriaId) {
      setCategoriaError("Selecciona una categoria");
      return;
    }
    dispatch(setCategoriaAction(categoriaId));
    dispatch(setStepAction(3));
  }, [categoriaId]);

  const handleRegresar = () => {
    dispatch(setStepAction(1));
  };

  const getCategorias = async () => {
    try {
      const resultCategorias = await categoriasService.GetCategorias();
      setCategorias(resultCategorias);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3>Seleccionar Categoria</h3>
      <p>Selecciona una categoria para realizar la compra.</p>
      <div className="row">
        <ul className="d-flex justify-content-between">
          {categorias &&
            categorias.map((categoria) => (
              <li key={categoria.id} style={{ listStyle: "none" }}>
                <button
                  className="btn btn-primary"
                  disabled={categoria.id === categoriaId}
                  onClick={() => setCategoriaId(categoria.id)}
                >
                  {categoria.nombre}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="row pt-3">
        <p className="text-danger">{categoriaError}</p>
        <div className="col-12 justify-content-center gap-3">
          <button className="btn btn-success" onClick={handleSetCategoria}>
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

export default SeleccionarCategoriaComponent;
