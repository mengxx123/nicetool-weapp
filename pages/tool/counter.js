import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        form: {
            text: ''
        },
        result: 0
    },
    onLoad() {
        this._init()
    },
    onInput(e) {
        this.data.form.text = e.detail.value
        this.setData({
            form: this.data.form
        })
    },
    add() {
        this.setData({
            result: this.data.result + 1
        })
    },
    download() {
        wx.previewImage({
            current: '',
            urls: [this.data.result]
        })
    }
}))
