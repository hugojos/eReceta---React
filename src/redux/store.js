import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import authReducer from './authDuck'
import nuevaRecetaReducer from './nuevaRecetaDuck'
import recetaReducer from './recetaDuck'

const rootReducer = combineReducers({
    auth: authReducer,
    nuevaReceta: nuevaRecetaReducer,
    receta: recetaReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ))
    return store;
}