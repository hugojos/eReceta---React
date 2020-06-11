import React from 'react'
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, IconButton } from '@material-ui/core'
import { DeleteForever, Add, Remove } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'

import DialogPosologia from './DialogPosologia'

import { sumarCantidadAccion, sacarMedicamentoAccion } from '../../../../redux/recetaDuck'

const TablaMedicamento = ({className}) => {

    const dispatch = useDispatch()

    const medicamentoDtos = useSelector(state => state.receta.medicamentoDtos)

    const [open, setOpen] = React.useState(false)
    const [index, setIndex] = React.useState(0)

    const togglePosologia = (index) => {
        setOpen(!open)
        setIndex(index)
    }

    return (
        <div className={className}>
            <DialogPosologia togglePosologia={togglePosologia} open={open} index={index} />
            <h2 className="text-center h6 font-weight-bold">Medicamentos seleccionados ({medicamentoDtos.length})</h2>
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
                                <TableCell className="px-1 small" align="left">
                                    <div className="p-1 d-flex flex-column justify-content-center" >
                                        <div className="d-flex align-items-center">
                                            {medicamento.nombre}
                                        </div>

                                        <div 
                                            onClick={ () => togglePosologia(index) }
                                            className="material-bg-primary px-1 py-1 rounded pointer d-flex align-items-center justify-content-center text-light font-weight-bolder col-6">
                                            <span title="Escribir posología">POSOLOGÍA</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="px-0">
                                    <div className="p-1 d-flex flex-column justify-content-center">
                                        <div className="d-flex justify-content-between mb-1">
                                            <IconButton
                                            onClick={ () => dispatch( sumarCantidadAccion(index, -1) )}
                                            size="small">
                                                <Remove color="primary"/>
                                            </IconButton>
                                            <div className="d-flex align-items-center">{medicamento.cantidad}</div>
                                            <IconButton 
                                            onClick={ () => dispatch( sumarCantidadAccion(index, 1) )}
                                            size="small">
                                                <Add color="primary"/>
                                            </IconButton>
                                        </div>
                                    </div>                       
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default TablaMedicamento;