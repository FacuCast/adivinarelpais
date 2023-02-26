let modalWrapper = document.createElement("div");
let pais = []; //an array to hold all the alpha3Code for all countries
let prue = [];
let i = 0;

const fetchCountry = async (event) => {
	//old api that was changed - `https://restcountries.eu/rest/v2/all `;
	const apiEndpoint = `https://restcountries.com/v3.1/all`

	fetch(apiEndpoint)
		.then(response => response.json())
		.then((data) => {

			data.forEach(element => {
				pais[i] = element.name.common;
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

function mostrar() {
	let inputValue = document.getElementById("paiss").value;
	inputValue = inputValue.toLowerCase();
	pais[1] = pais[1].toLowerCase();

	if (inputValue == pais[1]) {
		var borrardiv = document.getElementById("text1").lastChild;
		document.getElementById("text1").removeChild(borrardiv);
		const newElement = document.createElement("div");
		newElement.classList.add("div");
		newElement.innerHTML = `<h2>Felicitaciones!!!!</h2>`;
		document.querySelector("#modal").appendChild(newElement);
	} else {
		var borrardiv = document.getElementById("text1").lastChild;
		document.getElementById("text1").removeChild(borrardiv);
		simi = similarity(inputValue, pais[1]);
		simi = simi * 100;
		simi = simi.toString();
		similar = simi.substr(0, 4)

		const newElement = document.createElement("div");
		newElement.classList.add("div");
		newElement.innerHTML = `<h2>Porcentaje de comparacion: ${similar} <h2> `;
		document.querySelector("#text1").appendChild(newElement);

	}
}

function bandera(element) {

	const newElement = document.createElement("div");
	newElement.classList.add("div");
	newElement.innerHTML = `					
					
				<div class="country-details">		
					<img class="country-details-img" src= ${element.flags.svg} alt="sos hacker ${element.name.common} " tabindex=0>
					<h1 style="text-align: center;">¿De cual pais es esta bandera?</h1>
					<input type="text" name="paiss" id="paiss">
					<button onclick="mostrar()">Verificar</button>
			</div>     
			`;
	document.querySelector("#modal").appendChild(newElement);
}

fetchCountry();