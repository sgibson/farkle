import React from 'react';
import ReactDOM from 'react-dom';
import GameButton from './GameButton';

describe('GameButton', () => {
	test('renders without crashing', () => {
		const div = document.createElement('div');
		const callback = (e) =>
		{
			console.log('bankbutton callback test ok!');
		};
	
		ReactDOM.render(
			<GameButton
				callback={callback}
				label='testing label'
				className='className test'
				isDisabled={false} />, 
			div);
		
		ReactDOM.unmountComponentAtNode(div);
	});
});