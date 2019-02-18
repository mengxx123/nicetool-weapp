const coordtransform = require('../libs/coordtransform')

export default {
    objToArr(obj) {
        return [obj.longitude, coord.latitude]
    },
    arrToObj(arr) {
        return {
            longitude: parseFloat(arr[0]),
            latitude: parseFloat(arr[1])
        }
    },
    wgs84togcj02(coord) {
        let arr = coordtransform.wgs84togcj02(coord.longitude, coord.latitude)
        return {
            longitude: arr[0],
            latitude: arr[1]
        }
    },
    gcj02towgs84(coord) {
        let arr = coordtransform.gcj02towgs84(coord.longitude, coord.latitude)
        return {
            longitude: arr[0],
            latitude: arr[1]
        }
    }
}
