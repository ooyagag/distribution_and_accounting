import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
	baseURL: 'https://localhost:44324/api/',
	timeout: 15000,
});

export const responseBody = (response: AxiosResponse) => response.data;