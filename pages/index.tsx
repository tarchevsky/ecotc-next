import { NextPage } from 'next'
import { gql } from '@apollo/client'

import { getApolloClient } from 'lib/apollo-client'
import Link from 'next/link'

import { HomePageProps } from '@/types'

const HomePage: NextPage<HomePageProps> = ({ page, posts }: HomePageProps) => {
	const { caption, consultingDescr, heroImage } =
		page.translation.homepagecontent

	return (
		<>
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

export async function getStaticProps({ locale }: HomePageProps) {
	const apolloClient = getApolloClient()

	const language = locale.toUpperCase()

	const data = await apolloClient.query({
		query: gql`
			query PostsContents($language: LanguageCodeFilterEnum!) {
				posts(where: { language: $language }) {
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
			language
		}
	})

	const content = await apolloClient.query({
		query: gql`
			query HomepageContent($language: LanguageCodeEnum!) {
				generalSettings {
					title
					description
				}
				page(id: "cG9zdDoxMA==") {
					translation(language: $language) {
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

	const posts = data?.data.posts.edges.map(({ node }: HomePageProps) => ({
		...node,
		path: `/posts/${node.slug}`
	}))

	const page = {
		...content?.data.generalSettings,
		...content?.data.page,
		...content?.data.page.translation
	}

	return {
		props: {
			page,
			language,
			posts
		}
	}
}
