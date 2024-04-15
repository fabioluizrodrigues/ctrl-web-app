import { Api } from '../axios-config';

interface IAuth {
  accessToken: string;
}

const auth = async (username: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post('/entrar', {username, password });

    if (data) {
      return data;
    }

    return new Error('Erro ao fazer login');
  } catch (error) {
    console.log(error);
    return new Error((error as { message: string }).message || 'Erro ao fazer login.');
  }
};

export const AuthService = {
  auth,
};
