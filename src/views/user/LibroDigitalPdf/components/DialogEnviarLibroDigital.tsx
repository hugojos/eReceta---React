import React, {useEffect} from 'react';

import { TextField, Button, Dialog, DialogTitle, Divider, DialogActions, DialogContent, CircularProgress} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { enviarEmailAccion, resetearAccion } from '../../../../redux/enviarRecetaEmailDuck'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const DialogEnviarEmail = ({open, toggle}: {open: boolean, toggle: any}) => {

    const history = useHistory()

    const dispatch = useDispatch()

    let libroDigitalPdf = useSelector((state:any) => state.libroDigital.archivo)
    const state = useSelector((state:any) => state.enviarRecetaEmail)
    
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState('')

    useEffect(() => {
        if(state.okResponse.length > 0) {
            setEmail('')
        }
    }, [state])

    const validate = () => {
        let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let newError = ''
        if(!isEmail.test(email)) newError = 'El email es invalido'
        if(!email.length) newError = 'El campo no debe estar vacio'
        setError(newError)
        if(!newError.length) {
            libroDigitalPdf.email = email
            dispatch( enviarEmailAccion(libroDigitalPdf) )
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
                        <span className="font-weight-bold">Ingrese email</span>
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
                    onClick={ () => history.push('/libro-digital') }
                    variant="contained"
                    color="primary"
                    size="small">
                        Generar nuevo libro digital
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
                            Enviar libro digital
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