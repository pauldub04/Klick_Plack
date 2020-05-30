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
                  label="Почта" 
                  prepend-icon="mdi-account-circle"
                  type="text"
                  v-model="nickname"
                />
                <v-text-field 
                  label="Количество монет"
                  v-model="ammount"
                  prepend-icon="mdi-currency-usd-circle-outline"
                />
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="px-3 py-3">
              <v-spacer/>
              <v-btn color="primary" @click="Send()">Отправить</v-btn>
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
          nickname: '',
          ammount: '',
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
        async Send(){ 
            if(this.ammount < 0)
                return alert("Число коинов не может быть меньше 0");
            if(this.$store.getters.getCoins >= this.ammount){
                try {
                  await this.$axios.post('/api/send_coins',
                    {
                      my_email: this.$store.getters.getUser.email,
                      email: this.nickname,
                      ammount: this.ammount,
                    }
                  )
                  await this.$store.dispatch('fetchUser');
                  await this.$router.push('/clicker');
                } catch(err) {
                  console.log('error while reg', err);
                }

            }
            else
                alert("Недостаточно коинов")
        },
    }
}
</script>