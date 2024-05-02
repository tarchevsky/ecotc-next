import Link from 'next/link'
import cn from 'clsx'
import styles from './Header.module.scss'
import Burger from '@/components/burger/Burger'
import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/themeToggle/ThemeToggle'
import { useRouter } from 'next/router'

const Header = () => {
	const [isMenuActive, setIsMenuActive] = useState(false)
	const toggleMenu = () => {
		setIsMenuActive(!isMenuActive)
	}

	useEffect(() => {
		if (isMenuActive) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuActive])

	const { locale: activeLocale, locales, asPath } = useRouter()

	const availableLocales = locales
		? locales.filter(locale => locale !== activeLocale)
		: []

	return (
		<header className='relative flex justify-between md:justify-between items-center py-4'>
			<Link className={styles.logo} href='/'>
				<h1 className={styles.h1}>
					Eco Technics Consulting LLC
					<br />
					ООО Эко Техник Консалтинг
				</h1>
				{availableLocales.map(locale => {
					if (locale === 'en') {
						return (
							<h2 className={styles.h2} key={locale}>
								Продвижение экологически безопасных <br />
								технологий и оборудования
							</h2>
						)
					} else {
						return (
							<h2 className={styles.h2} key={locale}>
								Promotion of environmentally safe <br />
								technologies and equipment
							</h2>
						)
					}
				})}
			</Link>
			<nav
				className={cn(
					{ [styles.active]: isMenuActive },
					'fixed md:static z-10 w-full h-full md:w-auto md:h-auto end-0 bottom-0 -translate-y-full md:translate-y-0 opacity-0 md:opacity-100 transition-all duration-300 ease-out'
				)}
			>
				<ul
					tabIndex={0}
					className='absolute md:static menu flex-nowrap md:menu-horizontal start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 md:translate-x-0'
				>
					{activeLocale === 'ru' ? (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link className='px-[10px] btn btn-ghost font-normal' href='/'>
								Главная
							</Link>
						</li>
					) : (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link className='px-[10px] btn btn-ghost font-normal' href='/en'>
								Home
							</Link>
						</li>
					)}
					{activeLocale === 'ru' ? (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href='/about'
							>
								О нас
							</Link>
						</li>
					) : (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href='/en/about'
							>
								About
							</Link>
						</li>
					)}
					{activeLocale === 'ru' ? (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href='/technology'
							>
								Технологии и оборудование
							</Link>
						</li>
					) : (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href='/en/technology'
							>
								Technology and equipment
							</Link>
						</li>
					)}
					{activeLocale === 'ru' ? (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href='/consulting'
							>
								Консалтинг
							</Link>
						</li>
					) : (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href='/en/consulting'
							>
								Consulting
							</Link>
						</li>
					)}
					{activeLocale === 'ru' ? (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href='/contacts'
							>
								Контакты
							</Link>
						</li>
					) : (
						<li
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href='/en/contacts'
							>
								Contacts
							</Link>
						</li>
					)}
					{availableLocales.map(locale => {
						return (
							<li
								key={locale}
								className={cn(
									styles.item,
									'block text-center opacity-0 md:opacity-100'
								)}
							>
								<Link
									href={asPath}
									locale={locale}
									className='px-[10px] btn btn-ghost font-normal'
								>
									{locale.toUpperCase()}
								</Link>
							</li>
						)
					})}
					<ThemeToggle className='md:m-auto' />
				</ul>
			</nav>
			<Burger toggleMenu={toggleMenu} />
		</header>
	)
}

export default Header
