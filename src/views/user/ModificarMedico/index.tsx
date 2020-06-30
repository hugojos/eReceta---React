import React from 'react';

import { TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Button } from '@material-ui/core'

const ModificarMedico = () => {
    return (
        <div className="container h-100">
            <div className="row justify-content-center">
                <div className="col-2 pr-0">
                    <TableContainer className="border">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">INFORMACIÓN</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">DNI</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Nombre y apellido</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Tipo Matricula</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Provincia</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Matricula</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Email</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Telefono</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Estado</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="col-10 pl-0">
                    <TableContainer className="border">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">GIVE</TableCell>
                                    <TableCell className="pl-2 pr-0">eReceta</TableCell>
                                    <TableCell className="pl-2 pr-0">SISA</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Hugo Jose</TableCell>
                                    <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                                    <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Hugo Jose</TableCell>
                                    <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                                    <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Hugo Jose</TableCell>
                                    <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                                    <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Hugo Jose</TableCell>
                                    <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                                    <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Hugo Jose</TableCell>
                                    <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                                    <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Hugo Jose</TableCell>
                                    <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                                    <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0"></TableCell>
                                    <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                                    <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">Hugo Jose</TableCell>
                                    <TableCell className="pl-2 pr-0">Sajama Calizaya</TableCell>
                                    <TableCell className="pl-2 pr-0">NACIONAL</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-2 pr-0">
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        >
                                            GUARDAR
                                        </Button>
                                    </TableCell>
                                    <TableCell className="pl-2 pr-0">
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        >
                                            GUARDAR
                                        </Button>
                                    </TableCell>
                                    <TableCell className="pl-2 pr-0"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
     );
}
 
export default ModificarMedico;