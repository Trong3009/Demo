<template>
    <div class="form-wrapper">
        <div class="form-emulation">
            <!-- form header -->
            <div class="form-header">
                <div class="form-header__right">
                    <div 
                        tabindex="0" 
                        class="form-close-btn" 
                        @click="$emit('hideForm')" 
                        @keydown.shift.tab.prevent="processTags('btnCancel')"
                        ref="btnCloseRef"
                    >
                        <m-icon iconClass="close" :desc="$resource.iconDesc.close[$langCode]" descOnTop></m-icon>
                    </div>
                    <div tabindex="0" class="form-help-btn">
                        <m-icon iconClass="icon-question" :desc="$resource.iconDesc.question[$langCode]" descOnTop></m-icon>
                    </div>
                </div>
                <div class="form-header__left" >
                    <h3 class="form-header__title">{{editForm ? 'Sửa danh hiệu thi đua' : 'Thêm danh hiệu thi đua'}}</h3>
                </div>
            </div>
            <!-- form content -->
            <div class="form-content">
                <div class="form-row">
                    <m-input
                        label="Tên danh hiệu thi đua"
                        placeholder="Nhập tên danh hiệu thi đua"
                        required
                        width100
                        inputRef="emulationTitleNameRef"
                        ref="emulationNameRef"
                        v-model="emulationTitleName"
                        hasValidate
                        :errorDesc="errorDesc.emulationName[$langCode]"
                    ></m-input>
                </div>
                <div class="form-row form-group">
                    <div>
                        <m-input
                            label="Mã danh hiệu"
                            required
                            inputRef="emulationTitleCodeRef"
                            ref="emulationCodeRef"
                            v-model="emulationTitleCode"
                            hasValidate
                            :errorDesc="errorDesc.emulationCode[$langCode]"
                        ></m-input>
                    </div>
                    <div>
                        <label class="text-field__title">Đối tượng khen thưởng<span>*</span></label>
                        <div class="form-checkbox">
                            <input 
                                type="checkbox" 
                                v-model="applyObjectPersonal" 
                                ref="inputPersonalRef"
                                @change="handleValidateCheckbox('object')"
                            >
                            <label for="">Cá nhân</label>
                            <input 
                                type="checkbox" 
                                v-model="applyObjectGroup" 
                                @keydown.shift.tab.prevent="processTags('inputPersonalCheckbox')"
                                @change="handleValidateCheckbox('object')"
                            >
                            <label for="">Tập thể</label>
                        </div>
                        <p v-if="objectError" class="text-field__desc-error">{{ objectErrorDesc }}</p>
                    </div>
                </div>
                <div class="form-row form-group">
                    <div>
                        <m-combobox
                            label="Cấp khen thưởng"
                            required
                            :options="commendationList"
                            comboboxRef="emulationForm"
                            ref="comboboxRef"
                            v-model="commendationLevel"
                        ></m-combobox>
                    </div>
                    <div>
                        <label class="text-field__title">Loại phong trào áp dụng<span>*</span></label>
                        <div class="form-checkbox">
                            <input 
                                type="checkbox"     
                                v-model="movementTypeRegular" 
                                @change="handleValidateCheckbox('movement')" 
                                ref="inputRegularRef"
                            >
                            <label for="">Thường xuyên</label>
                            <input type="checkbox" v-model="movementTypePeriodic" @change="handleValidateCheckbox('movement')">
                            <label for="">Theo đợt</label>
                        </div>
                        <p v-if="movementError" class="text-field__desc-error">{{ movementErrorDesc }}</p>
                    </div>
                </div>
                <div class="form-row">
                    <label class="text-field__title">Ghi chú</label>
                    <textarea placeholder="Nhập ghi chú" class="text-field__input text-field__input--nomal form-note"></textarea>
                </div>
            </div>
            <hr>
            <!-- form footer -->
            <div class="form-footer" @keydown="handleKeyEvent">
                <div class="footer__right">
                    <m-button 
                        buttonTitle="Lưu" 
                        buttonClass="btn--primary" 
                        @handleBtnClick="handleSaveData"
                        btnDesc="Save"
                    ></m-button>
                    <m-button 
                        buttonTitle="Lưu & Thêm mới" 
                        buttonClass="btn--third" 
                        ref="btnAddAndSaveRef"
                        btnRef="btnAddAndSaveRef"
                        btnDesc="Save & add"
                    ></m-button>
                </div>
                <div @click="$emit('hideForm')">
                    <m-button 
                        buttonTitle="Hủy" 
                        buttonClass="btn--secondary"
                        ref="btnCancelRef"
                        btnRef="btnCancelRef"
                        @keydown.tab.prevent="processTags('btnClose')"
                        @keydown.shift.tab.prevent="processTags('btnAddAndSave')"
                        btnDesc="Destroy"
                    ></m-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDataToObject } from '../../js/helpers/format-data.js'
import { checkInputRequire, checkCheckboxRequire } from '../../js/helpers/validate.js'

