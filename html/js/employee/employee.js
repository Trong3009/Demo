/**
 * Khởi tạo sự kiện và dữ liệu sau khi DOM load
 * @author NQTrong
 */
window.onload = function() {
    const employee = new Employee();
    employee.loadEmployeeData();
    employee.initEvenListener();
}

class Employee {
    elementError;
    tableDataId;
    hasPostDataError = false;
    createNewEmployee = true;
    rowSelected = [];
    inputCode = document.querySelector('#input-code');
    inputName = document.querySelector('#input-name');
    inputOrganization = document.querySelector('#input-organization');
    inputTitle = document.querySelector('#input-title');
    inputDateOfBirth = document.querySelector('#input-date-of-birth');
    inputGender = document.querySelector('input[name="gender"]:checked');
    inputIdentityId = document.querySelector('#input-identity-id');
    inputDateOfIdentity = document.querySelector('#input-date-of-identity');
    inputPlaceOfIdentity = document.querySelector('#input-place-of-identity');
    inputAddress = document.querySelector('#input-address');
    inputEmail = document.querySelector('#input-email');
    employeeEditId;

    /**
     * Khởi tạo đối tượng Employee
     * @author NQTrong
     */
    constructor() {
        this.tableDataId = '#table-employee';
    }

    /**
     * Load dữ liệu từ server
     * @author NQTrong
     */
    loadEmployeeData() {
        try {
            document.querySelector('.loading-wrapper').style.display = 'block';
            const tableBody = document.querySelector(`${this.tableDataId} tbody`);
            tableBody.innerHTML = '';
            const tableColProperties = document.querySelectorAll(`${this.tableDataId} th`);
    
            getData(personType.employee)
            .then(res => {
                res.forEach(employee => {
                    let tr = document.createElement('tr');
                    tr.classList.add('table-body__row')
                    tr.innerHTML = `<td class="table-body__col">
                                        <input type="checkbox" class="table__check"/>
                                    </td>`
    
                    tableColProperties.forEach(el => {
                        let fieldName = el.getAttribute('fieldName');
                        if (fieldName) {
                            let td = document.createElement('td');
                            td.classList.add('table-body__col');
                            let data = employee[fieldName];
                            data = data ? data : '';
                            if (fieldName == 'Gender') {
                                td.classList.add('table__col-gender');
                                data = formatData('gender', data);
                            } else if (fieldName == 'DateOfBirth') {
                                td.classList.add('table__col-date')
                                data = formatData('date', data);
                            }
                            td.innerText = data;
                            tr.append(td);
                        }
                    });
    
                    tr.insertAdjacentHTML('beforeend', `<td class="table-body__col table-body__func">
                                                            <span class="btn-edit-employee">Sửa</span>
                                                            <div class="icon-wrapper">
                                                                <div class="icon icon-func"></div>
                                                                <div class="table-selected-options__result" hidden>
                                                                    <div class="combobox__result-list">
                                                                        <p class="combobox__result">Nhân bản</p>
                                                                        <p class="combobox__result btn-delete-employee">Xóa</p>
                                                                        <p class="combobox__result">Ngừng sử dụng</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>`);
                    tr.setAttribute('employeeIdAttr', employee.EmployeeId);
                    tableBody.append(tr);
                });
                
                document.querySelector('.loading-wrapper').style.display = 'none';
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    /**
     * Khởi tạo even trong trang employee
     * @author NQTrong
     */
    initEvenListener() {
        try {
            document.querySelector('.content__header .icon-reload').addEventListener('click', () => this.loadEmployeeData());
            document.querySelector('#table-add-employee').addEventListener('click', () => {
                this.createNewEmployee = true;
                this.handleToggleForm('block', true);
            });
            document.querySelector('#btn-close-form').addEventListener('click',  () => this.handleToggleForm('none', false));
            document.querySelector('#btn-cancel-form').addEventListener('click',  () => this.handleToggleForm('none',false));
            document.querySelector('#table-select-number-records').addEventListener('click', this.handleToggleSelectRecords);    
            document.querySelector('#btn-cancel-form').addEventListener('keydown', (event) => this.handleTabLoopInForm(true, event));
            document.querySelector('#btn-close-form').addEventListener('keydown', (event) => this.handleTabLoopInForm(false, event));
            document.querySelectorAll('input[type="date"]').forEach(el => 
                el.addEventListener('change', () => this.handleChangeInputDate(el)));

            document.querySelector('#btn-save-and-add').addEventListener('click', () => this.handleSaveEmployeeInfo());
            document.querySelectorAll('.btn-close-dialog').forEach(el => 
                el.addEventListener('click', () => {
                    this.handleToggleWarningDialog('none');
                    this.elementError.focus();
                }));
            document.querySelectorAll('.btn-close-delete-dialog').forEach(el => 
                el.addEventListener('click', () => {
                    this.handleToggleDeleteDialog('none');
                }));

            document.querySelector('.table-head__row input').addEventListener('change',(event) => this.handleToggleAllInput(event));

            // theo dõi input ở từng hàng
            document.addEventListener('change', e => {
                const inputTableRow = e.target.closest('.table-body__row input');
                if (inputTableRow) {
                    this.handleToggleInput(inputTableRow);
                }
            });

            // theo dõi sự kiện sửa, xóa nhân viên
            document.addEventListener('click', e => {
                const btnShowFucn = e.target.closest('.table-body__func .icon-wrapper');
                const btnDeleteEmployee = e.target.closest('.btn-delete-employee');
                const btnEditEmployee = e.target.closest('.btn-edit-employee');
                if (btnShowFucn) {
                    this.handleToggleOptionsSelect(btnShowFucn);
                }
                if (btnDeleteEmployee) {
                    this.handleDeleteEmployee(btnDeleteEmployee);
                }
                if (btnEditEmployee) {
                    this.createNewEmployee = false;
                    this.handleEditEmployee(btnEditEmployee);
                }
            });

            // xử lý khi double click vào hàng
            document.addEventListener('dblclick', e => {
                const trEmployee = e.target.closest('tr.table-body__row');
                if (trEmployee) {
                    trEmployee.querySelector('.btn-edit-employee').click();
                }
            });

            document.querySelectorAll('.toast-message__icon--close').forEach(el => {
                el.addEventListener('click', () => this.handleCloseToastMessage(el));
            });
            document.querySelector('.multi-select__unchecked').addEventListener('click', () => {
                document.querySelectorAll('.table-body__row input').forEach(el => {
                    el.checked = false;
                    this.handleToggleInput(el);
                });
                document.querySelector('.table-head__row input').checked = false;
            });
            
            document.querySelector('.multi-select__delete').addEventListener('click', () => this.handleDeleteMultiEmployee());

            this.initKeyboardShortcuts();

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Thiết lập phím tắt
     * @author DVHIEU 21-07-2023
     */
    initKeyboardShortcuts() {

    }

    /**
     * Ẩn/Hiện Form thêm mới nhân viên
     * @param {string} display - thuộc tính display của form
     * @param {boolean} createNewEmployee - form là tạo mới hay chỉnh sửa
     * @author NQTrong
     */
    handleToggleForm(display, createNewEmployee) {
        try {
            document.querySelector('#form-wrapper').style.display = display;
            let btnAdd = document.querySelector('#btn-save-and-add');
            if (createNewEmployee) {
                btnAdd.innerHTML = 'Cất và thêm';
                this.inputName.value = '';
                this.inputOrganization.value = '';
                this.inputTitle.value = '';
                this.inputDateOfBirth.value = '';
                this.handleChangeInputDate(this.inputDateOfBirth);
                document.querySelectorAll('input[name="gender"]').forEach(el => {
                    if (el.checked) el.checked = false;
                });
                this.inputIdentityId.value = '';
                this.inputDateOfIdentity.value = '';
                this.handleChangeInputDate(this.inputDateOfIdentity);
                this.inputPlaceOfIdentity.value = '';
                this.inputAddress.value = '';
                this.inputEmail.value = '';
            } else {
                btnAdd.innerHTML = 'Cập nhật';
            }
            if (display == 'block' && createNewEmployee) {
                getNewCode(personType.employee)
                .then(res => document.querySelector('#input-code').value = res)
                .catch(err => console.log(err));
                this.removeClassErrorInput();
                document.querySelector('#input-code').focus();
                
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    /**
     * Ẩn/Hiện lựa chọn số bản ghi trên một trang
     * @author NQTrong
     */
    handleToggleSelectRecords() {
        let el = document.querySelector('#table-options__select')
        if (el.style.display == 'block') {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    }

    /**
     * Thiết lập thứ tự tab trong form
     * @param {boolean} forward - Thứ tự Tap tiến(true) hay lùi (false)
     * @param {Event} event - sự kiện khi tác động vào element
     * @author NQTrong
     */
    handleTabLoopInForm(forward, event) {
        if (event.key == 'Tab') {
            if (forward && !event.shiftKey) {
                document.querySelector('.pseudo-element--top').focus();
            } else if (!forward && event.shiftKey) {
                document.querySelector('.pseudo-element--down').focus();
            }
        }
    }

    /**
     * Chỉnh lại màu của input date khi chọn ngày
     * @param {Element} element - input date khi thay đổi
     * @author NQTrong
     */
    handleChangeInputDate(element) {
        if (element.value) element.style.color = '#000';
        else element.style.color = '#999';
    }

    /**
     * Xác thực và gửi dữ liệu lên server
     * @author NQTrong
     * @update NQTrong
     */
    handleSaveEmployeeInfo() {
        try {
            // Validate employee info
            this.removeClassErrorInput();

            // 1. Kiểm tra thông tin bắt buộc nhập
            let el = checkInputRequire([this.inputDateOfBirth, this.inputTitle, this.inputOrganization, this.inputName, this.inputCode]);
            if (el) {
                this.elementError = el;
                this.showWarningDialog('Dữ liệu không hợp lệ', warnings.empty[el.getAttribute('fieldName')], true);
                return;
            }

            // 2. Kiểm tra định dạng của thông tin (email)
            el =  checkInputFormat('email', this.inputEmail);
            if (el) {
                this.elementError = el;
                this.showWarningDialog('Dữ liệu không hợp lệ', warnings.format[el.getAttribute('fieldName')], true);
                return;
            }

            // 3. Ngày sinh, ngày làm căn cước không được lớn hơn hiện tại
            el =  checkInputDateValid([this.inputDateOfIdentity, this.inputDateOfBirth]);
            if (el) {
                this.elementError = el;
                this.showWarningDialog('Dữ liệu không hợp lệ', warnings.dateInvalid[el.getAttribute('fieldName')], true);
                return;
            }

            this.inputGender = document.querySelector('input[name="gender"]:checked');
            // Gọi api cất dữ liệu
            const data = {
                "employeeCode": this.inputCode.value,
                "fullName": this.inputName.value,
                "gender": this.inputGender ? this.inputGender.value : '2',
                "departmentName": this.inputOrganization.value,
                "positionName": this.inputTitle.value,
                "dateOfBirth": new Date(this.inputDateOfBirth.value),
                "identityNumber": this.inputIdentityId.value,
                "identityDate": new Date(this.inputDateOfIdentity.value),
                "identityPlace": this.inputPlaceOfIdentity.value,
                "address": this.inputAddress.value,
                "email": this.inputEmail.value
            }

            this.hasPostDataError = false;
            if (this.createNewEmployee) {
                postData(personType.employee, data)
                .then(res => {
                    if (res.status >= 400) {
                        this.hasPostDataError = true;
                    }
                    return res.json();
                })
                .then(res => this.handleResponse(res))
                .catch(error => console.log(error));
            } else {
                updateDataById(personType.employee, this.employeeEditId, data)
                .then(res => {
                    if (res.status >= 400) {
                        this.hasPostDataError = true;
                    }
                    return res.json();
                })
                .then(res => this.handleResponse(res))
                .catch(error => console.log(error));
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Xử lý dữ liệu trả về
     * @author NQTrong
     * @param {Response} res - kết quả trả về khi gọi api 
     */
    handleResponse(res) {
        if (this.hasPostDataError) {
            this.showWarningDialog('Có lỗi hệ thống', res.devMsg, false);
        } else {
            this.handleToggleForm('none', false);
            this.loadEmployeeData();
            if (this.createNewEmployee) {
                this.handleShowToastMessage('success', toastMessage.addEmployee.success);
            } else {
                this.handleShowToastMessage('success', toastMessage.updateEmployee.success);
            }
        }
    }

    /**
     * Xóa nhân viên
     * @author NQTrong
     * @param {Element} el - phần tử tác động 
     */
    handleDeleteEmployee(el) {
        try {
            const trEmployee = el.parentNode.parentNode.parentNode.parentNode.parentNode;
            document.querySelector('#dialog-delete .dialog__body p').innerHTML = 'Xác nhận xóa nhân viên';
            const trInput = trEmployee.querySelector('input');
            trInput.checked = false;
            this.handleToggleInput(trInput);
            const btnDelete = this.replaceBtnDelete();
    
            this.handleToggleDeleteDialog('block');
            btnDelete.addEventListener('click', () => {
                deleteData(personType.employee, trEmployee.getAttribute('employeeIdAttr'))
                .then(res => {
                    if (res.status == 200) {
                       this.handleAfterDeleteEmployee();
                    }
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Xóa nhiều nhân viên
     * @author NQTrong
     */
    handleDeleteMultiEmployee() {
        try {
            document.querySelector('#dialog-delete .dialog__body p').innerHTML = `Xác nhận xóa ${this.rowSelected.length} nhân viên`
            this.handleToggleDeleteDialog('block');
            const btnDelete = this.replaceBtnDelete();
            btnDelete.addEventListener('click', () => {
                Promise.all(this.rowSelected.map(id => deleteData(personType.employee, id)))
                .then(res => {
                    this.rowSelected = [];
                    this.handleAfterDeleteEmployee();
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Xử lý sau khi xóa thành công nhân viên
     * @author NQTrong
     */
    handleAfterDeleteEmployee() {
        this.loadEmployeeData();
        this.handleToggleDeleteDialog('none');
        this.handleShowToastMessage('success', toastMessage.deleteEmployee.success);
    }

    /**
     * Thay thế btnDelete
     * @author NQTrong
     * @returns {Element} - btnDelete mới
     */
    replaceBtnDelete() {
        const oldBtnDelete =  document.querySelector('.btn-accept-delete-dialog');
        const newBtnDelete = oldBtnDelete.cloneNode(true);
        oldBtnDelete.parentNode.replaceChild(newBtnDelete, oldBtnDelete);
        return newBtnDelete;
    }

    /**
     * Sửa thông tin nhân viên
     * @author NQTrong
     * @param {Element} el - phần tử tác động 
     */
    handleEditEmployee(el) {
        try {
            const trEmployee = el.parentNode.parentNode;
            this.handleToggleForm('block', false);
            this.employeeEditId = trEmployee.getAttribute('employeeIdAttr');
            getDataById(personType.employee, this.employeeEditId)
            .then(res => res.json())
            .then(res => {
                this.inputCode.value = res.EmployeeCode;
                this.inputName.value = res.FullName;
                this.inputOrganization.value = res.DepartmentName;
                this.inputTitle.value = res.PositionName;

                if (res.DateOfBirth) {
                    this.inputDateOfBirth.value = new Date(res.DateOfBirth).toISOString().slice(0, 10);
                } else {
                    this.inputDateOfBirth.value = '';
                }

                this.handleChangeInputDate(this.inputDateOfBirth);
                const inputGenderNonChecked = document.querySelectorAll('input[name="gender"]');
                if (res.Gender == 0) {
                    inputGenderNonChecked[0].checked = true;
                } else if (res.Gender == 1) {
                    inputGenderNonChecked[1].checked = true;
                } else {
                    inputGenderNonChecked[2].checked = true;
                }
                this.inputIdentityId.value = res.IdentityNumber;

                if (res.IdentityDate) {
                    this.inputDateOfIdentity.value = new Date(res.IdentityDate).toISOString().slice(0, 10);
                } else {
                    this.inputDateOfIdentity.value = '';
                }
                this.handleChangeInputDate(this.inputDateOfIdentity);
                this.inputPlaceOfIdentity.value = res.IdentityPlace;
                this.inputAddress.value = res.Address;
                this.inputEmail.value = res.Email;
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Hiện toast message
     * @author NQTrong
     * @param {string} type - loại
     * @param {string} content - nội dung
     */
    handleShowToastMessage(type, content) {
        let el;
        switch(type) {
            case 'success': 
                document.querySelector('.toast-message--success .toast-message__desc').innerHTML = content;
                el = document.querySelector('.toast-message:has(.toast-message__type--success)');
                break;
            default:
                break;
        }
        el.style.display = 'flex';
        setTimeout(() => {
            el.style.display = 'none';
        }, 3000)
    }

    /**
     * Kiểm tra input checked
     * @author NQTrong
     * @param {Element} el - phần tử tác động
     */
    handleToggleInput(el) {
        try {
            const tableCol = el.parentNode.parentNode
            let employeeId = tableCol.getAttribute('employeeIdAttr');
            if (el.checked) {
                tableCol.classList.add('table-body__row--checked');
                if (!this.rowSelected.includes(employeeId)) {
                    this.rowSelected.push(employeeId);
                }
            } else {
                tableCol.classList.remove('table-body__row--checked');
                let index = this.rowSelected.indexOf(employeeId);
                if (index > -1) {
                    this.rowSelected.splice(index, 1);
                }
            }

            this.handleToggleMultiSelect();
            
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Ẩn/Hiện chức năng khi chọn nhiều hàng
     * @author NQTrong
     */
    handleToggleMultiSelect() {
        if (this.rowSelected.length > 0) {
            document.querySelector('.multi-select').style.display = 'flex';
            document.querySelector('.multi-select__title').innerHTML = `Đã chọn tất cả ${this.rowSelected.length}`
            document.querySelector('.content-data').classList.add('content-data-with-mulit-select');
        } else {
            document.querySelector('.multi-select').style.display = 'none';
            document.querySelector('.content-data').classList.remove('content-data-with-mulit-select');
        }
    }

    /**
     * Check hoặc bỏ check tất cả các hàng
     * @author NQTrong
     * @param {Event} event - sự kiện tác động
     */
    handleToggleAllInput(event) {
        if (event.target.checked) {
            document.querySelectorAll('.table-body__row input').forEach(el => {
                el.checked = true;
                this.handleToggleInput(el);
            });
        } else {
            document.querySelectorAll('.table-body__row input').forEach(el => {
                el.checked = false;
                this.handleToggleInput(el);
            });
        }
    }

    /**
     * Ẩn/Hiện lựa chọn trong từng hàng
     * @author NQTrong
     * @param {Element} element - phần tử tác động
     */
    handleToggleOptionsSelect(element) {
        if (element.classList.contains('table-selected-options')) {
            element.classList.remove('table-selected-options');
        } else {
            document.querySelectorAll('.table-body__func .icon-wrapper').forEach(el => {
                el.classList.remove('table-selected-options');
            });
            element.classList.add('table-selected-options');
        }
    }

    /**
     * Hiện dialog cảnh báo nhập sai
     * @param {string} title - tiêu đề cảnh báo
     * @param {string} msg - thông tin cảnh báo
     * @param {boolean} inputDesc - hiện thông tin dưới input
     * @author NQTrong
     */
    showWarningDialog(title, msg, inputDesc) {
        document.querySelector('#dialog-warning .dialog__title').innerHTML = title;
        document.querySelector('#dialog-warning .dialog__body p').innerHTML = msg;
        if (inputDesc) {
            this.elementError.classList.add('text-field__input--error');
            if (this.elementError.getAttribute('fieldName') == 'dateOfBirth') {
                document.querySelector('#code-error-desc').classList.add('text-field_desc-2x');
            } else if (this.elementError.getAttribute('fieldName') == 'dateOfIdentity') {
                document.querySelector('#organization-error-desc').classList.add('text-field_desc-2x');
            }

            const inputDescError = document.querySelector('.text-field__input--error + .text-field__desc-error');
            inputDescError.classList.remove('text-field__desc-error--hidden');
            inputDescError.innerHTML = msg
        }
        this.handleToggleWarningDialog('block');
    }

    /**
     * Ẩn/Hiện dialog xóa nhân viên
     * @author NQTrong
     */
    handleToggleDeleteDialog(display) {
        document.querySelector('#dialog-delete').style.display = display;
    }

    /**
     * Ẩn/Hiện Dialog cảnh báo nhập sai thông tin
     * @param {string} display - thuộc tính display của dialog
     * @author NQTrong
     */
    handleToggleWarningDialog(display) {
        document.querySelector('#dialog-warning').style.display = display;
    }

    /**
     * Đóng Toast Message
     * @author NQTrong
     * @param {Element} el - phần tử tác động
     */
    handleCloseToastMessage(el) {
        el.parentNode.parentNode.parentNode.style.display = 'none'
    }

    /**
     * Loại bỏ class text-field__input--error trong input
     * @author NQTrong
     */
    removeClassErrorInput () {
        document.querySelectorAll('#form-wrapper input').forEach(el => el.classList.remove('text-field__input--error'));
        document.querySelectorAll('.text-field__desc-error').forEach(el => el.classList.add('text-field__desc-error--hidden'));
        document.querySelectorAll('.text-field__desc-error').forEach(el => el.classList.remove('text-field_desc-2x'));
        document.querySelectorAll('.text-field__desc-error').forEach(el => el.innerHTML = '');
    }

}