import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return( 
            <div className="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/add">Add post</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li className="right"><input type="text" placeholder="Search.."/></li>
                </ul>
                
            </div>
        )
    }
}