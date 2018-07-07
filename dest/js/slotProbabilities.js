// pure math

app.math.binom = function binom (n, k) {
	// https://en.wikipedia.org/wiki/Binomial_coefficient
	if (!k) {
		return 1;
	}
	return n * binom(n - 1, k - 1) / k;
};

app.math.prob = {
	/*
	   - simulate flipping (sampleSize) coins
	   - each flip has a probability of (chance) to come out heads
	   - each flip has a probability of (jokerChance) to come out a joker
	*/
	outcomeWithinRange (chance, jokerChance, sampleSize, min, max) {
		/*
		   returns the probability for:
		   heads + jokers >= min && heads <= max
		*/
		let sum = 0;
		for (let heads = max; heads >= 0; heads--) {
			let p = this.outcomeEquals(chance, sampleSize, heads);

			if (heads < min) {
				// requires min - heads jokers

				// probability for the subcase "jokers >= min - heads"
				// among the sampleSize - heads remaining coin tosses

				// we already know none of these are heads
				// so the remaining possibilities are:

				// (tails), with probability: (1 - chance - jokerChance) / (1 - chance)
				// (joker), with probability: jokerChance / (1 - chance)

				p *= this.outcomeGreaterOrEqual(jokerChance / (1 - chance), sampleSize - heads, min - heads)
			}

			sum += p;
		}
		return sum;
	},

	outcomeEquals (chance, sampleSize, value) {
		/*
		   returns the probability for:
		   heads === value
		*/
		return app.math.binom(sampleSize, value) * Math.pow(chance, value) * Math.pow(1 - chance, sampleSize - value);
	},

	outcomeGreaterOrEqual (chance, sampleSize, value) {
		/*
		   returns the probability for:
		   heads >= value
		*/
		let sum = 0;
		for (let v = value; v <= sampleSize; v++) {
			sum += this.outcomeEquals(chance, sampleSize, v);
		}
		return sum;
	},

	outcomeSmallerOrEqual (chance, sampleSize, value) {
		/*
		   returns the probability for:
		   heads <= value
		*/
		let sum = 0;
		for (let v = 0; v <= value; v++) {
			sum += this.outcomeEquals(chance, sampleSize, v);
		}
		return sum;
	},
};

// Pokemon Quest specific math

app.math.slotProbability = (minAtkSlots, minHpSlots, hpChanceWeight, atkChanceWeight, multiSlotChance) => {
	const maxHpSlots = 9 - minAtkSlots;

	const hpChanceRaw = hpChanceWeight / (hpChanceWeight + atkChanceWeight);
	const hpChance = (1 - multiSlotChance) * hpChanceRaw;

	return app.math.prob.outcomeWithinRange(hpChance, multiSlotChance, 9, minHpSlots, maxHpSlots);
};