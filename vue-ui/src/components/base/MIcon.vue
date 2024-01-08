<template>
    <div class="icon-wrapper" @click="$emit('handleIconClick')">
        <div class="icon" :class="iconClass"></div>
        <div v-if=desc class="icon-desc-pseudo" :class="{'icon-desc-pseudo--top': descOnTop}"></div>
        <div class="icon-desc" :class="{'icon-desc--top': descOnTop}" v-if="desc">
            {{ desc }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'MIcon',
    props: {
        'iconClass': [String, Object],
        'desc': String,
        'descOnTop': Boolean
    }
}
</script>

<style scoped>
@import url(../../css/base/icon.css);
</style>