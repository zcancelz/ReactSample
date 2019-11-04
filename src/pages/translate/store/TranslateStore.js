import {action, observable, runInAction} from "mobx";
import Autobind from "autobind-decorator";
import translateRepository from "../repository/TranslateRepository";
import * as StringUtil from "../../../util/StringUtil";
@Autobind
class TranslateStore {
    @observable
    params={
        source: 'ko',
        target: 'en',
        text: ''
    }
    @observable
    translatedText='';

    constructor(root){
        this.root = root;
    }

    @action
    async onTranslateBtnClick(){
        const {lang} = this.root.messageStore;
        const {callAlertBox} =this.root.alertStore;
        try{
            const { data } = await translateRepository.getTranslateInfo(StringUtil.convertObjToQueryStr(this.params));
            runInAction(()=>{
                console.log(data.translatedText);
                this.translatedText = data.translatedText;
                callAlertBox(this.translatedText, false, 500, 500);
            });
        }catch (e) {
            runInAction(()=>{
                console.log(e);
                // console.log(status);
                callAlertBox(lang.fail.apiCall, false, 320, 200);
            });
        }
    }

    @action
    onHandleChange = (event) =>{
        const {name, value} = event.target;
        this.params[name] = value;
        console.log(value);
        // console.log(this.checkNullParams)
    }

}
export default TranslateStore;