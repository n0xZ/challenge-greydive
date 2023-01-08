import type { Item } from '~/types'

type FormFieldProps = {
	item: Item
	disabled: boolean
	value?: string
}
export const FormField = ({
	item: { label, type, name, options, ...rest },
	disabled,
	value,
}: FormFieldProps) => {
	return (
		<aside className="flex flex-col justify-center w-full max-w-lg space-y-3">
			{type !== 'submit' ? <label className="font-semibold">{label}</label> : null}
			{type === 'select' ? (
				<select
					name={name}
					value={value}
					{...rest}
					className="w-full max-w-lg px-3 py-3 bg-sky-50 "
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
					value={value}
					{...rest}
					className="w-full max-w-lg px-3 py-3 rounded-lg outline-none bg-sky-50 "
				/>
			) : null}
		</aside>
	)
}
