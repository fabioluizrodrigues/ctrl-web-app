import { Alert, Avatar, Box, Button, CircularProgress, Grid, Icon, Link, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts';

const loginSchema = yup.object().shape({
  email: yup.string().required().min(5),
  password: yup.string().required().min(5),
});

interface ILoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login, errorMessage } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
  };

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?nature)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <Icon>lock_outlined</Icon>
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box width='100%'>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nome de usuário / E-mail / Telefone / CPF"
                name="username"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={() => setEmailError('')}
                error={!!emailError}
                helperText={emailError}
                disabled={isLoading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={() => setPasswordError('')}
                error={!!passwordError}
                helperText={passwordError}
                disabled={isLoading}
              />
              <Grid container>
                <Grid item xs paddingY={1}>
                  {(errorMessage !== undefined) && <Alert severity="error"> {errorMessage}</Alert>}
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSubmit}
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={23} /> : undefined}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueci minha senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {'Não tem uma conta? Cadastre-se aqui'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* 
      <Box width='100%' height='100vh' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
        <Card>
          <CardContent>
            <Box display='flex' flexDirection='column' gap={2} width={400}>
              <Typography variant='h6' align='center'>
                Identifique-se
              </Typography>
              <TextField
                label='E-mail'
                type='email'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={() => setEmailError('')}
                error={!!emailError}
                helperText={emailError}
                disabled={isLoading}
              />
              <TextField
                label='Senha'
                type='password'
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={() => setPasswordError('')}
                error={!!passwordError}
                helperText={passwordError}
                disabled={isLoading}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box width='100%' display='flex' justifyContent='center'>
              <Button
                variant='contained'
                onClick={handleSubmit}
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={23} /> : undefined}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </Box>
          </CardActions>
        </Card>
        {(errorMessage !== undefined) && <Alert severity="error"> {errorMessage}</Alert>}
      </Box> */}
    </>
  );
};
