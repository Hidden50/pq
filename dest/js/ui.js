(function() {

app.components = {};

app.components.search = {
	container: document.querySelector(".search"),
	title: document.querySelector(".search .title"),
	input: document.querySelector(".search input"),
	results: document.querySelector(".search .results"),
};

app.components.pokedata = {
	container: document.querySelector(".pokedata"),
	header: document.querySelector(".pokedata .header"),
	face: document.querySelector(".pokedata .header .faces"),
	name: document.querySelector(".pokedata .header .name"),
	sideBySideButton: document.querySelector(".pokedata .header .btn-add"),
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
		this.name.innerHTML = `<small>#${pokemon.dexNum}</small> ${pokemon.name}`;
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
		const closeBtn = header.querySelector(".btn-add");
		closeBtn.classList.remove("btn-add");
		closeBtn.classList.add("btn-close");
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
		while (pokemon.evolutions && pokemon.evolutions.length === 1) {
			pokemon = app.pokeData[pokemon.evolutions[0].dexNum - 1];
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
					`<table><tr><th colspan="2">${
						evo.name
					}</th></tr>${
						evo.moves.map( move => {
							const id = move
								.toLowerCase()
								.replace(/[^a-z0-9]+/g, '');

							return `<tr><td>${
								move
							}</td><td>${
								app.moveData[id].tierlistRank
							}</td></tr>`;
						}).join("")
					}</table>`
				))
				.join("")
		);
	},
	formatRecipes () {
		let pokemon = this.activePokemon;
		while (pokemon && !pokemon.recipeWeights && pokemon.preEvo) {
			pokemon = app.pokeData[pokemon.preEvo - 1];
		}

		if (!pokemon || !pokemon.recipeWeights) {
			this.recipes.innerHTML = (
				`<table><tr><th colspan="3">${
					pokemon && pokemon.name || "?"
				}</th></tr><tr><th>Dish</th><th>Quality</th><th>Chance</th></tr>` +
				"<tr><td>-</td><td>-</td><td>-</td></tr>"
			);
			return;
		}

		const recipes = [];
		for (const dish in pokemon.recipeWeights) {
			for (const quality in pokemon.recipeWeights[dish]) {
				if (!app.recipeTable[dish][quality].length) {
					continue;  // impossible: no recipe results in this dish/quality combination
				}

				const weight = pokemon.recipeWeights[dish][quality];
				if (weight) {
					const recipeChance = weight / app.recipeWeightSums[dish][quality];
					recipes.push([dish, quality, recipeChance]);
				}
			}
		}
		recipes.sort( ([,,leftChance], [,,rightChance]) => rightChance - leftChance );

		this.recipes.innerHTML = `<table><tr><th colspan="3">${
			pokemon.name
		}</th></tr><tr><th>Dish</th><th>Quality</th><th>Chance</th></tr>${
			recipes.map( ([dish, quality, recipeChance]) =>
				`<tr><td>${
					dish
				}</td><td>${
					quality.replace("_", " ")
				}</td><td>${
					(100 * recipeChance).toFixed(2)
				}%</td></tr>`
			).join("")
		}</table>`;
	},
	formatBingos () {
		const evolutions = this.getEvolutions();
		const slots = [0, 1, 2];
		const bingos = [0, 1, 2];

		this.bingos.innerHTML = `<div class="flex-table"><div class="flex-table-row flex-table-header"><div class="flex-table-cell no-highlight">${
			evolutions
				.map( evo => this.makeFace(evo.dexNum, evo.name, true) )
				.join(`</div><div class="arrow-between"></div><div class="flex-table-cell no-highlight">`)
		}</div></div>${
			slots.map( s => `<div class="flex-subtable"><div class="flex-table-row flex-table-header"><div class="flex-table-cell no-highlight">Slot ${s+1}</div></div>${
				bingos.map( b => `<div class="flex-table-row">${
					evolutions
						.map( evo => `<div class="flex-table-cell">${evo.bingos[s][b]}</div>` )
						.join(`<div class="arrow-between"></div>`)
				}</div>`).join("")
			}</div>`).join("")
		}</div>`;
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
	makeFace (dexNum, name, nameDisplay=false) {
		const faceName = nameDisplay ? `<div class="faces-name">${name}</div>` : ``;

		return `<div class="faces face-${dexNum}" title="${name}"></div>${faceName}`;
	},
};

