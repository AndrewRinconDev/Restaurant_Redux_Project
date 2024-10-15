import React, { useEffect, useState } from 'react';
import * as categoriasService from '../../../services/categorias/categoriasService'
import { useNavigate, useParams } from 'react-router-dom';

const VerCategoriasPage = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [categoriaName, setCategoriaName] = useState("");
    const [errorCategoria, setErrorCategoria] = useState(null);

    useEffect(()=>{
        if (id) {
            getCategoriaById();
        }
    },[])
    
    const getCategoriaById = async () => {
        try {
            const result = await categoriasService.GetCategoriasById(id)
            setCategoriaName(result.nombre);
        } catch (error) {
            setErrorCategoria("No se pudo obtener la categoria");
            console.log(error)
        }
    }
    
    const saveCategoria = async () => {
        try {
            if (categoriaName === "") {
                setErrorCategoria("Debes ingresar un nombre");
                return;
            }
            const bodyRequest = { nombre: categoriaName};
            if (id) {
                await categoriasService.PutCategorias(id, bodyRequest);
                navigate("/categorias")
                return;
            }
            await categoriasService.PostCategorias(bodyRequest)
            navigate("/categorias")
        } catch (error) {
            setErrorCategoria("No se pudo guardar la categoria");
            console.log(error)
        }
    }
    
    return(     
        <div className='container'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="mb-3">
                        <label>Nombre</label>
                        <input type="text" className='form-control' name="nombre" value={categoriaName} onChange={(e) => setCategoriaName(e.target.value)}/>
                        <button className="btn btn-success" onClick={saveCategoria}>Guardar</button>
                        <p className="text-danger">{errorCategoria}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerCategoriasPage;