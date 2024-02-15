import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; 
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ presupuesto, setPresupuesto, formatCantidad, gastos, setGastos, setIsValidPresupuesto }) => {
    const [ porcentaje, setPorcentaje ] = useState(0)
    const [ disponible, setDisponible ] = useState(0);
    const [ gastado, setGastado ] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);

        const totalDisponible = presupuesto - totalGastado;

        // calculo 
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setGastado(totalGastado);
        setDisponible(totalDisponible);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000)
    }, [gastos])

    const handleResetApp = () => {
        const resultado = confirm('¿Desea limpiar los gastos?');

        if(resultado) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        };
    }; 

    return(
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    text={`${porcentaje}% Gastado`}
                    value={ porcentaje }
                    styles={ buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    }) }/>
            </div>

            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}>
                    Limpiar Gastos
                </button>
                <p>
                    <span>Presupuesto: </span>{ formatCantidad(presupuesto) }
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{ formatCantidad(disponible) }
                </p>

                <p>
                    <span>Gastado: </span>{ formatCantidad(gastado) }
                </p>
            </div>
        </div>
    );
};

export default ControlPresupuesto; 