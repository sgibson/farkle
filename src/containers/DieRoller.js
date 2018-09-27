import React from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';

import DieView from 'components/DieView.js';
import 'styles/dieRoller.css';


export default class DieRoller extends React.Component 
{
    static propTypes = {
        index: PropTypes.number.isRequired,
        onRef: PropTypes.func.isRequired,
        onMove: PropTypes.func.isRequired
    }

    constructor(props)
    {
        //isSaved: is when you move it to locked position, but you haven't rolled again yet (so you can move it back if you want)
        super(props);
        this.state = {
            currentValue:this.props.index,
            isSaved: false,
            isLocked: false,
        };

        this.isIdle = true;  //whether or not to allow click and to show FARKLE instead of regular dice
    }

    componentDidMount(){ this.props.onRef(this);}
    componentWillUnmount(){this.props.onRef(null);}
    componentDidUpdate(){}


    //start of roll animation
    roll = (thisDieScored, callback) =>
    {
        this.isIdle = false;
        //if it's saved, lock it
        if (this.state.isSaved === true && thisDieScored === true)
        {
            this.setState((prevState, props) =>
            {
                return {
                    isSaved: false,
                    isLocked: true
                };
            });
            
            callback(this.props.index, this.state.currentValue, false, true);
            return;
        }
        else if (this.state.isLocked) //if it's locked, end here, send value up
        {
            callback(this.props.index, this.state.currentValue, false, true);
            return;
        }
        else //roll it
        {
            let totalAnimationRolls = Math.floor(Math.random()*2) + 2;
            this.rollLoop(totalAnimationRolls, callback);
        }
    }

    rollLoop = (rollsLeft, callback) =>
    {
        let r = Math.floor(Math.random()*6);
        this.setState((prevState, props) => {
            return { 
                currentValue: r,
                isSaved: false 
            }
        });
        if (rollsLeft > 0)
        {
            TweenMax.delayedCall(0.1, this.rollLoop, [rollsLeft - 1, callback]);
        }
        else
        {
            callback(this.props.index, this.state.currentValue + 1, this.state.isSaved, this.state.isLocked);
        }
    }



    reset = (isIdle) =>
    {
        //console.log('dieRoller reset');
        this.isIdle = isIdle;
        this.setState((prevState, props) => {
            return {
                isSaved: false,
                isLocked: false
            };
        });
    }



    onDiceClick = (e) =>
    {
        if (this.state.isLocked === false && this.isIdle === false)
        {
            // +1 because arrays and their fucking 0's
            this.props.onMove(this.props.index, this.state.currentValue + 1, !this.state.isSaved);
            
            this.setState((prevState, props) => {
                return {
                    isSaved : !this.state.isSaved
                }
            });
        }
        
    }

   

    render() 
    {
        const {
            index
        } = this.props;

        const dieTrayClass = (this.state.isLocked === true || this.state.isSaved === true) ? 'dieTrayLockedorSaved dieTray' : 'dieTrayUnlocked dieTray';
        const dieClass = () =>
        {
            let r = 'dieUnlocked';
            if (this.state.isLocked === true)
            {   
                r = 'dieLocked';
            }
            else if (this.state.isSaved === true)
            {
                r = 'dieSaved';
            }
            return r;
        }

        return(
            <div className={dieTrayClass}>
                <div id="dieDiv" className={dieClass()} onClick={this.onDiceClick}>
                    <DieView index={index} dieValue={this.state.currentValue} isIdle={this.isIdle} />
                </div>
            </div>
        );
    }
}
