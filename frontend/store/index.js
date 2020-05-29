const authCookieName = 'auth';

export const state = () => ({
    user: null,
})

//крч из-за localStorage всё надо в инты переводить поэтому везде parseInt, лучше так оставить
export const mutations = {
    setCoins(state, coins) {
        state.user.coins = parseInt(coins);
        localStorage.coins = parseInt(coins); // localStorage чтобы сохранялось при обновлении (как куки)
        console.log("set coins", state.user.coins);
    },
    setClicks(state, onClick) {
        state.user.onClick = parseInt(onClick);
        localStorage.onClick = parseInt(onClick);
        console.log("set onClick", state.user.onClick);
    },
    plusClicks(state, onClick) {
        state.user.onClick = parseInt(state.user.onClick) + parseInt(onClick);
        localStorage.onClick = parseInt(localStorage.onClick) + parseInt(onClick);
        console.log("+ onClick", state.user.onClick);
    },
    SET_USER (state, user) {
        state.user = user;
        state.user.bought = JSON.parse("[" + state.user.bought + "]")[0];
    },
    addBought (state, id) {
        state.user.bought[id]++;
    }
}

export const actions = {
    async AddBought(ctx, id) {
        await ctx.commit('addBought', id);
        const token = await this.$cookies.get(authCookieName);
        await ctx.dispatch('setAuthHeader', token);
        await ctx.dispatch('send');
    },
    ChangeClicks(ctx, delta) {
        ctx.commit('plusClicks', parseInt(delta));
    },
    ChangeCoins(ctx, am) {
        ctx.commit('setCoins', am);
    },
    async Restore(ctx) {
        console.log("restoring");
        const token = await this.$cookies.get(authCookieName);
        await ctx.dispatch('setAuthHeader', token);
        await ctx.dispatch('fetchUser');
    },
    send({state}) {
        console.log("sending");
        this.$axios.post('/api/send', {
            id: state.user.id,
            coins: state.user.coins,
            onClick: state.user.onClick,
            bought: state.user.bought,
        }).then((response) => {
            console.log("sended", response)
        });
    },
    //###############################


    async nuxtServerInit(ctx) {
        const token = this.$cookies.get(authCookieName) || null;
        console.log("start token", token);
        if (token) {
            await ctx.dispatch('setAuthHeader', token);
            await ctx.dispatch('fetchUser');
            console.log("finised nuxtServerInit");
        }
    },
    async fetchUser(ctx) {
        try {
            const response = await this.$axios.get('/api/user');
            console.log('fetch response', response);
            await ctx.commit('SET_USER', response.data);
            console.log('fetched user');
        } catch(err) {
            console.log('error while fetching user', err);
        }
    },
    async login(ctx, {email, password, device_name}) {
        try {
            const response = await this.$axios.post('/api/get_token', {
                email,
                password,
                device_name,
            });
            console.log('response login', response.data);
            await this.$cookies.set(authCookieName, response.data);
            console.log('setted in cookie');
            await ctx.dispatch('setAuthHeader', response.data);
            await ctx.dispatch('fetchUser');
            console.log("finised login");
        } catch(err) {
            console.log('error while loging in', err);
        }
    },
    async logout (ctx) {
        //await ctx.dispatch('send');
        await this.$cookies.set(authCookieName, null);
        await ctx.dispatch('setAuthHeader', null);
        await ctx.commit('SET_USER', null);
        //ctx.commit('setCoins', 0);
        //ctx.commit('setClicks', 1);
    },
    setAuthHeader(ctx, token) {
        this.$axios.setToken(token, 'Bearer');
        console.log('setted in axios');
    }
}

export const getters = {
    getUser: function(state) {return state.user},
    getCoins: function (state) { 
        console.log("getting clicks", parseInt(state.user.coins));
        return parseInt(state.user.coins);
    },
    getOnClick: function (state) { 
        console.log("getting onClick", state.user.onClick);
        return parseInt(state.user.onClick);
    },
}
