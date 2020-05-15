import React, { lazy, Suspense } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core'

import PrivateRoute from './middleware/PrivateRoute'
import GuestRoute from './middleware/GuestRoute'

import { Switch, Redirect, Route } from 'react-router-dom'

const ValidarCupon = lazy(() => import('../views/ValidarCupon'))
const Login = lazy(() => import('../views/auth/Login'));
const Register = lazy(() => import('../views/auth/Register'));
const RecoverPassword = lazy(() => import('../views/auth/RecoverPassword'))
const NewPassword = lazy(() => import('../views/auth/NewPassword'))
const EmailValidation = lazy(() => import('../views/auth/EmailValidation'))
const NuevaReceta = lazy(() => import('../views/NuevaReceta'));
const Firmar = lazy(() => import('../views/Firmar'));
const Receta = lazy(() => import('../views/Receta'))
const Profile = lazy(() => import('../views/user/Profile'))

const Routes = () => {
    return ( 
        <Suspense fallback={
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        }>
            <Switch>
                <Route path='/validar-cupon'>
                    <ValidarCupon />
                </Route>)
                <GuestRoute path="/iniciar-sesion">
                    <Login />
                </GuestRoute>
                <GuestRoute path="/registrarse">
                    <Register />
                </GuestRoute>
                <GuestRoute path="/recuperar">
                    <RecoverPassword />
                </GuestRoute>
                <GuestRoute path="/nueva-contrasena">
                    <NewPassword />
                </GuestRoute>
                <GuestRoute path="/validar">
                    <EmailValidation />
                </GuestRoute>
                <Route path="/nueva-receta">
                    <NuevaReceta />
                </Route>
                <Route path="/firmar">
                    <Firmar />
                </Route>
                <PrivateRoute path="/receta">
                    <Receta />
                </PrivateRoute>
                <PrivateRoute path="/perfil">
                    <Profile />
                </PrivateRoute>
                <Redirect from="/" to="/nueva-receta">
                </Redirect>
            </Switch>
        </Suspense> 
    );
}
 
export default Routes;