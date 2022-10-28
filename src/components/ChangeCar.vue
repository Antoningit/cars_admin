<template>
  <v-container>
    <v-row v-if="car !== null">
      <v-col>
        <div>Изменить</div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-select
            :items="carsTitles"
            v-model="car.title"
            label="Марка"
            :rules="allRules"
          ></v-select>
          <v-text-field v-model="car.model" label="Модель" :rules="allRules">
          </v-text-field>
          <v-select
            v-model="car.engine"
            :items="carsEngines"
            label="Двигатель"
            :rules="allRules"
          ></v-select>
          <v-file-input
            chips
            show-size
            truncate-length="15"
            accept="image/png, image/jpeg"
            label="Главное фото"
            v-model="car.image"
            :rules="allRules"
          ></v-file-input>
          <div class="mb-3">Текущее фото</div>
          <div class="car-image">
            <img :src="car.newImage" />
          </div>
          <v-file-input
            chips
            show-size
            multiple
            truncate-length="15"
            accept="image/png, image/jpeg"
            label="Остальные фото"
            v-model="car.images"
            :rules="allRules"
          ></v-file-input>
          <div class="mb-3">Текущие фото</div>
          <div class="car-images">
            <div
              class="car-images__item"
              v-for="image in car.newImages"
              :key="image"
            >
              <img :src="image" />
            </div>
          </div>
          <v-select
            v-model="car.kpp"
            :items="carsKpps"
            label="КПП"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.body"
            :items="carsBodys"
            label="Кузов"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.year_from"
            :items="carsYearFroms"
            label="Год"
            :rules="allRules"
          ></v-select>
          <v-text-field v-model="car.price" label="Цена" :rules="allRules">
          </v-text-field>
          <v-text-field
            v-model="car.old_price"
            label="Старая цена"
            :rules="allRules"
          >
          </v-text-field>
          <v-text-field
            v-model="car.mod"
            label="1.8i CVT (160 л.с.)"
            :rules="allRules"
          >
          </v-text-field>
          <v-text-field v-model="car.mileage" label="Пробег" :rules="allRules">
          </v-text-field>
          <v-select
            v-model="car.drive"
            :items="сarsDrives"
            label="Привод"
            :rules="allRules"
          ></v-select>
          <v-text-field v-model="car.color" label="Цвет" :rules="allRules">
          </v-text-field>
          <v-text-field v-model="car.pts" label="Птс" :rules="allRules">
          </v-text-field>
          <v-text-field
            v-model="car.engine_volume"
            label="Объем двигателя"
            :rules="allRules"
          >
          </v-text-field>
          <v-select
            v-model="car.wheel"
            :items="carsWheels"
            label="Руль"
            :rules="allRules"
          ></v-select>
          <v-text-field v-model="car.customs" label="Таможня" :rules="allRules">
          </v-text-field>
          <v-select
            v-model="car.owners_by_pts"
            :items="carsOwnersByPtss"
            label="Владельцев по Птс"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.auction"
            :items="carsAuctions"
            label="Торг"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.latest"
            :items="carsLatests"
            label="Последнее поступление"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.promo"
            :items="carsPromos"
            label="Промо"
            :rules="allRules"
          ></v-select>
          <div class="mb-3 mt-3">Описание (не обязательно)</div>
          <wysiwyg v-model="car.description" />
          <v-btn color="primary mt-3" :disabled="!valid" @click="submit"
            >Изменить</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  CarsTitlesWithImgs,
  CarsEngines,
  CarsKpps,
  CarsBodys,
  CarsYearFroms,
  CarsDrives,
  CarsWheels,
  CarsAuctions,
  CarsLatests,
  CarsPromos,
  CarsOwnersByPtss,
  SERVER_HOST,
  CarBodysValues,
  CarsEnginesValues,
  CarsDrivesValues,
  CarsKppsValues,
  CarsTitles,
  CarsWheelsValues,
} from "../constants";
import { resolveMappedCar, getCar } from "../utils";
export default {
  data() {
    return {
      allRules: [(v) => !!v || "Поле обязательно"],
      valid: true,
      car: null,
      photoLink: "",
      photoLinks: [],
    };
  },
  async created() {
    if (this.cars.length === 0) {
      await this.$store.dispatch("getCars");
    }
    this.car = getCar(this.cars, Number(this.$route.params.id));
  },
  computed: {
    cars() {
      return this.$store.getters.CARS;
    },
    carsOwnersByPtss() {
      return Object.values(CarsOwnersByPtss);
    },
    carsTitles() {
      return Object.values(CarsTitlesWithImgs).map(({ title }) => title);
    },
    carsEngines() {
      return Object.values(CarsEngines);
    },
    carsKpps() {
      return Object.values(CarsKpps);
    },
    carsBodys() {
      return Object.values(CarsBodys);
    },
    carsYearFroms() {
      return Object.values(CarsYearFroms);
    },
    сarsDrives() {
      return Object.values(CarsDrives);
    },
    carsWheels() {
      return Object.values(CarsWheels);
    },
    carsAuctions() {
      return Object.values(CarsAuctions);
    },
    carsLatests() {
      return Object.values(CarsLatests);
    },
    carsPromos() {
      return Object.values(CarsPromos);
    },
  },
  methods: {
    resolveData() {
      if (
        typeof this.car.image !== "string" &&
        this.car.images.some((link) => typeof link !== "string")
      ) {
        console.log(3);
        return {
          id: this.car.id,
          image: this.photoLink,
          images: this.photoLinks,
          auction: this.car.auction === "Да",
          body: CarBodysValues.indexOf(this.car.body),
          car_engine: CarsEnginesValues.indexOf(this.car.engine),
          car_mod: this.car.mod,
          color: this.car.color,
          customs: this.car.customs,
          drive: CarsDrivesValues.indexOf(this.car.drive),
          engine_volume: this.car.engine_volume,
          kpp: CarsKppsValues.indexOf(this.car.kpp),
          latest: this.car.latest === "Да",
          mileage: Number(this.car.mileage),
          model: this.car.model,
          old_price: Number(this.car.old_price),
          owners_by_pts: this.car.owners_by_pts,
          price: Number(this.car.price),
          promo: this.car.promo === "Да",
          pts: this.car.pts,
          title: CarsTitles.indexOf(this.car.title),
          wheel: CarsWheelsValues.indexOf(this.car.wheel),
          year_from: Number(this.car.year_from),
          description: this.car.description,
        };
      }
      if (typeof this.car.image !== "string") {
        console.log(1);
        return {
          id: this.car.id,
          image: this.photoLink,
          images: this.car.images,
          auction: this.car.auction === "Да",
          body: CarBodysValues.indexOf(this.car.body),
          car_engine: CarsEnginesValues.indexOf(this.car.engine),
          car_mod: this.car.mod,
          color: this.car.color,
          customs: this.car.customs,
          drive: CarsDrivesValues.indexOf(this.car.drive),
          engine_volume: this.car.engine_volume,
          kpp: CarsKppsValues.indexOf(this.car.kpp),
          latest: this.car.latest === "Да",
          mileage: Number(this.car.mileage),
          model: this.car.model,
          old_price: Number(this.car.old_price),
          owners_by_pts: this.car.owners_by_pts,
          price: Number(this.car.price),
          promo: this.car.promo === "Да",
          pts: this.car.pts,
          title: CarsTitles.indexOf(this.car.title),
          wheel: CarsWheelsValues.indexOf(this.car.wheel),
          year_from: Number(this.car.year_from),
          description: this.car.description,
        };
      }
      if (this.car.images.some((link) => typeof link !== "string")) {
        console.log(2);
        return {
          id: this.car.id,
          image: this.car.image,
          images: this.photoLinks,
          auction: this.car.auction === "Да",
          body: CarBodysValues.indexOf(this.car.body),
          car_engine: CarsEnginesValues.indexOf(this.car.engine),
          car_mod: this.car.mod,
          color: this.car.color,
          customs: this.car.customs,
          drive: CarsDrivesValues.indexOf(this.car.drive),
          engine_volume: this.car.engine_volume,
          kpp: CarsKppsValues.indexOf(this.car.kpp),
          latest: this.car.latest === "Да",
          mileage: Number(this.car.mileage),
          model: this.car.model,
          old_price: Number(this.car.old_price),
          owners_by_pts: this.car.owners_by_pts,
          price: Number(this.car.price),
          promo: this.car.promo === "Да",
          pts: this.car.pts,
          title: CarsTitles.indexOf(this.car.title),
          wheel: CarsWheelsValues.indexOf(this.car.wheel),
          year_from: Number(this.car.year_from),
          description: this.car.description,
        };
      }
      console.log(4);
      return {
        id: this.car.id,
        image: this.car.image,
        images: this.car.images,
        auction: this.car.auction === "Да",
        body: CarBodysValues.indexOf(this.car.body),
        car_engine: CarsEnginesValues.indexOf(this.car.engine),
        car_mod: this.car.mod,
        color: this.car.color,
        customs: this.car.customs,
        drive: CarsDrivesValues.indexOf(this.car.drive),
        engine_volume: this.car.engine_volume,
        kpp: CarsKppsValues.indexOf(this.car.kpp),
        latest: this.car.latest === "Да",
        mileage: Number(this.car.mileage),
        model: this.car.model,
        old_price: Number(this.car.old_price),
        owners_by_pts: this.car.owners_by_pts,
        price: Number(this.car.price),
        promo: this.car.promo === "Да",
        pts: this.car.pts,
        title: CarsTitles.indexOf(this.car.title),
        wheel: CarsWheelsValues.indexOf(this.car.wheel),
        year_from: Number(this.car.year_from),
        description: this.car.description,
      };
    },
    async submit() {
      const isValid = this.$refs.form.validate();
      if (!isValid) {
        return;
      }
      const formDataOne = new FormData();
      /* formData.append("title", this.car.title);
      formData.append("id", this.car.id);
      formData.append("model", this.car.model);
      formData.append("engine", this.car.engine);
      formData.append("kpp", this.car.kpp);
      formData.append("body", this.car.body);
      formData.append("year_from", this.car.year_from);
      formData.append("price", this.car.price);
      formData.append("old_price", this.car.old_price);
      formData.append("mod", this.car.mod);
      formData.append("mileage", this.car.mileage);
      formData.append("drive", this.car.drive);
      formData.append("color", this.car.color);
      formData.append("pts", this.car.pts);
      formData.append("engine_volume", this.car.engine_volume);
      formData.append("wheel", this.car.wheel);
      formData.append("customs", this.car.customs);
      formData.append("owners_by_pts", this.car.owners_by_pts);
      formData.append("auction", this.car.auction);
      formData.append("latest", this.car.latest);
      formData.append("promo", this.car.promo);
      formData.append("description", this.car.description);
      typeof this.car.image !== "string"
        ? formData.append("file_first", this.car.image)
        : formData.append("image", this.car.image);
      typeof this.car.images !== "string"
        ? this.car.images.forEach((file) => {
            formData.append("file", file);
          })
        : formData.append("images", this.car.images); */

      if (typeof this.car.image !== "string") {
        formDataOne.append("file", this.car.image);
        const photoLinkRes = await this.axios.post(
          `${SERVER_HOST}api/photo`,
          formDataOne
        );
        const photoLink = photoLinkRes.data.filename;
        this.photoLink = photoLink;
      }
      let photoLinksRes = [];
      if (this.car.images.some((link) => typeof link !== "string")) {
        photoLinksRes = await Promise.all(
          this.car.images.map((file) => {
            const formData = new FormData();
            formData.append("file", file);
            return this.axios.post(`${SERVER_HOST}api/photo`, formData);
          })
        );
        const photoLinks = photoLinksRes.map(
          ({ data: { filename } }) => filename
        );
        this.photoLinks = photoLinks;
        console.log(this.photoLinks);
      }
      /* this.car.images.forEach((file) => {
        const arr = [];
        if (typeof file !== "string") {
          formData.append("file", file);
          return;
        }
        arr.push(file);
        formData.append("images", JSON.stringify(arr));
      }); */
      const data = this.resolveData();
      console.log(data);
      this.axios
        .post(`${SERVER_HOST}api/car`, data)
        .then((res) => {
          if (res.status === 200) {
            console.log("ok");
            const mappedCar = resolveMappedCar(res.data);
            this.$store.dispatch("changeCarOnFrontend", mappedCar);
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.car-image {
  width: 200px;
}
.car-image img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
.car-images {
  display: flex;
  flex-wrap: wrap;
}
.car-images__item {
  flex-basis: 18%;
}
.car-images__item img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
</style>
