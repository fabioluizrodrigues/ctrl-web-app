import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {

  console.log(error.response?.data);

  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão. Não foi possivel conectar ao servidor. Tente mais tarde.'));
  }

  if (error.response?.status === 401) {
    return Promise.reject(new Error('Acesso negado! Email ou senha inválidos.'));
  }

  return Promise.reject(error);
};
