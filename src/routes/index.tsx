import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, ListagemDeCidades, ListagemDePessoas } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {

	const { setDrawerOptions } = useDrawerContext();

	useEffect(() => {
		setDrawerOptions([
			{
				icon: 'home',
				path: 'pagina-inicial',
				label: 'Página Inicial',
			},
			{
				icon: 'people',
				path: 'pessoas',
				label: 'Pessoas',
			},
			{
				icon: 'location_city',
				path: 'cidades',
				label: 'Cidades',
			},
		]);
	}, []);

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<Dashboard/>} />
			<Route path='/pessoas' element={<ListagemDePessoas/>} />
			<Route path='/cidades' element={<ListagemDeCidades/>} />
			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
};