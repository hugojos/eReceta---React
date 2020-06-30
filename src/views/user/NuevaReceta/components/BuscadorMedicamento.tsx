import React, { useEffect, useState } from 'react'

import { InputAdornment, Tooltip, List, ListItem, TextField } from '@material-ui/core'
import { ReportProblemOutlined } from '@material-ui/icons'

import { agregarMedicamentoAccion } from '../../../../redux/recetaDuck'
import { vaciarAcumuladorAccion } from '../../../../redux/nuevaRecetaDuck'
import { useSelector, useDispatch } from 'react-redux'

const BuscadorMedicamento = ({handleBuscador, error, className, buscador}: {handleBuscador: any, error: string, className: string, buscador: string}) => {

    const dispatch = useDispatch()

    const state = useSelector((state: any) => state.nuevaReceta)
    const [lista, setLista] = useState([])

    const agregarMedicamento = (medicamento: any) => {
        medicamento.cantidad = 1;
        medicamento.posologia = '';
        dispatch( agregarMedicamentoAccion(medicamento) )
        setLista([])
        handleBuscador('')
    }

    useEffect(() => {
        let aux = state.acumuladorAjax.find((ajax: any) => JSON.parse(ajax.config.data).nombre === buscador)
        if(aux) {
            setLista(aux.data)
        } else {
            setLista([])
            dispatch( vaciarAcumuladorAccion() )
        }
    }, [state.listaMedicamentos])

    return (
        <div className={className}>
            <span className="font-weight-bold">Buscador</span>
            <TextField
            InputProps={{
                endAdornment: 
                error &&
                <InputAdornment
                position="end">
                    <Tooltip placement="top-end" title={error}>
                        <ReportProblemOutlined className="text-danger"/>
                    </Tooltip>
                </InputAdornment>
            }}
            value={buscador}
            error={!!error}
            onChange={ (event) => {
                event.target.scrollIntoView(true)
                handleBuscador(event.target.value)
            } }
            type="text"
            fullWidth={true}
            variant="outlined"
            placeholder="¿Qué medicamento esta buscando?"
            size="small"/>
            {   buscador.length < 2 &&
                <span className="text-muted small">Se buscará a partir del segundo caracter ingresado</span>
            }
            <List className="pt-0">
                {
                    lista.map((medicamento: any, i: number) => (
                        <ListItem 
                        key={i} 
                        button 
                        className={"border-bottom flex-column align-items-start py-1 " + (medicamento.lResaltarMedicamento ? "bg-resaltado" : '' )}
                        onClick={ () => agregarMedicamento(medicamento) }>
                            <p className="m-0 font-weight-bolder small  ">{medicamento.nombre} {medicamento.descuento > 0 && <span>- {medicamento.descuento}% dto</span> } </p>
                            <span className="small">{medicamento.formula}</span>
                        </ListItem>
                    ))
                }
            </List>
            <ul className="list-unstyled mb-1 mb-md-3 bg-light">
                
            </ul>
        </div>
    )
}

export default BuscadorMedicamento