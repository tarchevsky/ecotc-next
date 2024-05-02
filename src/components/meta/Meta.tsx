import Head from 'next/head'
import { MetaProps } from '@/types'

const Meta = ({ seo }: MetaProps) => {
	return (
		<Head>
			<title>{seo.title}</title>
			<meta name='description' content={seo.metaDesc} />
		</Head>
	)
}

export default Meta
