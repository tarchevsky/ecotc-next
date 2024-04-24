import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import FadeIn from '@/components/fadeIn/FadeIn'
import { LayoutProps } from '@/types'

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<FadeIn>
				<Header />
			</FadeIn>

			<div>{children}</div>

			<FadeIn>
				<Footer />
			</FadeIn>
		</>
	)
}

export default Layout
