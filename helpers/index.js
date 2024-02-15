export const fechaActual = (fecha) => { 
    const nowDate = new Date(fecha);

    const opciones = {
        year: 'numeric',
        month: 'long', 
        day: '2-digit'
    }

    return nowDate.toLocaleDateString('es-ES', opciones);
};