app.updateUI = (updateActive = true, updateSearchResults = true, search) => {
	let phrases = (search || app.components.search.input.value).trim();

	const hidePreEvos = (phrases === "");

	phrases = phrases
		.toLowerCase()
		.split(/\s*,\s*/);

	const pokeData = app.pokeData.filter( pokemon => {
		if (hidePreEvos && pokemon.evolutions) {
			return false;  // remove anything that can evolve
		}

		for (const phrase of phrases) {
			if (
				!pokemon.types.map( type => type.toLowerCase() ).includes(phrase) &&
				!pokemon.name.toLowerCase().includes(phrase) &&
				!pokemon.types.some( type => type.toLowerCase().includes(phrase) ) &&
				pokemon.behavior.toLowerCase() !== phrase &&
//				!(pokemon.recipes && Object.keys(pokemon.recipes).some( dish => dish.toLowerCase().includes(phrase) )) &&
				!pokemon.moves.some( move => move.toLowerCase().includes(phrase) ) &&
				!pokemon.bingos.some(  slots => slots.some( bingo => bingo.toLowerCase().includes(phrase) )  )
			) {
				return false;  // remove anything that mismatches a phrase
			}
		}
		return true;
	}).sort( (x,y) => {
		const includesX = phrases.includes(x.name.toLowerCase());
		const includesY = phrases.includes(y.name.toLowerCase());

		// fully matched names first
		if (includesX && !includesY) {
			return -1;
		} else if (!includesX && includesY) {
			return 1;
		}

		// names matched from the beginning first
		const startsX = phrases.some( phrase => x.name.toLowerCase().startsWith(phrase) );
		const startsY = phrases.some( phrase => y.name.toLowerCase().startsWith(phrase) );

		if (startsX && !startsY) {
			return -1;
		} else if (!startsX && startsY) {
			return 1;
		}

		const evoX = app.components.pokedata.getEvolutions(x).reverse().indexOf(x);
		const evoY = app.components.pokedata.getEvolutions(y).reverse().indexOf(y);

		// evolved pokemon first, then sort by dexNum
		return (evoX - evoY) || (app.pokeData.indexOf(x) - app.pokeData.indexOf(y))
	});

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
				.map( pokemon => app.components.pokedata.makeFace(pokemon.dexNum, pokemon.name) )
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
	app.components.search.input.addEventListener('click', e => {
		if (!app.searchbarClicked) {
			app.components.search.input.select();  // select-all
			app.searchbarClicked = true;
		}
	});
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
	document.addEventListener('click', e => {
		if (e.target && e.target.classList) {
			if (e.target.classList.contains("faces")) {
				if (e.ctrlKey && app.components.pokedata.activePokemon) {
					app.components.pokedata.clone();
				}
				app.updateUI(true, false, e.target.title);
				e.stopPropagation();
			} else if ( e.target.classList.contains("flex-table-cell") || ["TD", "TH"].includes(e.target.nodeName) ) {
				if (e.target.classList.contains("no-highlight")) {
					return;
				}
				if (e.target.classList.contains("highlight")) {
					e.target.classList.remove("highlight");
					e.target.classList.add("highlight2");
				} else if (e.target.classList.contains("highlight2")) {
					e.target.classList.remove("highlight2");
				} else {
					e.target.classList.add("highlight");
				}
				e.stopPropagation();
			}
		}
	});

	app.components.pokedata.slots.atk.addEventListener('input',
		app.components.pokedata.calculateSlotChances.bind(app.components.pokedata)
	);
	app.components.pokedata.slots.hp.addEventListener('input',
		app.components.pokedata.calculateSlotChances.bind(app.components.pokedata)
	);

	app.components.pokedata.header.addEventListener('click', e => {
		app.components.pokedata.toggleDetails();
		e.stopPropagation();
	});

	app.components.pokedata.sideBySideButton.addEventListener('click', e => {
		document.documentElement.classList.remove("compact");
		app.components.pokedata.clone();
		e.stopPropagation();
	});

	app.components.search.title.addEventListener( 'click', e => {
		window.location.reload();
	});
});

})();
