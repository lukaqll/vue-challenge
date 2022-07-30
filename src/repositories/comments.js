import http from '../plugins/axios.js'

export default {
    listByPostId: async (postId) => {
        const response = await http.get(`public/v2/posts/${postId}/comments`, {})
        return response
    },
    create: async (postId, data) => {
        const response = await http.post(`public/v2/posts/${postId}/comments`, data)
        return response
    }
}
