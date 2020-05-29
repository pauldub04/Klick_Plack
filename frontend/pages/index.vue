<template>
  <v-app>
    <Navigation :list="navigation">Клик Плак</Navigation>
    <v-content>
      <v-container>
        <h1>Главная</h1>
        <v-row justify="center" class="mt-10" v-if="!$store.getters.getUser">
          <v-btn to="/clicker" large color="primary">Войти</v-btn>
        </v-row>
        <v-row justify="center" class="mt-10" v-else>
          <v-btn to="/clicker" large color="success">Перейти на кликер</v-btn>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation.vue'

export default {
  components: {
      Navigation,
  },
  data(){
    return {
      navigation: [ //навигация для компонента
        {
            icon: 'mdi-cursor-default-outline',
            path: '/clicker',
            title: 'Кликер',
        },
      ],
    }
  },
}
</script>