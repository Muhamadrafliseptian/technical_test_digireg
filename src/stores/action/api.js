import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import Cookies from "js-cookie";
import snakecaseKeys from "snakecase-keys";

const Api = {
    //digunakan untuk menginisiasi endpoint api yang akan dipakai
    init() {
    axios.defaults.baseURL = "https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets/street-trees/records";
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    },
    setAccessControl() {
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        // Baris ini mengatur header HTTP "Access-Control-Allow-Origin" dalam axios. Dengan mengatur "*,"artinya server yang menerima permintaan 
        // (request) dari berbagai domain atau asal (cross-origin) diizinkan. Ini digunakan untuk mengatasi permasalahan CORS (Cross-Origin Resource Sharing) 
        // yang sering muncul saat aplikasi web mencoba berinteraksi dengan sumber daya dari domain lain.
        axios.defaults.headers.common["Cache-Control"] = "no-cache, private";
        // Baris ini mengatur header HTTP "Cache-Control" dalam axios. Pengaturan ini menginstruksikan browser untuk tidak menyimpan respons dari permintaan ini dalam cache (no-cache) dan bahwa respons ini bersifat pribadi (private), yang berarti tidak boleh dicache oleh cache bersama (public cache).
        axios.defaults.headers.common["Access-Control-AlloW-Method"] = ["GET", "POST", "PUT", "DELETE"];
        // Baris ini mencoba mengatur header HTTP "Access-Control-Allow-Methods" dalam axios. Header ini seharusnya berisi daftar metode HTTP yang diizinkan oleh server untuk digunakan oleh permintaan dari cross-origin. Dalam kode tersebut, metode yang diizinkan adalah GET, POST, PUT, dan DELETE.
    },
    // Pengaturan ini berguna ketika Anda ingin mengunggah file dari klien ke server. Saat kita mengatur "Content-Type" 
    // sebagai "multipart/form-data," axios akan mengkodekan permintaan HTTP POST sesuai dengan format 
    // yang sesuai dengan standar "multipart/form-data" untuk mengirimkan data form secara benar, 
    // termasuk file-file yang akan diunggah
    setHeaderMultipartFormData() {
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    },
    //resource merupakan parameter pertama berisi url yang diminta
    //params merupakan mengirimkan query dan string. methods ini diawali dengan return untuk 
    // permintaan pertama kali
    get(resource, params) {
        return axios.get(`${resource}`, {
            params: params,
            transformResponse: [
                (data) => {
                    // Ini adalah fungsi transformasi yang akan dijalankan pada data respons yang diterima. Fungsi ini mengambil data sebagai argumen.
                    return camelcaseKeys(JSON.parse(data), { deep: true });
                    // Data respons yang diterima diuraikan dari format JSON ke objek JavaScript.
                },
            ],
        });
    },
    post(resource, params) {
        return axios.post(
            `${resource}`,
            snakecaseKeys(params, { deep: true }),
            {
                transformResponse: [
                    (data) => {
                        if (data) {
                            return camelcaseKeys(JSON.parse(data), {
                                deep: true,
                            });
                        }
                    },
                ],
            }
        );
    },
    postFormData(resource, params) {
        return axios.post(`${resource}`, params);

    },
    delete(resource) {
        return axios.delete(resource);
    },
    update(resource, slug, params) {
        return axios.put(       
            `${resource}/${slug}`,
            snakecaseKeys(params, { deep: true })
        );
    },
    updateFormData(resource, params) {
        console.log(resource, params);
        return axios.put(`${resource}`, params, {
            transformResponse: [
                (data) => {
                    if (data) {
                        return camelcaseKeys(JSON.parse(data), { deep: true });
                    }
                },
            ],
        });
    },

    put(resource, params) {
        return axios.put(`${resource}`, snakecaseKeys(params, { deep: true }));
    },
    getFile(resource, params) {
        return axios.get(`${resource}`, {
            responseType: "blob",
            params: params,
        });
    },
};

export default Api;