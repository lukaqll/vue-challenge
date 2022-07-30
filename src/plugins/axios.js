import axios from 'axios'
import { useStorage } from '@vueuse/core'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create({
    baseURL: 'https://gorest.co.in/',
})

instance.interceptors.request.use((request) => {
    
    // const token = useStorage('access-token', '')
    const token = '0ac8b1a5ab1e9f4d653471df6765b64b7b7cf5d4709ce171ae6bf047933d10e3'
    request.headers.common.Authorization = `Bearer ${token}`
    
    return request
})

export default instance
