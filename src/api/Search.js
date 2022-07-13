import request from '@/utils/request'
export const getSearchSuggestionApi = (params) => request({
    url: "/v1_0/suggestion",
    params
})
export const getSearchResultApi = (params) => request({
    url: "/v1_0/search",
    params
})
