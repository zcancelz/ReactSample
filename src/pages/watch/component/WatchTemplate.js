import React, { Component } from 'react';
import {Header, Sidebar, AlertTemplate} from "../../common/component";
import Watch from "./Watch";


class WatchTemplate extends Component{
    render() {
        return (
            <div>
                <Header />
                <Sidebar history={this.props.history}/>
                <Watch />
                <AlertTemplate />
            </div>
        );
    }
}

export default WatchTemplate;