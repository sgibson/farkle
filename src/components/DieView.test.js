import React from 'react';
import ReactDOM from 'react-dom';
import DieView from './DieView';

describe('DieView', () => {
	test('renders without crashing', () => {
		const div = document.createElement('div');
		
		ReactDOM.render(
			<DieView
				dieValue={1}
				isIdle={true}
				index={0} />, 
			div);
		
		ReactDOM.unmountComponentAtNode(div);
	});
});