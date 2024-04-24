import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'

const ContactsPage: NextPage = () => {
	return (
		<FadeIn>
			<main>
				<h1 className={`text-4xl font-bold`}>Контакты</h1>
			</main>
		</FadeIn>
	)
}

export default ContactsPage
