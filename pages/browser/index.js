
import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        url: '',
    },
    onLoad(options) {
        console.log('options', options)
        this._init()
        this.setData({
            url: decodeURIComponent(options.url)
        })
    },
}))
