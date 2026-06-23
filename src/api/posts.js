import api from './axiosInstance'

export const getAllPosts = async () => {
    const {data} = await api.get('/posts');
    return data;
}

export const getMyPosts = async () =>{
    const {data} = await api.get('/posts/mine');
    return data;
}

export const addPosts = async ({title,image,content})=>{
    await api.post('/posts',{title,image,content});
}

export const getOnePost = async()=>{
    const {data} = api.get(`/post/${id}`);
    return data;
}