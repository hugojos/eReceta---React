import React, { lazy, Suspense } from 'react';
import Header from './components/Header'
import BotonWhatsapp from './components/BotonWhatsapp'
import {
  //BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter,
  Route
} from 'react-router-dom'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { Provider } from 'react-redux'
import PrivateRoute from './router/PrivateRoute'
import GuestRoute from './router/GuestRoute'
import generateStore from './redux/store'

const Login = lazy(() => import('./views/auth/Login'));
const Register = lazy(() => import('./views/auth/Register'));
const RecoverPassword = lazy(() => import('./views/auth/RecoverPassword'))
const NewPassword = lazy(() => import('./views/auth/NewPassword'))
const EmailValidation = lazy(() => import('./views/auth/EmailValidation'))
const NuevaReceta = lazy(() => import('./views/NuevaReceta'));
const Firmar = lazy(() => import('./views/Firmar'));
const Receta = lazy(() => import('./views/Receta'))
const Profile = lazy(() => import('./views/user/Profile'))

function App() {

  const store = generateStore()

  return (
	<Provider store={store}>
		<HashRouter>
			<Header />
			<BotonWhatsapp />
			<div className="vh-100" style={{paddingTop: '45px'}}>
				<Suspense fallback={
					<Backdrop open={true}>
						<CircularProgress color="inherit" />
					</Backdrop>
		 		}>
					<Switch>
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
						<Redirect from="/" to="/nueva-receta" exact>
						</Redirect>
					</Switch>
				</Suspense>
			</div>
		</HashRouter>	
	</Provider>
  );
}

export default App;
