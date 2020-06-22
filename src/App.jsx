import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import BotonWhatsapp from './components/BotonWhatsapp'
import Footer from './components/Footer'
import history from './redux/history'

import { /* Router */ HashRouter } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesionAccion, modificarUsuarioAccion } from './redux/authDuck'
import Routes from './router/Routes'

function App() {

	const dispatch = useDispatch()
	
	const auth = useSelector(state => state.auth.user)

	const [mostrar, setMostrar] = useState(true)

	useEffect(() => {
		const verificarSesionExpiro = () => {
			if(auth) {
				if( new Date().getTime() > auth.expiry )
					dispatch( cerrarSesionAccion() )
				else {
					let newAuth = auth;
					newAuth.expiry = new Date().getTime() + window.properties.tiempoSesion
					dispatch( modificarUsuarioAccion( newAuth ) )
				}
			}

		}
		const verificarRuta = () => {
			if( history.location.pathname.includes('ver-receta') || history.location.pathname === '/' ){
				setMostrar(false)
			} else {
				setMostrar(true)
			}
		}
		history.listen((location, action) => {
			verificarRuta()
		})	
		verificarSesionExpiro()
		verificarRuta()
	}, [])

	return (
		<HashRouter history={history}>
			{ mostrar && <Header /> }
			<div style={{paddingTop: mostrar ? '70px' : 0, paddingBottom: mostrar ? '30px' : 0 , minHeight: '90vh'}}>
				<Routes />
			</div>
			{ mostrar && <BotonWhatsapp /> }
			{ mostrar && <Footer /> }
		</HashRouter>	
	);
}

export default App;
