/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en', 'ru'],
		defaultLocale: 'ru',
		localeDetection: false // Отключает автоматическое определение локали
	}
}

module.exports = nextConfig
