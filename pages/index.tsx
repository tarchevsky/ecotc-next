import { NextPage } from 'next'
import { gql } from '@apollo/client'

import { getApolloClient } from 'lib/apollo-client'
import Link from 'next/link'

import { PageProps } from '@/types'
import Head from 'next/head'

const HomePage: NextPage<PageProps> = ({ page, posts }: PageProps) => {
	const { caption, consultingDescr, heroImage } =
		page.translation.homepagecontent
	const { seo } = page.translation

	return (
		<>
			<Head>
				<title>{seo.title}</title>
				<meta name='description' content={seo.metaDesc} />
			</Head>
			<main className='cont'>
				<img src={heroImage.node.link} alt='' />
				<div
					dangerouslySetInnerHTML={{
						__html: caption
					}}
				/>

				<ul>
					{posts &&
						posts.length > 0 &&
						posts.map(post => {
							return (
								<li key={post.slug}>
									<Link href={post.path}>
										<h3
											dangerouslySetInnerHTML={{
												__html: post.title
											}}
										/>
										<div
											dangerouslySetInnerHTML={{
												__html: post.excerpt
											}}
										/>
									</Link>
								</li>
							)
						})}

					{!posts ||
						(posts.length === 0 && (
							<li>
								<p>Oops, no posts found!</p>
							</li>
						))}
				</ul>
				<div
					dangerouslySetInnerHTML={{
						__html: consultingDescr
					}}
				/>
			</main>
		</>
	)
}

export default HomePage

const categoryIds = {
	ru: 17,
	en: 19
	// добавьте другие локали и соответствующие categoryId
}

export async function getStaticProps({ locale }: PageProps) {
	const apolloClient = getApolloClient()

	const language = locale.toUpperCase()
	const categoryId = categoryIds[locale] || 17

	const data = await apolloClient.query({
		query: gql`
			query PostsContents(
				$language: LanguageCodeFilterEnum!
				$categoryId: Int!
			) {
				posts(where: { categoryId: $categoryId, language: $language }) {
					edges {
						node {
							id
							excerpt
							title
							slug
						}
					}
				}
			}
		`,
		variables: {
			language,
			categoryId
		}
	})

	const content = await apolloClient.query({
		query: gql`
			query HomepageContent($language: LanguageCodeEnum!) {
				page(id: "cG9zdDoxMA==") {
					translation(language: $language) {
						seo {
							metaDesc
							title
						}
						homepagecontent {
							adres
							caption
							consultingDescr
							consultingSubtitle
							consultingText
							consultingTitle
							email
							kopirajt
							nazvanieKompanii
							ourActivity
							ourActivityMetodology
							ourActivityTitle
							ourClientsTitle
							razrabotchik
							sferaDeyatelnostiDbv
							slogan
							telefon
							whatWeDo
							consultingPoints {
								consultingPoint
							}
							heroImage {
								node {
									id
									link
								}
							}
							ourActivityPoints {
								number
								text
								img {
									node {
										link
									}
								}
							}
						}
					}
				}
			}
		`,
		variables: {
			language
		}
	})

	const posts = data?.data.posts.edges.map(({ node }: PageProps) => ({
		...node,
		path: `/posts/${node.slug}`
	}))

	const page = {
		...content?.data.page
	}

	return {
		props: {
			page,
			language,
			posts
		},
		revalidate: 10
	}
}
