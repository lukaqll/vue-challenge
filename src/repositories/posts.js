import http from '../plugins/axios.js'

export default {
    all: async (params) => {
        const response = await http.get('public/v2/posts', { params })
        return response
    },
    my: async (userId) => {
        const response = await http.get(`public/v2/users/${userId}/posts`, {})
        return response
    },
    find: async (id) => {
        const response = await http.get(`public/v2/posts/${id}`, {})
        return response
    },
    create: async (userId, data) => {
        const response = await http.post(`public/v2/users/${userId}/posts`, data)
        return response
    },
    update: async (id, data) => {
        const response = await http.put(`public/v2/posts/${id}`, data)
        return response
    },
    delete: async (id) => {
        const response = await http.delete(`public/v2/posts/${id}`)
        return response
    }
}
