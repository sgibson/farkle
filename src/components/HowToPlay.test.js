import React from 'react';
import ReactDOM from 'react-dom';
import HowToPlay from './HowToPlay';

describe('HowToPlay', () => {
	test('renders without crashing', () => {
		const div = document.createElement('div');
	
		ReactDOM.render(
			<HowToPlay />, 
			div);
		
		ReactDOM.unmountComponentAtNode(div);
	});
});