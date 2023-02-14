import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const initialState = {};


const store = configureStore({
    initialState,
    // Busca el index en la carpeta indicada, en vez de setearlos en Slices y  combinarlos aca.
    reducer: rootReducer,
}
)

export default store;