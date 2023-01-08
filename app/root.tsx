import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import styles from './styles/app.css'
export const links: LinksFunction = () => [
	{ href: styles, rel: 'stylesheet' },
	{
		href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap',
		rel: 'stylesheet',
	},
]
export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Challenge  Greydive - Gonzalo Molina',
	viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className='font-inter'>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
