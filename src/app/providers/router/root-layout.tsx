import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../../widgets/header/Header'
import { Footer } from '../../../widgets/footer/Footer'

const RootLayout = () => {
	const location = useLocation()
	const background = location.state && location.state.background

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

	return (
		<>
			<Header variant={getHeaderVariant()} name="Мария" />
			<main>
				<Outlet context={{ background }} />
			</main>
			<Footer />
		</>
	)
}

export default RootLayout
