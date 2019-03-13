
import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        url: '',
    },
    onLoad(options = {}) {
        this._init(options)
        
        console.log('options', options)
        this.options = options
        this.setData({
            url: decodeURIComponent(options.url)
        })
    },
    onShareAppMessage: (res) => {
        return {
            title: this.options.title + ' - 好工具',
            path: '/pages/app/index',
        }
    }
}))
