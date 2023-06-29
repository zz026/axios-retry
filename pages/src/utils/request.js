import axios from "axios";
import axiosRetry from 'axios-retry';
import { ElNotification, ElMessage } from 'element-plus'
import { useCommonStore } from '@/store'

/**
 * https://github.com/axios/axios/issues/164
 * https://github.com/softonic/axios-retry
 * @type {axios.AxiosInstance}
 */

const RETRY_COUNT = 3
const RETRY_CODE = [500, 501, 502, 503]
let messageInstance = null

const client = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: '/api',
    timeout: 1000 * 10,
})

client.interceptors.request.use(
    (request) => {
        const commonStore = useCommonStore()

        request.cancelToken = new axios.CancelToken(cancel => {
            commonStore.Add_routerList(cancel)
        })
        return request;
    }
)


client.interceptors.response.use(
    (response) => {
        if (messageInstance) {
            messageInstance.close()
            messageInstance = null
        }
        return Promise.resolve(response.data)
    },
    error => {
        console.log('error.config', error)
        if (error.config) {
            const count = (error.config['axios-retry']?.retryCount)
            if (RETRY_COUNT === count) {
                messageInstance = ElMessage({
                    message: '当前无法连接网络，请检查网络设备是否正常',
                    type: 'error',
                    duration: 0,
                })
                console.log('messageInstance', messageInstance)
            }
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
            ElNotification({
                title: '重试请求',
                message: `请求失败, 重新发起第${count}次请求`,
                type: 'warning',
            })
            return true
        }
        return false
    }
})

export default client