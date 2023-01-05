import type { Item } from '~/types'

type FormFieldProps = {
	item: Item
	disabled: boolean
	value?: string
}
export const FormField = ({
	item: { label, type, name, options, ...rest },
	disabled,
}: FormFieldProps) => {
	return (
		<aside className="w-full max-w-lg space-y-3 flex flex-col justify-center">
			{type !== 'submit' ? <label className="font-semibold">{label}</label> : null}
			{type === 'select' ? (
				<select
					name={name}
					{...rest}
					className={`w-full max-w-lg px-3 py-3 ${
						!disabled ? 'bg-sky-50' : 'bg-sky-200'
					} rounded-lg outline-none  `}
					disabled={disabled}
				>
					{options?.map((option) => (
						<option value={option.value} key={option.value}>
							{option.label}
						</option>
					))}
				</select>
			) : null}
			{type === 'submit' ? (
				<input
					name={name}
					type={type}
					disabled={disabled}
					{...rest}
					className={`w-full max-w-lg px-3 py-3 font-bold text-white ${
						!disabled ? 'bg-violet-400' : 'bg-violet-200'
					} rounded-lg outline-none  `}
				/>
			) : null}

			{type !== 'select' && type !== 'checkbock' && type !== 'submit' ? (
				<input
					name={name}
					type={type}
					disabled={disabled}
					{...rest}
					className={`w-full max-w-lg px-3 py-3  ${
						!disabled ? 'bg-sky-50' : 'bg-sky-200'
					} rounded-lg outline-none  `}
				/>
			) : null}
		</aside>
	)
}
