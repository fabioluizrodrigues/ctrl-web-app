import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const DetalheDePessoas: React.FC = () => {
	const navigate = useNavigate();
	const { id = 'nova' } = useParams<'id'>();

	const handleSave = () => {
		console.log('Save');
	};

	const handleDelete = () => {
		console.log('Delete');
	};

	return (
		<LayoutBaseDePagina
			titulo='Detalhe de pessoa'
			barraDeFerramentas={
				<FerramentasDeDetalhe
					textoBotaoNovo='Nova'
					mostrarBotaoSalvarEVoltar
					mostrarBotaoNovo={id !== 'nova'}
					mostrarBotaoApagar={id !== 'nova'}

					aoClicarEmSalvar={handleSave}
					aoClicarEmSalvarEVoltar={handleSave}
					aoClicarEmApagar={handleDelete}
					aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					aoClicarEmVoltar={() => navigate('/pessoas')}
				/>
			}
		>
			<p>Detalhe de pessoas { id }</p>
		</LayoutBaseDePagina>
	);
};