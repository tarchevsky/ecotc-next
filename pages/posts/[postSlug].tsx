import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client'

import { getApolloClient } from '@/lib/apollo-client'

import {
	Params,
	GetStaticPathsContext,
	Translation,
	PostEdge,
	PostPageProps,
	PathType
} from '@/types'

export default function Post({ post, site }: PostPageProps) {
	return (
		<div>
			<Head>
				<title>{post.title}</title>
				<meta
					name='description'
					content={`Read more about ${post.title} on ${site.title}`}
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<h1>{post.translation.title}</h1>

				<div>
					<div
						dangerouslySetInnerHTML={{
							__html: post.translation.content
						}}
					/>
				</div>

				<p>
					<Link href='/'>&lt; Back To Home</Link>
				</p>
			</main>
		</div>
	)
}

export async function getStaticProps({
	params,
	locale
}: {
	params: Params
	locale: string
}) {
	const language = locale.toUpperCase()

	const apolloClient = getApolloClient()

	const data = await apolloClient.query({
		query: gql`
			query PostBySlug($slug: String!, $language: LanguageCodeEnum!) {
				generalSettings {
					title
				}
				postBy(slug: $slug) {
					id
					content
					title
					slug
					translation(language: $language) {
						id
						slug
						content
						title
						language {
							locale
							slug
						}
					}
				}
			}
		`,
		variables: {
			slug: params.postSlug,
			language
		}
	})

	let post = data?.data.postBy

	const site = {
		...data?.data.generalSettings
	}

	return {
		props: {
			post,
			language,
			path: `/posts/${post.slug}`,
			site
		},
		revalidate: 10
	}
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
	const apolloClient = getApolloClient()

	const data = await apolloClient.query({
		query: gql`
			{
				posts(first: 10000) {
					edges {
						node {
							id
							title
							slug
						}
					}
				}
			}
		`
	})

	const posts = data?.data.posts.edges.map(({ node }: PostEdge) => node)

	const paths = posts.map(({ slug }: Translation) => {
		return {
			params: {
				postSlug: slug
			}
		}
	})

	return {
		paths: [
			...paths,
			...paths.flatMap((path: PathType) => {
				return locales.map(locale => {
					return {
						...path,
						locale
					}
				})
			})
		],
		fallback: 'blocking'
	}
}
