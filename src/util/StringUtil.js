module.exports = {
    convertObjToQueryStr : (obj)=>{
        return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    }
}