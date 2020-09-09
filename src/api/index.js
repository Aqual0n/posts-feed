import axios from 'axios'

let api = 'http://localhost:3000'

export default function fetchPosts() {
    axios.get(`${api}/posts`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            throw error
        })
}

export function fetchUser(email) {
    axios.get(`${api}/users?login=${email}`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('no such user', error.message)
        })
}