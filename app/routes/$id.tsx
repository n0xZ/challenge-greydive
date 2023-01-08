import type { LoaderArgs } from '@remix-run/node'
import { Form, useCatch, useLoaderData } from '@remix-run/react'
import type { ReactNode } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { FormField } from '~/components/form-field'
import { firestore } from '~/services/firebase.server'
import NotFoundAsset from '../../public/not-found.svg'
import type { FormValues } from '~/types'

export const loader = async ({ params }: LoaderArgs) => {
	const id = params.id
	const dbInstance = doc(firestore, 'formAnswer', id)
	const formAnswerDoc = await getDoc(dbInstance)

	const myFormAnswer = formAnswerDoc.data()
	if (!myFormAnswer) throw new Response('Answer does not exist', { status: 404 })
	return myFormAnswer as FormValues
}
export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="flex flex-col justify-center h-full min-h-screen">
			{children}
		</main>
	)
}
export const ErrorBoundary = () => {
	return (
		<Layout>
			<h2>Ocurrió un error. Por favor, vuelva a intentarlo más tarde</h2>
		</Layout>
	)
}

export const CatchBoundary = () => {
	const caught = useCatch()
	if (caught.status === 404)
		return (
			<Layout>
				<img
					src={NotFoundAsset}
					alt="Imagen 404, que representa que no se ha encontrado el resultado del formulario."
				/>
				<h2>Ups! Al parecer ocurrió un error</h2>

				<p>{caught.data}</p>
			</Layout>
		)
	return (
		<Layout>
			<h2>Ocurrió un error.</h2>
		</Layout>
	)
}

export default function FormAnswer() {
	const data = useLoaderData<typeof loader>()

	return (
		<Layout>
			<Form
				method="post"
				className="container flex flex-col justify-center w-full max-w-lg p-2 mx-auto space-y-10 xl:p-0 "
			>
				<h2 className="text-xl text-center">Resultados de la encuenta</h2>
				<FormField
					item={{
						label: 'Nombre completo',
						type: 'text',
						name: 'full_name',
						required: true,
					}}
					disabled
					value={data.full_name}
				/>

				<FormField
					item={{
						label: 'Año de nacimiento',
						type: 'date',
						name: 'birth_date',
						required: true,
					}}
					disabled
					value={data.birth_date}
				/>
				<FormField
					item={{
						label: 'País de origen',
						type: 'text',
						name: 'country_of_origin',
						required: true,
					}}
					disabled
					value={data.country_of_origin}
				/>
			</Form>
		</Layout>
	)
}
