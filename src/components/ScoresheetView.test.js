import React from 'react';
import ReactDOM from 'react-dom';
import ScoresheetView from './ScoresheetView';

describe('ScoresheetView', () => {
	test('renders with one score', () => {
		const div = document.createElement('div');
	
		ReactDOM.render(
			<ScoresheetView
				scores={['ROUND 1',1]}
				totalScore={1}/>, 
			div);
		
		ReactDOM.unmountComponentAtNode(div);
	});
});