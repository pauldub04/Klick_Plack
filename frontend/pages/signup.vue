<template>
  <v-app>
    <Navigation :list="navigation">Клик Плак</Navigation>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-card width="550" class="mx-auto">
              <v-card-title class="py-5">
                <h1>Регистрация</h1>
              </v-card-title>
              <v-card-text>
                <v-form class="px-3 py-2">
                  <v-text-field 
                    label="Логин" 
                    prepend-icon="mdi-account-circle"
                    type="text"
                    v-model="login"
                  />
                  <v-text-field 
                    :type="showPassword ? 'text' : 'password'" 
                    label="Пароль"
                    v-model="password1"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                  />
                  <v-text-field 
                    :type="showPassword ? 'text' : 'password'" 
                    label="Повторите пароль"
                    v-model="password2"
                    prepend-icon="mdi-lock"
                    @click:append="showPassword = !showPassword"
                  />
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="px-3 py-3">
                <v-spacer></v-spacer>
                <v-btn color="success" @click="signup()">Создать аккаунт</v-btn>
              </v-card-actions>
            </v-card>

          </v-col>
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
      return{
          login: '',
          password1: '',
          password2: '',
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
    methods: {
        signup() {
            if (this.password1 == this.password2) {
              try {
                this.$axios.post('/api/reg',
                  {
                    email: this.login,
                    password: this.password1,
                  }
                )
                this.$router.push('/clicker');
              } catch(err) {
                console.log('error while reg', err);
              }
            } else {
              alert("Пароли не совпадают!");
            }
        }
    }
}
</script>

<style>

</style>template