import {configureStore} from '@reduxjs/toolkit'
import resourceReducer from './resourceSlice';

const appStore = configureStore({
    reducer: {
        resource: resourceReducer
    }
})
export default appStore;