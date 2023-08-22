import {configureStore} from '@reduxjs/toolkit'
import movieReducer from './movieSlice';
const appStore = configureStore({
    reducer: {
        movie: movieReducer
    }
})
export default appStore;