import React from 'react'
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, IconButton } from '@material-ui/core'
import { DeleteForever, Add, Remove } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'

import DialogPosologia from '../components/DialogPosologia'

import { sumarCantidadAccion, sacarMedicamentoAccion } from '../redux/recetaDuck'

const TablaMedicamento = () => {

    const dispatch = useDispatch()

    const medicamentoDtos = useSelector(state => state.receta.medicamentoDtos)

    const [open, setOpen] = React.useState(false)
    const [index, setIndex] = React.useState(0)

    const togglePosologia = (index) => {
        setOpen(!open)
        setIndex(index)
    }

    return (
        <div className="col-12 m-auto">
            <h2 className="text-muted text-center h6 font-weight-bold">Medicamentos medicamentoDtos ({medicamentoDtos.length})</h2>
            <TableContainer className="border">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className="pl-2 pr-0"></TableCell>
                            <TableCell className="px-1" align="left">Nombre</TableCell>
                            <TableCell align="left">Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            medicamentoDtos.map((medicamento, index) => (
                                <TableRow key={index}>
                                    <TableCell className="pl-2 pr-0">
                                        <IconButton
                                        onClick={ () => dispatch( sacarMedicamentoAccion(index) ) }
                                        size="small">
                                            <DeleteForever color="error"/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className="px-1 small font-weight-bold" align="left">{medicamento.nombre}</TableCell>
                                    <TableCell align="center" className="px-0">
                                        <div className="d-flex justify-content-center">
                                            <div className="d-flex justify-content-center w-75">
                                                <div className="bg-purpura p-1 rounded pointer d-flex align-items-center" style={{lineHeight: '0.5'}}>
                                                    <IconButton
                                                    onClick={ () => dispatch( sumarCantidadAccion(index, -1) )}
                                                    size="small">
                                                        <Remove color="primary"/>
                                                    </IconButton>
                                                </div>
                                                <div className="d-flex align-items-center">{medicamento.cantidad}</div>
                                                <div className="bg-purpura p-1 rounded pointer d-flex align-items-center" style={{lineHeight: '0.5'}}>
                                                    <IconButton 
                                                    onClick={ () => dispatch( sumarCantidadAccion(index, 1) )}
                                                    size="small">
                                                        <Add color="primary"/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center w-25">
                                                <div 
                                                onClick={ () => togglePosologia(index) }
                                                className="material-bg-primary px-1 rounded pointer d-flex align-items-center justify-content-center text-light font-weight-bolder">
                                                    <span title="Escribir posología">P</span>
                                                </div>
                                            </div>
                                        </div>                       
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogPosologia togglePosologia={togglePosologia} open={open} index={index} />
        </div>
    )
}
export default TablaMedicamento;