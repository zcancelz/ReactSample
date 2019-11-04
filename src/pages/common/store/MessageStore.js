import {observable, action, computed} from 'mobx';
import Autobind from 'autobind-decorator'

@Autobind
class MessageStore{
    constructor(root) {
        this.root = root;
    }
    tabClass={
        ON: 'outlined_btn',
        OFF: 'tertiary_btn'
    }

    @observable
    langTab=[
        {lang:'ko', selection: 'ON'},
        {lang:'en', selection: 'OFF'}
    ];

    @observable
    currentLang=null;

    @observable
    language= null;

    @observable
    ko={
        fail:{
            apiCall: 'API 호출을 실패하였습니다.'
        }
    };
    @observable
    en={
        fail:{
            apiCall: 'Fail to call API.'
        }
    };

    @computed
    get lang(){
        return this.currentLang==null?this.ko:this.currentLang;
    }

    @action
    checkDefaultLang(){
        if(null===this.currentLang){
            const browserLang = navigator.language || navigator.userLanguage;
            if('ko-KR' === browserLang || 'ko' === browserLang){
                this.currentLang=this.ko;
                this.changeLangTab('ko');
            }else{
                this.currentLang=this.en;
                this.changeLangTab('en');
            }
        }
    }
    @action
    changeLangTab(lang){
        this.langTab.map(tab=>{
            tab.lang===lang?tab.selection='ON':tab.selection='OFF';
            return tab;
        });
    }
    @action
    changeLang(lang){
        this.changeLangTab(lang);
        switch (lang) {
            case 'ko':
                this.currentLang = this.ko;
                break;
            case 'en':
                this.currentLang = this.en;
                break;
            default:
                this.currentLang = this.ko;
                break;
        }
    }

    @computed
    get koTabClass(){
        return this.tabClass[this.langTab.find(tab=>{
            return tab.lang === 'ko';
        }).selection];
    }

    @computed
    get enTabClass(){
        return this.tabClass[this.langTab.find(tab=>{
            return tab.lang === 'en';
        }).selection];
    }
    @computed
    get currentLangStr(){
        return this.langTab.find(tab=>{
            return tab.selection === 'ON';
        }).lang;
    }

}
export default MessageStore;