
export function hightLight(keyWord, suggestion) {
    // 使用 regexp 构造函数，因为这里要匹配的是一个变量
    const reg = new RegExp(keyWord, 'ig')
    const newSrt = suggestion.replace(reg, function (p) {
        return `<span style="color:red">${p}</span>`
    })
    return newSrt
}
