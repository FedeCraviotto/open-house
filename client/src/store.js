import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {};


const store = createStore(
    // Busca el index en la carpeta indicada, en vez de setearlos en Slices y  combinarlos aca.
    rootReducer,
    initialState,

)

export default store;