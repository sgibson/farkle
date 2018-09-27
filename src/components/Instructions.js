import React from 'react';

import Rules from './Rules'
import HowToPlay from './HowToPlay';
import ScoringGraphics from 'containers/ScoringGraphics';

import '../styles/instructions.css';

const Instructions = (props) => 
{
	return (
		<div id='divInstructions'>
			<HowToPlay />
			<Rules />
			<ScoringGraphics />	
		</div>
	)
}

export default Instructions;