import axios from 'axios'

var instance = axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5bbb8bf854d6771eb592838d',
    timeout: 150000,
});

const xhr = {
    get(url, data, config) {
        return new Promise((resolve, reject) => {
            instance.get(url, {params: data}, config).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fetch(url, data, config,methods){
        return new Promise((resolve,reject)=>{
            instance[methods](url, data, config).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    post(url, data, config){
        return fetch(url, data,config,'post')
    }
}

export default xhr