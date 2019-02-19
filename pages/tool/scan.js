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
    scan() {
        wx.scanCode({
            scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
            success: res => {
                this.setData({
                    result: res.result
                })
                wx.setClipboardData({
                    data: res.result,
                    success: res => {
                        this._success('已复制扫描结果')
                    }
                })
            },
            fail: () => {
                this._error('扫描出错')
            }
        })
    },
    download() {
        wx.previewImage({
            current: '',
            urls: [this.data.result]
        })
    }
}))
