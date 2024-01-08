<template>
    <div class="container">
        <!-- content header -->
        <div class="container__header">
            <div class="container__info">
                <span>Danh hiệu thi đua</span>
            </div>
            <div class="container__options">
                <div class="options__left">
                    <m-input
                        placeholder="Nhập mã hoặc tên danh hiệu..."
                        hasIcon
                        iconClass="icon-search--gray"
                        iconAfter
                        inputRef="inputSearchRef"
                    ></m-input>
                    <div class="content-filter">
                        <m-filter filterTitle="Lọc danh hiệu" :filterList="filterList"></m-filter>
                    </div>
                </div>
                <div>
                    <m-button v-if="!hasRowSelected"
                        buttonTitle="Thêm danh hiệu" 
                        buttonWithIcon 
                        buttonClass="btn--primary btn--btn-with-icon"
                        iconClass="add"
                        @handleBtnClick="showFormCreateNewData()"
                    ></m-button>
                    <div v-else class="content-select-option">
                        <div class="content-select-option__info">Đã chọn <span>{{ numberOfRowSelected }}</span></div>
                        <m-button buttonTitle="Bỏ chọn" buttonClass="btn--link" @click="handleBtnClickUnChecked"></m-button>
                        <m-button buttonTitle="Sử dụng" buttonClass="btn--third"></m-button>
                        <m-button buttonTitle="Ngừng sử dụng" buttonClass="btn--secondary filter"></m-button>
                        <m-button buttonTitle="Xóa" buttonClass="btn--delete"></m-button>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- table data -->
        <div class="container__content">
            <div class="container-data">
                <m-table 
                    :tableHeader="tableHeader" 
                    :tableData="emulationList" 
                    :showLoading="showLoading"
                    @editData="handleEditData"
                    @handleSelectedRow="handleSelectedRow"
                    ref="emulationFormRef"
                ></m-table>
            </div>
        </div>
    </div>
    <div>
        <EmulationForm
            v-if="showForm"
            @hideForm="showForm=false"
            @submitForm="handleAfterSubmitForm"
            :editForm="editForm"
            :dataForm="dataForm"
        ></EmulationForm>
    </div>
</template>

<script>
import EmulationForm from './EmulationForm.vue'
import { getEmulationList } from '../../js/services/emulation.js';
import { formatData, formatDataToObject } from '../../js/helpers/format-data.js';

export default {
    components: {
        EmulationForm
    },

    setup() {
        const tableHeader = [
            {
                title: 'Tên danh hiệu thi đua',
                fieldName: 'EmulationTitleName'
            },
            {
                title: 'Mã danh hiệu',
                fieldName: 'EmulationTitleCode'
            },
            {
                title: 'Đối tượng khen thưởng',
                fieldName: 'ApplyObject'
            },
            {
                title: 'Cấp khen thưởng',
                fieldName: 'CommendationLevel'
            },
            {
                title: 'Loại phong trào',
                fieldName: 'MovementType'
            },
            {
                title: 'Trạng thái',
                fieldName: 'Inactive'
            },
        ];
        return {
            tableHeader,
        }
    },
    
    data() {
        return {
            emulationList: [],
            showForm: false,
            showLoading: true,
            editForm: false,
            dataForm: null,
            hasRowSelected: false,
            numberOfRowSelected: 0,
        }
    },

    created() {
        this.showLoading = true;
        getEmulationList()
        .then(res => {
            this.emulationList = res.PageData;
            this.emulationList = this.emulationList.map(item => {
                let data = {...item};
                item['ApplyObject'] = formatData('object', item['ApplyObject']);
                item['CommendationLevel'] = formatData('commendation', item['CommendationLevel']);
                item['MovementType'] = formatData('movement', item['MovementType']);
                item['Inactive'] = formatData('inactive', item['Inactive']);
                return {
                    data,
                    dataFormated: {...item, selected: false}
                };
            });
            this.showLoading = false;
        });
    },

    computed: {
        /**
         * Tạo dữ liệu cho bộ lọc
         * @author nqtrong 12-08-2023
         */
        filterList: function () { 
            try {
                const objectList = [
                    {
                        title: 'Tất cả',
                        value: 999
                    },
                    ...formatDataToObject('object', this.$_MEnum.emulationType.object)
                ];
                const commendationList = [
                    {
                        title: 'Tất cả',
                        value: 999
                    },
                    ...formatDataToObject('commendation', this.$_MEnum.emulationType.commendation)
                ];
                const movementList = [
                    {
                        title: 'Tất cả',
                        value: 999
                    },
                    ...formatDataToObject('movement', this.$_MEnum.emulationType.movement)
                ];
                const inactiveList = [
                    {
                        title: 'Tất cả',
                        value: 999
                    },
                    ...formatDataToObject('inactive', this.$_MEnum.emulationType.inactive)
                ];
    
                return [
                    {
                        title: 'Đối tượng khen thưởng',
                        content: objectList
                    },
                    {
                        title: 'Cấp khen thưởng',
                        content: commendationList
                    },
                    {
                        title: 'Loại phong trào',
                        content: movementList
                    },
                    {
                        title: 'Trạng thái',
                        content: inactiveList
                    },
                ];
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    },

    methods: {
        /**
         * Hiện form tạo mới danh hiệu thi đua
         * @author nqtrong 12-08-2023
         */
        showFormCreateNewData() {
            this.showForm = true;
            this.editForm = false;
        },
        /**
         * Chỉnh sửa thông tin danh hiệu thi đua
         * @author nqtrong 12-08-2023
         */
        handleEditData(data) {
            this.showForm = true;
            this.editForm = true;
            this.dataForm = data;
        },
        /**
         * Xử lý sự kiện khi chọn 1 row
         * @author nqtrong 12-08-2023
         */
        handleSelectedRow(numberOfRowSelected) {
            this.numberOfRowSelected = numberOfRowSelected;
            if (numberOfRowSelected > 0) {
                this.hasRowSelected = true;
                } else {
                this.hasRowSelected = false;
            }
        },
        /**
         * Xử lý sự kiện khi nhấn nút bỏ chọn
         * @author nqtrong 12-08-2023
         */
        handleBtnClickUnChecked() {
            this.$refs.emulationFormRef.handleUnCheckAllRow();
        },
        /**
         * Xử lý sự kiện sau khi submit form
         * @author nqtrong 12-08-2023
         */
        handleAfterSubmitForm() {
            this.showForm = false;
        }
    }
}
</script>

<style scoped>
@import url(../../css/emulation/emulation-list.css);
</style>