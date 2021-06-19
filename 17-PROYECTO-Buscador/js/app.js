// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

// Generar objeto con la busqueda
const datosBusqueda = {
	marca: '',
	year: '',
	minimo: '',
	maximo: '',
	puertas: '',
	transmision: '',
	color: '',
};
// Eventos
document.addEventListener('DOMContentLoaded', () => {
	// Muestra los automoviles al cargar
	mostrarAutos(autos);

	// Llena las opciones de años
	llenarSelect();
});

// Event listener para los select de busqueda
marca.addEventListener('change', (e) => {
	datosBusqueda.marca = e.target.value;
	// console.log(datosBusqueda);
	filtrarAuto();
});
year.addEventListener('change', (e) => {
	datosBusqueda.year = e.target.value;
	filtrarAuto();
});
minimo.addEventListener('change', (e) => {
	datosBusqueda.minimo = e.target.value;
	filtrarAuto();
});
maximo.addEventListener('change', (e) => {
	datosBusqueda.maximo = e.target.value;
	filtrarAuto();
});
puertas.addEventListener('change', (e) => {
	datosBusqueda.puertas = e.target.value;
	filtrarAuto();
});
transmision.addEventListener('change', (e) => {
	datosBusqueda.transmision = e.target.value;
	filtrarAuto();
});
color.addEventListener('change', (e) => {
	datosBusqueda.color = e.target.value;
	filtrarAuto();
	// console.log(datosBusqueda);
});

// Funciones
function mostrarAutos(autos) {
	limpiarHTML(); // Elimina html previo
	autos.forEach((auto) => {
		const { marca, modelo, year, puertas, transmision, precio, color } = auto;
		const autoHTML = document.createElement('p');

		autoHTML.innerHTML = `
      ${marca} ${modelo} -${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color} 
    `;

		// insertar en el html
		resultado.appendChild(autoHTML);
	});
}

// Limpiar html
function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}
// Genera los años del select
function llenarSelect() {
	for (let i = max; i >= min; i--) {
		const opcion = document.createElement('option');
		opcion.value = i;
		opcion.textContent = i;
		year.appendChild(opcion);
	}
}
// Funcion que filta en base a la busqueda
function filtrarAuto() {
	const resultado = autos
		.filter(filtrarMarca)
		.filter(filtrarYear)
		.filter(filtrarMinimo)
		.filter(filtrarMaximo)
		.filter(filtrarPuertas)
		.filter(filtrarTransmision)
		.filter(filtrarColor);
	// console.log(resultado);
	if (resultado.length) {
		mostrarAutos(resultado);
	} else {
		noResultado();
	}
}
function noResultado() {
	limpiarHTML();
	const noResultado = document.createElement('div');
	noResultado.classList.add('alerta', 'error');
	noResultado.textContent = 'No hay resultados. El auto con las caracteristicas elegidas no esta disponible';
	resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
	if (datosBusqueda.marca) {
		return auto.marca === datosBusqueda.marca;
	} else {
		return auto;
	}
}

function filtrarYear(auto) {
	if (datosBusqueda.year) {
		return auto.year === parseInt(datosBusqueda.year);
	} else {
		return auto;
	}
}

function filtrarMinimo(auto) {
	if (datosBusqueda.minimo) {
		return auto.precio >= datosBusqueda.minimo;
	} else {
		return auto;
	}
}

function filtrarMaximo(auto) {
	if (datosBusqueda.maximo) {
		return auto.precio <= datosBusqueda.maximo;
	} else {
		return auto;
	}
}

function filtrarPuertas(auto) {
	if (datosBusqueda.puertas) {
		return auto.puertas === parseInt(datosBusqueda.puertas);
	} else {
		return auto;
	}
}

function filtrarTransmision(auto) {
	if (datosBusqueda.transmision) {
		return auto.transmision === datosBusqueda.transmision;
	} else {
		return auto;
	}
}

function filtrarColor(auto) {
	if (datosBusqueda.color) {
		return auto.color === datosBusqueda.color;
	} else {
		return auto;
	}
}
