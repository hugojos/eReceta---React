import React, { lazy, Suspense } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core'

import PrivateRoute from './middleware/PrivateRoute'
import GuestRoute from './middleware/GuestRoute'

import { Switch, Redirect, Route } from 'react-router-dom'

const ValidarCupon = lazy(() => import( /* webpackChunkName:"ValidarCupon" */ '../views/ValidarCupon'))
const Login = lazy(() => import( /* webpackChunkName:"Login" */ '../views/auth/Login'));
const Register = lazy(() => import( /* webpackChunkName:"Register" */ '../views/auth/Register'));
const RecoverPassword = lazy(() => import( /* webpackChunkName:"RecoverPassword" */ '../views/auth/RecoverPassword'))
const NewPassword = lazy(() => import( /* webpackChunkName:"NewPassword" */ '../views/auth/NewPassword'))
const EmailValidation = lazy(() => import( /* webpackChunkName:"EmailValidation" */ '../views/auth/EmailValidation'))
const NuevaReceta = lazy(() => import( /* webpackChunkName:"NuevaReceta" */ '../views/NuevaReceta'));
const Firmar = lazy(() => import( /* webpackChunkName:"Firmar" */ '../views/Firmar'));
const Receta = lazy(() => import( /* webpackChunkName:"Receta" */ '../views/Receta'))
const Profile = lazy(() => import( /* webpackChunkName:"Profile" */ '../views/user/Profile'))
const RecetaPaciente = lazy(() => import( /* webpackChunkName:"RecetaPaciente" */ '../views/RecetaPaciente'))

const Routes = () => {
    return ( 
        <Suspense fallback={
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        }>
            <Switch>
                <Route path='/validar-cupon' component={ValidarCupon} />
                <Route path='/ver-receta/:nombreArchivo' component={RecetaPaciente}/>
                <GuestRoute path="/iniciar-sesion" component={Login} />
                <GuestRoute path="/registrarse" component={Register} />
                <GuestRoute path="/recuperar" component={RecoverPassword} />
                <GuestRoute path="/nueva-contrasena" component={NewPassword} />
                <GuestRoute path="/validar" component={EmailValidation} />
                <Route path="/nueva-receta" component={NuevaReceta} />
                <Route path="/firmar" component={Firmar} />
                <PrivateRoute path="/receta" component={Receta} />
                <PrivateRoute path="/perfil" component={Profile} />
                <Redirect from="/" to="/nueva-receta" />
            </Switch>
        </Suspense> 
    );
}
 
export default Routes;