import { pageExtend, commonPage } from '../../utils/page'

const app = getApp()

Page(pageExtend(commonPage, {
    data: {
        form: {
            text: ''
        },
        result: ''
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
    make() {
        if (!this.data.form.text) {
            this._error('请输入文本')
            return
        }
        if (!this.data.form.text.length > 30) {
            this._error('不能超过 30 个字')
            return
        }
        this.setData({
            result: 'https://up.yunser.com/image.php?text=' + encodeURIComponent(this.data.form.text.replace(/\n/g, '|'))
        })
    },
    download() {
        wx.previewImage({
            current: '',
            urls: [this.data.result]
        })
    }
}))
