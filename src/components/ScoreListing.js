import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';
import 'styles/scoreListing.css';


const ScoreListing = (props) =>
{
	const {
		key,
		src,
		altText,
		text
	} = props;
	
	return (
		<div key={key} className='flexScoreListing'>
			<div className='scoreListing'>
				<Image className='scoreListingImg' src={src} altText={altText} />
				<div className='scoreListingText'>{text}</div>
			</div>
		</div>
	)
	
	
}


ScoreListing.propTypes = 
{
	key: PropTypes.number,
	src: PropTypes.any.isRequired,
	altText: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
}

export default ScoreListing;


