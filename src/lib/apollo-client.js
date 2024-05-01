import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

let client

/**
 * getApolloClient
 */

export function getApolloClient() {
	if (!client) {
		client = _createApolloClient()
	}
	return client
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
	return new ApolloClient({
		link: new HttpLink({
			uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT
		}),
		cache: new InMemoryCache()
		// defaultOptions: { // временное ограничение кеширования
		// 	watchQuery: {
		// 		fetchPolicy: 'no-cache',
		// 		errorPolicy: 'ignore'
		// 	},
		// 	query: {
		// 		fetchPolicy: 'no-cache',
		// 		errorPolicy: 'all'
		// 	}
		// }
	})
}

const cache = new InMemoryCache({
	typePolicies: {
		Language: {
			keyFields: ['ru', 'en']
		}
	}
})
