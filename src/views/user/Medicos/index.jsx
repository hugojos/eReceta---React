import React from 'react';

import MedicosTabla from './components/MedicosTabla'
import MedicosFiltros from './components/MedicoFiltros'

const Medicos = () => {
    return ( 
        <div className="container-fluid">
            <h1 className="text-center h3">APROBACIÓN DE MEDICOS</h1>
            <div>
                <MedicosFiltros />
            </div>
            <div className="mt-3">
                <MedicosTabla />
            </div>
        </div>
    );
}
 
export default Medicos;