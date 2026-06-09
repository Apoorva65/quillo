import api from './axiosInstance'

export const signup = async(email,username,password) => {
    const {data} = await api.post('/auth/register',({email,username,password}))
    return data;
}

export const loginn = async(email,password) =>{
    const {data} = await api.post('/auth/login',({email,password}))
    localStorage.setItem('token',data.token);
}