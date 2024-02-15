import Gasto from "./Gasto";

const ListadoGastos = ({ gastos, formatCantidad, setEditarGasto, eliminarGasto, filtro, gastosFiltrados }) => { 
    return (
        <div className="listado-gastos contenedor">

            { filtro ? (
                <>
                <h2>{ gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria' }</h2>
                    {gastosFiltrados.map(gasto => (
                        <Gasto 
                            key={ gasto.id }
                            gasto={ gasto }
                            formatCantidad={ formatCantidad }
                            setEditarGasto={ setEditarGasto }
                            eliminarGasto={ eliminarGasto }
                        />
                    ))}
                </>
                ) : 
                <>
                <h2>{ gastos.length ? 'Gastos' : 'Aun no hay gastos' }</h2>
                    {gastos.map(gasto => (
                        <Gasto 
                            key={ gasto.id }
                            gasto={ gasto }
                            formatCantidad={ formatCantidad }
                            setEditarGasto={ setEditarGasto }
                            eliminarGasto={ eliminarGasto }
                        />
                    ))}
                </>
            }
        </div>
    )
};

export default ListadoGastos;