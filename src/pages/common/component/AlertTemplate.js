import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import Alert from "./Alert";
import '../../../scss/alert.scss';
@inject(stores=>({
    alertStore: stores.alertStore
}))
@observer
class AlertTemplate extends Component{
    render() {
        const {alertStore} = this.props;
        return (
            <div className="alertbox" style={alertStore.boxStyle}>
                <div className="bg" onClick={()=>alertStore.displayNone()}></div>
                <Alert />
            </div>
        );
    }
}

export default AlertTemplate;