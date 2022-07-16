import request from '@/utils/request.js'

export const getArticleApi = (id) => request({
    url: "/v1_0/articles/" + id
})
export const followApi = (data) => request({
    method: "POST",
    url: "/v1_0/user/followings",
    data
})
export const cancelFollowApi = (id) => request({
    method: "DELETE",
    url: "/v1_0/user/followings/" + id,

})
export const collectArticleApi = (data) => request({
    method: "POST",
    url: "/v1_0/article/collections",
    data
})
export const cancelCollectArticleApi = (id) => request({
    method: "DELETE",
    url: "/v1_0/article/collections/" + id,
})
export const zanArticleApi = (data) => request({
    method: "POST",
    url: "/v1_0/article/likings",
    data
})
export const cancelZanArticleApi = (id) => request({
    method: "DELETE",
    url: "/v1_0/article/likings/" + id,
})
export const getCommentApi = (params) => request({
    url: '/v1_0/comments',
    params
})
export const zanCommentApi = (id) => request({
    method: "POST",
    url: "/v1_0/comment/likings",
    data: {
        target: id
    }
})
export const cancelZanCommentApi = (id) => request({
    method: "DELETE",
    url: "/v1_0/comment/likings/" + id,
})
export const postCommentApi = (data) => request({
    method: "POST",
    url: "/v1_0/comments",
    data
})
