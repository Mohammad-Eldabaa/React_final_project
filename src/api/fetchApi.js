import { APICALL } from '.';

export const signupApi = async data => await APICALL.post('/signup', { ...data });

export const loginApi = async data => await APICALL.post('/login', { ...data });

export const getUsers = async () => await APICALL.get('/users');

export const deleteUser = async id => await APICALL.delete(`/users/${id}`);

export const refreshTokeAPI = async data => await APICALL.post('/refresh-token', { ...data });

export const addPost = async data => await APICALL.post('/posts', { ...data });

export const getPosts = async () => await APICALL.get('/posts');

export const getPostById = async id => await APICALL.get(`/posts/${id}`);

export const deletePost = async id => await APICALL.delete(`/posts/${id}`);

export const editPost = async (id, data) => await APICALL.put(`/posts/${id}`, { ...data });
