import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import '../../../scss/sidebar.scss';
@inject(stores=>({
    sidebarStore: stores.sidebarStore,
    categoryClass: stores.sidebarStore.categoryClass,
    toggle: stores.sidebarStore.toggle,
}))
@observer
class Sidebar extends Component {
    componentDidMount(){
        const {sidebarStore} = this.props;
        sidebarStore.setHistory(this.props.history);
    }
    render() {
        const { categoryClass, toggle, sidebarStore } = this.props;


        const categoryList = categoryClass.map( category => {
            const subMenu = category.subMenu.map((menu) =>{
                if(menu.type === 'sub'){
                    return (<li key={menu.menuCode} className={menu.selected} onClick={()=>sidebarStore.pageMove(menu.name)}>{menu.name}</li>);
                }else{
                    const childMenu = menu.childrenMenu.map((childMenu) =>{
                        return(
                            <li key={childMenu.menuCode} className={childMenu.selected} onClick={()=>sidebarStore.childPageMove(childMenu.name, menu.parentName)}>{childMenu.name}</li>
                        );
                    });
                    return (<ul className='grandchild-menu' key={menu.menuCode}>
                        {childMenu}
                    </ul>);
                }
            });
            return (
                <div key={category.name}>
                    <li className={category.selected} onClick={()=>toggle(category.name)}>{category.name}<span></span></li>
                    <ul className={category.displayClass}>
                        {subMenu}
                    </ul>
                </div>);
        });

        return (
            <div className="sideBar" id="sideBar">
                <div className="sidebar-wrapper">
                    <ul className="sidebar-top master">
                        {categoryList}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;