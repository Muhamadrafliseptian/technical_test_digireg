<template>
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                :data-bs-target="dataTarget" aria-expanded="false" aria-controls="flush-1">
                {{ nameTrees }}
            </button>
        </h2>
        <div :id="target" class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                {{ description }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        nameTrees: {
            type: String
        },
        description: {
            type: String
        },
        dataTarget: {
            type: String
        },
        target: {
            type: String
        }
    }
}
</script>