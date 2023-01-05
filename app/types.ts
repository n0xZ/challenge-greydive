export interface APICall {
	items: Item[]
}

export interface Item {
	type: string
	label: string
	name?: string
	required?: boolean
	options?: Option[]
}

export interface Option {
	label: string
	value: string
}

export type FormValues = {
	full_name: string
	email: string
	birth_date: Date
	country_of_origin: string
	terms_and_conditions: string
}
