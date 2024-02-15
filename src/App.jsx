import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import { nanoid } from "nanoid";


const App = () => { 

  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false);
  const [ filtro, setFiltro ] = useState('');
  const [ gastosFiltrados, setGastosFiltrados ] = useState([]);

  const [ gastos, setGastos ] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [ editarGasto, setEditarGasto ] = useState({});

  useEffect(() => { 
    
    if(Object.keys(editarGasto).length > 0) {
      
      setModal(true);
      

    setTimeout(() => {
      setAnimarModal(true);
    }, 200);

    };

  }, [ editarGasto ]);
// guardar datos en localStorage del presupuesto
  useEffect(() => { 
    localStorage.setItem('presupuesto', presupuesto ?? 0)

  }, [presupuesto])

  useEffect(() => {
    // const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    
    if(presupuesto > 0) {
      setIsValidPresupuesto(true);
    };

  }, []);

// guardar datos en localstorage de los gastos

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
    
  }, [gastos]);

  useEffect(() => { 
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    };

  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGasto({})
    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
    
  };

  const guardarGasto = (gasto) => { 
    if(gasto.id) { 
      //Actualizar 
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setEditarGasto({});

    } else { 
      // Nuevo gasto
      gasto.id = nanoid(10);
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    
  };

  const formatCantidad = (cantidad) => {
    return(
    cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    }));
};

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return(
    <div className={ modal ? 'fijar' : '' }>
      <Header 
      gastos={ gastos }
      setGastos={ setGastos }
      presupuesto={ presupuesto }
      setPresupuesto={ setPresupuesto }
      isValidPresupuesto={ isValidPresupuesto }
      setIsValidPresupuesto={ setIsValidPresupuesto }
      formatCantidad={ formatCantidad }
      />
      { isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={ filtro }
              setFiltro={ setFiltro }
            />

              <ListadoGastos 
                gastos={ gastos }
                formatCantidad={ formatCantidad }
                setEditarGasto={ setEditarGasto }
                eliminarGasto={ eliminarGasto }
                filtro={ filtro }
                gastosFiltrados={ gastosFiltrados }
              />
          </main>
          <div className="nuevo-gasto">
            <img 
                src={ IconoNuevoGasto } 
                alt="Icono para agregar gastos" 
                onClick={ handleNuevoGasto }
              />
          </div>
        </>
        )}

        { modal && 
            <Modal 
              setModal={ setModal }
              animarModal={ animarModal }
              setAnimarModal={ setAnimarModal }
              guardarGasto={ guardarGasto }
              editarGasto={ editarGasto }
              setEditarGasto={ setEditarGasto }
              />}


    </div>
  );
};

export default App;