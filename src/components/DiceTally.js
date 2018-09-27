
const DiceTally = (returnObj, callback) =>
{

	let farkleTest = true;
	for (let n in returnObj.allPatterns)
	{
		if (returnObj.allPatterns[n] === true)
		{
			farkleTest = false;
			break;
		}
	}

	if (farkleTest === true)
	{
		callback(returnObj, 0, 0);
		return;
	}
	
	if (returnObj.allPatterns.is6K === true)
	{
		callback(returnObj, 3000, 6);
		return;
	}

	if (returnObj.allPatterns.is3_2 === true)
	{
		let score1 = returnObj.best.value === 1 ? 1000 : returnObj.best.value * 200;
		let score2 = returnObj.rest[0].value === 1 ? 1000 : returnObj.rest[0].value * 200;
		callback(returnObj, score1+score2, 6);
		return;
	}

	if (returnObj.allPatterns.is2_3 === true)
	{
		callback(returnObj, 1500, 6);
		return;
	}	

	if (returnObj.allPatterns.isSTR === true)
	{
		callback(returnObj, 3000, 6);
		return;
	}

	if (returnObj.allPatterns.has5K === true)
	{
		let score = 2000;
		let diceScored = 5;
		if (returnObj.all.length > 1)
		{
			let onesAndFives = getOnesAndFives(returnObj.rest);
			score += onesAndFives[0];
			diceScored += onesAndFives[1];
		}
		callback(returnObj, score, diceScored);
		return;
	}

	if (returnObj.allPatterns.has4K === true)
	{
		let score = 1000;
		let diceScored = 4;
		if (returnObj.all.length > 1)
		{
			let onesAndFives = getOnesAndFives(returnObj.rest);
			score += onesAndFives[0];
			diceScored += onesAndFives[1];
		}
		callback(returnObj, score, diceScored);
		return;
	}

	if (returnObj.allPatterns.has3K === true)
	{
		let score = returnObj.best.value === 1 ? 1000 : returnObj.best.value * 100;
		let diceScored = 3;
		if (returnObj.all.length > 1)
		{
			let onesAndFives = getOnesAndFives(returnObj.rest);
			score += onesAndFives[0];
			diceScored += onesAndFives[1];
		}
		callback(returnObj, score, diceScored);
		return;
	}

	if (returnObj.allPatterns.has1 === true || returnObj.allPatterns.has5 === true)
	{
		let onesAndFives = getOnesAndFives(returnObj.all);
		callback(returnObj, onesAndFives[0], onesAndFives[1]);			
	}
}

const getOnesAndFives = (restOrAll) =>
{
	let score = 0;
	let numDiceScored = 0;
	for (var i = 0; i < restOrAll.length; i++)
	{
		if (restOrAll[i].value === 1)
		{
			score += 100 * restOrAll[i].counter;
			numDiceScored+= restOrAll[i].counter;
		}
		else if (restOrAll[i].value === 5)
		{
			score += 50 * restOrAll[i].counter;
			numDiceScored+= restOrAll[i].counter;
		}
	}
	return [score, numDiceScored];
}


	


export default DiceTally;