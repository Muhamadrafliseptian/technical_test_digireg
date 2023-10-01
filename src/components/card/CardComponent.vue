<template>
    <div class="card shadow rounded border-0">
        <div class="card-body">
            <h2>
                <slot name="icon">
                </slot>
            </h2>
            <h4 class="card-title">
                {{ title }}
            </h4>
            <p class="card-text">
                {{ content }}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String
        },
        content: {
            type: String
        }
    }
}
</script>