import React from 'react';
import PropTypes from 'prop-types';


const Image = (props) =>
{
	const {
		src,
		altText,
		_className
	} = props;

	return (
		<img className={_className} src={src} alt={altText} />
	);
	
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	altText: PropTypes.string.isRequired,
	_className: PropTypes.string
};

export default Image;