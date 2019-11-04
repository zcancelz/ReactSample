import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import '../../../scss/pagination.scss';
@inject(stores=>({
    paginationStore: stores.paginationStore
}))
@observer
class Pagination extends Component{
    render() {
        const {paginationStore} = this.props;
        const renderLeftArrow = ()=>{
            if(paginationStore.totalPageCount > paginationStore.pageSize){
                if(paginationStore.firstPage > paginationStore.pageSize){
                    return (<div className='arrow_left' onClick={()=>paginationStore.callback(paginationStore.firstPage-1)}>&nbsp;</div>);
                }else if(paginationStore.currentPage !== paginationStore.firstPage){
                    return (<div className='arrow_left' onClick={()=>paginationStore.callback(paginationStore.firstPage)}>&nbsp;</div>);
                }else{
                    return ('');
                }
            }else{
                return ('');
            }
        }

        const renderPage = ()=>{
            let pageArr = [];
            for(let i= paginationStore.firstPage; i <= paginationStore.lastPage; i++){
                console.log(i);
                if(paginationStore.currentPage === i){
                    pageArr.push((<div key={i} className="num on">{i}</div>));
                }else{
                    pageArr.push((<div key={i} className="num" onClick={()=>paginationStore.goPage(i)}>{i}</div>));
                }
            }
            return pageArr;
        }

        const renderRightArrow = ()=>{
            if(paginationStore.totalPageCount > paginationStore.pageSize){
                if(paginationStore.lastPage < paginationStore.totalPageCount){
                    return (<div className='arrow_right' onClick={()=>paginationStore.goPage(paginationStore.firstPage + paginationStore.pageSize)}>&nbsp;</div>);
                }else if(paginationStore.lastPage === paginationStore.currentPage) {
                    return '';
                }else{
                    return (<div className='arrow_right' onClick={()=>paginationStore.goPage(paginationStore.lastPage)}>&nbsp;</div>);
                }
            }else {
                return '';
            }
        }

        return (
            <div className="pagination">
                {renderLeftArrow()}
                {renderPage()}
                {renderRightArrow()}
            </div>
        );
    }
}

export default Pagination;
