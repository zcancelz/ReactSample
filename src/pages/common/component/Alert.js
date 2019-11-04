import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
@inject(stores=>({
    alertStore: stores.alertStore
}))
@observer
class Alert extends Component{
    render() {
        const {alertStore} = this.props;

        return (
            <div id="alertbox_content" style={alertStore.boxContentStyle}>
                <div className="alert_popup">
                    <div className="height32"></div>
                    <div className="popup_row">
                        <p>
                            {alertStore.message}
                        </p>
                        {alertStore.btnBox}
                        <div className="height16"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Alert;