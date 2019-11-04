import {action, observable} from "mobx";
import Autobind from 'autobind-decorator'

@Autobind
class SidebarStore {
    constructor(root) {
        this.root = root;
    }
    PARENT_SELECTED = {
        ON: 'parent on',
        OFF: 'parent'
    };
    SUB_SELECTED = {
        NO_CHILD_ON: 'nochild on',
        NO_CHILD_OFF: 'nochild',
        HAS_CHILD_ON: 'hasgrandchild on',
        HAS_CHILD_OFF: 'hasgrandchild'
    };
    CHILDREN_SELECTED = {
        ON: 'on',
        OFF: ''
    }
    DISPLAY_CLASS = {
        ON: 'child-menu sidebar-child-menu',
        OFF: 'child-menu child-menu-off',
    }
    @observable
    history = {};

    setHistory(history) {
        this.history = history;
    }

    @observable
    categoryClass = [
        {
            name: '홈',
            selected: 'parent on',
            displayClass: 'child-menu sidebar-child-menu',
            url: '/',
            type: 'parent',
            subMenu : []
        },
        {
            name: '번역',
            selected: 'parent',
            displayClass: 'child-menu sidebar-child-menu',
            url: '/translate',
            type: 'parent',
            subMenu : []
        },
        {
            name: 'MY',
            selected : 'parent',
            displayClass: 'child-menu sidebar-child-off',
            type: 'parent',
            subMenu : [
                {
                    menuCode: 'CM001001',
                    child: false,
                    type: 'sub',
                    name: '최근 본 영상',
                    url: '/watch/recently',
                    selected: 'nochild',
                    parentName: 'MY'
                },
                {
                    menuCode: 'CM001002',
                    child: false,
                    type: 'sub',
                    name: '나중에 볼 영상',
                    url: '/watch/later',
                    selected: 'nochild',
                    parentType: 'MY'
                },
                {
                    menuCode: 'CM001003',
                    child: false,
                    type: 'sub',
                    name: '좋아요 한 영상',
                    url: '/watch/good',
                    selected: 'nochild',
                    parentName: 'MY'
                }
            ]
        }
        ,{
            name: '테마',
            selected : 'parent',
            displayClass: 'child-menu child-menu-off',
            type: 'parent',
            subMenu : [
                {
                    menuCode: 'CM003001',
                    child: true,
                    type: 'sub',
                    name: '키즈TV',
                    url: '/theme/kids',
                    selected: 'hasgrandchild',
                    parentName: '테마'

                },
                {
                    type: 'grandChild',
                    parentName: '키즈TV',
                    menuCode: 'CM003001G',
                    childrenMenu:[
                        {
                            menuCode: 'CM003001010',
                            name: '쥬니어네이버',
                            url: '/v/jrlife',
                            selected: ''
                        },
                        {
                            menuCode: 'SV003001020',
                            name: '핑크퐁',
                            url: '/v/pinkfong',
                            selected: '',
                        }
                    ]
                },
                {
                    menuCode: 'CM003002',
                    child: false,
                    type: 'sub',
                    name: '게임TV',
                    url: '/theme/game',
                    selected: '',
                    parentName: '테마'
                }
            ]
        }
    ]

    @action toggle = (name) =>{
        console.log('toggle type : '  + name);
        this.categoryClass.map((category)=>{
            if(category.name === name){
                category.selected= this.PARENT_SELECTED.ON;
                category.displayClass = this.DISPLAY_CLASS.ON;
                if(undefined !== category.url){
                    this.history.push(category.url);
                }
            }else{
                category.selected= this.PARENT_SELECTED.OFF;
                category.displayClass = this.DISPLAY_CLASS.OFF;
            }
            return category;
            // console.log(this.categoryClass);
        })
    };

    @action
    pageMove(menuName, categoryType='sub'){
        console.log(menuName);
        this.categoryClass.map((category)=>{
            category.subMenu.map((subMenu)=>{
                if(subMenu.name===menuName) {
                    if('sub'  === subMenu.type){
                        if(subMenu.child){
                            this.hasChildSubMenuOn(subMenu, menuName, category, categoryType);
                        }else{
                            subMenu.selected = this.SUB_SELECTED.NO_CHILD_ON;
                            this.history.push(subMenu.url);
                        }
                    }
                }else{
                    this.otherMenuOFF(subMenu, menuName);
                }
            })
        })
    }
    hasChildSubMenuOn(subMenu, menuName, category, categoryType){
        subMenu.selected = this.SUB_SELECTED.HAS_CHILD_ON;
        //haschildSubMenu의 child
        const childMenu = category.subMenu.find((m)=>{
            console.log(m.parentName);
            return m.parentName===menuName;
        });
        console.log('childName : ' + childMenu.childrenMenu[0].name);
        //클릭된 메뉴가 grandchildren type이 아닐경우 바로아래 메뉴가 선택되고 나머지 grandchlidren type은 전부 off
        if('grandChildren' !== categoryType){
            for(let i=0;i<childMenu.childrenMenu.length;i++){
                if(i===0){
                    childMenu.childrenMenu[i].selected=this.CHILDREN_SELECTED.ON;
                    this.history.push(childMenu.childrenMenu[i].url);
                }else{
                    childMenu.childrenMenu[i].selected=this.CHILDREN_SELECTED.OFF;
                }
            }
        }
    }
    otherMenuOFF(subMenu, menuName){
        if('sub'  === subMenu.type){
            subMenu.child?subMenu.selected = this.SUB_SELECTED.HAS_CHILD_OFF
                :subMenu.selected = this.SUB_SELECTED.NO_CHILD_OFF;
        }else{
            if(subMenu.parentName !== menuName){
                subMenu.childrenMenu.map((child)=>{
                    child.selected = this.CHILDREN_SELECTED.OFF;
                });
            }
        }
    }
    @action
    childPageMove(menuName, parentName){
        console.log(menuName);
        this.categoryClass.map((category)=>{
            category.subMenu.map((subMenu)=>{
                if('grandChild' === subMenu.type){
                    subMenu.childrenMenu.map((childMenu)=>{
                        console.log('childPageMove menu name : ' + childMenu.name);
                        if(childMenu.name===menuName){
                            childMenu.selected=this.CHILDREN_SELECTED.ON;
                            this.history.push(childMenu.url);
                        }else{
                            childMenu.selected=this.CHILDREN_SELECTED.OFF;
                        }
                    })
                }else{
                    this.pageMove(parentName, 'grandChildren');
                }
            })
        })
    }
}

export default SidebarStore;