import React from 'react';
import PropTypes from 'prop-types';
	



export default class Logic extends React.Component  
{
	static propTypes = {
		onRef: PropTypes.func.isRequired
	}

	constructor(props)
	{
		super(props);
		this.getCurrentScoreFromDice = this.getCurrentScoreFromDice.bind(this);
		this.getScoreContinued = this.getScoreContinued.bind(this);
		this.isFarkle = this.isFarkle.bind(this);
		this.isFarkleContinued = this.isFarkleContinued.bind(this);
		this.d = [];
	}


	componentDidMount()
    {
        this.props.onRef(this);
    }

    componentWillUnmount()
    {
        this.props.onRef(null);
	}
	


	//split because JS sucks
	isFarkle(dice)
	{
		this.sortDice(dice, this.isFarkleContinued);
	}

	isFarkleContinued()
	{
		let r = false;
		console.log('starting with dice:', this.d.dice, this.d);
		console.log('3K:', this.is3K(this.d));
		console.log('4K:', this.is4K(this.d));
		console.log('5K:', this.is5K(this.d));
		console.log('6K:', this.is6K(this.d));
		console.log('3x2:', this.is3Pair(this.d));
		console.log('2x3:', this.isDoubleTriple(this.d));
		console.log('123456:', this.isTotalStraight(this.d.dice));
		console.log('1+5s:', this.getOnesAndFives(this.d.all));
		if ((!this.is3K(this.d)) && (!this.is4K(this.d)) && (!this.is5K(this.d)) && (!this.is6K(this.d)) && 
			(!this.is3Pair(this.d)) && (!this.isDoubleTriple(this.d)) && (!this.isTotalStraight(this.d.dice)))
		{
			if (this.getOnesAndFives(this.d.all) === 0)
			{
				r = true;
			}
		}

		return r;
	}



	getCurrentScoreFromDice(savedDice, finalCallback)
	{
		if (savedDice.length === 0)
		{
			return {totalDice: 0, numDiceScored:0, score: 0};
		}

		this.sortDice(savedDice, this.getScoreContinued, finalCallback);
	}
	
	getScoreContinued(finalCallback)
	{
		let score = {};
		

		//console.log('sorted Dice: ', d);
		switch (this.d.dice.length)
		{
			case 1:
				score = this.getOnesAndFives(this.d.all);
				break;

			case 2:
				score = this.getOnesAndFives(this.d.all);
				break;

			case 3:
				score = this.is3K(this.d) ? this.get3KScore(this.d) : this.getOnesAndFives(this.d.all);
				break;

			case 4:
				if (this.is4K(this.d) === true)
				{
					score = this.get4KScore(this.d);
				}
				else if (this.is3K(this.d) === true)
				{
					score = this.get3KScore(this.d);
				}
				else 
				{
					score = this.getOnesAndFives(this.d.all);
				}
				break;

			case 5:
				if (this.is5K(this.d) === true)
				{
					score = this.get5KScore(this.d);
				}
				else if (this.is4K(this.d) === true)
				{
					score = this.get4KScore(this.d);
				}
				else if (this.is3K(this.d) === true)
				{
					score = this.get3KScore(this.d);
				}
				else 
				{
					score = this.getOnesAndFives(this.d.all);
				}
				break;

			case 6:
				if (this.is3Pair(this.d) === true)
				{
					score = this.get3PairScore(this.d.all);
				}
				else if (this.isTotalStraight(this.d.dice) === true)
				{
					score = this.getTotalStraightScore(this.d.all);
				}
				else if (this.is6K(this.d) === true)
				{
					score = this.get6KScore(this.d.all);
				}
				else if (this.isDoubleTriple(this.d) === true)
				{
					score = this.getDoubleTripleScore(this.d);
				}
				else
				{
					score = this.getOnesAndFives(this.d.all);
				}
				break;

			default:
				throw new Error('something went wrong in WhatsMyScore with savedDice array');
		}

		finalCallback(score);

	}



	sortDice(savedDice, callback, finalCallback) 
	{
		let returnObj = {
			dice: [],
			best: {
				counter:0,
				value:0
			},
			rest: [], //dice array full of {counter:n, value:n} except best
			all:[]  //	dice array full of {counter:n, value:n}
		
		}; 
		let highestCounterIndex = 0;
		let highestCounter = 0;

		//group together all same dice
		//console.log('//////////////////////////////////');
		//console.log('initial savedDice:', savedDice);
		for (let n = 1; n<7; n++)
		{
			let counter = 0;
			//console.log('     n:', n);
			for (let j = 0; j < savedDice.length; j++) 
			{
				//console.log('          j:', j, ' savedDice[j].value:', savedDice[j].value);
				if (savedDice[j].value === n)
				{
					counter++;
				}
			}
			
			if (counter > 0)
			{
				returnObj.all.push({counter:counter, value:n});
			}

		}
		//console.log ('init results after finished: ', initialResults);
		///get largest "X of a kind"

		for (let i=0; i < returnObj.all.length; i++)
		{
			
			if (Number(returnObj.all[i].counter) > highestCounter)
			{
				highestCounter = returnObj.all[i].counter;
				highestCounterIndex = i;
			}
		}

		//console.log('highestCounter:', highestCounter, 'initial results:', returnObj.all)
		//sort out a smaller array minus the largest group
		returnObj.rest = returnObj.all.slice(0);
		returnObj.best = returnObj.rest[highestCounterIndex];
		returnObj.rest.splice(highestCounterIndex, 1);
		returnObj.dice = savedDice;

		//console.log("best:",initialResults[highestCounterIndex]);
		//console.log("rest:", unused);
		//console.log(highestCounterIndex, highestCounter);

		
		//returnObj.best.counter = highestCounter;
		//returnObj.best.value = highestCounterValue;
		//returnObj.all = initialResults.slice(0);

		console.log('return obj:', returnObj);

		
		this.d = returnObj;

		callback(finalCallback);
	}


