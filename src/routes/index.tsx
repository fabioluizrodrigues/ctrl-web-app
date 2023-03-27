import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {

	const { toggleDrawerOpen  } = useDrawerContext();

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<p><Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Teste</Button></p>} />

			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
};