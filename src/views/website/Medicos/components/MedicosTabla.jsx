import React from 'react'
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, IconButton } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'

const TablaMedicamento = ({className}) => {


    return (
        <div className={className}>
            <TableContainer className="border">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className="pl-2 pr-0">DNI</TableCell>
                            <TableCell className="pl-2 pr-0">Nombre</TableCell>
                            <TableCell className="pl-2 pr-0">Apellido</TableCell>
                            <TableCell className="pl-2 pr-0">Tipo Matricula</TableCell>
                            <TableCell className="pl-2 pr-0">Provincia</TableCell>
                            <TableCell className="pl-2 pr-0">Matricula</TableCell>
                            <TableCell className="pl-2 pr-0">Email</TableCell>
                            <TableCell className="pl-2 pr-0">Estado</TableCell>
                            <TableCell className="pl-2 pr-0">Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className="pl-2 pr-0">42656549</TableCell>
                            <TableCell className="pl-2 pr-0">Hugo Jose</TableCell>
                            <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                            <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                            <TableCell className="pl-2 pr-0">-</TableCell>
                            <TableCell className="pl-2 pr-0">130054</TableCell>
                            <TableCell className="pl-2 pr-0">hugosajama07@gmail.com</TableCell>
                            <TableCell className="pl-2 pr-0">Inhabilitado</TableCell>
                            <TableCell className="pl-2 pr-0">
                                <IconButton>
                                    <Edit color="primary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default TablaMedicamento;