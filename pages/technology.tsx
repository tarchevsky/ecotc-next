import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'
import { PageProps } from '@/types'
import { getApolloClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import Head from 'next/head'

const Technology: NextPage<PageProps> = ({ page }: PageProps) => {
	const { seo } = page
	return (
		<>
			<Head>
				<title>{seo.title}</title>
				<meta name='description' content={seo.metaDesc} />
			</Head>
			<FadeIn>
				<main>
					<h1 className={`text-4xl font-bold`}>{page.title}</h1>
				</main>
			</FadeIn>
		</>
	)
}

export default Technology

export async function getStaticProps({ locale }: PageProps) {
	const apolloClient = getApolloClient()

	const language = locale.toUpperCase()

	const content = await apolloClient.query({
		query: gql`
			query HomepageContent($language: LanguageCodeEnum!) {
				page(id: "cG9zdDoxNDg=") {
					translation(language: $language) {
						seo {
							metaDesc
							title
						}
						title
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
		...content?.data.page.translation
	}

	return {
		props: {
			page,
			language
		},
		revalidate: 10
	}
}
