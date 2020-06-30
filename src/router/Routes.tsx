import React, { lazy, Suspense } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core'

import PrivateRoute from './middleware/PrivateRoute'
import GuestRoute from './middleware/GuestRoute'

import { Switch, Redirect, Route } from 'react-router-dom'

//const ValidarCupon = lazy(() => import( /* webpackChunkName:"ValidarCupon" */ '../views/ValidarCupon'))
const Login = lazy(() => import( /* webpackChunkName:"Login" */ '../views/auth/Login/index'));
const Register = lazy(() => import( /* webpackChunkName:"Register" */ '../views/auth/Register/index'));
const RecoverPassword = lazy(() => import( /* webpackChunkName:"RecoverPassword" */ '../views/auth/RecoverPassword/index'))
const NewPassword = lazy(() => import( /* webpackChunkName:"NewPassword" */ '../views/auth/NewPassword/index'))
const EmailValidation = lazy(() => import( /* webpackChunkName:"EmailValidation" */ '../views/auth/EmailValidation/index'))
const NuevaReceta = lazy(() => import( /* webpackChunkName:"NuevaReceta" */ '@/views/user/NuevaReceta/index'));
const Firmar = lazy(() => import( /* webpackChunkName:"Firmar" */ '../views/user/Firmar/index'));
const Receta = lazy(() => import( /* webpackChunkName:"Receta" */ '../views/user/Receta/index'))
const Profile = lazy(() => import( /* webpackChunkName:"Profile" */ '../views/user/Profile/index'))
const RecetaPaciente = lazy(() => import( /* webpackChunkName:"RecetaPaciente" */ '../views/website/RecetaPaciente/index'))
const LibroDigital = lazy(() => import( /* webpackChunkName:"LibroDigital" */ '../views/user/LibroDigital/index'))
const LibroDigitalPdf = lazy(() => import( /* webpackChunkName:"LibroDigitalPdf" */ '../views/user/LibroDigitalPdf/index'))
const Medicos = lazy(() => import(/* webpackChunkName: "Medicos" */ '../views/user/Medicos/index'))
const ModificarMedico = lazy(() => import(/* webpackChunkName: "ModificarMedico" */ '../views/user/ModificarMedico/index'))
const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../views/website/Home/index'))
const TerminosCondiciones = lazy(() => import(/* webpackChunkName: "TerminosCodiciones" */ '../views/website/TerminosCondiciones/index'))
const PoliticasPrivacidad = lazy(() => import(/* webpackChunkName: "PoliticasPrivacidad" */ '../views/website/PoliticasPrivacidad/index'))

const Routes = () => {
    return ( 
        <Suspense fallback={
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        }>
            <Switch>
                {/* <Route path='/validar-cupon' component={ValidarCupon} /> */}
                <Route path='/ver-receta/:nombreArchivo' component={RecetaPaciente}/>
                <Route path="/terminos-condiciones" component={TerminosCondiciones} />
                <Route path="/politicas-privacidad" component={PoliticasPrivacidad} />
                <GuestRoute path="/iniciar-sesion" component={Login} />
                <GuestRoute path="/registrarse" component={Register} />
                <GuestRoute path="/recuperar" component={RecoverPassword} />
                <GuestRoute path="/nueva-contrasena" component={NewPassword} />
                <GuestRoute path="/validar" component={EmailValidation} />
                <PrivateRoute path="/nueva-receta" component={NuevaReceta} />
                <PrivateRoute path="/firmar" component={Firmar} />
                <PrivateRoute path="/receta" component={Receta} />
                <PrivateRoute path="/perfil" component={Profile} />
                <PrivateRoute path="/libro-digital" component={LibroDigital} />
                <PrivateRoute path="/libro-digital-pdf" component={LibroDigitalPdf} />
                <PrivateRoute path="/medicos" component={Medicos} />
                <PrivateRoute path="/modificar-medico" component={ModificarMedico}/>
                <Route path='/' component={Home} exact/>
                <Redirect from="/" to="/"/>
            </Switch>
        </Suspense> 
    );
}
 
export default Routes;