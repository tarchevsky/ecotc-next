export type LanguageCodeFilterEnum = 'en' | 'ru'

export type HomePageProps = {
	posts: Post[]
	page: any
	locale: LanguageCodeFilterEnum
	node: any
}

export interface Params {
	postSlug: string
}

export type GetStaticPathsContext = {
	locales: string[]
}

export type Translation = {
	id: string
	slug: string
	content: string
	title: string
	language: {
		locale: string
		slug: string
	}
}

export type Post = {
	slug: string
	title: string
	excerpt: string
	path: string
	translation: Translation
	language: string
}

export type Site = {
	title: string
}

export interface PostEdge {
	node: {
		id: string
		title: string
		slug: string
	}
}

export interface Props {
	post: Post
	site: Site
	path: string
}

export type PathType = {
	params: {
		postSlug: string
	}
}
