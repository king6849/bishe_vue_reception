import axios from "axios"
// import Vue from "vue";

const port = 8082
const host = "http://localhost"
const BaseHost = host + ":" + port
const StaffHost = BaseHost + "/staff"
const deleteMethod = "DELETE"
export default {
    deleteMethod,
    StaffHost,
    BaseHost,
}

// get请求
export function get(url, params, serviceSuccessCallBack, serviceErrorCallBack) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then((res) => {
            //请求成功
            if (res.status === 200) {
                if (serviceSuccessCallBack == null) {
                    console.log('serviceSuccessCallback');
                } else {
                    serviceSuccessCallBack(res);
                    console.log(res);
                }
            } else {
                serviceSuccessCallBack(res);
            }
            resolve(res.data);
        }).catch(err => {
            //请求失败
            reject(err.data);
            serviceErrorCallBack(err);
        })
    });
}

//post方法
export function post(url, data, serviceSuccessCallBack, serviceErrorCallBack) {
    let header = {};
    header = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
    }
    const options = {
        method: 'POST',
        headers: header,
        data: data,
        url: url
    };
    return new Promise((resolve, reject) => {
        axios(options).then(res => {
            if (res.status === 200) {
                if (serviceSuccessCallBack == null) {
                    console.log('serviceSuccessCallback');
                } else {
                    serviceSuccessCallBack(res);
                    console.log(res);
                }
            } else {
                serviceSuccessCallBack(res);
            }
            resolve(res);
        })
            .catch(function (err) {
                reject(err);
                serviceErrorCallBack(err);
            })
    })
}

//httpRequest
export function httpRequest(method, url, data, serviceSuccessCallBack, serviceErrorCallBack) {
    let header = {};
    header = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
    }
    const options = {
        method: method,
        headers: header,
        data: data,
        url: url
    };
    return new Promise((resolve, reject) => {
        axios(options).then(res => {
            if (res.status === 200) {
                if (serviceSuccessCallBack == null) {
                    console.log('serviceSuccessCallback');
                } else {
                    serviceSuccessCallBack(res);
                    console.log(res);
                }
            } else {
                serviceSuccessCallBack(res);
            }
            resolve(res);
        })
            .catch(function (err) {
                reject(err);
                serviceErrorCallBack(err);
            })
    })
}

export function deleteRequest(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}