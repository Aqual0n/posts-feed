import fetchPosts from "../api";
import {
    fetchUser,
    managePost
} from "../api";

export default {
    FETCH_POSTS: ({ commit, state }) => (state.posts.length
        ? Promise.resolve(state.posts)
        : fetchPosts().then(posts => commit('SET_POSTS', { posts }))),
    UPDATE_POST: ({commit, getters}, post) => {
        return managePost('put', {id: post.id, data: post}).then(() => commit('UPDATE_POST', {post, getters}))
    },
    CREATE_POST: ({commit}, post) => {
        return managePost('post', {id: '', data: post}).then(newPost => commit('SET_POST', newPost))
    },
    DELETE_POST: ({commit}, postId) => {
        managePost('delete', {id: postId}).then(() => commit('REMOVE_POST', postId))
    },
    AUTHORIZE_USER: ({ commit }, userData) => {
        return fetchUser(userData.login)
            .then(user => {
                //stingifying user password if its only contains numbers

                const password = typeof user.password === 'string' ? user.password : user.password.toString()

                if(password === userData.password) {
                    const formattedUser = {
                        id: user.id,
                        name: user.login,
                        role: user.role
                    }

                    commit('SET_CURRENT_USER', formattedUser)

                    return formattedUser
                } else {
                    throw new Error('wrong authorization')
                }
            })
            .catch(err => {
                if (err.message === 'no such user') {
                    throw err
                }
                console.log(err)
            })
    },
}