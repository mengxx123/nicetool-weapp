
import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        keyword: '',
        result: null,
        apps: [
            {
                name: 'PING',
                icon: 'https://network.yunser.com/static/img/network_ping.svg',
                url: 'https://network.yunser.com/ping?embed=force&utm_source=nicetoolweapp'
            },
            {
                name: '域名查 IP',
                icon: 'https://network.yunser.com/static/img/ip.svg',
                url: 'https://network.yunser.com/domain?embed=force&utm_source=nicetoolweapp'
            },
            {
                name: '身份证号查询',
                icon: 'https://life.yunser.com/static/img/id_card.svg',
                url: 'https://life.yunser.com/id_card?embed=force&utm_source=nicetoolweapp'
            },
            {
                name: '对对联',
                icon: 'https://chinese.yunser.com/static/img/copybook.svg',
                url: 'https://chinese.yunser.com/couplet?embed=force&utm_source=nicetoolweapp'
            },
            
        ],
    },
    onLoad() {
        this._init()

        app.http.get('https://nodeapi.yunser.net/weapps')
            .then(res => {
                let data = res.data
                console.log('返回', data)
                this.setData({
                    apps: data
                })
            }, res => {
                this._error(res.msg)
                this.setData({
                    loadingState: 'error',
                })
        })
    },
    // onShareAppMessage: (res) => {
    //     // if (res.from === 'button') {
    //     //     console.log("来自页面内转发按钮");
    //     //     console.log(res.target);
    //     // }
    //     // else {
    //     //     console.log("来自右上角转发菜单")
    //     // }
    //     return {
    //         title: '好工具',
    //         path: '/pages/index/index',
    //         // imageUrl: "/images/1.jpg",
    //         // success: (res) => {
    //         //     console.log("转发成功", res);
    //         // },
    //         // fail: (res) => {
    //         //     console.log("转发失败", res);
    //         // }
    //     }
    // },
    openBrowser(e) {
        let {url} = e.currentTarget.dataset
        wx.navigateTo({
            url: '/pages/browser/index?url=' + encodeURIComponent(url)
        })
    }
}))
