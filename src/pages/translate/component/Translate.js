import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import '../../../scss/alert.scss';
import {Header, Sidebar} from "../../common/component";
import Footer from "../../common/component/Footer";
import AlertTemplate from "../../common/component/AlertTemplate";
@inject(stores=>({
    alertStore: stores.alertStore,
    translateStore: stores.translateStore
}))
@observer
class Translate extends Component{
    render() {
        const textareaStyle= {
            width: '330px',
            height: '250px'
        };
        const {translateStore} = this.props;
        return (
            <div>
                <Header />
                <Sidebar history={this.props.history}/>
                <div className='wrapper'>
                    <div className='container' id="container">
                        <div className="pageInfo">Papago API Test</div>
                        <div className="col1">
                            <div className="setpadding">
                                <textarea name="text" style={textareaStyle} value={translateStore.params.text}  onChange={translateStore.onHandleChange}/>

                            </div>
                            <div className="setpadding">
                                <button className="secondary_btn" onClick={translateStore.onTranslateBtnClick}>Translate</button>
                            </div>
                        </div>
                    </div>
                </div>
                <AlertTemplate />
                <Footer />
            </div>
        );
    }
}

export default Translate;