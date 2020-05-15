import React from 'react';
import Header from './components/Header'
import BotonWhatsapp from './components/BotonWhatsapp'
import Footer from './components/Footer'

import { /*BrowserRouter as Router*/ HashRouter } from 'react-router-dom'
import Routes from './router/Routes'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

function App() {

  const store = generateStore()

  return (
	<Provider store={store}>
		<HashRouter>
			<Header />
			<BotonWhatsapp />
			<div style={{paddingTop: '45px', minHeight: '100vh'}}>
				<Routes />
			</div>
			<Footer />
		</HashRouter>	
	</Provider>
  );
}

export default App;
