const DiceSorter = (onUserMoveDice, rawDice, callback) => {
	//rawDice = [{index:uint, value:uint, isSaved:Boolean, isLocked:Boolean}]
	let returnObj = {
		onUserMoveDice: onUserMoveDice,
		dice: rawDice,
		all: [],
		scoredDiceIndexes: [false, false, false, false, false, false],
		allPatterns: {
			is6K: false,
			isSTR: false,
			is2_3: false,
			is3_2: false,
			has5K: false,
			has4K: false,
			has3K: false,
			has1: false,
			has5: false
		},
		highestCounter: 0,
		highestCounterIndex: -1,
		best: {
			counter: 0,
			value: 0
		},
		rest: []
	};


	//pull out locked dice
	let u = returnObj.dice.length;
	while (u--) {
		if (returnObj.dice[u].isLocked === true) {
			returnObj.dice.splice(u, 1);
		}
	}


	///put all dice in groups, populate returnObj.all  
	// n starts at 1 because dice do too
	for (let n = 1; n < 7; n++) {
		let obj = {
			idx: [],
			counter: 0,
			value: 0
		};
		for (let j = 0; j < returnObj.dice.length; j++) {
			if (returnObj.dice[j].value === n) {
				obj.value = n;
				obj.counter++;
				let a = returnObj.dice[j].index;
				obj.idx.push(a);
			}
		}
		if (obj.counter > 0) returnObj.all.push(obj);
	}

	for (let i = 0; i < returnObj.all.length; i++) //who's the biggest group?
	{
		if (Number(returnObj.all[i].counter) > returnObj.highestCounter) {
			returnObj.highestCounter = returnObj.all[i].counter;
			returnObj.highestCounterIndex = i;
		}
	}


	//sort out a smaller array minus the largest group for best and rest
	returnObj.rest = returnObj.all.slice(0);
	returnObj.best = returnObj.rest[returnObj.highestCounterIndex];
	returnObj.rest.splice(returnObj.highestCounterIndex, 1);
	//console.log('return obj:', returnObj);

	callback(returnObj);
}

export default DiceSorter;