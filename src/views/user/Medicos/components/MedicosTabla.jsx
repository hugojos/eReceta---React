import React from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    IconButton,
    Paper,
    withStyles
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const MedicosTabla = ({ className, medicos }) => {
    const state = useSelector((state) => state.medicos);

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: '#0C88C4',
            color: theme.palette.common.white,
            height: 48
        },
        body: {
            fontSize: 14,
            padding: 0,
            borderWidth: 1,
            borderColor: '#ccc',
            borderStyle: 'solid',
            borderRightWidth: 0,
            height: 40
        }
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover
            }
        }
    }))(TableRow);

    const useStyles = makeStyles({
        table: {
            minWidth: 700
        }
    });

    const classes = useStyles();

    return (
        <div className={className}>
            <TableContainer component={Paper} className="mb-5" elevation={4}>
                <Table
                    className={classes.table}
                    aria-label="customized table"
                    size="small"
                >
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" className="px-2">
                                ACCIÓN
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                DNI
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                NOMBRE
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                APELLIDO
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                EMAIL
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                TIPO MATRÍCULA
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                MATRÍCULA
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                TELÉFONO
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                PROVINCIA
                            </StyledTableCell>
                            <StyledTableCell align="center" className="px-2">
                                ESTADO
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {state.listaMedicos.map((medico) => (
                            <StyledTableRow key={medico.idMedico}>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    className="px-0"
                                    align="center"
                                >
                                    <IconButton size="small">
                                        <Edit color="primary" />
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    className="pl-0 pr-2"
                                >
                                    {medico.dni}
                                </StyledTableCell>
                                <StyledTableCell className="pl-2 pr-0">
                                    {medico.nombre}
                                </StyledTableCell>
                                <StyledTableCell className="pl-2 pr-0">
                                    {medico.apellido}
                                </StyledTableCell>
                                <StyledTableCell className="pl-2 pr-0">
                                    {medico.email}
                                </StyledTableCell>
                                <StyledTableCell className="pl-2 pr-0">
                                    {medico.tipoMatricula}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    className="pl-0 pr-2"
                                >
                                    {medico.matricula}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    className="pl-0 pr-2"
                                >
                                    {medico.telefono}
                                </StyledTableCell>
                                <StyledTableCell className="pl-2 pr-0">
                                    {medico.provincia}
                                </StyledTableCell>
                                <StyledTableCell className="pl-2 pr-0">
                                    {medico.usaApp
                                        ? 'Habilitado'
                                        : 'Inhabilitado'}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default MedicosTabla;
