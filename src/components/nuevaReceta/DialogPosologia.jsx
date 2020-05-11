import React, {useEffect} from 'react';

import { TextField, Button, Dialog, DialogTitle, Divider, DialogActions, DialogContent } from '@material-ui/core'
import { agregarPosologiaAccion } from '../../redux/recetaDuck'
import { useDispatch, useSelector } from 'react-redux'

const DialogPosologia = (props) => {

    const dispatch = useDispatch()

    const medicamentoDtos = useSelector(state => state.receta.medicamentoDtos)
    
    const [posologia, setPosologia] = React.useState('')
    const [index, setIndex] = React.useState(props.index)

    const guardar = () => {
        dispatch( agregarPosologiaAccion(index, posologia) )
        setPosologia('')
        props.togglePosologia(index)
    }

    const cancelar = () => {
        setPosologia('')
        props.togglePosologia(index)
    }

    useEffect(() => {
        setIndex(props.index)
        if(medicamentoDtos[props.index]) {
            setPosologia(medicamentoDtos[props.index].posologia);
            console.log(medicamentoDtos)
        }
    }, [props])

    return (
        <Dialog 
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={props.open} className="m-0">
            <DialogTitle className="px-2 pb-0">
                <p className="m-0 small">Escriba la posología del medicamento</p>
                <span className="small text-muted">{medicamentoDtos[index] && medicamentoDtos[index].nombre }</span>
            </DialogTitle>
            <Divider />
            <DialogContent className="px-2 py-0">
                <TextField
                    rows={4}
                    autoFocus
                    margin="dense"
                    id="name"
                    multiline
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Maximo 500 caracteres"
                    value={posologia}
                    onInput={ (event) =>setPosologia(event.target.value.substring(0,500))}
                    helperText={ 500-posologia.length +' caracteres restantes'}
                />
            </DialogContent>
            <Divider />
            <DialogActions className="d-flex justify-content-between">
                <Button
                onClick={ () => cancelar() }
                color="primary">
                    Cancelar
                </Button>
                <Button 
                onClick={ () => guardar() }
                variant="contained"
                color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
    

}   

export default DialogPosologia