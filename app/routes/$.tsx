import { redirect } from '@remix-run/node'

// Esta ruta se encargará unicamente de 'catchear' todas las rutas que no coincidan con las existentes (es decir, la principal y la dinámica)
// Y se encargará de reedirigir al usuario al home, en el caso de que éste no se encuentre en las rutas mencionadas.
export const loader = () => {
	return redirect('/', { status: 302 })
}
