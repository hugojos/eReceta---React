import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, IconButton } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'

const MedicosTabla = ({className, medicos}) => {

    const state = useSelector(state => state.medicos)

    return (
        <div className={className}>
            <TableContainer className="border">
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell className="pl-2 pr-0">DNI</TableCell>
                            <TableCell className="pl-2 pr-0">Nombre</TableCell>
                            <TableCell className="pl-2 pr-0">Apellido</TableCell>
                            <TableCell className="pl-2 pr-0">Email</TableCell>
                            <TableCell className="pl-2 pr-0">Tipo Matricula</TableCell>
                            <TableCell className="pl-2 pr-0">Matricula</TableCell>
                            <TableCell className="pl-2 pr-0">Telefono</TableCell>
                            <TableCell className="pl-2 pr-0">Provincia</TableCell>
                            <TableCell className="pl-2 pr-0">Estado</TableCell>
                            <TableCell className="pl-2 pr-0">Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {   
                            state.listaMedicos.map(medico => (
                                <TableRow key={medico.idMedico}>
                                    <TableCell className="pl-2 pr-0">{medico.dni}</TableCell>
                                    <TableCell className="pl-2 pr-0">{medico.nombre}</TableCell>
                                    <TableCell className="pl-2 pr-0">{medico.apellido}</TableCell>
                                    <TableCell className="pl-2 pr-0">{medico.email}</TableCell>
                                    <TableCell className="pl-2 pr-0">{medico.tipoMatricula}</TableCell>
                                    <TableCell className="pl-2 pr-0">{medico.matricula}</TableCell>
                                    <TableCell className="pl-2 pr-0">{medico.telefono}</TableCell>
                                    <TableCell className="pl-2 pr-0">{medico.provincia}</TableCell>
                                    <TableCell className="pl-2 pr-0">{medico.usaApp ? 'Habilitado' : 'Inhabilitado'}</TableCell>
                                    <TableCell className="pl-2 pr-0">
                                        <IconButton>
                                            <Edit color="primary" />
                                        </IconButton>
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
export default MedicosTabla;