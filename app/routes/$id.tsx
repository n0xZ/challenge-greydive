import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getDoc, doc } from 'firebase/firestore'
import { firestore } from '~/services/firebase.server'
import type { FormValues } from '~/types'

export const loader = async ({ params }: LoaderArgs) => {
	const dbInstance = doc(firestore, 'formAnswer', params.id!)

	const formAnswerDoc = await getDoc(dbInstance)
	const myFormAnswer = formAnswerDoc.data() as FormValues
	return myFormAnswer
}
export default function FormAnswer() {
	const data = useLoaderData<typeof loader>()
	return <div> {JSON.stringify(data)}</div>
}
