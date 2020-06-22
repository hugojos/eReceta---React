import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './authDuck'
import nuevaRecetaReducer from './nuevaRecetaDuck'
import recetaReducer from './recetaDuck'
import recoverPasswordReducer from './recoverPasswordDuck'
import registerReducer from './registerDuck'
import newPasswordReducer from './newPasswordDuck'
import emailValidationReducer from './emailValidationDuck'
import enviarRecetaEmailReducer from './enviarRecetaEmailDuck'
import enviarRecetaWppReducer from './enviarRecetaWppDuck'
import modificarDatosReducer from './modificarDatosDuck'
import libroDigitalReducer from './libroDigitalDuck'
import medicosReducer from './medicosDuck'

const rootReducer = combineReducers({
    auth: authReducer,
    nuevaReceta: nuevaRecetaReducer,
    receta: recetaReducer,
    register: registerReducer,
    recoverPassword: recoverPasswordReducer,
    newPassword: newPasswordReducer,
    emailValidation: emailValidationReducer,
    enviarRecetaEmail: enviarRecetaEmailReducer,
    enviarRecetaWpp: enviarRecetaWppReducer,
    modificarDatos: modificarDatosReducer,
    libroDigital: libroDigitalReducer,
    medicos: medicosReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ))
    return store;
}