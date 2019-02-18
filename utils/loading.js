let count = 0

export default {
    // showLoading() {
    //     count++
    //     console.log('count', count)
    //     if (count === 1) {
    //         wx.showLoading({
    //             title: '加载中',
    //         })
    //     }
    // },
    // hideLoading() {
    //     count--
    //     console.log('count', count)
    //     if (count === 0) {
    //         wx.hideLoading()
    //     }
    // },
    showLoading(opts) {
        wx.showLoading({
            title: '加载中',
            mask: opts.mask
        })
    },
    hideLoading() {
        wx.hideLoading()
    }
}
