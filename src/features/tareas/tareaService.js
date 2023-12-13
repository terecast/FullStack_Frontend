import axios from 'axios'

const API_URL = 'http://localhost:5000/api/tareas/'

//Crear una nueva Tarea
const crearTarea = async (tareaData, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    const response  = await axios.post(API_URL, tareaData, config)
    return response.data
}

const tareaService = {
    crearTarea
}

export default tareaService