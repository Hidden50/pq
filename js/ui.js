(function() {

app.components = {};

app.components.search = {
	container: document.querySelector(".search"),
	input: document.querySelector(".search input"),
	results: document.querySelector(".search .results"),
};

app.components.pokedata = {
	container: document.querySelector(".pokedata"),
	header: document.querySelector(".pokedata .header"),
	face: document.querySelector(".pokedata .header .faces"),
	name: document.querySelector(".pokedata .header .name"),
	moves: document.querySelector(".pokedata .moves .data"),
	recipes: document.querySelector(".pokedata .recipes .data"),
	bingos: document.querySelector(".pokedata .bingos .data"),
	stats: document.querySelector(".pokedata .stats .data"),
	slots: {
		info: document.querySelector(".pokedata .stoneslots .data"),
		atk: document.querySelector(".pokedata .stoneslots .input .atk"),
		hp: document.querySelector(".pokedata .stoneslots .input .hp"),
		output: document.querySelector(".pokedata .stoneslots .output"),
	},
	rawData: document.querySelector(".pokedata .rawdata .output"),

	setActivePokemon (pokemon) {
		if (!pokemon) return;

		this.activePokemon = pokemon;
		this.face.className = `faces face-${pokemon.dexNum}`;
		this.name.innerText = `${pokemon.dexNum} ${pokemon.name}`;
		this.formatMovelist();
		this.formatRecipes();
		this.formatBingos();
		this.formatStats();
		this.calculateSlotChances();
		this.rawData.innerText = JSON.stringify(pokemon, null, "\t");
	},
	clone () {
		this.container.insertAdjacentHTML('afterend',
			`<section class="pokedata">${
				this.container.innerHTML
			}</section>`
		);

		const inserted = this.container.nextElementSibling;
		const header = inserted.querySelector(".header");
		header.addEventListener('click', e => {
			this.toggleDetails(inserted);
			e.stopPropagation();
		});
		/*
		*   add a close button to remove the cloned pokedata
		*/
		const closeBtn = document.createElement("DIV");
		closeBtn.classList.add("btn-close");
		header.appendChild(closeBtn);
		closeBtn.addEventListener( 'click', e => {
			let section = e.target;
			while (section && section.nodeName !== "SECTION") {
				section = section.parentNode;
			}
			section.parentNode.removeChild(section);
			e.stopPropagation();
		});
	},
	toggleDetails (target = this.container) {
		const details = [...target.querySelectorAll("details")];
		let open = true;
		for (const detail of details) {
			if (detail.open) {
				open = false;
				break;
			}
		}
		for (const detail of details) {
			detail.open = open;
		}
	},
	getEvolutions (pokemon) {
		if (!pokemon) {
			pokemon = this.activePokemon;
		}
		const evolutions = [];
		while (pokemon) {
			evolutions.push(pokemon);
			pokemon = pokemon.preEvo && app.pokeData[pokemon.preEvo - 1];
		}
		return evolutions.reverse();
	},
	formatMovelist () {
		const evolutions = this.getEvolutions();

		this.moves.innerHTML = (
			evolutions
				.map( evo => (
					`<table><tr><th>${
						evo.name
					}</th></tr><tr><td>${
						evo.moves.join("</td></tr><tr><td>")
					}</td></tr></table>`
				))
				.join("")
		);
	},
	formatRecipes () {
		let pokemon = this.activePokemon;
		while (pokemon && !pokemon.recipes && pokemon.preEvo) {
			pokemon = app.pokeData[pokemon.preEvo - 1];
		}

		if (!pokemon || !pokemon.recipes) {
			this.recipes.innerHTML = (
				`<table><tr><th colspan="3">${
					pokemon && pokemon.name || "?"
				}</th></tr><tr><th>Dish</th><th>Quality</th><th>Chance</th></tr>` +
				"<tr><td>-</td><td>-</td><td>-</td></tr>"
			);
			return;
		}

		this.recipes.innerHTML = `<table><tr><th colspan="3">${
			pokemon.name
		}</th></tr><tr><th>Dish</th><th>Quality</th><th>Chance</th></tr>${
			Object.entries(pokemon.recipes)
			.map( ([recipeName, recipeChance]) =>
				`<tr><td>${
					recipeName
						.replace(/_/g, " ")
						.replace(/(\w+) (.*)/, "$1</td><td>$2")
				}</td><td>${
					recipeChance
				}</td></tr>`
			)
			.join("")
		}</table>`;
	},
	formatBingos () {
		const evolutions = this.getEvolutions();
		const evoNames = evolutions.map( evo => evo.name );
		this.bingos.innerHTML = (
			`<table><tr><th colspan="3">${
				evoNames.join(", ")
			}</th></tr>` +
			[0, 1, 2].map( i => (
				`<tr><td colspan="3">Slot ${
					i+1
				}</td></tr>${
					evolutions.map( evo => (
						`<tr>${
							evo.bingos[i].map( bingo => (
								`<td>${bingo}</td>`
							)).join("")
						}</tr>`
					)).join("")
				}`
			)).join("")
			+ "</table>"
		);
	},
	formatStats () {
		const evolutions = this.getEvolutions();
		const potBonuses = {
			Gold: [300, 400],
			Silver: [150, 250],
			Bronze: [50, 100],
			Grey: [0, 10],
		};
		this.stats.innerHTML = (
			evolutions.map( evo => (
				`<table>${
					`<tr><th colspan="2">${
						evo.name
					}</th></tr>${
						Object.entries(potBonuses).map( ([potType, potBonus]) => (
							`<tr><th>${potType} Pot</th><td>${
								String(evo.baseATK + 100 + potBonus[0]).padStart(4)
							} - ${
								String(evo.baseATK + 100 + potBonus[1]).padStart(4)
							} ATK<br>${
								String(evo.baseHP + 100 + potBonus[0]).padStart(4)
							} - ${
								String(evo.baseHP + 100 + potBonus[1]).padStart(4)
							} HP</td></tr>`
						)).join("")
					}`
				}</table>`
			)).join("")
		);
	},
	calculateSlotChances () {
		const pokemon = this.getEvolutions()[0];

		this.slots.info.innerHTML = (
			`<table><tr><th colspan="2">${
				pokemon.name
			}</th></tr><tr><th>HP Slot Chance</th><td>${
				pokemon.stoneSlots.hpChanceWeight
			}%</td></tr><tr><th>ATK Slot Chance</th><td>${
				pokemon.stoneSlots.atkChanceWeight
			}%</td></tr><tr><th>Multislot Chance</th><td>${
				(100 * pokemon.stoneSlots.multiSlotChances[0]).toFixed(0)
			}%</td></tr></table>`
		);

		const atkSlots = this.slots.atk.value;
		const hpSlots = this.slots.hp.value;

		const {hpChanceWeight, atkChanceWeight, multiSlotChances} = pokemon.stoneSlots;
		const desc = [
			"None",
			"Golf Bag",
			"Kang Chair",
			"Both",
		];

		this.slots.output.innerHTML = (
			`<table><tr><td colspan="2">Chance for ${
				// grammar: use "an" before a vowel sound
				"AEIOU".includes(pokemon.name[0]) ?
					"an" :
				"a"
			} ${
				pokemon.name
			}'s stone page to fit ${
				atkSlots
			} ATK stones and ${
				hpSlots
			} HP stones:</td></tr><tr><th>Decoration</th><th>Probability</th></tr>${
				multiSlotChances.map( (multiSlotChance, i) => {
					const prob = (100 * app.math.slotProbability(
						atkSlots,
						hpSlots,
						hpChanceWeight,
						atkChanceWeight,
						multiSlotChance,
					) ).toFixed(10);
					return `<tr><td>${desc[i]}</td><td>${prob}%</td></tr>`;
				}).join("")
			}</table>`
		);
	},
};

app.updateUI = (updateActive = true, updateSearchResults = true, search) => {
	let phrases = (search || app.components.search.input.value).trim();
	const hideEvos = (phrases === "");

	phrases = (
		phrases
			.toLowerCase()
			.split(/\s*,\s*/)
	);

	const pokeData = (
		app.pokeData
			.filter( pokemon => (
				(!hideEvos || !pokemon.evolutions) &&
				phrases.every( phrase => (
					app.pokeTypes.some( type => type.toLowerCase() === phrase.toLowerCase() ) ?
						pokemon.types.some( type => type.toLowerCase() === phrase.toLowerCase() ) :
					pokemon.name.toLowerCase().includes(phrase) ||
					pokemon.types.some( type => type.toLowerCase().includes(phrase) ) ||
					pokemon.behavior.toLowerCase().includes(phrase) ||
					(pokemon.recipes && Object.keys(pokemon.recipes).some( dish => dish.toLowerCase().includes(phrase) )) ||
					pokemon.moves.some( move => move.toLowerCase().includes(phrase) ) ||
					pokemon.bingos.some( slots => (
						slots.some( bingo => (
							bingo.toLowerCase().includes(phrase)
						))
					))
				))
			))
			.sort( (x,y) => (
				phrases.includes(y.name.toLowerCase()) || (
					phrases.some(phrase => y.name.toLowerCase().startsWith(phrase)) &&
					!phrases.some(phrase => x.name.toLowerCase().startsWith(phrase))
				) || (
					app.components.pokedata.getEvolutions(x).reverse().indexOf(x) -
					app.components.pokedata.getEvolutions(y).reverse().indexOf(y)
				) ||
				(app.pokeData.indexOf(x) - app.pokeData.indexOf(y))
			))
	);

	if (updateActive) {
		if (!search) {
			document.documentElement.classList.remove("compact");
		} else {
			app.components.pokedata.setActivePokemon(pokeData[0]);
			document.documentElement.classList.add("compact");
		}
	}

	if (updateSearchResults) {
		app.components.search.results.innerHTML = (
			pokeData
//					.map( data => JSON.stringify(data, null, "\t") )
//					.join(",\r\n")
				.map( pokemon => `<div class="faces face-${pokemon.dexNum}" title="${pokemon.name}"></div>` )
				.join("")
		);
	}

};

window.addEventListener('load', () => {
	app.updateUI();
	if (window.innerWidth >= 850) {
		for (const details of [...document.querySelectorAll("details")]) {
			details.open = true;
		}
	}

	app.components.search.input.addEventListener('input', app.updateUI);
	app.components.search.input.addEventListener('focus', () => setTimeout(() => {
		app.components.search.container.classList.add("searching");
	}, 100));
	app.components.search.input.addEventListener('blur', () => setTimeout(() => {
		app.components.search.container.classList.remove("searching");
		app.searchbarClicked = false;
	}, 100));
	app.components.search.input.addEventListener('keydown', e => {
		if (!e.ctrlKey && !e.AltKey && !e.shiftKey && e.key === "Enter") {
			const search = app.components.search.input.value;
			app.updateUI(true, true, search);
			app.components.search.input.value = "";
			app.updateUI(false, true);
		} else if (!e.ctrlKey && !e.AltKey && !e.shiftKey && e.key === "Escape") {
			app.components.search.input.blur();
		}
	});

	document.addEventListener('keydown', e => {
		if (document.activeElement.nodeName !== "INPUT") {
			if (!e.ctrlKey && !e.AltKey && !e.shiftKey && /(^[\w ]$)|Backspace/.test(e.key)) {
				app.components.search.input.focus();
			}
		}
	});

	app.components.pokedata.slots.atk.addEventListener('input',
		app.components.pokedata.calculateSlotChances.bind(app.components.pokedata)
	);
	app.components.pokedata.slots.hp.addEventListener('input',
		app.components.pokedata.calculateSlotChances.bind(app.components.pokedata)
	);

	app.components.search.container.addEventListener('click', e => {
		if (e.target === app.components.search.input) {
			if (!app.searchbarClicked) {
				app.components.search.input.select();
				app.searchbarClicked = true;
			}
		} else if (e.target && e.target.title) {
			if (e.ctrlKey && app.components.pokedata.activePokemon) {
				app.components.pokedata.clone();
			}
			app.updateUI(true, false, e.target.title);
		}
	});

	app.components.pokedata.header.addEventListener('click', () => {
		app.components.pokedata.toggleDetails();
		e.stopPropagation();
	});
});

})();
