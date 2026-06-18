import api from './axiosInstance'

export const getAllPosts = async () => {
    const {data} = await api.get('/posts');
    return data;
}