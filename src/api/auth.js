import api from './axiosInstance'
import { jwtDecode } from 'jwt-decode'

export const signup = async(email,username,password) => {
        const {data} = await api.post('/auth/register',({email,username,password}))
        localStorage.setItem('token',data.token);
        localStorage.setItem('userId',jwtDecode(data.token).id)
}

export const loginn = async(email,password) =>{
        const {data} = await api.post('/auth/login',({email,password}))
        localStorage.setItem('token',data.token);
        localStorage.setItem('userId',jwtDecode(data.token).id)
}