<template>
  <v-container>
    <v-row>
      <v-col>
        <div>Добавить</div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-select
            :items="carsTitles"
            v-model="car.carTitle"
            label="Марка"
            :rules="allRules"
          ></v-select>
          <v-text-field v-model="car.carModel" label="Модель" :rules="allRules">
          </v-text-field>
          <v-select
            v-model="car.carEngine"
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
            v-model="car.carImg"
            :rules="allRules"
          ></v-file-input>
          <v-file-input
            chips
            show-size
            multiple
            truncate-length="15"
            accept="image/png, image/jpeg"
            label="Остальные фото"
            v-model="car.carImgs"
            :rules="allRules"
            @change="addImagesToPreview"
          ></v-file-input>
          <draggable
            v-model="previewImgs"
            class="d-flex flex-wrap"
            @change="dragChange"
          >
            <v-col v-for="{ link } in previewImgs" :key="link">
              <v-img :src="link" max-height="150" max-width="250"></v-img>
            </v-col>
          </draggable>
          <v-select
            v-model="car.carKpp"
            :items="carsKpps"
            label="КПП"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.carBody"
            :items="carsBodys"
            label="Кузов"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.carYearFrom"
            :items="carsYearFroms"
            label="Год"
            :rules="allRules"
          ></v-select>
          <v-text-field v-model="car.carPrice" label="Цена" :rules="allRules">
          </v-text-field>
          <v-text-field
            v-model="car.carOldPrice"
            label="Старая цена"
            :rules="allRules"
          >
          </v-text-field>
          <v-text-field
            v-model="car.carMod"
            label="1.8i CVT (160 л.с.)"
            :rules="allRules"
          >
          </v-text-field>
          <v-text-field
            v-model="car.carMileage"
            label="Пробег"
            :rules="allRules"
          >
          </v-text-field>
          <v-select
            v-model="car.carDrive"
            :items="сarsDrives"
            label="Привод"
            :rules="allRules"
          ></v-select>
          <v-text-field v-model="car.carColor" label="Цвет" :rules="allRules">
          </v-text-field>
          <v-select
            v-model="car.carPts"
            :items="carsPtss"
            label="Птс"
            :rules="allRules"
          ></v-select>
          <v-text-field
            v-model="car.carEngineVolume"
            label="Объем двигателя"
            :rules="allRules"
          >
          </v-text-field>
          <v-select
            v-model="car.carWheel"
            :items="carsWheels"
            label="Руль"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.carCustoms"
            :items="carsCustoms"
            label="Таможня"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.carOwnersByPts"
            :items="carsOwnersByPtss"
            label="Владельцев по Птс"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.carAuction"
            :items="carsAuctions"
            label="Торг"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.carLatest"
            :items="carsLatests"
            label="Последнее поступление"
            :rules="allRules"
          ></v-select>
          <v-select
            v-model="car.carPromo"
            :items="carsPromos"
            label="Промо"
            :rules="allRules"
          ></v-select>
          <div class="mb-3 mt-3">Описание (не обязательно)</div>
          <wysiwyg v-model="car.carDescription" />
          <v-btn color="primary mt-3" :disabled="!valid" @click="submit"
            >Добавить</v-btn
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
  CarsPtss,
  CarsOwnersByPtss,
  CarsCustoms,
  SERVER_HOST,
  CarBodysValues,
  CarsEnginesValues,
  CarsDrivesValues,
  CarsKppsValues,
  CarsTitles,
  CarsWheelsValues,
} from "../constants";
import { resolveMappedCar } from "../utils";
import draggable from "vuedraggable";
export default {
  components: { draggable },
  data() {
    return {
      allRules: [(v) => !!v || "Поле обязательно"],
      valid: true,
      car: {
        carTitle: "",
        carModel: "",
        carEngine: "",
        carImg: "",
        carImgs: [],
        carKpp: "",
        carBody: "",
        carYearFrom: "",
        carPrice: "",
        carOldPrice: "",
        carMod: "",
        carMileage: "",
        carDrive: "",
        carColor: "",
        carPts: "",
        carEngineVolume: "",
        carWheel: "",
        carCustoms: "",
        carOwnersByPts: "",
        carAuction: "",
        carLatest: "",
        carPromo: "",
        carDescription: "",
      },
      photoLink: "",
      photoLinks: [],
      previewImgs: [],
    };
  },
  computed: {
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
    carsPtss() {
      return Object.values(CarsPtss);
    },
    carsOwnersByPtss() {
      return Object.values(CarsOwnersByPtss);
    },
    carsCustoms() {
      return Object.values(CarsCustoms);
    },
  },
  methods: {
    addImagesToPreview() {
      this.previewImgs = this.car.carImgs.map((previewImg) => ({
        link: URL.createObjectURL(previewImg),
        name: previewImg.name,
      }));
    },
    dragChange() {
      const previewImgsLinks = this.previewImgs.map(({ name }) => name);
      this.car.carImgs = this.car.carImgs.sort(
        (a, b) =>
          previewImgsLinks.indexOf(a.name) - previewImgsLinks.indexOf(b.name)
      );
    },
    async submit() {
      const isValid = this.$refs.form.validate();
      if (!isValid) {
        return;
      }
      const formDataOne = new FormData();
      /* formData.append("title", this.car.carTitle);
      formData.append("model", this.car.carModel);
      formData.append("engine", this.car.carEngine);
      formData.append("kpp", this.car.carKpp);
      formData.append("body", this.car.carBody);
      formData.append("year_from", this.car.carYearFrom);
      formData.append("price", this.car.carPrice);
      formData.append("old_price", this.car.carOldPrice);
      formData.append("mod", this.car.carMod);
      formData.append("mileage", this.car.carMileage);
      formData.append("drive", this.car.carDrive);
      formData.append("color", this.car.carColor);
      formData.append("pts", this.car.carPts);
      formData.append("engine_volume", this.car.carEngineVolume);
      formData.append("wheel", this.car.carWheel);
      formData.append("customs", this.car.carCustoms);
      formData.append("owners_by_pts", this.car.carOwnersByPts);
      formData.append("auction", this.car.carAuction);
      formData.append("latest", this.car.carLatest);
      formData.append("promo", this.car.carPromo);
      formData.append("description", this.car.carDescription); */
      formDataOne.append("file", this.car.carImg);
      /* this.car.carImgs.forEach((file) => {
        formData.append("file", file);
      }); */
      const photoLinkRes = await this.axios.post(
        `${SERVER_HOST}api/photo`,
        formDataOne
      );
      const photoLink = photoLinkRes.data.filename;
      this.photoLink = photoLink;
      /* this.axios
        .post(`${SERVER_HOST}api/photo`, formDataOne)
        .then((res) => {
          if (res.status === 200) {
            this.photoLink = res.data.filename;
          }
        })
        .catch((err) => {
          console.log(err);
        }); */
      const photoLinksRes = await Promise.all(
        this.car.carImgs.map((file) => {
          const formData = new FormData();
          formData.append("file", file);
          return this.axios.post(`${SERVER_HOST}api/photo`, formData);
        })
      );
      const photoLinks = photoLinksRes.map(
        ({ data: { filename } }) => filename
      );
      this.photoLinks = photoLinks;
      /* this.car.carImgs.forEach((file) => {
        const formData = new FormData();
        formData.append("file", file);
        this.axios
          .post(`${SERVER_HOST}api/photo`, formData)
          .then((res) => {
            if (res.status === 200) {
              this.photoLinks.push(res.data.filename);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }); */
      const data = {
        image: this.photoLink,
        images: this.photoLinks,
        auction: this.car.carAuction === "Да",
        body: CarBodysValues.indexOf(this.car.carBody),
        car_engine: CarsEnginesValues.indexOf(this.car.carEngine),
        car_mod: this.car.carMod,
        color: this.car.carColor,
        customs: this.car.carCustoms,
        drive: CarsDrivesValues.indexOf(this.car.carDrive),
        engine_volume: this.car.carEngineVolume,
        kpp: CarsKppsValues.indexOf(this.car.carKpp),
        latest: this.car.carLatest === "Да",
        mileage: Number(this.car.carMileage),
        model: this.car.carModel,
        old_price: Number(this.car.carOldPrice),
        owners_by_pts: this.car.carOwnersByPts,
        price: Number(this.car.carPrice),
        promo: this.car.carPromo === "Да",
        pts: this.car.carPts,
        title: CarsTitles.indexOf(this.car.carTitle),
        wheel: CarsWheelsValues.indexOf(this.car.carWheel),
        year_from: Number(this.car.carYearFrom),
        description: this.car.carDescription,
      };
      this.axios
        .post(`${SERVER_HOST}api/car`, data)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            console.log("ok");
            const mappedCar = resolveMappedCar(res.data);
            this.$store.dispatch("pushCarOnFrontend", mappedCar);
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

<style></style>
