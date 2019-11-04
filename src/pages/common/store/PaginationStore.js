import {action, observable} from "mobx";
import Autobind from "autobind-decorator";

@Autobind
class PaginationStore {
    constructor(root) {
        this.root = root;
    }
    @observable
    totalPages=1;
    @observable
    totalCount=1;
    @observable
    currentPage=1;
    @observable
    pageUnit=25;
    @observable
    pageSize=3;
    @observable
    firstRecordIndex=1;
    @observable
    lastRecordIndex=1;
    @observable
    totalPageCount=1;
    @observable
    firstPage=1;
    @observable
    lastPage=1;
    @observable
    callback;

    @action
    setPageInfo(currentPage=1, totalCount=1, pageUnit=25, callback=()=>console.log(undefined)){
        this.totalPages = Math.ceil((totalCount-1)/(this.pageSize+1));
        this.totalCount = totalCount;
        this.currentPage= currentPage;
        this.pageUnit = pageUnit;
        console.log('currentPage : ' + this.currentPage);
        this.callback = callback;
        this.firstRecordIndex = (currentPage-1) * pageUnit;
        this.lastRecordIndex = currentPage * pageUnit;
        this.totalPageCount= Math.floor((totalCount-1) / this.pageUnit) + 1;
        this.firstPage = Math.floor((currentPage-1)/this.pageSize) * this.pageSize + 1;
        console.log('firstPage : ' + this.firstPage);
        this.lastPage =(this.firstPage + this.pageSize -1);
        if(this.lastPage > this.totalPageCount){
            this.lastPage = this.totalPageCount;
        }
    }
    @action
    setCurrentPage(page){
        this.currentPage=page;
    }

    @action
    goPage(page){
        this.callback(page);
    }


}

export default PaginationStore;