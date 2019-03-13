
import { pageExtend, commonPage } from '../../utils/page'
import config from '../../config/index'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        keyword: '',
        result: null,
        apps: [
            {
                name: '小人举牌',
                icon: '/static/icon/tool.svg',
                url: '/pages/tool/up'
            },
            {
                name: '教你百度',
                icon: '/static/icon/baidu.svg',
                url: '/pages/tool/baidu'
            },
            {
                name: '繁体字',
                icon: '/static/icon/chinese.svg',
                url: '/pages/tool/chinese'
            },
            {
                name: '计算器',
                icon: '/static/icon/calculator.svg',
                url: '/pages/tool/calculator'
            },
            {
                name: '计数器',
                icon: '/static/icon/counter.svg',
                url: '/pages/tool/counter'
            },
            {
                name: '扫码复制',
                icon: '/static/icon/scan.svg',
                url: '/pages/tool/scan'
            },
            {
                name: '跑步测距',
                icon: '/static/icon/map.svg',
                url: '/pages/run/run'
            },
            {
                name: '金额大写',
                icon: '/static/icon/finance.svg',
                url: '/pages/upCase/upCase'
            },
        ],
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad(options = {}) {
        this._init(options)

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    onInput(e) {
        this.setData({
            keyword: e.detail.value,
            result: null
        })
    },
    search() {
        if (!this.data.keyword.length) {
            this._error('请输入命令')
            return
        }
        let url = config.apiDomain + `/web_cmd?keyword=` + encodeURIComponent(this.data.keyword)
        app.http.get(url)
        .then(res => {
            let data = res.data
            console.log('返回', data)
            this.setData({
                result: data
            })
        }, res => {
            this._error(res.msg)
            this.setData({
                loadingState: 'error',
            })
        })
    },
    download() {
        wx.previewImage({
            current: '',
            urls: [this.data.result.data]
        })
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onShareAppMessage: (res) => {
        // if (res.from === 'button') {
        //     console.log("来自页面内转发按钮");
        //     console.log(res.target);
        // }
        // else {
        //     console.log("来自右上角转发菜单")
        // }
        return {
            title: '好工具',
            path: '/pages/index/index',
            // imageUrl: "/images/1.jpg",
            // success: (res) => {
            //     console.log("转发成功", res);
            // },
            // fail: (res) => {
            //     console.log("转发失败", res);
            // }
        }
    }
}))
