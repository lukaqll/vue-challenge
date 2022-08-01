import http from '../plugins/axios.js'

export default {
    find: async (userId) => {
        const response = await http.get(`public/v2/users/${userId}`, {})
        return response
    },

    create: async (data) => {
        const response = await http.post(`public/v2/users`, data)
        return response
    },
}
