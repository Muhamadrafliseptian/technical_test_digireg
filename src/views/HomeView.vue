<template>
    <div class="container col-xxl-10 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-4 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
                <img src="../assets/hero.jpg" class="d-block mx-lg-auto img-fluid" width="400" height="400" alt="">
            </div>
            <div class="col-lg-6">
                <div data-aos="fade-left" data-aos-duration="3000">
                    <h1 class="display-5 fw-bold lh-1 mb-3">
                        <span class="border-top border-5 border-success">Welcome</span> to Plant Goodness
                    </h1>
                    <p class="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit assumenda quia eum neque numquam. Illo a
                        molestiae placeat nostrum, eos recusandae, ducimus perspiciatis, hic tempore distinctio vero excepturi
                        optio aspernatur.
                    </p>
                </div>
                <div data-aos="fade-right" data-aos-duration="3000">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <a href="#bawah">
                            <!-- penerapan components -->
                            <ButtonComponent label="explore" color="success" size="sm">
                                <template #icon>
                                    <IconComponent icon="fas fa-arrow-down" />
                                </template>
                            </ButtonComponent>
                        </a>
                    </div>
                    <div class="row py-3">
                        <!-- perulangan card dengan data dummy -->
                        <template v-for="data in card">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                                <CardComponent :title="data.title" :content="data.content" @click="goTo">
                                    <template #icon>
                                        <IconComponent :icon="data.icon" />
                                    </template>
                                </CardComponent>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="row flex-lg-reverse align-items-center g-4 py-4" id="bawah">
            <div class="col-10 col-sm-8 col-lg-6">
                <div class="shadow rounded">
                    <!-- l-map merupakan component dari leaflet untuk menampilkan map. lalu zoom merupakan jarak dari user dengan peta dan center adlaah lokasi berada pohon -->
                    <l-map style="height: 400px" :zoom="zoom" :center="center">
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <!-- l-circle digunakan untuk membuat lingkaran yang mengelompokkan seluruh jenis pohon. radius 
                        merupakan garis terluar untuk lingkaran.
                        -->
                        <l-circle :lat-lng="center" :radius="calculateCircleRadius()" :color="circleColor"></l-circle>
                        <!-- melakukan perulangan untuk menampilkan pohon ke dalam map -->
                        <template v-for="data in trees">
                            <!-- l-marker untuk menampilkan foto dalam bentuk gambar -->
                            <l-marker
                                :lat-lng="[data.geoPoint2D ? data.geoPoint2D.lat : '', data.geoPoint2D ? data.geoPoint2D.lon : '']" :icon="treesIcon">
                                <!-- l-popup menampilkan detail dari pohon untuk ditampilkan ke dalam map -->
                                <l-popup :options="popupOptions">
                                    <p class="mb-0"><IconComponent icon="fas fa-seedling"/> {{ data.commonName }}</p>
                                    <p>
                                        <IconComponent icon="fas fa-calendar"/>
                                        {{ data.datePlanted }}
                                    </p>
                                </l-popup>
                            </l-marker>
                        </template>
                    </l-map>
                </div>
            </div>
            <div class="col-lg-6 text-end">
                <div data-aos="fade-left" data-aos-duration="3000">
                    <h1 class="display-5 fw-bold lh-1 mb-3">
                        Where is Our <span class="text-success">Plantation</span> Located?
                    </h1>
                    <p class="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit assumenda quia eum neque numquam. Illo a
                        molestiae placeat nostrum, eos recusandae, ducimus perspiciatis, hic tempore distinctio vero excepturi
                        optio aspernatur.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//menggunakan component card dan icon untuk program lebih reusable
import CardComponent from '../components/card/CardComponent.vue';
import IconComponent from '../components/card/IconComponent.vue';
import ButtonComponent from '../components/button/ButtonComponent.vue';
//menggunakan library leaflet untuk menampilkan map
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LCircle } from "@vue-leaflet/vue-leaflet";
import treesMarker from '../assets/tree.png'
export default {
    data() {
        return {
            //atribut untuk map
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> digireg',
            zoom: 10,
            center: [49.2603, -123.113979],
            popupOptions: {
                maxWidth: 200
            },
            circleColor: 'blue',
            trees: [],
            treesIcon: null,
            //data dummy card
            card: [
                {
                    title: 'Types Tree',
                    content: 'lorem ipsum dolor',
                    icon: 'text-success fas fa-leaf'
                },
                {
                    title: 'Stages Tree',
                    content: 'lorem ipsum dolor',
                    icon: 'text-success fas fa-hands'
                }
            ]
        };
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LCircle,
        CardComponent,
        IconComponent,
        ButtonComponent
    },
    created() {
        //mendaftarkan method getData()
        this.getData()
    },
    mounted() {
        //digunakan untuk mendaftarkan method custom icon
        this.customIcon()
    },
    methods: {
        //method untuk pindah halaman ke type tree
        goTo(){
            this.$router.push({name: 'TypeTree'})
        },
        //method untuk fetching data pohon dengan tipe getData
        getData() {
            let type = "getData"
            let url = [
                '?limit=100', {}
            ]
            this.$store.dispatch(type, url).then((response)=>{
                this.trees = response.data.results
            })
        },
        //method untuk membuat garis lingkaran untuk mengelompokkan semua pohon
        calculateCircleRadius() {
            // Hitung jarak terjauh antara pusat dan semua marker
            let maxDistance = 0;
            this.trees.forEach((data) => {
                if (data.geoPoint2D) {
                    const latLng = [data.geoPoint2D.lat, data.geoPoint2D.lon];
                    const distance = L.latLng(this.center).distanceTo(latLng);
                    if (distance > maxDistance) {
                        maxDistance = distance;
                    }
                }
            });

            // Kembalikan radius lingkaran yang sesuai
            return maxDistance;
        },
        //method untuk melakukan perubahan icon default marker
        customIcon(){
            this.treesIcon = L.icon({
                iconUrl: treesMarker,
                iconSize: [40, 45]
            })
        }
    },
}
</script>
<style>
.map-container {
    position: relative;
    padding-bottom: 75%;
    height: 0;
    overflow: hidden;
}

.map-container .leaflet-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>