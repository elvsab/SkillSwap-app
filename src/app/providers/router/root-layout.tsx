import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../../widgets/header/Header'
import { Footer } from '../../../widgets/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { filtersActions, selectSearchQuery } from '@/features/filters/model/filtersSlice'
import { selectUser } from '@/features/auth/model/authSlice'
import { useEffect } from 'react'
import { hydrateTheme } from '@/features/theme/model/themeSlice'
import { hydrateNotifications } from '@/features/notifications/model/notificationsSlice'
import { hydrateRequests } from '@/features/requests/model/requestsSlice'
import { ToastViewport } from '../../../widgets/toasts/ToastViewport'

const RootLayout = () => {
	const location = useLocation()
	const background = location.state && location.state.background
	const dispatch = useDispatch()
	const searchText = useSelector(selectSearchQuery)
	const currentUser = useSelector(selectUser)

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

	useEffect(() => {
		dispatch(hydrateTheme())
		dispatch(hydrateNotifications())
		dispatch(hydrateRequests())
	}, [dispatch])

	return (
		<>
			<Header 
				variant={getHeaderVariant()} 
				name={currentUser?.name ?? "Гость"}
				searchText={searchText}
				onSearchChange={handleSearchChange}
			/>
			<main>
				<Outlet context={{ background, searchText, onSearchChange: handleSearchChange }} />
			</main>
			<Footer />
			<ToastViewport />
		</>
	)
}

export default RootLayout
