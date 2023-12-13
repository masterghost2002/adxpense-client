import axios  from "axios";
import config from '../config/config';
function createAxiosInstance(accessToken = null) {
    return axios.create({
        baseURL: config.baseServerUrl,
        headers: {
            'accesstoken': `Bearer ${accessToken}`
        }
    });
}
export default createAxiosInstance;