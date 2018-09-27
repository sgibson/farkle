import React from 'react';
import ReactDOM from 'react-dom';
import ScoreListing from './ScoreListing';

describe('ScoreListing', () => {
	test('renders without crashing', () => {
		const div = document.createElement('div');
	
		ReactDOM.render(
			<ScoreListing
				src='test'
				altText='testing alt text'
				text='testing text' />, 
			div);
		
		ReactDOM.unmountComponentAtNode(div);
	});
});