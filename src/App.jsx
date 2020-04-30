import React, {lazy, Suspense} from 'react';
/*import Login from './views/auth/Login'
import NuevaReceta from './views/NuevaReceta'*/
import TheHeader from './components/TheHeader'
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
const NuevaReceta = lazy(() => import('./views/NuevaReceta'));
const Firmar = lazy(() => import('./views/Firmar'))

function App() {

  const store = generateStore()

  return (
	<Provider store={store}>
		<HashRouter>
			<TheHeader />
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
						<Route path="/nueva-receta">
							<NuevaReceta />
						</Route>
						<Route path="/firmar">
							<Firmar />
						</Route>
						<Redirect from="/" to="/iniciar-sesion" exact>
						</Redirect>
					</Switch>
				</Suspense>
			</div>
		</HashRouter>	
	</Provider>
  );
}

export default App;
