// 开发测试
const dev = {
    apiDomain: 'https://biz-web.dev.weyatech.cn',
    env: 'dev'
}

// 正式
const pro = {
    apiDomain: 'https://miop-staging.weyatech.cn/biz-web',
    env: 'staging'
}

let other
console.log('环境初始', other)
if (!other) {
    console.log('环境赋值')
    if (__wxConfig.envVersion === 'release') {
        // 正式版
        other = pro
    } else if (__wxConfig.envVersion === 'trial') {
        // 体验版
        other = pro
    } else {
        // if (__wxConfig.envVersion === 'develop')
        // 开发版
        other = dev
    }
}

export default {
}

