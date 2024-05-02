import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'
import { PageProps } from '@/types'
import { getApolloClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import Meta from '@/components/meta/Meta'

const ContactsPage: NextPage<PageProps> = ({ page }: PageProps) => {
	const { seo, contacts } = page

	return (
		<>
			<Meta seo={seo} />
			<FadeIn>
				<main>
					<h1 className={`text-4xl font-bold`}>{page.title}</h1>
					<p
						className={`text-lg`}
						dangerouslySetInnerHTML={{
							__html: contacts.adres
						}}
					/>
					<p
						className={`text-lg`}
						dangerouslySetInnerHTML={{
							__html: contacts.telefon
						}}
					/>
				</main>
			</FadeIn>
		</>
	)
}

export default ContactsPage

export async function getStaticProps({ locale }: PageProps) {
	const apolloClient = getApolloClient()

	const language = locale.toUpperCase()

	const content = await apolloClient.query({
		query: gql`
			query HomepageContent($language: LanguageCodeEnum!) {
				page(id: "cG9zdDoxMDI=") {
					translation(language: $language) {
						seo {
							metaDesc
							title
						}
						title
						contacts {
							adres
							pochta
							telefon
						}
					}
				}
			}
		`,
		variables: {
			language
		}
	})

	const page = {
		...content?.data.page,
		...content?.data.page.translation,
		...content?.data.page.contacts
	}

	return {
		props: {
			page,
			language
		},
		revalidate: 10
	}
}
