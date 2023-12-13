import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tareaService from './tareaService'

const initialState = {
    tareas:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    menssage: ''
}

//Crear una nueva tarea
export const crearTarea = create.createAsyncThunk('tareas/crear', async(tareaData, thunkAPI)=>{
    try {
        const token = thunkAPI.getstate().auth.user.token
        return await tareaService.crearTarea(tareaData, token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})

export const tareaSlice = createSlice({
    name: 'tarea',
    initialState,
    reducers: {
        reset:(state)=> initialState
    },
    extraReducers: (builder) => {
        builder
            addCase(crearTarea.pending, (state)=> {
                state.isLoading = true
            })
            addCase(crearTarea.fullfilled, (state,action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.tarea.push(action.playload)
            })
            addCase(crearTarea.rejected, (state,action)=> {
                state.isLoading = false
                state.isError = false
                state.message = action.payload
            })
        }
    
})
export const{reset} = tareaSlice.actions
export default tareaSlice.reducer
