import React, { Fragment, useState } from "react"
import {v4 as uuidv4} from "uuid"
import PropTypes from 'prop-types';

function Formulario({ crearCita }) {
	//Crear state de las citas
	const [cita, actualizarCita] = useState({
		mascota: "",
		propietario: "",
		fecha: "",
		hora: "",
		sintomas: "",
	})
	const [error, actualizarError] = useState(false)
	const actualizarState = (e) => {
		actualizarCita({
			...cita,
			[e.target.name]: e.target.value,
		})
	}
	//Get the Values:
	const { mascota, propietario, fecha, hora, sintomas } = cita
	const submitCita = (e) => {
		e.preventDefault()
		//Validation :
		if (
			mascota.trim() === "" ||
			propietario.trim() === "" ||
			fecha.trim() === "" ||
			hora.trim() === "" ||
			sintomas.trim() === ""
		) {
			actualizarError(true)
			return
		}
		console.log("Enviando")

		crearCita(cita)

		actualizarError(false)
		//Asigne an ID:
		cita.id = uuidv4()
		//Create Cita:
		//Restore the From:
		actualizarCita({
			mascota: "",
			propietario: "",
			fecha: "",
			hora: "",
			sintomas: "",
		})
	}
	return (
		<Fragment>
			<h2>Crear Citas &reg;</h2>
			{error ? (
				<p className='alerta-error'>todos los campos son obligatorios</p>
			) : null}
			<form onSubmit={submitCita}>
				<label>Nombre Mascota</label>
				<input
					type='text'
					name='mascota'
					className='u-full-width'
					placeholder='Nombre Mascota'
					onChange={actualizarState}
					value={mascota}
				/>
				<label>Nombre Dueño</label>
				<input
					type='text'
					name='propietario'
					className='u-full-width'
					placeholder='Nombre del Propietario'
					onChange={actualizarState}
					value={propietario}
				/>
				<label>Fecha</label>
				<input
					type='date'
					name='fecha'
					className='u-full-width'
					onChange={actualizarState}
					value={fecha}
				/>
				<label>Hora</label>
				<input
					type='time'
					name='hora'
					className='u-full-width'
					onChange={actualizarState}
					value={hora}
				/>
				<label>Sintomas</label>
				<textarea
					className='u-full-width'
					name='sintomas'
					onChange={actualizarState}
					value={sintomas}></textarea>
				<button className='u-full-width button-primary' type='submit'>
					Agrear Citar
				</button>
			</form>
		</Fragment>
	)
}
Formulario.protoTypes={
	crearCita : PropTypes.func.isRequired
}
export default Formulario
