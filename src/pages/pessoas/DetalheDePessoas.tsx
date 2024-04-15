import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { IVFormErrors, useVForm, VForm, VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import * as yup from 'yup';
import { AutoCompleteCidades } from './components/AutoCompleteCidades';
import { isValidCNPJ, isValidCPF, isValidMobilePhone } from '@brazilian-utils/brazilian-utils';

interface IFormData {
  cnpj_cpf: string;
  nome_razao: string;
  email: string;
  telefone: string;
  ie_rg?: string;
  cep?: string;
  estado?: string;
  cidade_id?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  observacoes?: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  cnpj_cpf: yup.string().required()
    .test('is-valid-cnpj-cpf', 'CNPJ/CPF inválido!',
      (value) => (isValidCNPJ(value as string) || isValidCPF(value as string))
    ),
  nome_razao: yup.string().required().min(3).max(255),
  email: yup.string().required().email(),
  telefone: yup.string().required()
    .test('is-valid-telefone', 'Telefone inválido.',
      (value) => isValidMobilePhone(value as string)
    ),
  ie_rg: yup.string().optional(),
  cep: yup.string().optional(),
  estado: yup.string().optional().min(2).max(2),
  cidade_id: yup.string().optional(),
  bairro: yup.string().optional(),
  logradouro: yup.string().optional(),
  numero: yup.string().optional(),
  complemento: yup.string().optional(),
  observacoes: yup.string().optional(),
});

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(id).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setNome(result.nome_razao);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        cnpj_cpf: '',
        nome_razao: '',
        email: '',
        telefone: '',
        ie_rg: '',
        cep: '',
        estado: '',
        cidade_id: '',
        bairro: '',
        logradouro: '',
        numero: '',
        complemento: '',
        observacoes: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          PessoasService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/pessoas');
              } else {
                navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
        } else {
          PessoasService.updateById(id, { id: id, ...dadosValidados }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/pessoas');
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: string) => {
    if (confirm('Confirma a exclusão do registro?')) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/pessoas');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEVoltar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(id)}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={1}>
                <VTextField fullWidth name='nomeCompleto' label='Nome completo' disabled={isLoading} onChange={(e) => setNome(e.target.value)} />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={1}>
                <VTextField fullWidth name='email' label='E-mail' disabled={isLoading} />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={1}>
                <AutoCompleteCidades isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
