import { ReactNode } from 'react'

// Meta.tsx

export interface MetaProps {
	seo: {
		title?: string
		metaDesc?: string
	}
}

// Layout.tsx + FadeIn.tsx

export interface LayoutProps {
	children: ReactNode
	className?: string
}

// index.tsx

export type LanguageCodeFilterEnum = 'en' | 'ru'

export interface PageProps {
	posts: PostProps[]
	page: any
	locale: LanguageCodeFilterEnum
	node: any
	pageId: string
}

// [postSlug].tsx

export interface Params {
	postSlug: string
}

export type GetStaticPathsContext = {
	locales: string[]
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

export interface PostPageProps {
	post: PostProps
	site: Site
	path: string
}

export type PathType = {
	params: {
		postSlug: string
	}
}

// index.tsx + [postSlug].tsx

export interface Translation {
	id: string
	slug: string
	content: string
	title: string
	language: {
		locale: string
		slug: string
	}
}

export type PostProps = {
	slug: string
	title: string
	excerpt: string
	path: string
	translation: Translation
	language: string
}

// Burger.tsx

export interface BurgerProps {
	toggleMenu: () => void
}

// ThemeToggle.tsx

export interface ThemeToggleProps {
	className?: string
}
