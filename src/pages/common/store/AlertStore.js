import {computed, observable, action} from 'mobx';
import Autobind from 'autobind-decorator';
import React from "react";
import {asyncAction} from "mobx-utils";


@Autobind
class AlertStore {
    constructor(root) {
        this.root = root;
    }
    @observable
    message='';
    @observable
    display='none';
    @observable
    confirm=false;
    @observable
    width=400;
    @observable
    height=150;
    @observable
    ex;
    @observable
    progress='none';

    @computed
    get btnBox(){

        console.log(this.confirm);
        if(this.confirm){
            return(
                <div>
                    <button id="alert_btn" type="button" className="outlined_btn" onClick={this.displayNone}>취소</button>
                    <button id="alert_btn" type="button" className="primary_btn" onClick={this.callback}>확인</button>
                </div>
            );
        }else{
            return(<div>
                <button id="alert_btn" type="button" className="primary_btn" onClick={this.callback}>확인</button>
            </div>);
        }

    }
    @action
    displayNone(){
        if('block' !==this.progress){
            this.display='none';
        }
    }

    @action
    displayBlock(){
        console.log("alertstore.displayBlock");
        this.display='block';
    }
    @action
    setMessage(message){
        this.message = message;
        this.displayBlock(this.confirm);
    }

    @action
    setConfirm(use=false, callback=undefined){
        console.log('setConfirm : ' + use);
        this.confirm=use;
        this.ex = callback;
    }
    @action
    setSize(width, height){
        this.width=width;
        this.height= height;
    }
    @computed
    get boxStyle(){
        return {
            display: this.display
        }
    }
    @computed
    get boxContentStyle(){
        const top= (window.innerHeight- this.height) /2;
        const left= (window.innerWidth - this.width) /2;
        return {
            width: this.width,
            height: this.height,
            top: top,
            left: left
        }
    }
    @action
    callback(){
        console.log('ex : ' + this.ex);
        if('block' !==this.progress){
            if(undefined === this.ex){
                this.displayNone();
            }else{
                if(!this.confirm){
                    this.displayNone();
                    this.ex();
                }else{
                    this.setProgress('block');
                    this.ex();
                }

            }
        }
    }

    @action
    setProgress(stat){
        const {setDisplay} = this.root.pallyLoadingCircleStore;
        this.progress= stat;
        setDisplay(stat);

    }

    @asyncAction
    async *callAlertBox(message='', confirm=false, width, height, callback=undefined){
        console.log('callAlertBox');
        yield this.setConfirm(confirm, callback);
        yield this.setMessage(message);
        yield this.setSize(width, height);
        yield this.displayBlock;

    }
}

export default AlertStore;