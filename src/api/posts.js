import api from './axiosInstance'

export const getAllPosts = async () => {
    const {data} = await api.get('/posts');
    return data;
}

export const getMyPosts = async () =>{
    const {data} = await api.get('/posts/mine');
    return data;
}