import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../scss/header.scss';
class Header extends Component {
    render() {
        return (
            <nav>
                <div className="toplogo">
                    <Link to="/">BROWN ADMIN</Link>
                </div>
            </nav>
        );
    }
}

export default Header;