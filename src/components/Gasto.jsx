import { fechaActual } from "../../helpers"; 

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";

import Ahorro from "../img/icono_ahorro.svg";
import Casa from "../img/icono_casa.svg";
import Comida from "../img/icono_comida.svg";
import Gastos from "../img/icono_gastos.svg";
import Ocio from "../img/icono_ocio.svg";
import Salud from "../img/icono_salud.svg";
import Suscripciones from "../img/icono_suscripciones.svg";

const Gasto = ({ gasto, formatCantidad, setEditarGasto, eliminarGasto }) => { 
    const { categoria, nombre, cantidad, id, fecha  } = gasto;

    const imagenes = {
            ahorro: Ahorro,
            casa: Casa,
            comida: Comida,
            gastos: Gastos,
            ocio: Ocio,
            salud: Salud,
            suscripciones: Suscripciones
};

    const leadingActions = () => (

        <LeadingActions>
            <SwipeAction onClick={() => setEditarGasto(gasto)}>
                    Editar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (

        <TrailingActions>
            <SwipeAction 
            onClick={() => eliminarGasto(id)}
            destructive={ true }>
                    Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    

    return (
        <SwipeableList>
            <SwipeableListItem 
            leadingActions={ leadingActions() }
            trailingActions={ trailingActions() }
            >
        <div className="gasto sombra">
            <div className="contenido-gasto">
                {/* aca ira la imagen */}
                <img src={ imagenes[categoria] } alt="" />
                <div className="descripcion-gasto">
                    <p className="categoria">{ categoria }</p>
                    <p className="nombre-gasto">{ nombre }</p>
                    <p className="fecha-gasto">Agregado el: {''} <span>{ fechaActual(fecha) }</span></p>
                </div>
            </div>
            <p className="cantidad-gasto">{ formatCantidad(cantidad) }</p>
        </div>
            </SwipeableListItem>
        </SwipeableList>
    )
};

export default Gasto;