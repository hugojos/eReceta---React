import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import BotonWhatsapp from './components/BotonWhatsapp'
import Footer from './components/Footer'
import history from './redux/history'

import { /*BrowserRouter as Router*/ HashRouter } from 'react-router-dom'
import Routes from './router/Routes'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

function App() {

	const [mostrar, setMostrar] = useState(true)

	const store = generateStore()

		
	history.listen((location, action) => {
		if(history.location.pathname.includes('ver-receta')){
			setMostrar(false)
		} else {
			setMostrar(true)
		}
	})

	useEffect(() => {
		if(history.location.pathname.includes('ver-receta')){
			setMostrar(false)
		} else {
			setMostrar(true)
		}
	},[])

	return (
		<Provider store={store}>
			<HashRouter>
				{	mostrar && <Header /> }
				<div style={{paddingTop: mostrar ? '45px' : 0, minHeight: '100vh'}}>
					<Routes />
				</div>
				{	mostrar && 	<BotonWhatsapp /> }
				{ 	mostrar&& <Footer /> }
			</HashRouter>	
		</Provider>
	);
}

export default App;
