import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {

	const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

	useEffect(() => {
		setDrawerOptions([
			{
				icon: 'home',
				path: 'pagina-inicial',
				label: 'Página Inicial',
			},
			{
				icon: 'star',
				path: 'cidades',
				label: 'Cidades',
			}
		]);
	}, []);

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Teste</Button>} />
			<Route path='/cidades' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Cidades</Button>} />
			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
};