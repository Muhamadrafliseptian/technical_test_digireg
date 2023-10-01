<template>
    <div class="container col-xxl-10 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-4 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
                <div class="shadow rounded">
                    <!-- l-map merupakan tampilan untuk menampilkan map -->
                    <l-map style="height: 400px" :zoom="zoom" :center="center">
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <l-circle :lat-lng="center" :color="circleColor"></l-circle>
                        <!-- melakukan perulangan pohon -->
                        <template v-for="data in trees">
                            <!-- kondisi untuk menampilkan hanya pohon kwanzan -->
                            <l-marker v-if="selectedTree === 'KWANZAN FLOWERING CHERRY'"
                                :lat-lng="[data.geoPoint2D ? data.geoPoint2D.lat : '', data.geoPoint2D ? data.geoPoint2D.lon : '']"
                                :icon="treesIcon">
                                <l-popup :options="popupOptions">
                                    <p class="mb-0">
                                        <IconComponent icon="fas fa-seedling" /> {{ data.commonName }}
                                    </p>
                                    <p class="mb-0">
                                        <IconComponent icon="fas fa-ruler-vertical" /> {{ data.heightRange }} feet
                                    </p>
                                    <p>
                                        <IconComponent icon="fas fa-calendar" />
                                        <template v-if="data.datePlanted">
                                            {{ data.datePlanted }}
                                        </template>
                                        <template v-else>
                                            unknown
                                        </template>
                                    </p>
                                </l-popup>
                            </l-marker>
                        </template>
                        <template v-if="selectedTree === 'NORWAY MAPLE'">
                            <l-marker v-for="data in maple"
                                :lat-lng="[data.geoPoint2D ? data.geoPoint2D.lat : '', data.geoPoint2D ? data.geoPoint2D.lon : '']"
                                :icon="norwayMapleIcon">
                                <l-popup :options="popupOptions">
                                    <p class="mb-0">
                                        <IconComponent icon="fas fa-seedling" /> {{ data.commonName }}
                                    </p>
                                    <p class="mb-0">
                                        <IconComponent icon="fas fa-ruler-vertical" /> {{ data.heightRange }} feet
                                    </p>
                                    <p>
                                        <IconComponent icon="fas fa-calendar" />
                                        <template v-if="data.datePlanted">
                                            {{ data.datePlanted }}
                                        </template>
                                        <template v-else>
                                            unknown
                                        </template>
                                    </p>
                                </l-popup>
                            </l-marker>
                        </template>
                        <template v-if="selectedTree === 'PISSARD PLUM'">
                            <l-marker
                              v-for="data in pissard"
                              :lat-lng="[data.geoPoint2D ? data.geoPoint2D.lat : '', data.geoPoint2D ? data.geoPoint2D.lon : '']"
                              :icon="pissardIcon"
                            >
                                <l-popup :options="popupOptions">
                                    <p class="mb-0">
                                        <IconComponent icon="fas fa-seedling" /> {{ data.commonName }}
                                    </p>
                                    <p class="mb-0">
                                        <IconComponent icon="fas fa-ruler-vertical" /> {{ data.heightRange }} feet
                                    </p>
                                    <p>
                                        <IconComponent icon="fas fa-calendar" />
                                        <template v-if="data.datePlanted">
                                            {{ data.datePlanted }}
                                        </template>
                                        <template v-else>
                                            unknown
                                        </template>
                                    </p>
                                </l-popup>
                            </l-marker>
                        </template>
                    </l-map>
                </div>
            </div>
            <div class="col-lg-6" data-aos="fade-right" data-aos-duration="3000">
                <h1 class="display-5 fw-bold lh-1 mb-3">
                    <span class="border-top border-5 border-success">Type</span> of Trees
                </h1>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <template v-for="data in accordion">
                        <accordion :dataTarget="data.dataTarget" :target="data.target" :nameTrees="data.nameTrees"
                            :description="data.description" @click="showTree(data.nameTrees)" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//menggunakan component card dan icon untuk program lebih reusable
import accordion from '../components/accordion/accordion.vue';
import CardComponent from '../components/card/CardComponent.vue';
import IconComponent from '../components/card/IconComponent.vue';
import ButtonComponent from '../components/button/ButtonComponent.vue';
import treesMarker from '../assets/kwanzan.png'
import mapleMarker from '../assets/maple.png'
import pissardMarker from '../assets/brown.png'
//menggunakan library leaflet untuk menampilkan map
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LCircle } from "@vue-leaflet/vue-leaflet";
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
            maple: [],
            pissard: [],
            treesIcon: null,
            norwayMapleIcon: null,
            pissardIcon: null,
            selectedTree: null,
            isLoading: false,
            //data dummy accordion
            accordion: [
                {
                    dataTarget: '#flush-1',
                    target: 'flush-1',
                    nameTrees: 'KWANZAN FLOWERING CHERRY',
                    description: 'lorem'
                },
                {
                    dataTarget: '#flush-2',
                    target: 'flush-2',
                    nameTrees: 'PISSARD PLUM',
                    description: 'lorem'
                },
                {
                    dataTarget: '#flush-3',
                    target: 'flush-3',
                    nameTrees: 'NORWAY MAPLE',
                    description: 'lorem'
                },
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
        ButtonComponent,
        accordion,
    },
    created() {
        // mendaftarkan beberapa method
        this.getData(),
            this.getNorwayMaple(),
            this.getPissard()
    },
    mounted() {
        // mendaftarkan method untuk custom icon
        this.customIcon()
    },
    methods: {
        //method untuk get pohon kwanzan
        getData() {
            let type = "getData"
            let url = [
                '?limit=100&refine=common_name%3A"KWANZAN%20FLOWERING%20CHERRY"'
            ]
            this.$store.dispatch(type, url).then((response) => {
                this.trees = response.data.results
            })
        },
        //method untuk get pohon norway
        getNorwayMaple() {
            let type = "getData"
            let url = [
                '?limit=100&refine=common_name%3A"NORWAY%20MAPLE"'
            ]
            this.$store.dispatch(type, url).then((response) => {
                this.maple = response.data.results
            })
        },
        //method untuk get pohon pissard
        getPissard() {
            let type = "getData"
            let url = [
                '?limit=100&refine=common_name%3A"PISSARD%20PLUM"'
            ]
            this.$store.dispatch(type, url).then((response) => {
                this.pissard = response.data.results
            })
        },
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
        //method untuk custom icon
        customIcon() {
            this.treesIcon = L.icon({
                iconUrl: treesMarker,
                iconSize: [40, 45]
            }),
                this.norwayMapleIcon = L.icon({
                    iconUrl: mapleMarker,
                    iconSize: [40, 45]
                }),
                this.pissardIcon = L.icon({
                    iconUrl: pissardMarker,
                    iconSize: [40, 45]
                })
        },
        //method untuk menampilkan dan hide pohon
        showTree(treeType) {
            this.selectedTree = treeType;
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