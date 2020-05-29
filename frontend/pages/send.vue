<template>
  <v-app>
    <Navigation :list="navigation">Клик Плак</Navigation>

    <v-content>
      <v-container fluid>
          <v-card width="550" class="mx-auto my-10">
            <v-card-title class="py-6">
              <h1>Отправить</h1>
            </v-card-title>
            <v-card-text>
              <v-form class="px-3 py-3">
                <v-text-field 
                  type="text"
                  label="Логин" 
                  v-model="login"
                  prepend-icon="mdi-email"
                />
                <v-text-field 
                  type="text" 
                  label="Количество"
                  v-model="number"
                  prepend-icon="mdi-numeric"
                />
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-3 py-3">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signin()">
                <v-icon small color="gray">mdi-send</v-icon>
              </v-btn>
            </v-card-actions>
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
          login: '',
          number: 0,
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
        signin(){
            //Паша, работай (нахуй иди)
            //тут еще с сервера надо коины получать и в клик (короче все о пользователе)
            if(true){ //Тут условие, что ник и пароль подходят
                this.$router.push('/clicker')
            }
        },
        signup() {
          this.$router.push('/signup')
        }
    }
}
</script>