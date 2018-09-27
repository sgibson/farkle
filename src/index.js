import React from 'react';
import ReactDOM from 'react-dom';
import Webfont from 'webfontloader';

import Main from './containers/Main';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

Webfont.load({
	google: {
		families: ['Open Sans:400,700', 'Kalam:300,400']
	}
});

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
