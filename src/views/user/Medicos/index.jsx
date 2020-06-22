import React, { useState, useEffect } from 'react';

import { TablePagination } from '@material-ui/core'

import MedicosTabla from './components/MedicosTabla'
import MedicosFiltros from './components/MedicoFiltros'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { traerMedicosAccion } from '../../../redux/medicosDuck'

const Medicos = () => {

    const state = useSelector(state => state.medicos.listaInfo)

    const dispatch = useDispatch()

    const [filtro, setFiltro] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        tipoMatricula: 'NACIONAL',
        estado: 'TODOS',
        telefono: ''
    })

    const [rowPerPage, setRowPerPage] = useState(10)
    
    const [pageNumber, setPageNumber] = useState(0)

    const handleChangePage = (event, page) => {
        console.log(event)
        console.log(page)
        setPageNumber(page)
    }

    const handleRowPerPageChange = (event) => {
        setRowPerPage(event.target.value)
    }

    const handleInputChange = (event) => {
        setFiltro({
            ...filtro,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        dispatch( traerMedicosAccion(pageNumber, rowPerPage, filtro) )
    }, [filtro, pageNumber, rowPerPage])

    return ( 
        <div className="container-fluid">
            <h1 className="text-center h3">APROBACIÓN DE MEDICOS</h1>
            <div>
                <MedicosFiltros handle={handleInputChange}/>
            </div>
            <div className="">
                <div className="d-flex justify-content-end">
                    <TablePagination 
                    labelRowsPerPage={'Filas por página'}
                    page={0}
                    labelDisplayedRows={({from, to, count}) => 
                        from + '-' + to + ' de ' + count
                    }
                    page={pageNumber}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleRowPerPageChange}
                    rowsPerPage={rowPerPage}
                    count={state.totalElements || 0}
                    rowsPerPageOptions={[10, 25, 50, 100]}/>
                </div>
                <MedicosTabla />
            </div>
        </div>
    );
}
 
export default Medicos;