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

export function fetchUser(email) {
    return axios({
        method: 'get',
        url: `${api}/users?login=${email}`
    })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('no such user', error.message)
        })
}