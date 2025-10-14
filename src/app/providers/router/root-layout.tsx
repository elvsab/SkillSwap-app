import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../../widgets/header/Header'
import { Footer } from '../../../widgets/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { filtersActions, selectSearchQuery } from '@/features/filters/model/filtersSlice'

const RootLayout = () => {
	const location = useLocation()
	const background = location.state && location.state.background
	const dispatch = useDispatch()

	// Determine header variant based on route
	const getHeaderVariant = () => {
		const path = location.pathname
		if (path.includes('/login') || path.includes('/registration')) {
			return 'auth'
		}
		if (path.includes('/profile')) {
			return 'user'
		}
		return 'guest'
	}

	const handleSearchChange = (value: string) => {
		dispatch(filtersActions.setSearchQuery(value))
	  }

	return (
		<>
			<Header 
				variant={getHeaderVariant()} 
				name="Мария" 
				searchText={useSelector(selectSearchQuery)}
				onSearchChange={handleSearchChange}
			/>
			<main>
				<Outlet context={{ background, searchText: useSelector(selectSearchQuery), onSearchChange: handleSearchChange }} />
			</main>
			<Footer />
		</>
	)
}

export default RootLayout