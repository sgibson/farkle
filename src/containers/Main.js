import React, { Component } from 'react';

import spinner from 'img/d6.png';
import Game from './Game';
import Instructions from 'components/Instructions';

import 'styles/main.css';

/**
 * all code © Scott Gibson 2018, no reuse without permission please
 * 
 */
class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="Main-inner">
          <div className="Main-tray">
            <header className="Main-header">
              <div className='logoContainer'>
                <img src={spinner} className="Main-logo" alt="logo" />
              </div>
              <h1 className="Main-title">React Farkle</h1>
              <h3 className="Main-subtitle">by Scott Gibson</h3>
            </header>
            <Game />
            <Instructions />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
