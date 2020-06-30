import React, { useEffect } from 'react'

import { CircularProgress, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { validarEmailAccion, IEmailValidation } from '@/redux/emailValidationDuck'

const EmailValidation = () => {
    
    const dispatch = useDispatch()

    const history = useHistory()

    const state: IEmailValidation = useSelector((state: any) => state.emailValidation)

    const token: string | null = new URLSearchParams(useLocation().search).get('token')

    useEffect(() => {
        dispatch( validarEmailAccion(token || '') )
    }, [])

    useEffect(() => {
        if(!state.loading) {
            setTimeout(() => {
                history.push('/iniciar-sesion')
            }, 10000)
        }
    }, [state])

    return (
        <div className="container h-100">
            <div className="row justify-content-center">
                <Paper
                elevation={3}
                className="col-12 col-md-8">
                    <div className="border-bottom">
                        <h3 className="font-weight-bold text-left m-0 my-1">Verificación de Email</h3>
                    </div>
                    {   state.loading ?
                        <div className="d-flex justify-content-center my-2">
                            <CircularProgress />
                        </div>
                        :
                        <div className="d-flex justify-content-center flex-column align-items-center my-2">
                            <p className={'h5 my-2 text-center ' + ( state.okResponse  ? 'text-success' : 'text-error')}>{state.okResponse || state.errorResponse}</p>
                            <small className="text-muted">Si no es redireccionado haga click <Link to="/iniciar-sesion">aquí.</Link> </small>
                        </div>
                    }
                </Paper>
            </div>
        </div>
    )
}

export default EmailValidation