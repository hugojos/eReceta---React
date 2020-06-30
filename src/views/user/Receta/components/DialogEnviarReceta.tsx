import React, { useState, useEffect } from 'react';

import { TextField, Button, Dialog, DialogTitle, Divider, DialogActions, DialogContent, CircularProgress} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { enviarEmailAccion, resetearAccion, IEnviarRecetaEmail } from '../../../../redux/enviarRecetaEmailDuck'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { esEmail } from '@/utils/validaciones'
import IReceta from '@/models/IReceta';

const DialogEnviarEmail = ({open, toggle}: {open: boolean, toggle: any}) => {

    const history = useHistory()

    const dispatch = useDispatch()

    const receta: IReceta = useSelector((state: any) => state.receta.receta)
    const state: IEnviarRecetaEmail = useSelector((state: any) => state.enviarRecetaEmail)
    
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if(state.okResponse.length > 0) {
            setEmail('')
        }
    }, [state])

    const validate = () => {
        let newError = ''
        if(!esEmail(email)) newError = 'El email es invalido'
        if(!email.length) newError = 'El campo no debe estar vacio'
        setError(newError)
        if(!newError.length) {
            receta.email = email
            dispatch( enviarEmailAccion(receta) )
        }
    }

    return (
        <Dialog 
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={open}
        className="m-0">
            <DialogTitle className="px-2">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0 small">Enviar por correo electrónico</p>
                    <Button
                    onClick={ () => {
                        toggle()
                        dispatch( resetearAccion() )
                    }}
                    variant="contained"
                    color="primary"
                    size="small">
                        Cerrar
                    </Button>
                </div>
            </DialogTitle>
            <Divider />
            <DialogContent className="px-2">
                {   (state.errorResponse || state.okResponse) ?
                    <Alert
                    severity={state.errorResponse ? 'error' : 'success'}>
                        {state.errorResponse || state.okResponse}
                    </Alert> 
                    :
                    <div className="py-4">
                        <span className="font-weight-bold">Ingrese email del paciente</span>
                        <TextField
                        helperText={error}
                        error={!!error}
                        autoFocus
                        margin="dense"
                        id="name"
                        type="email"
                        fullWidth
                        variant="outlined"
                        placeholder="example@email.com"
                        value={email}
                        onInput={ (event: any) => {
                            setEmail(event.target.value)
                            setError('')    
                        }}/>
                    </div>
                }
            </DialogContent>
            <Divider />
            <DialogActions className="d-flex justify-content-between">
                {   state.okResponse ?
                    <Button
                    onClick={ () => history.push('/nueva-receta') }
                    variant="contained"
                    color="primary"
                    size="small">
                        Generar nueva receta
                    </Button>
                    :
                    <Button
                    onClick={ toggle }
                    color="primary">
                        Cancelar
                    </Button>
                }
                {   state.okResponse ?
                    <Button 
                    onClick={ () => dispatch( resetearAccion() ) }
                    variant="contained"
                    size="small"
                    color="primary">
                        Enviar a otro Email
                    </Button>
                    :
                    !state.errorResponse ? 
                        <Button 
                        onClick={ validate }
                        variant="contained"
                        color="primary"
                        startIcon={
                            state.loading &&
                            <CircularProgress size={20} color="inherit"/>
                        }>
                            Enviar receta
                        </Button>
                        :
                        <Button 
                        onClick={ () => dispatch( resetearAccion() ) }
                        variant="contained"
                        color="primary"
                        startIcon={
                            state.loading &&
                            <CircularProgress size={20} color="inherit"/>
                        }>
                            Reintentar
                        </Button>
                }
            </DialogActions>
        </Dialog>
    )
    

}   

export default DialogEnviarEmail