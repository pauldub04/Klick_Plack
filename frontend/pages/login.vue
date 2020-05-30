<template>
  <v-app>
    <Navigation :list="navigation">Клик Плак</Navigation>

    <v-content>
      <v-container fluid>
          <v-card width="550" class="mx-auto my-10">
            <v-card-title class="py-6">
              <h1>Вход</h1>
            </v-card-title>
            <v-card-text>
              <v-form class="px-3 py-3">
                <v-text-field 
                  label="Логин" 
                  prepend-icon="mdi-account-circle"
                  type="text"
                  v-model="login"
                />
                <v-text-field 
                  :type="showPassword ? 'text' : 'password'" 
                  label="Пароль"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-3 py-3">
              <v-btn color="success" @click="signup()">Создать аккаунт</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signin()">Войти</v-btn>
            </v-card-actions>
          </v-card>
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
      return{
          login: 'user@test.com',
          password: 'user',
          device_name: '',
          showPassword: false,
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
    methods:{
        async signin(){
          await this.$store.dispatch('login', {email: this.login, password: this.password, device_name: this.device_name});
          await this.$router.push('/clicker');
        },
        signup() {
          this.$router.push('/signup')
        }
    },
    mounted() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          this.device_name = 'mobile';
        } else {
          this.device_name = 'web';
        }
    }
}
</script>