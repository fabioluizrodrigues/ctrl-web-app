import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão. Parece que você não está conectado.'));
  }

  if (error.response?.status === 401) {
    //return Promise.reject(new Error('Erro...'));
  }

  return Promise.reject(error);
};
