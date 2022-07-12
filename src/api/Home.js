import request from '@/utils/request'

export const getChannelsApi = () => request({
    url: "/v1_0/user/channels"
})

export const getArticleListApi = (params) => request({
    url: '/v1_0/articles',
    params
})
export const getAllChannelApi = () => request({
    url: "/v1_0/channels"
})
export const setUserChannels = (data) => request({
    method: 'PATCH',
    url: "/v1_0/user/channels",
    data
})

export const delUserChannelsApi = (data) => request({
    method: "DELETE",
    url: "/v1_0/user/channels/" + data
})
