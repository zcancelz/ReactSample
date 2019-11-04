import axios from 'axios';

class TranslateRepository{
    getTranslateInfo(params){
        const config = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Naver-Client-Id': process.env.REACT_APP_NAVER_API_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_API_SECRET
            }
        };
        console.log(process.env.REACT_APP_NAVER_API_URL_PAPAGO);
        params.callUrl= process.env.REACT_APP_NAVER_API_URL_PAPAGO;
        return axios.post(process.env.REACT_APP_API_URL, params, config);
    }
}

export default new TranslateRepository();