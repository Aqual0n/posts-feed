import axios from 'axios'

let api = 'http://localhost:3000'

export default function fetchPosts() {
    return axios({
        method: 'get',
        url: `${api}/posts`
    })
        .then(response => response.data)
        .catch(error => {
            throw error
        })
}

export function fetchUser(login) {
    return axios({
        method: 'get',
        url: `${api}/users?login=${login}`
    })
        .then(response => {
            if(response.data.length) {
                return response.data[0]
            } else {
                // throwing error when there is no such user
                throw new Error('no such user')
            }
        })
        .catch(error => {
            throw error
        })
}

export function managePost(method, {id, data}) {
    let axiosConfig = {
        method,
        url: `${api}/posts/${id}`,
    }

    if (data) {
        axiosConfig.data = data
    }

    return axios(axiosConfig)
        .then(response => response.data)
        .catch(err => {
            throw err
        })
}