import request from '@/utils/request'

export const sendSmsApi = mobile => request({
    url: `/v1_0/sms/codes/${mobile}`
})
export const userLoginApi = data => request({
    method: 'POST',
    url: "/v1_0/authorizations",
    data
})
