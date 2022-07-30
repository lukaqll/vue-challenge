import http from '../plugins/axios.js'

export default {
    find: async (userId) => {
        const response = await http.get(`public/v2/users/${userId}`, {})
        return response
    }
}
