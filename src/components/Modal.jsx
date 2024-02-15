import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import Cerrar from "../img/cerrar.svg";


const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, editarGasto, setEditarGasto }) => { 

    const [ nombre, setNombre ] = useState('');
    const [ cantidad, setCantidad ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ mensaje, setMensaje ] = useState('');
    const [ id, setId ] = useState('');
    
    useEffect(() => {
        if(Object.keys(editarGasto).length > 0) {
            setNombre(editarGasto.nombre)
            setCantidad(editarGasto.cantidad)
            setCategoria(editarGasto.categoria)
            setId(editarGasto.id)
            setFecha(editarGasto.fecha)
          };
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false);
        setEditarGasto({});

        setTimeout(() => {
            setModal(false);

        }, 500);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, cantidad, categoria ].includes('')) {

            setMensaje('Todos los campos son obligatorios');
            return;

        } else {
            // limpia el mensaje de error
            setMensaje('');
            //guarda los datos en gasto 
            guardarGasto({ nombre, cantidad, categoria, id, fecha });
            //limpia los campos del formulario
            setNombre('');
            setCantidad('');
            setCategoria('');
            // cierra el formulario
            ocultarModal();
        }


    };
 
    return (
        <div className="modal">
            <div className="cerrar-modal">
            <img 
                src={ Cerrar } 
                alt=""
                onClick={ ocultarModal }/>
            </div>
            
            <form 
                action="" 
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={ handleSubmit }
                >
                <legend>{ editarGasto.nombre ? 'Editar Gasto' : 'Nuevo Gasto'} </legend>

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>    
                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        value={ nombre } 
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>    
                    <input 
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto"
                        value={ cantidad }
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>

                    <select 
                        name="" 
                        id="categoria"
                        value={ categoria } 
                        onChange={e => setCategoria(e.target.value)} 
                        >
                        <option hidden value="">-- Seleccione --</option>    
                        <option value="ahorro">Ahorro</option>    
                        <option value="comida">Comida</option>    
                        <option value="casa">Casa</option>    
                        <option value="gastos">Gastos Varios</option>    
                        <option value="ocio">Ocio</option>    
                        <option value="salud">Salud</option>    
                        <option value="suscripciones">Suscripciones</option>    
                    </select>  
                </div>

                <input 
                    type="submit" 
                    value={ editarGasto.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />

                { mensaje && <Mensaje tipo='error'>{ mensaje }</Mensaje>}
            </form>
        </div>
    );
};

export default Modal;