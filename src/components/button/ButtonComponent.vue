<template>
    <button
        type="button"
        :class="['btn', 'btn-outline-' + color, size ? 'btn-' + size : '', 'px-4', 'me-md-2']"
    >
        {{
            label
        }}
        <slot name="icon">
        </slot>
    </button>
</template>
<script>
export default {
    props: {
        color: {
            type: String
        },
        size: {
            type: String
        },
        label: {
            type: String
        }
    }
}
</script>