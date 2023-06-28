import axios from "axios";
import axiosRetry from 'axios-retry';
import { ElMessage } from 'element-plus'

/**
 * https://github.com/axios/axios/issues/164
 * https://github.com/softonic/axios-retry
 * @type {axios.AxiosInstance}
 */

const RETRY_COUNT = 3
const RETRY_CODE = [500, 501, 502, 503]

const client = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: '/api',
    timeout: 1000 * 5,
})

client.interceptors.response.use(
    (response) => Promise.resolve(response.data),
    error => {
        const count = (error.config['axios-retry']?.retryCount)
        if (RETRY_COUNT === count) {
            ElMessage.error(`当前无法连接网络，请检查网络设备是否正常`)
        }
        return Promise.reject(error)
    }
);

axiosRetry(client, {
    retries: RETRY_COUNT,
    shouldResetTimeout: true,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        if (error.message.includes('timeout') || error.message === 'Network Error' || RETRY_CODE.includes(error.response?.status || 0)) {
            const count = error.config['axios-retry']?.retryCount + 1
            ElMessage.error(`请求失败, 重新发起第${count}次请求`)
            return true
        }
        return false
    }
})

export default client