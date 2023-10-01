<template>
    <router-link class="navbar-brand" to="/">
        <b>
            <img src="../../assets/brand.png" alt="Bootstrap" width="35" height="40">
            {{ Name }}
        </b>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL"
        aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
</template>
<script>
export default {
    props: {
        Name: {
            type: String
        }
    }
}
</script>