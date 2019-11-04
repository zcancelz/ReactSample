import React, { Component } from 'react';
import Select from 'react-select-search';
import {observer} from "mobx-react";
import Autobind from 'autobind-decorator'

@observer
class Watch extends Component{
    componentDidMount(){

    }

    render() {
        return (<div className='wrapper'>
            <div className='container' id="container">Watch</div>
        </div>);
    }
}

export default Watch;