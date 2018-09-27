import React from 'react';
import ReactDOM from 'react-dom';
import Image from './Image';

describe('Image', () => {
	test('renders without crashing', () => {
		const div = document.createElement('div');
	
		ReactDOM.render(
			<Image
				src={'../img/d6.png'}
				altText='testing alt'
				className='className test' />, 
			div);
		
		ReactDOM.unmountComponentAtNode(div);
	});
});