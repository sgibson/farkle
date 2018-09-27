

const DiceReader = (returnObj, callback) =>
{

	if (returnObj.highestCounter >= 3)
	{
		if(returnObj.onUserMoveDice === true)
		{
			//save indecies of scored dice
			let winningIndexes = returnObj.all[returnObj.highestCounterIndex].idx;
			for (let p = 0; p < winningIndexes.length; p++)
			{
				returnObj.scoredDiceIndexes[winningIndexes[p]] = true;
			}
		}
		returnObj.allPatterns.has3K = true;
	}
	
	if (returnObj.highestCounter >= 4)
	{
		if(returnObj.onUserMoveDice === true)
		{
			let winningIndexes = returnObj.all[returnObj.highestCounterIndex].idx;
			for (let p = 0; p < winningIndexes.length; p++)
			{
				returnObj.scoredDiceIndexes[winningIndexes[p]] = true;
			}
		}
		returnObj.allPatterns.has4K = true;
	}

	if (returnObj.highestCounter >= 5)
	{
		if(returnObj.onUserMoveDice === true)
		{
			let winningIndexes = returnObj.all[returnObj.highestCounterIndex].idx;
			for (let p = 0; p < winningIndexes.length; p++)
			{
				returnObj.scoredDiceIndexes[winningIndexes[p]] = true;
			}
		}
		returnObj.allPatterns.has5K = true;
	}
	
	if (returnObj.dice.length === 6)
	{

		if (returnObj.highestCounter === 6)
		{
			if (returnObj.onUserMoveDice === true) returnObj.scoredDiceIndexes = [true,true,true,true,true,true];
			returnObj.allPatterns.is6K = true;
		}
		
		if (returnObj.highestCounter === 3  && returnObj.all.length === 2)
		{
			if (returnObj.onUserMoveDice === true) returnObj.scoredDiceIndexes = [true,true,true,true,true,true];
			returnObj.allPatterns.is3_2 = true;
		}
		
		if (returnObj.highestCounter === 2 && returnObj.all.length === 3)
		{
			if (returnObj.onUserMoveDice === true) returnObj.scoredDiceIndexes = [true,true,true,true,true,true];
			returnObj.allPatterns.is2_3 = true;
		}
		
		if (returnObj.highestCounter === 1)
		{
			if (returnObj.onUserMoveDice === true) returnObj.scoredDiceIndexes = [true,true,true,true,true,true];
			returnObj.allPatterns.isSTR = true;
		}
		
	}


		for (let i = 0; i < returnObj.dice.length; i++)
		{
			if (returnObj.dice[i].value === 1)
			{
				if(returnObj.onUserMoveDice === true)
				{
					let indexOfOnes= returnObj.all.findIndex(r => r.value === 1);
					let winningIndexes = returnObj.all[indexOfOnes].idx;
					for (let p = 0; p < winningIndexes.length; p++)
					{
						returnObj.scoredDiceIndexes[winningIndexes[p]] = true;
					}
				}
				returnObj.allPatterns.has1 = true;
			}
			else if (returnObj.dice[i].value === 5)
			{
				if(returnObj.onUserMoveDice === true)
				{
					let indexOfOnes= returnObj.all.findIndex(r => r.value === 5);
					let winningIndexes = returnObj.all[indexOfOnes].idx;
					for (let p = 0; p < winningIndexes.length; p++)
					{
						returnObj.scoredDiceIndexes[winningIndexes[p]] = true;
					}
				}
				returnObj.allPatterns.has5 = true;
			}
		}

	callback(returnObj);
}



export default DiceReader;