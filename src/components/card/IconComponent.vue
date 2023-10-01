<template>
    <i :class="'text-success ' + icon"></i>
</template>
<script>
export default{
    props: {
        icon: {
            type: String
        }
    }
}
</script>