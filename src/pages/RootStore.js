import SidebarStore from "./common/store/SidebarStore";
import AlertStore from "./common/store/AlertStore";
import MessageStore from "./common/store/MessageStore";
import PaginationStore from "./common/store/PaginationStore";
import TranslateStore from "./translate/store/TranslateStore";
class RootStore {
    constructor(){
        this.sidebarStore = new SidebarStore(this);
        this.alertStore = new AlertStore(this);
        this.messageStore = new MessageStore(this);
        this.paginationStore = new PaginationStore(this);
        this.translateStore = new TranslateStore(this);

    }
}

export default RootStore;