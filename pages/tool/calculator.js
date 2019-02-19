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
        let url = `https://nodeapi.yunser.net/web_cmd?keyword=` + encodeURIComponent('计算 ' + this.data.form.text)
        app.http.get(url)
        .then(res => {
            let data = res.data
            console.log('返回', data)
            this.setData({
                result: data.data
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
            urls: [this.data.result]
        })
    }
}))
