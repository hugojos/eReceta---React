import React, { useEffect } from 'react'
import { Paper, TextField, Button, CircularProgress, InputAdornment, Tooltip } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { ReportProblemOutlined } from '@material-ui/icons' 
import { useSelector, useDispatch } from 'react-redux'
import { enviarLinkAccion, resetearAccion } from '@/redux/recoverPasswordDuck'
import { useHistory } from 'react-router-dom'

import { esEmail } from '@/utils/validaciones'

const RecoverPassword = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const enviado = useSelector(state => state.recoverPassword.enviado)
    const loading = useSelector(state => state.recoverPassword.loading)
    const errorResponse = useSelector(state => state.recoverPassword.errorResponse)

    const [email, setEmail] = React.useState('')
    const [errorEmail, setErrorEmail] = React.useState('')

    const validate = () => {
        setErrorEmail('')
        let newErrorEmail = ''
        
        if(!esEmail(email)) newErrorEmail = 'El email es invalido'
        if(!email.length) newErrorEmail = 'El email no debe estar vacio'
        if(!newErrorEmail.length)
            dispatch( enviarLinkAccion(email) )
        setErrorEmail(newErrorEmail)
    }

    useEffect(() => {
        return () => {
            dispatch( resetearAccion() )
        }
    }, [])

    return (
        <div className="container h-100">
            <div className="row justify-content-center">
                {   !!errorResponse &&
                    <Alert 
                    classes={{
                        message: 'w-100'
                    }}
                    severity="error"
                    className="mb-2">
                        <div className="d-flex justify-content-center">
                            <span>{errorResponse}</span>
                        </div>
                    </Alert>
                }
                {   !enviado ?
                    <Paper
                    onKeyPress={event => event.key === 'Enter' ? validate() : ''}
                    action="" className="text-left col-12 col-lg-8 pt-3">
                            <h4 className="text-center">Recuperar contraseña</h4>
                            <p className="text-muted small">Por favor, indiquenos su dirección de correo electrónico para enviarle el enlace para reestablecer su contraseña.</p>
                            <div className="form-group text-left">
                                <TextField
                                className="p-0"
                                error={!!errorEmail}
                                onChange={(event) => setEmail(event.target.value)}
                                fullWidth={true}
                                name="email"
                                label="E-mail"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: 
                                    errorEmail &&
                                    <InputAdornment
                                    position="end">
                                        <Tooltip placement="top-end" title={errorEmail}>
                                            <ReportProblemOutlined className="text-danger"/>
                                        </Tooltip>
                                    </InputAdornment>,
                                }} />
                            </div>
                            <div className="form-group text-right mt-2">
                                <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                startIcon={
                                    loading &&
                                    <CircularProgress size={20} color="inherit"/>
                                }
                                onClick={ () => validate() }>
                                Enviar
                                </Button>
                            </div>
                    </Paper> :
                    <Paper
                    elevation={3}
                    action="/" method="POST" className="text-left col-12 col-lg-8 pt-3">
                        <h4 className="text-center">¡Correo enviado!</h4>
                        <p className="text-muted m-0">Hemos enviado un enlace al siguiente correo: <span className="font-weight-bold"></span></p>
                        <p className="font-weight-bold">{email}</p>
                        <p className="text-muted small">¡Recuerde revisar su bandeja de correo no deseado!</p>
                        <div className="form-group text-right mt-2">
                            <div v-if="!resendOK">
                                <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                onClick={() => history.push('/iniciar-sesion') }>
                                    Volver
                                </Button>
                            </div>
                        </div>
                    </Paper>
                }
            </div>
        </div>
    )
}

export default RecoverPassword;