import config from '../config/index'
const regeneratorRuntime = require('../libs/runtime.js')
import Promise from '../libs/promise/es6-promise.js'
import cookie from '../utils/cookie'
import loadingUtil from '../utils/loading'
import Raven from '../utils/raven'

// const app = getApp()

export default {
    get(url, data, opts) {
        return this.request('GET', url, data, opts)
    },
    put(url, data, opts) {
        return this.request('PUT', url, data, opts)
    },
    post(url, data, opts) {
        return this.request('POST', url, data, opts)
    },
    request(method, url, data, opts) {
        opts = opts || {
            loading: true
        }
        if (opts.loading) {
            loadingUtil.showLoading({
                // mask: true
            })
        }

        let header = {
            // 'cookie': cookie.get(),
        }
        // if (!opts.noCookie) {
        //     header['cookie'] = cookie.get()
        // }
        if (method === 'POST') {
            header['content-type'] = 'application/x-www-form-urlencoded'
        }
        if (method === 'PUT') {
            header['content-type'] = 'application/x-www-form-urlencoded'
        }
        return new Promise((resolve, reject) => {
            console.info('http request url： ', url)
            console.log(`${url} request data：`, data || {})
            wx.request({
                method: method,
                url: url,
                data: data || {},
                header: header,
                success: res => {
                    console.log(`${url} response data `, res.data || {})
                    console.log(res.data)
                    // if (res.data.httpCode !== 200) {
                    //     reject(res)
                    //     return
                    // }
                    resolve(res)
                },
                fail: res => {
                    console.log(`${url} response data `, res || {})
                    reject(res)
                    sendSentry(url, data, res)
                },
                complete: res => {
                    if (opts.loading) {
                        loadingUtil.hideLoading()
                    }
                }
            })
        })
    }
}