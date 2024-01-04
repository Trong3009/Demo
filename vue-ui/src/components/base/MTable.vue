<template>
    <div class="table-wrapper">
        <table class="table table--w-100">
            <!-- header -->
            <thead class="table-head">
                <tr class="table-head__row">
                    <th class="table-head__col">
                        <input type="checkbox" class="table__check" v-model="selecteAllRow" @input="handleCheckAllRow($event.target.checked)"/>
                    </th>
                    <th v-for="(item, index) in tableHeader" class="table-head__col" :key="index" :fieldName="item.fieldName">{{ item.title }}</th>
                    <th class="table-head__col"></th>
                </tr>
            </thead>
            <!-- body -->
            <tbody class="table-body content-data__body">
                <!-- show loading when load data from server -->
                <div v-if="showLoading" class="table-loader-wrapper">
                    <span class="table-loader"></span>
                </div>
                <tr 
                    v-for="(item, index) in tableData" 
                    :key="index" class="table-body__row"
                    :class="{'table-body__row--active': item.dataFormated.selected}"
                    @mouseover="rowHovered=index+1"
                    @dblclick="$emit('editData', item.data)"
                >
                    <td class="table-body__col">
                        <input 
                            type="checkbox" 
                            class="table__check" 
                            v-model="item.dataFormated.selected" 
                            @input="handleCheckOneRow($event.target.checked)"
                        />
                    </td>
                    <td v-for="(header, index) in tableHeader" :key="index" class="table-body__col">
                        <span v-if="index == tableHeader.length - 1" class="table-body__col-status"></span>
                        {{ item.dataFormated[header.fieldName] }}
                    </td>
                    <td class="table-body__col">
                        <div class="table-body__col-option">
                            <div @click="$emit('editData', item.data)">
                                <m-icon iconClass="pencil" :desc="$resource.iconDesc.pencil[$langCode]" descOnTop></m-icon>
                            </div>
                            <div class="table-option-more-wrapper">
                                <div @click="showOptionRows[index] = !showOptionRows[index]">
                                    <m-icon iconClass="three-dot" :desc="$resource.iconDesc.threeDot[$langCode]" descOnTop></m-icon>
                                </div>
                                <div v-show="showOptionRows[index]" class="table-option-more">
                                    <div 
                                        class="table-option-more__item" 
                                        :class="{'table-option-more__item--disable': !item.data.Inactive}"
                                        @click="handleUseData()"
                                    >
                                        Sử dụng
                                    </div>
                                    <div 
                                        class="table-option-more__item" 
                                        :class="{'table-option-more__item--disable': item.data.Inactive}"
                                        @click="handleStopUseData()"
                                    >
                                        Ngừng sử dụng
                                    </div>
                                    <div class="table-option-more__item" @click="handleDeleteData()">
                                        Xóa
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pagination">
        <div class="table-foot__row">
            <div class="table-foot__total-records">
                Tổng: <span>{{ tableData.length }}</span> bản ghi
            </div>
            <div class="table-options">
                <span class="table-options__title">Bản ghi/Trang</span>
                <m-combobox 
                    :options="numberOfRecordsList" 
                    showInTop 
                    comboboxSmall 
                    v-model="numberOfRecordsSelected"
                ></m-combobox>
                <span class="table-options__record-info"><span>1</span> - <span>{{ tableData.length }}</span> bản ghi</span>
                <div class="table-options__wrapper-btn">
                    <m-icon iconClass="left"></m-icon>
                    <m-icon iconClass="right"></m-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    props: ['tableHeader', 'tableData', 'showLoading'],
    emits: ['editData', 'handleSelectedRow'],

    setup() {
        const numberOfRecordsList = [
                {
                    title: '10',
                    value: 10
                },
                {
                    title: '20',
                    value: 20
                },
                {
                    title: '50',
                    value: 50
                },
                {
                    title: '100',
                    value: 100
                }
            ]

        return {
            numberOfRecordsList
        }
    },
    
    data() {
        var showOptionRows = reactive({
            show: Array(this.tableData.length).fill(false)
        });

        return {
            selecteAllRow: false,
            numberOfRowSelected: 0,
            numberOfRecordsSelected: 50,
            rowHovered: null,
            showOptionRows
        }
    },

    methods: {
        /**
         * Xử lý sự kiện khi hover vào một hàng trong table
         * @author nqtrong (15-08-2023)
         */
        handleHideAllOptionMore() { 
            this.showOptionRows = Array(this.tableData.length).fill(false);
        },
        /**
         * Xử lý sự kiện khi click vào sử dụng
         */
        handleUseData() {
            this.handleHideAllOptionMore();
        },
        /**
         * Xử lý sự kiện khi click vào ngừng sử dụng
         */
        handleStopUseData() {
            this.handleHideAllOptionMore();
        },
        /**
         * Xử lý sự kiện khi click vào xóa
         */
        handleDeleteData() {
            this.handleHideAllOptionMore();
        },
        /**
         * Xử lý sự kiện khi click vào nút checkbox all
         */
        handleCheckAllRow(value) {
            if (value) {
                this.numberOfRowSelected = this.tableData.length;
                this.tableData.forEach(item => item.dataFormated.selected = true);
            } else {
                this.numberOfRowSelected = 0;
                this.tableData.forEach(item => item.dataFormated.selected = false);
            }
            this.$emit('handleSelectedRow', this.numberOfRowSelected);
        },
        /**
         * Xử lý sự kiện khi click vào một nút checkbox
         */
        handleCheckOneRow(value) {
            if (value) {
                this.numberOfRowSelected += 1;
            } else {
                this.numberOfRowSelected -= 1;
            }

            if (this.numberOfRowSelected == this.tableData.length) {
                this.selecteAllRow = true;
            } else {
                this.selecteAllRow = false;
            }

            this.$emit('handleSelectedRow', this.numberOfRowSelected);
        }, 
        /**
         * Bỏ chọn tất cả row
         */
        handleUnCheckAllRow() {
            this.selecteAllRow = false;
            this.handleCheckAllRow(false);
        }
    },
    
    watch: {
        /**
         * Kiểm tra khi hover ra khỏi hàng thì ẩn đi bảng option more
         */
        rowHovered(newValue) {
            if (newValue) {
                this.handleHideAllOptionMore();
            }
        }
    }
}
</script>

<style scoped>
@import url(../../css/base/table.css);
</style>