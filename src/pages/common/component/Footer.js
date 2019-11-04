import React, { Component } from 'react';

class Footer extends Component {
    render() {
        const footerStyle={bottom: '20px', position: 'absolute', width: '100%'};
        return (
            <footer className="footer" style={footerStyle}>Copyright ⓒ 2019 Brown. All Rights Reserved.</footer>
        );
    }
}

export default Footer;