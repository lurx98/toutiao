import request from '@/utils/request'
export const getUser = () => request({
    url: "/v1_0/user",

})
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}
export const updateUserInfo = (data) => request({
    method: 'PATCH',
    url: "/v1_0/user/profile",
    data
})
export const updatePhotoApi = (data) => request({
    method: 'PATCH',
    url: "/v1_0/user/photo",
    data
})
