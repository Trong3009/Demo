<template>
    <div class="filter-wrapper">
        <m-button
            buttonTitle="Bộ lọc"
            buttonWithIcon
            buttonClass="btn--btn-with-icon btn--secondary btn-filter"
            icon-class="filter"
            @handleBtnClick="showFilterContent = !showFilterContent"
        ></m-button>
        <div v-if="showFilterContent" class="filter-content">
            <div class="filter-header">
                <div>
                    <h3>{{ filterTitle }}</h3>
                </div>
                <div class="filter-btn-close">
                    <m-icon iconClass="close" @handleIconClick="showFilterContent = false"></m-icon>
                </div>
            </div>
            <div class="filter-body">
                <div v-for="(item, index) in filterList" :key="index" class="filter-item">
                    <m-combobox 
                        :label="item.title" 
                        :options="item.content" 
                        v-model="filterSelected[index]" 
                        titleGray
                    ></m-combobox>
                </div>
            </div>
            <hr>
            <div class="filter-footer">
                <m-button buttonTitle="Áp dụng" buttonClass="btn--primary"></m-button>
                <m-button buttonTitle="Hủy" buttonClass="btn--secondary" @handleBtnClick="showFilterContent = false"></m-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['filterTitle', 'filterList'],
    data() {
        console.log(this.filterList);
        return {
            filterSelected: Array(this.filterList.length).fill(999),
            showFilterContent: false
        }
    }    
}
</script>

<style>
@import url(../../css/base/filter.css);
</style>