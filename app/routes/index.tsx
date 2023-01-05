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
		<section className="flex flex-col justify-center h-full min-h-screen ">
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
				<article className='flex flex-col justify-center space-y-3 text-center'>
					<h1>Muchas gracias por completar la encuesta!</h1>
					<p>
						Podrá ver los resultados de la mísma haciendo click{' '}
						<Link to={`/${answerId}`} className="underline">aquí</Link>
					</p>
				</article>
			)}
		</section>
	)
}
