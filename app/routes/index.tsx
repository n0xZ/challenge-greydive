import type { ActionArgs } from '@remix-run/node'
import {
	Form,
	Link,
	useActionData,
	useLoaderData,
	useTransition,
} from '@remix-run/react'
import { collection, addDoc } from 'firebase/firestore'
import { FormField } from '~/components/form-field'
import { Layout } from './$id'
import { firestore } from '~/services/firebase.server'
import items from '~/db.json'
import type { APICall } from '~/types'
import SuccessfulFormResponseAsset from '../../public/successful.svg'

// Esta función se encargará de obtener la información enviada del formulario, y se ejecutará en el server para poder crear la respuesta del formulario.
// Si éste ha sido exitoso, devolverá el ID del documento creado.

export const action = async ({ request }: ActionArgs) => {
	const formData = Object.fromEntries(await request.formData())
	const dbInstance = collection(firestore, 'formAnswer')
	const formAnswer = await addDoc(dbInstance, formData)
	const formAnswerId = formAnswer.id
	return formAnswerId
}
export const loader = async () => {
	return items as APICall
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

export default function Home() {
	const fields = useLoaderData<typeof loader>()
	const answerId = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'
	return (
		<Layout>
			{!answerId ? (
				<Form
					className="container flex flex-col justify-center w-full max-w-lg p-2 mx-auto space-y-10 xl:p-0 bg-light-800"
					method="post"
					ref={(e) => isSubmitting && e?.reset()}
				>
					{fields.items.map((item) => (
						<FormField item={item} key={item.name} disabled={isSubmitting} />
					))}
				</Form>
			) : (
				<article className="flex flex-col items-center justify-center space-y-3 text-center">
					<img
						src={SuccessfulFormResponseAsset}
						height={600}
						width={600}
						className="aspect-video"
						alt="Imagen que representa a una persona con un "
					/>
					<h1 className="mb-2 text-3xl">
						Muchas gracias por completar la encuesta!
					</h1>
					<p>
						Podrá ver los resultados de la mísma haciendo click{' '}
						<Link to={`/${answerId}`} className="underline">
							aquí
						</Link>
					</p>
				</article>
			)}
		</Layout>
	)
}
