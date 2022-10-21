<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <v-autocomplete
            multiple
            chips
            deletable-chips
            clearable
            filled
            placeholder="Фильтр по названию"
            :items="carsTitles"
            v-model="carTitles"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="car in cars" :key="car.id" cols="3">
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="car.newImage"
            >
              <v-card-title>{{ car.title }}</v-card-title>
            </v-img>

            <v-card-subtitle>
              {{ car.model }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <v-row>
                <v-col v-for="image in car.newImages" :key="image" cols="4">
                  <v-img :src="image"> </v-img>
                </v-col>
              </v-row>
              <div class="mt-3">{{ car.mod }}</div>

              <div>{{ car.price }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="success" @click="changeCar(car.id)" text>
                Изменить
              </v-btn>

              <v-btn color="error" text @click="deleteCar(car)">
                Удалить
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- <button @click="getUsers">fetch data</button>
          <div v-if="users.length > 0">
            <div style="display: flex" v-for="user in users" :key="user.id">
              <div>
                {{ user.name }}
              </div>
              <div>{{ user.age }}</div>
              <v-btn color="success" @click="editUser(user)"
                >Редактировать</v-btn
              >
              <v-btn color="primary" @click="sendEditUser"
                >Отправить отредактированное</v-btn
              >
            </div>
          </div>
          <v-text-field v-model="name" label="Имя"></v-text-field>
          <v-text-field v-model.number="age" label="Возраст"></v-text-field>
          <v-btn color="primary" @click="submit">Добавить нового</v-btn>
          <input type="text" v-model="login" />
          <input type="text" v-model="password" />
          <button @click="submitAdmin">Отправить</button> -->
        </v-col>
        <v-fab-transition>
          <v-btn @click="addNew" color="primary" dark fixed bottom right fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CarsTitlesWithImgs, SERVER_HOST } from "../constants";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      //name: "",
      //age: null,
      //id: null,
      //login: "",
      //password: "",
      //users: [],
      carTitles: [],
    };
  },
  async mounted() {
    //this.users = await this.getUsers();
  },
  async created() {
    if (this.cars.length === 0) {
      await this.$store.dispatch("getCars");
    }
  },
  computed: {
    cars() {
      return this.$store.getters.CARS.filter(
        ({ title }) =>
          this.carTitles.includes(title) || this.carTitles.length === 0
      );
    },
    carsTitles() {
      return Object.values(CarsTitlesWithImgs).map(({ title }) => title);
    },
  },
  methods: {
    addNew() {
      this.$router.push("/addnew");
    },
    changeCar(id) {
      this.$router.push(`/changecar/${id}`);
    },
    deleteCar(car) {
      this.axios
        .post(`${SERVER_HOST}deletecar`, { car })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("ok");
            this.$store.dispatch("removeCarOnFrontend", car.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* submit() {
      this.axios
        .post("http://localhost:3333/create", {
          name: this.name.replace(/\s+/g, "-").toLowerCase(),
          age: this.age,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("ok");
            //this.$router.push(
            //  `/user/${this.author}/${this.title
            //    .replace(/\s+/g, "-")
            //    .toLowerCase()}`
            //);
          }
          this.users.push({ name: this.name, age: this.age });
        })
        .catch((err) => {
          console.log(err);
        });
    }, */
    /* async getUsers() {
      const res = await this.axios.get("http://localhost:3333/users");
      console.log();
      if (res?.status === 200) {
        console.log("ok");
        return res.data;
      }
      return [];
    }, */
    /* editUser(user) {
      this.name = user.name;
      this.age = user.age;
      this.id = user.id;
    }, */
    /* async sendEditUser() {
      const res = await this.axios.post("http://localhost:3333/edit", {
        name: this.name,
        age: this.age,
        id: this.id,
      });
      console.log(res);
    }, */
    /* submitAdmin() {
      this.axios
        .post("http://localhost:3333/createadmin", {
          login: this.login,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("ok");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, */
  },
};
</script>
