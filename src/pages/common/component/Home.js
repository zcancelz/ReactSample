import React, { Component } from 'react';
import {Header, Footer, Sidebar} from './';
class Home extends Component{
    render() {
        return (
            <div>
                <Header />
                <Sidebar history={this.props.history}/>
                <div className='wrapper'>
                    <div className='container' id="container">Admin Template
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;