import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        currentUser: {
            id: null,
            name: 'Гость',
            role: 'guest'
        }
    },
    actions,
    mutations,
    modules: {}
})
