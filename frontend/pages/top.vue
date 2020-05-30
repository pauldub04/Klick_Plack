<template>
    <v-app>
        <Navigation :list="navigation">Клик Плак</Navigation>

        <v-content>
            <v-container>
                <v-row align="center" class="mb-10">
                    <v-btn outlined to="/clicker" color="primary">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <h1 class="ml-5">Топ пользователей</h1>
                </v-row>
                <v-card v-for="user in users" :key="user.id"
                    class="mx-auto mt-5"
                    max-width="500"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="mb-4">{{user.email}}</v-list-item-title>
                        <v-list-item-subtitle class="headline mb-1">{{user.coins}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                        tile
                        size="80"
                    ><v-img src="https://s.starladder.com/uploads/user_discipline_logo/7/2/8/c/thumb_270_476e6c222dcd3914786731c9e46305e5.jpg"/> </v-list-item-avatar>
                    </v-list-item>
                </v-card>
            </v-container>
        </v-content> 
    </v-app>
</template>
<script>
import Navigation from '~/components/Navigation.vue'

export default {
    middleware: 'auth',

    components: {
        Navigation,
    },
    data(){
        return{
            users: [],
            navigation: [ //навигация для компонента
                {
                    icon: 'mdi-home',
                    path: '/',
                    title: 'Главная',
                },
                {
                    icon: 'mdi-cursor-default-outline',
                    path: '/clicker',
                    title: 'Кликер',
                },
            ],
        }
    },
    mounted(){
        this.$axios.get('/api/all_users')
            .then(response => {
                this.users = Object.values(response.data);
                console.log('users', this.users);
                this.users.sort(function (a, b) {
                    if (a.coins > b.coins) {
                        return -1;
                    }
                    if (a.coins < b.coins) {
                        return 1;
                    }
                    return 0;
                });
            })
    }
}
</script>