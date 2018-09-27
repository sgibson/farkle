import React from 'react';

import 'styles/rules.css';

const Rules = () => 
{

	return (
		<div id='divRules'>
			<h1>Rules:</h1>
			<ul id='ulRules'>
				<li>Win = 10000 points in as few rounds as possible</li>
				<li>In order to score any of the combos below, you must <b>ROLL THEM ALL AT ONCE</b></li>
				<li>If you have at least 300 points banked, either roll again, or lock in what you have so far</li>
				<li>Any time you roll 0 possible points, you "Farkle", and lose all banked points for that round</li>
				<li>If you Farkle 3 or more times in a row, you lose 300 points each time</li>
				<li>Score with all 6 dice in one round to win a FREE ROLL</li>
			</ul>
		</div>
	);
}

export default Rules;