export default {
    emits: ['submitForm'],
    props: {
        'editForm': Boolean,
        'dataForm': Object
    },

    created() {
        this.$emitter.on('focusElementError', this.focusElementError);
    },

    unmounted() {
        this.$emitter.off('focusElementError')
    },

    methods: {
        /**
         * Format lại danh hiệu thi đua để render lên table
         *@author nqtrong (15-08-2023)
         */
        createCommendationList() {
            return formatDataToObject('commendation', this.$enum.emulationType.commendation);
        },
        /**
         * Thiết lập thứ tự tap xuôi
         */
        processTags(target) {
            if (target == 'btnClose') {
               this.$refs.btnCloseRef.focus();
            } else if (target == 'inputPersonalCheckbox') {
                this.$refs.inputPersonalRef.focus();
            } else if(target == 'btnCancel') {
                this.$refs.btnCancelRef.focus();
            } else if (target == 'btnAddAndSave') {
                this.$refs.btnAddAndSaveRef.focus();
            }
        },
        /**
         * Khởi tạo form danh hiệu thi đua
         */
        initForm() {
            return {
                emulationTitleName: this.editForm ? this.dataForm.EmulationName : '',
                emulationTitleCode: this.editForm ? this.dataForm.EmulationCode : '',
                applyObjectPersonal: this.editForm ? this.dataForm.ApplyObject == this.$enum.emulationType.object.personal : true,
                applyObjectGroup: this.editForm ? this.dataForm.ApplyObject == this.$enum.emulationType.object.group : false,
                commendationLevel: this.editForm ? this.dataForm.CommendationLevel : this.$enum.emulationType.commendation.nationalLevel,
                movementTypeRegular: this.editForm ? [0, -1].includes(this.dataForm.MovementType) : true,
                movementTypePeriodic: this.editForm ? [1, -1].includes(this.dataForm.MovementType) : false,
                objectError: false,
                objectErrorDesc: this.$resource.emulationMsg.warning.object[this.$langCode],
                movementError: false,
                movementErrorDesc: this.$resource.emulationMsg.warning.movement[this.$langCode],
                errorDesc: this.$resource.emulationMsg.warning
            }
        },
        /**
         * Xử lý khi submit form
         * @author nqtrong (14-08-2023);
         */
        handleSaveData() {
            try {
                // validate input
                let dialogDesc = [];
                this.elementError = null;
                if (!checkCheckboxRequire([this.movementTypeRegular, this.movementTypePeriodic])) {
                    dialogDesc.push(this.$resource.emulationMsg.warning.movement[this.$langCode]);
                    this.elementError = this.$refs.inputRegularRef;
                    this.movementError = true;
                }
                if (!checkCheckboxRequire([this.applyObjectPersonal, this.applyObjectGroup])) {
                    dialogDesc.push(this.$resource.emulationMsg.warning.object[this.$langCode]);
                    this.elementError = this.$refs.inputPersonalRef;
                    this.objectError = true;
                }
                if (!checkInputRequire(this.emulationTitleCode)) {
                    dialogDesc.push(this.$resource.emulationMsg.warning.emulationCode[this.$langCode]);
                    this.elementError = this.$refs.emulationCodeRef;
                    this.$refs.emulationCodeRef.showError();
                }
                if (!checkInputRequire(this.emulationTitleName)) {
                    dialogDesc.push(this.$resource.emulationMsg.warning.emulationName[this.$langCode]);
                    this.elementError = this.$refs.emulationNameRef;
                    this.$refs.emulationNameRef.showError();
                }

                if (dialogDesc.length > 0) {
                    dialogDesc.reverse();
                    this.$common.showDialog('warning', 'Dữ liệu không hợp lệ', dialogDesc);
                } else {
                    // Lưu dữ liệu
                    let formType;
                    if (this.editForm) {
                        // Gọi Api chỉnh sửa dữ liệu
                        formType = 'update';
                    } else {
                        // Gọi Api tạo mới dữ liệu
                        formType = 'add';
                    }
    
                    // Hiện toast message và đóng form
                    this.$emit('submitForm');
                    this.$common.showToastMessage(
                        this.$resource.emulationToastMessage.title.success[this.$langCode],
                        this.$resource.emulationToastMessage.content[formType].success[this.$langCode]);
                }
    
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Focus vào ô input cảnh báo
         */
        focusElementError() {
            this.elementError?.focus();
        },
        /**
         * Validate checkbox của Đối tượng khen thưởng và Loại phong trào áp dụng
         */
        handleValidateCheckbox(type) {
            if (type == 'object') {
                if (!checkCheckboxRequire([this.applyObjectPersonal, this.applyObjectGroup])) {
                    this.objectError = true;
                } else {
                    this.objectError = false;
                }
            } else if (type == 'movement') {
                if (!checkCheckboxRequire([this.movementTypeRegular, this.movementTypePeriodic])) {
                    this.movementError = true;
                } else {
                    this.movementError = false;
                }
            }
        },
        handleKeyEvent(event) {
            console.log(event);
        }
    },

    mounted() {
        this.$refs.emulationNameRef?.focus();
    },

    data() {
        return {
            commendationList: this.createCommendationList(),
            ...this.initForm(),
            elementError: null,
        }
    },

    watch: {
        /**
         * Theo dõi sự thay đổi của commendation level trong combobox
         */
        commendationLevel(newValue) {
            this.commendationLevel = newValue;
        }
    }
}
</script>

<style scoped>
@import url(../../css/emulation/emulaiton-form.css);
</style>