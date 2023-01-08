import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { Form, useCatch, useLoaderData } from '@remix-run/react'
import type { ReactNode } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { FormField } from '~/components/form-field'
import { firestore } from '~/services/firebase.server'
import NotFoundAsset from '../../public/not-found.svg'
import SuccessfulFormResponseAsset from '../../public/successful-form-response.svg'
import type { FormValues } from '~/types'


// Esta función se encargará de buscar  por parámetros los documentos asociados al param 'id'. y devolver la data de dicho documento.
export const loader = async ({ params }: LoaderArgs) => {
	const id = params.id
	const dbInstance = doc(firestore, 'formAnswer', id)
	const formAnswerDoc = await getDoc(dbInstance)

	const myFormAnswer = formAnswerDoc.data()
	if (!myFormAnswer) throw new Response('Answer does not exist', { status: 404 })
	return myFormAnswer as FormValues
}
export const meta: MetaFunction = ({ data }) => ({
	title: ` Challenge  Greydive - Gonzalo Molina | Resultados de la encuesta: ${data.full_name}`,
})

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
			<h1 className="text-2xl font-semibold text-center">
				Ha ocurrido un error 😢
			</h1>
			<p className="text-center">Por favor, vuelva a intentarlo más tarde.</p>
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
					height={600}
					width={600}
					className="aspect-video"
					alt="Imagen 404, que representa que no se ha encontrado el resultado del formulario."
				/>
				<h1 className="text-2xl font-semibold text-center">
					Ups! Al parecer ocurrió un error
				</h1>

				<p>{caught.data}</p>
			</Layout>
		)
	return (
		<Layout>
			<h1 className="text-2xl font-semibold text-center">
				Ha ocurrido un error 😢
			</h1>
			<p className="text-center">Por favor, vuelva a intentarlo más tarde.</p>
		</Layout>
	)
}

export default function FormAnswer() {
	const data = useLoaderData<typeof loader>()

	return (
		<Layout>
			<Form
				method="post"
				className="container flex flex-col items-center justify-center w-full max-w-lg p-2 mx-auto space-y-10 xl:p-0 "
			>
				<h1 className="text-2xl font-semibold text-center">
					Resultados de la encuesta
				</h1>
				<img
					src={SuccessfulFormResponseAsset}
					height={400}
					width={400}
					className="rounded-lg aspect-video bg-light-50"
					alt="Imagen 404, que representa que no se ha encontrado el resultado del formulario."
				/>
				<p>Muchas gracias por participar de la encuesta!</p>
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
