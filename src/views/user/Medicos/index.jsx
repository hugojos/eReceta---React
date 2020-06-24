import React, { useState, useEffect } from 'react';
import './medicos.css';

import { TablePagination, Paper, Button } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';

import MedicosTabla from './components/MedicosTabla'
import MedicosFiltros from './components/MedicoFiltros'

import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { traerMedicosAccion } from '../../../redux/medicosDuck'
import { LensTwoTone } from '@material-ui/icons';

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

    function toggleFilter() {
        let filtro = document.getElementById("filtro")
        filtro.classList.toggle('is-show')

        let botonFiltrar = document.getElementById("botonFiltrar")
        botonFiltrar.classList.toggle('activo')
       }

    return ( 
        <div className="container-fluid">
            <h1 className="text-center h4 mb-4">Aprobación de medicos</h1>
            <Button id="botonFiltrar" onClick={toggleFilter} className="mb-3" startIcon={<FilterListIcon />} variant="contained">Filtrar</Button>
            <Paper id="filtro" className="mb-3 py-3 px-4" elevation={4} style={{backgroundColor:'#215896'}}>
                    <MedicosFiltros handle={handleInputChange}/>
            </Paper>
            
            <div className="" >
                <div className="d-flex" >
                    <h2 className="h5 col-3 pt-3">Médicos</h2>
                    <div className="col-9 d-flex justify-content-end">
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
                </div>
                <MedicosTabla />
            </div>
        </div>
    );
}
 
export default Medicos;