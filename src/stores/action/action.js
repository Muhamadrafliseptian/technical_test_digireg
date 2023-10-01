import { reject } from "lodash";
import Api from "./api";

const process = {
    actions: {
        // Parameter pertama adalah konteks atau objek yang digunakan dalam konteks fungsi ini. 
        // Parameter kedua adalah sebuah array param yang mungkin berisi konfigurasi atau informasi yang diperlukan untuk mengambil data dari API
        // Fungsi getData membuat sebuah objek Promise baru
        getData(context, param) {
            return new Promise((resolve) => {
                // Fungsi ini mungkin digunakan untuk menginisialisasi atau mengkonfigurasi objek Api sebelum melakukan permintaan ke API.
                Api.init();
                // Ini adalah pemanggilan permintaan GET ke API menggunakan objek
                Api.get(param[0]).then(
                    (response) => {
                        // Dalam blok .then(), resolve(response) digunakan untuk menyelesaikan Promise dengan hasil dari respons API
                        resolve(response);
                    },
                    // Ini adalah blok yang akan dijalankan jika terjadi kesalahan selama permintaan ke API.
                    (error) => {
                        reject(error);
                    }
                );
            });
        },
        showData(context, param) {
            return new Promise((resolve) => {
                Api.init();
                Api.get(param[0] + "/" + param[1]).then(
                    (response) => {
                        resolve(response.data);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        },
        postData(context, param) {
            return new Promise((resolve, reject) => {
                Api.init();
                Api.post(param[0], param[1]).then(
                    (response) => {
                        resolve(response.data);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        },
        postDataUpload(context, param) {
            return new Promise((resolve) => {
                Api.init();
                Api.postFormData(param[0], param[1]).then(
                    (response) => {
                        resolve(response.data);
                    },
                    (error) => {
                        reject(error);

                    }
                );
            });
        },         
        updateData(state, param) {
            return new Promise((resolve) => {
                Api.init();
                Api.update(param[0], param[1], param[2]).then(
                    (response) => {
                        resolve(response.data);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        },
        putData(state, param) {
            return new Promise((resolve) => {
                Api.init();
                Api.put(param[0], param[1], param[2]).then(
                    (response) => {
                        resolve(response.data);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        },
        putDataUpload(state, param) {
            return new Promise((resolve) => {
                Api.init();
                Api.updateFormData(param[1], param[0]).then(
                    (response) => {
                        resolve(response.data);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        },
        deleteData(context, param) {
            return new Promise((resolve) => {
                Api.init();
                Api.delete(param[0] + `/${param[1]}`).then(
                    (response) => {
                        resolve(response.data);
                    },
                    (error) => {
                        reject(error.response);
                    }
                );
            });
        },
        async getFile(context, param) {
            Api.init();
            // Api.getFile(param[0]+'?'+param[1]).then(
            const response = await Api.getFile(param[0] + "?" + param[1]);
            let blob = new Blob([response.data], {
                type: "application/vnd.ms-excel",
            });
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "example.xlsx";
            link.click();
        },
    },
};

export default process;