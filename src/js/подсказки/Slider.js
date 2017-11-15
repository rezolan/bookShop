import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Slider extends Component {
    constructor(props){
        super(props);
        this.state = {
            i: 0
        }
    }

    timer() {
        this._timer = setTimeout(() => {
            console.log("timer is ", this.state.i);
            this.setState({i: this.state.i + 1 })
        }, 1000)
    }

    componentDidMount() {
        this.timer()
    }

    componentDidUpdate() {
        this.timer();
        console.log("next");
    }

    // componentWillUnmount() {

    // }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.i !== nextState.i) return true;
        return false;
    }

    render() {
        // while(true) {
            
                // setInterval(()=>{
                //     this.setState({i: this.state.i+1})
                // }, 2000)
            
        // }
        // let tim = setInterval(() => {
        //     this.setState({i: this.state.i+1})
        //     setTimeout(() => {
        //     if (this.state.i >= 3) { 
        //         this.setState({i: 0});
        //         clearInterval(tim);
        //     }
        //     }, 2000)
        // },2000) 
        console.log(this.state.i);
        return( 
            <div className="slider">

                {this.props.children[this.state.i%7]
                }
               {/* setInterval(() => {this.props.children.map((item, index) => index==1)}, 500) */}
           
            </div>
        )
    }
}