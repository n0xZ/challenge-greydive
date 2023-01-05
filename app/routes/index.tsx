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
import items from '~/db.json'
import { firestore } from '~/services/firebase.server'
import type { APICall } from '~/types'

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

export default function Home() {
	const fields = useLoaderData<typeof loader>()
	const answerId = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'
	return (
		<section className="min-h-screen h-full grid place-items-center ">
			{!answerId ? (
				<Form
					className="flex flex-col justify-center space-y-10 container w-full mx-auto max-w-lg xl:p-0 p-2 bg-light-800"
					method="post"
					ref={(e) => isSubmitting && e?.reset()}
				>
					{fields.items.map((item) => (
						<FormField item={item} key={item.name} disabled={isSubmitting} />
					))}
				</Form>
			) : (
				<>
					<h2>Gracias por completar la encuesta!</h2>
					<p>
						Podrá ver los resultados de la mísma haciendo click{' '}
						<Link to={`/${answerId}`}>Aquí</Link>
					</p>
				</>
			)}
		</section>
	)
}
