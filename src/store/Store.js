import { configureStore } from '@reduxjs/toolkit'
import airCallReducer from './AirCallSlice'
export default configureStore({
    reducer: {
        airCall: airCallReducer,
    },
})
