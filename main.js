let modalWrapper = document.createElement("div");
let pais = []; //an array to hold all the alpha3Code for all countries
let prue = [];
let idioma = [];
let capital = [];
let puntos = 0;
let pistas = 0;
let region = [];
let i = 0;

const fetchCountry = async (event) => {
	//old api that was changed - `https://restcountries.eu/rest/v2/all `;
	const apiEndpoint = `https://restcountries.com/v3.1/all`

	fetch(apiEndpoint)
		.then(response => response.json())
		.then((data) => {

			data.forEach(element => {
				pais[i] = element.name.common;
				region[i] = element.region;
				idioma[i] = element.region;
				capital[i] = element.region;

				i++;
			})

			Adivina();
		})

}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function Adivina() {
	
	numero = getRandomInt(130);
	region[300] = region[numero];
	idioma[300] = idioma[i];
	capital[300] = capital[i];
	//old api that was changed - `https://restcountries.eu/rest/v2/all `;
	const apiEndpoint = `https://restcountries.com/v3.1/name/${pais[numero]}`

	fetch(apiEndpoint)
		.then(response => response.json())
		.then((data) => {

			data.forEach(element => {
				prue[1] = element;
				pais[1] = element.name.common;

			})
			bandera(prue[1]);
		})
}

function similarity(s1, s2) {
	var longer = s1;
	var shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	var longerLength = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	var costs = new Array();
	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;
		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue),
							costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}


function pista() {
	pistas++

	switch (pistas) {
		case 1:
			var borrardiv = document.getElementById("text1").lastChild;
			document.getElementById("text1").removeChild(borrardiv);
			const newElement = document.createElement("div");
			newElement.classList.add("div");
			newElement.innerHTML = `<h3 id="h2">El pais es de la Region: ${region[300]} <h3>`;
			document.querySelector("#text1").appendChild(newElement);

			puntos -= 10;
			break;
		case 2:
			var borrardiv = document.getElementById("text1").lastChild;
			document.getElementById("text1").removeChild(borrardiv);
			const newElement1 = document.createElement("div");
			newElement1.classList.add("div");
			newElement1.innerHTML = `<h3 id="h2">El pais habla el idioma: ${idioma[300]} <h3>`;
			document.querySelector("#text1").appendChild(newElement1);

			puntos -= 20;

			break;
		case 3:
			var borrardiv = document.getElementById("text1").lastChild;
			document.getElementById("text1").removeChild(borrardiv);
			const newElement2 = document.createElement("div");
			newElement2.classList.add("div");
			newElement2.innerHTML = `<h3 id="h2">La capital es: ${capital[300]} <h3>`;
			document.querySelector("#text1").appendChild(newElement2);

			puntos -= 30;
			break;
		default:
			break;
	}
}

function Rendirse() {
	document.getElementById('text1').innerHTML = '';

	const newElement = document.createElement("div");
	newElement.classList.add("div");
	newElement.id = "page";
	newElement.innerHTML = `<h2>El pais era: ${pais[1]}</h2>`;
	document.querySelector("#text1").appendChild(newElement);
	
	document.getElementById('paises2').innerHTML = '';
	Adivina();
}

function mostrar() {
	let inputValue = document.getElementById("paiss").value;
	inputValue = inputValue.toLowerCase();
	pais[1] = pais[1].toLowerCase();

	if (inputValue == pais[1]) {
		document.getElementById('text2').innerHTML = '';
		document.getElementById('text1').innerHTML = '';

		const newElement = document.createElement("div");
		newElement.classList.add("div");
		puntos += 100;
		newElement.innerHTML = `<h2>Puntuacion: ${puntos}</h2>`;
		document.querySelector("#text2").appendChild(newElement);

		document.getElementById('paises2').innerHTML = '';
		Adivina();
	} else {
		var borrardiv = document.getElementById("text1").lastChild;
		document.getElementById("text1").removeChild(borrardiv);
		simi = similarity(inputValue, pais[1]);
		simi = simi * 100;
		simi = simi.toString();
		similar = simi.substr(0, 4)

		const newElement = document.createElement("div");
		newElement.classList.add("div");
		newElement.innerHTML = `<h2>Porcentaje de comparacion: ${similar} <h2> \n
		<button onclick="pista()">Pista</button>`;
		document.querySelector("#text1").appendChild(newElement);

	}
}

function bandera(element) {
	
	const newElement = document.createElement("div");
	newElement.id = "page";
	newElement.classList.add("div");
	newElement.innerHTML = `					
				<div class="country-details" id="Martin" id="divs">		
					<img style="width: 50%;height: 50%;" class="country-details-img" id="divs" src= ${element.flags.svg} alt="sos hacker ${element.name.common} " tabindex=0>
					<h1 style="text-align: center;">¿De cual pais es esta bandera?</h1>
					<input type="text" name="paiss" id="paiss">
					<button onclick="mostrar()">Verificar</button><button onclick="Rendirse()">Me rindo</button>
			</div>     
			`;
	document.querySelector("#paises2").appendChild(newElement);
}

fetchCountry();