	//return {totalDice:number, numDiceScored:number, score:number}
	getOnesAndFives(sortedDice) 
	{
		console.log("---------------------------------");
		console.log('sortedDice', sortedDice);
		console.log("---------------------------------");
		let score = 0;
		let totalDice = sortedDice.length;
		let numDiceScored = 0;
		for (let i = 0; i < totalDice; i++)
		{
			if (Number(sortedDice[i].value) === 1)
			{
				score += sortedDice[i].counter * 100;
				numDiceScored++;
			}
			else if (Number(sortedDice[i].value) === 5) 
			{
				score += sortedDice[i].counter * 50;
				numDiceScored++;
			}
		}
		console.log('getOnesAndFives:', sortedDice.length, "  ", totalDice, numDiceScored, score)

		return {totalDice:totalDice, numDiceScored:numDiceScored, score:score};
	}





	isTotalStraight(rawDice)
	{
		let r = false;
		let sortedString = rawDice.toString();
		
		if (rawDice.length < 6)
		{
			r = false;
		}
		else if (
			rawDice.length === 6 &&
			sortedString.indexOf('1') > -1 && 
			sortedString.indexOf('2') > -1 &&
			sortedString.indexOf('3') > -1 &&
			sortedString.indexOf('4') > -1 &&
			sortedString.indexOf('5') > -1 &&
			sortedString.indexOf('6') > -1)
		{
			r = true;
		}
			
		return r;
	}

	getTotalStraightScore(sortedDice)
	{
		let a = 6;
		let b = 6;
		let r = 3000;
		return {totalDice:a, numDiceScored:b, score:r};
	}



	is3Pair(sortedDice)
	{
		let returnValue = false;
		if (sortedDice.all.length === 3 && sortedDice.all[0].counter === 2 && sortedDice.all[1].counter === 2 && sortedDice.all[2].counter === 2)
		{
			returnValue = true;
		}
		return returnValue;
	}

	get3PairScore(sortedDice)
	{
		let a = 6;
		let b = 6;
		let r = 1500;
		return {totalDice:a, numDiceScored:b, score:r};
	}


	isDoubleTriple(sortedDice)
	{
		let r = false;
		if (sortedDice.all.length === 2 && sortedDice.all[0].counter === 3 && sortedDice.all[1].counter === 3)
		{
			r = true;
		}
		return r;
	}

	//return {totalDice:number, numDiceScored:number, score:number}
	getDoubleTripleScore(sortedDice)
	{
		let score1 = sortedDice.best.value === 1 ? 1000 : sortedDice.best.value * 100;
		let score2 = sortedDice.rest[0].value === 1 ? 1000 : sortedDice.rest[0].value * 100;
		let a = 6;
		let b = 6;
		let r = score1+score2;

		return {totalDice:a, numDiceScored:b, score:r};
	}






	 is3K(sortedDice)
	{
		console.log("IN 3K - sortedDice best counter:", sortedDice.best.counter);
		return sortedDice.best.counter === 3;
	}
	
	//return {totalDice:number, numDiceScored:number, score:number}
	get3KScore(sortedDice)
	{
		let r = sortedDice.best.value === 1 ? 1000 : sortedDice.best.value * 100;
		let extras = sortedDice.rest.length;
		let extraDiceScored = 0;
		if (extras > 0)
		{
			let g = this.getOnesAndFives(sortedDice.rest);
			extraDiceScored = g.numDiceScored;
			r+= g.score;
		}
		let a = sortedDice.all.length;
		let b = 3 + extraDiceScored;
		return {totalDice:a, numDiceScored:b, score:r};
	}





	is4K(sortedDice)
	{
		return sortedDice.best.counter === 4;
	}

	get4KScore(sortedDice)
	{
		let r = 1000;
		let extras = sortedDice.rest.length;
		let extraDiceScored = 0;
		if (extras > 0)
		{
			let g = this.getOnesAndFives(sortedDice.rest);
			extraDiceScored = g.numDiceScored;
			r+= g.score;
		}
		let a = sortedDice.all.length;
		let b = sortedDice.best.length + extraDiceScored;
		return {totalDice:a, numDiceScored:b, score:r};
	}




	is5K(sortedDice)
	{
		return sortedDice.best.counter === 5;
	}
	//return {totalDice:number, numDiceScored:number, score:number}
	get5KScore(sortedDice)
	{
		let r = 2000;
		let extras = sortedDice.rest.length;
		let extraDiceScored = 0;
		if (extras > 0)
		{
			let g = this.getOnesAndFives(sortedDice.rest);
			extraDiceScored = g.numDiceScored;
			r+= g.score;
		}
		let a = sortedDice.all.length;
		let b = sortedDice.best.length + extraDiceScored;
		return {totalDice:a, numDiceScored:b, score:r};
	}

	is6K(sortedDice)
	{
		return sortedDice.best.counter === 6;
	}

	//return {totalDice:number, numDiceScored:number, score:number}
	get6KScore(sortedDice)
	{
		let r = 3000;
		let a = 6;
		let b = 6;
		return {totalDice:a, numDiceScored:b, score:r};
	}


	render() {
		return null;
	}
}