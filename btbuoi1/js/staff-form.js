// Modal
const modalStaffForm = document.getElementById("form-staff__modal");
const confirmModal = document.getElementById("modal-confirm-dialog");
const noticeModal = document.getElementById("modal-notice-dialog");
// Form
const staffForm = document.querySelector(".form-staff");
// Form actions
const openFormButton = document.getElementById("btn-open-staff-form");
const closeFormButton = document.getElementById("btn-close-staff-form");
const iconCloseForm = document.querySelector(".form__header--right .fa-xmark");
const buttonConfirm = document.getElementById("button-confirm-staff-form");
// Dialog
const noticeDialog = document.getElementById("staff-notice-dialog");
const confirmDialogCancelButton = document.getElementById(
	"button-cancel-confirm-dialog"
);
const confirmDialogConfirmButton = document.getElementById(
	"button-confirm-confirm-dialog"
);
const noticeDialogConfirmButton = document.getElementById(
	"button-confirm-notice-dialog"
);
// Form Inputs
const staffCodeInput = document.getElementById("staff-id-input");
const staffNameInput = document.getElementById("staff-name-input");
const staffPhoneInput = document.getElementById("staff-phone-input");
const staffBirthdayInput = document.getElementById("staff-birthday-input");
const staffAddressInput = document.getElementById("staff-address-input");
const staffIdentityCardInput = document.getElementById(
	"staff-identity-card-input"
);
const staffEmailInput = document.getElementById("staff-email-input");
const staffGenderInput = document.getElementsByName("gender");
// Regex
const phoneRegex = /^0\d{9,10}$/;
const numberRegex = /^\d+$/;
const identityCardRegex = /^\d{10,11}$/;
const codeRegex = /^[a-zA-Z]{2}\d{1,5}$/;
const emailRegex =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

// Selected items (checkboxes, select all, etc.)
const selectedEmployee = [];

window.addEventListener("load", function () {
	getAllEmployees();
	initEvent();
});

/**
 *	Khởi tạo event cho các element trong trang web
 */
function initEvent() {
	try {
		// Event cho elemnt tuong tac voi modal
		openFormButton.addEventListener("click", () => {
			openModalStaffForm();
		});

		closeFormButton.addEventListener("click", () => {
			closeModalStaffForm();
		});

		iconCloseForm.addEventListener("click", () => {
			closeModalStaffForm();
		});

		// Event cho element tuong tac voi dialog
		noticeDialogConfirmButton.addEventListener("click", () => {
			closeNoticeDialogModal();
		});

		// Event khi submit form
		staffForm.addEventListener("submit", (event) => {
			event.preventDefault();
			validateStaffForm();
		});

		// Event cho inputs của form
		addEventForInputElements("staff-email-input", validateEmailInput, "input");
		addEventForInputElements("staff-id-input", validateCodeInput, "input");
		addEventForInputElements("staff-phone-input", validatePhoneInput, "input");
		addEventForInputElements(
			"staff-identity-card-input",
			validateIdentityNumberInput,
			"input"
		);
		addEventForInputElements("staff-name-input", validateNameInput, "input");
		addEventForInputElements(
			"staff-birthday-input",
			validateBirthdayInput,
			"input"
		);

		// Event cho combobox
		// addEventComboBox();

		// Event cho dialog confirm
		confirmDialogConfirmButton.addEventListener("click", function () {
			closeConfirmDialogModal();
			// Cần cập nhập với trường hợp chọn xóa nhiều
			deleteEmpoyee(selectedEmployee[0]);
		});

		confirmDialogCancelButton.addEventListener("click", function () {
			// Cần cập nhập với trường hợp chọn xóa nhiều
			selectedEmployee.pop();
			closeConfirmDialogModal();
		});
	} catch (error) {
		console.log(error);
	}
}

/**
 * Tạo event cho các trường input trong form trang nhân viên
 * @param {string} elementId: id của element cần gán event
 * @param {Function} validateFunction: function kiểm tra dữ liệu được nhập vào trường input này
 * @param {string} event: event mà input cần lắng nghe
 */
function addEventForInputElements(elementId, validateFunction, event) {
	try {
		const inputElement = document.getElementById(elementId);
		inputElement.addEventListener(event, function () {
			const currentValue = inputElement.value;
			const errorMessage = validateFunction(currentValue);
			changeInputState(elementId, errorMessage);
		});
	} catch (error) {
		console.log(error);
	}
}

/**
 * Kiểm tra định dạng mã được nhập
 * Yêu cầu mã có dạng: 2 ký tự đầu là chữ cái từ a-z không phân biệt hoa thường, từ 1 đến 5 ký tự sau là số, nếu
 * 					   tổng số ký tự của mã quá 7 sẽ không đúng định dạng
 * @param {string} code: mã được nhập
 * @returns {boolean} false: thông báo không có lỗi
 * 			{string} message: chi tiết lỗi
 */
function validateCodeInput(code) {
	try {
		code = code.trim();
		if (code === "" || code == null) {
			return "Mã nhân viên chưa nhập.";
		} else if (!codeRegex.test(code)) {
			return "Định dạng mã không hợp lệ.";
		} else return false;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Kiểm tra định dạng tên được nhập
 * Yêu cầu nhập tên
 * @param {string} name : Tên được nhập
 * @returns {boolean} false: thông báo không có lỗi
 * 			{string} message: chi tiết lỗi
 */
function validateNameInput(name) {
	try {
		name = name.trim();
		if (name === "" || name == null) {
			return "Họ và tên chưa nhập.";
		} else return false;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Kiểm tra định dạng số điện thoại được nhập
 * Yêu cầu số điện thoại được nhập, không chứa chữ cái và có 10 đến 11 kí tự
 * @param {string} phone: số điện thoại được nhập
 * @returns {boolean} false: thông báo không có lỗi
 * 			{string} message: chi tiết lỗi
 */
function validatePhoneInput(phone) {
	try {
		phone = phone.trim();
		if (phone === "" || phone == null) {
			return "Số điện thoại chưa nhập.";
		} else if (!phoneRegex.test(phone)) {
			return "Định dạng số điện thoại không hợp lệ.";
		} else return false;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Kiểm tra định dạng số CMND/CCCD được nhập
 * Yêu cầu CCCD/CMND không chứa chữ cái và có 10 đến 11 ký tự
 * @param {string} identityNumber: số CMND/CCCD
 * @returns {boolean} false: thông báo không có lỗi
 * 			{string} message: chi tiết lỗi
 */
function validateIdentityNumberInput(identityNumber) {
	try {
		identityNumber = identityNumber.trim();
		if (identityNumber === "" || identityNumber == null) {
			return "CCCD/CMND chưa nhập.";
		} else if (!identityCardRegex.test(identityNumber)) {
			return "Định dạng CCCD/CMND không hợp lệ.";
		} else return false;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Kiểm tra thông tin ngày sinh được nhập
 * @param {string} birthday
 * @returns {boolean} false: thông báo không có lỗi
 * 			{string} message: chi tiết lỗi
 */
function validateBirthdayInput(birthday) {
	try {
		let now = new Date();
		let dateOfBirth = new Date(birthday);
		if (birthday == null || birthday == "") {
			return false;
		} else if (dateOfBirth > now) {
			return "Ngày sinh không hợp lệ.";
		} else return false;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Kiểm tra thông tin email được nhập
 * @param {string} email
 * @returns {boolean} false: thông báo không có lỗi
 * 			{string} message: chi tiết lỗi
 */
function validateEmailInput(email) {
	try {
		if (email == null || email === "") return false;
		if (!emailRegex.test(email)) {
			return "Định dạng email không hợp lệ.";
		} else return false;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Thay đổi trạng thái của input khi có thông báo lỗi
 * @param {string} inputId: id của input element
 * @param {string} errorMessage: thông báo lỗi
 */
function changeInputState(inputId, errorMessage) {
	try {
		let input = document.getElementById(inputId);
		let helperText = document.getElementById(inputId + "-helper");
		if (errorMessage === false) {
			input.classList.add("input--normal");
			input.classList.remove("input--danger");
			helperText.classList.add("hidden");
		} else {
			input.classList.remove("input--normal");
			input.classList.add("input--danger");
			helperText.classList.remove("hidden");
			changeHelperText(helperText, errorMessage);
		}
	} catch (error) {
		console.log(error);
	}
}

/*
 *   Kiểm tra thông tin được nhập vào của các trường input trong form khi form được submit
 */
function validateStaffForm() {
	try {
		// Kiểm tra thông tin từng trường
		let validate = false;
		let idError = validateCodeInput(staffCodeInput.value);
		let nameError = validateNameInput(staffNameInput.value);
		let phoneError = validatePhoneInput(staffPhoneInput.value);
		let identityCardError = validateIdentityNumberInput(
			staffIdentityCardInput.value
		);
		let birthdayError = validateBirthdayInput(staffBirthdayInput.value);
		let emailError = validateEmailInput(staffEmailInput.value);
		if (
			idError ||
			nameError ||
			phoneError ||
			identityCardError ||
			birthdayError ||
			emailError
		) {
			validate = false;
		} else validate = true;

		let message =
			"Lỗi chi tiết: " +
			getErrorMessageFromValidate(idError) +
			getErrorMessageFromValidate(nameError) +
			getErrorMessageFromValidate(phoneError) +
			getErrorMessageFromValidate(identityCardError) +
			getErrorMessageFromValidate(birthdayError) +
			getErrorMessageFromValidate(emailError);

		if (!validate) {
			showNoticeDialog(
				"Thông tin không hợp lệ. <br>" + message,
				"Lỗi",
				"icon-warning"
			);
		} else {
			addNewEmployee();
		}
	} catch (error) {
		console.log(error);
	}
}

/**
 * Lấy nội dung thông báo lỗi chi tiết
 * @param {string | boolean} error: thông báo lỗi, nếu có giá trị false thì không có lỗi
 * @returns {string}: nội dung thông báo lỗi
 */
function getErrorMessageFromValidate(error) {
	if (error == false) return "";
	else return error + " ";
}

/**
 * 	Thêm thông tin nhân viên vào hệ thống thông qua API
 * 	 (23/7/2023)
 */
async function addNewEmployee() {
	try {
		const employee = {
			employeeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			employeeCode: staffCodeInput.value,
			firstName: "string",
			lastName: "string",
			fullName: staffNameInput.value,
			gender: getGenderValue(),
			dateOfBirth: staffBirthdayInput.value,
			phoneNumber: staffPhoneInput.value,
			email: staffEmailInput.value,
			address: staffAddressInput.value,
			identityNumber: staffIdentityCardInput.value,
			identityDate: "2023-07-23T15:28:59.463Z",
			identityPlace: "string",
			joinDate: "2023-07-23T15:28:59.463Z",
			martialStatus: 0,
			educationalBackground: 0,
			// qualificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			// departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			// positionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			// nationalityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			workStatus: 0,
			personalTaxCode: "string",
			salary: 0,
			positionCode: "string",
			positionName: "string",
			departmentCode: "string",
			departmentName: "string",
			qualificationName: "string",
			nationalityName: "string",
		};
		await fetch(`https://cukcuk.manhnv.net/api/v1/Employees`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(employee),
		})
			.then((res) => getApiResponse(res))
			.then((res) => {
				// Dựa vào phản hồi của api để đưa ra thông báo tương ứng
				if (typeof res.userMsg == "undefined" && res == 1) {
					showNoticeDialog(
						"Thêm nhân viên thành công",
						"Thành công",
						"icon-info"
					);
					console.log("Thành công");
					resetInput();
					closeModalStaffForm();
				} else {
					const errorInfo = res;
					const userMessage = res.userMsg;
					console.log(errorInfo);
					showNoticeDialog(userMessage, "Lỗi", "icon-error");
				}
			})
			.catch((error) => console.log(error));
	} catch (error) {
		console.log(error);
	}
}

/**
 * Phân bố dữ liệu cho bảng của trang từ dữ liệu có được
 * @param {Array} dataList: mảng chứa dữ liệu nhận được
 * @param {string} tableId: id của bảng cần được phân bố dữ liệu
 *  (22/7/2023)
 */
function createTableRow(dataList, tableId) {
	if (dataList != null && dataList.length > 0) {
		const table = document.getElementById(tableId);
		dataList.forEach((data) => {
			let newRow = document.createElement("tr");
			console.log(data);
			newRow.classList.add("table__row");
			newRow.classList.add("body-row");
			newRow.setAttribute("id", "table" + data.EmployeeId);
			// Tạo các table cell cho table row được tạo ở trên
			let td = `<td class="table__table-data checkbox">
                            <label class="checkbox">
                            	<input type="checkbox" />
                            </label>
                        </td>
                        <td class="table__table-data">${
													data.EmployeeCode ? data.EmployeeCode : "----"
												}</td>
                        <td class="table__table-data">${
													data.FullName ? data.FullName : "----"
												}</td>
                        <td class="table__table-data">${
													data.GenderName ? data.GenderName : "Chưa xác định"
												}</td>
                        <td class="table__table-data">${
													data.DateOfBirth
														? dateFormat(data.DateOfBirth)
														: "----"
												}</td>
                        <td class="table__table-data">${
													data.IdentityNumber ? data.IdentityNumber : "----"
												}</td>
                        <td class="table__table-data">${
													data.DepartmentName ? data.DepartmentName : "----"
												}</td>
                        <td class="table__table-data">${
													data.DepartmentCode ? data.DepartmentCode : "----"
												}</td>
						<td class="table__table-data">${
								data.DepartmentCode
								? data.DepartmentCode
								: "----"
						}</td>						
                        <td class="table__table-data">
						<div class="table__actions">
						<span class="btn--round btn-update"
						  ><i class="fa-solid fa-pen"></i
						></span>
						<span class="btn--round btn-utility"
						  ><i class="fa-solid fa-ellipsis"></i
						></span>
					  </div>
					  </td>
					  `;
			newRow.innerHTML = td;
			table.appendChild(newRow);
			addEventTableRowActions(data.EmployeeId);
		});
		addEventForCheckboxes();
	}
}

/**
 * Gửi api xóa nhân viên, nếu response trả về thông báo thành công
 * @param {string} employeeId: id của nhân viên muốn xóa
 */
async function deleteEmpoyee(employeeId) {
	try {
		await fetch("https://cukcuk.manhnv.net/api/v1/Employees/" + employeeId, {
			method: "DELETE",
		})
			.then((res) => getApiResponse(res))
			.then((res) => {
				console.log(res);
				if (res === 1) {
					console.log("Xóa thành công");
					const tableRowToDelete = document.getElementById(
						`table${employeeId}`
					);
					tableRowToDelete.remove();
					selectedEmployee.pop();
					showNoticeDialog(
						"Xóa thông tin nhân viên thành công",
						"Xóa",
						"icon-info"
					);
				} else {
					showNoticeDialog("Xóa không thành công", "Xóa", "icon-error");
				}
			});
	} catch (error) {
		console.log("api delete error:", error);
	}
}
/**
 * Kiểm tra phản hồi của api và đưa về thông báo lỗi nếu có
 * @param {Response} response: phản hồi nhận được từ api
 * @returns Định dạng json của api response nhận được
 *  (22/7/2023)
 */
function getApiResponse(response) {
	const contentType = response.headers.get("content-type");
	const status = response.status;
	if (status >= 400) {
		if (contentType && contentType.indexOf("application/json") !== -1) {
			console.log(response);
			return response.json();
		} else {
			console.log("API response does not have json type");
			return response.text();
		}
	} else return response.json();
}

/**
 * Thay đổi thông báo lỗi cho input của form
 * @param {Element} helperTextElement: element chứa thông báo lỗi cho input của form
 * @param {string} message: thông báo lỗi mà element cần hiển thị
 *  (20/7/2023)
 */
function changeHelperText(helperTextElement, message) {
	helperTextElement.innerHTML = message;
	return;
}

/**
 * Hiển thị dialog thông báo khi có lỗi/ sự cố
 * @param {string} message: Nội dung cho dialog hiển thị thông báo
 * @param {string} title: Tiêu đề cho dialog hiển thị thông báo
 *  (20/7/2023)
 */
function showNoticeDialog(message, title, icon) {
	try {
		const dialogTitle = noticeDialog.querySelector(".dialog__header h2");
		const content = noticeDialog.querySelector(".dialog__content p");
		const iconElement = noticeDialog.querySelector(
			".dialog__content .icon--default"
		);
		if (title.length > 0 && title != null) dialogTitle.innerHTML = title;
		if (typeof message != "undefined" && message.length > 0 && message != null)
			content.innerHTML = message;
		else content.innerHTML = "Có lỗi xảy ra";
		if (typeof icon != "undefined" && icon.length > 0) {
			iconElement.classList.add(icon);
		}
		noticeModal.classList.remove("modal--hidden");
	} catch (error) {
		console.log("notice-dialog: ", error);
	}
}

/**
 *    Đóng dialog thông báo hiển thị
 *     (20/7/2023)
 */

function closeNoticeDialog() {
	noticeDialog.classList.add("dialog--hidden");
}

/**
 *    Mở form điền thông tin nhân viên đồng thời chuyển focus vào ô input text đầu tiên
 *     (20/7/2023)
 */
function openModalStaffForm() {
	modalStaffForm.classList.remove("form--hidden");
	const firstInput = staffForm.querySelector(".txt-field input");
	firstInput.focus();
}

function openConfirmDialogModal() {
	confirmModal.classList.remove("modal--hidden");
}

function closeConfirmDialogModal() {
	confirmModal.classList.add("modal--hidden");
}

function openNoticeDialogModal() {
	noticeModal.classList.remove("modal--hidden");
}

function closeNoticeDialogModal() {
	noticeModal.classList.add("modal--hidden");
}

/**
 *    Đóng form điền thông tin nhân viên
 *     (20/7/2023)
 */
function closeModalStaffForm() {
	modalStaffForm.classList.add("form--hidden");
}

/**
 *    Làm trống các trường input lại sau khi submit form thành công
 *     (20/7/2023)
 */
function resetInput() {
	staffAddressInput.value = "";
	staffBirthdayInput.value = "";
	staffNameInput.value = "";
	staffPhoneInput.value = "";
	staffCodeInput.value = "";
	staffIdentityCardInput.value = "";
	staffEmailInput.value = "";
}

/**
 * Lấy thông tin tất cả nhân viên thông qua api
 *  (22/7/2023)
 */
async function getAllEmployees() {
	try {
		await fetch(`https://cukcuk.manhnv.net/api/v1/Employees
        `)
			.then((res) => getApiResponse(res))
			.then((res) => {
				createTableRow(res, "staff-page-table-body");
			});
	} catch (error) {
		console.log(error);
	}
}

/**
 * 	Tạo event cho checkbox để khi có hàng bất kì trong bảng có checkbox được chọn,
 *  màu nền của hàng này sẽ đổi màu
 *   (22/7/2023)
 */
function addEventForCheckboxes() {
	const checkboxes = document.querySelectorAll("input[type='checkbox']");
	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("click", (e) => {
			const computed = window.getComputedStyle(checkbox, "::after");
			if (computed.getPropertyValue("display") === "block") {
				checkbox.parentElement.parentElement.parentElement.classList.add(
					"active"
				);
			} else {
				checkbox.parentElement.parentElement.parentElement.classList.remove(
					"active"
				);
			}
		});
	});
}

/**
 * Thêm event cho các table row
 * @param {string} tableRowId: id của table row được chọn để thao tác
 *  (25/7/2023)
 */
function addEventTableRowActions(tableRowId) {
	const btn = document.querySelector(`#table${tableRowId} span.btn-utility`);
	btn.addEventListener("click", function () {
		selectedEmployee.push(tableRowId);
		openConfirmDialogModal();
	});
}

/**
 * Lấy thông tin từ trường input giới tính
 * @returns Trả về giá trị giới tính (0: nam, 1: nữ)
 *  (24/7/2023)
 */
function getGenderValue() {
	for (let i = 0; i < staffGenderInput.length; i++) {
		if (staffGenderInput[i].checked) {
			const radioBtnValue = staffGenderInput[i].value;
			return radioBtnValue;
		}
		return 0;
	}
}

/**
 * Thêm event cho combo box
 *  (20/7/2023)
 */
function addEventComboBox() {
	const comboboxShowPage = document.querySelector(".combobox__show-page");
	const comboboxOptions = document.querySelector("#table__combobox-options");
	const comboboxShowPageOptions = document.querySelectorAll(
		".combobox__show-page .combobox__options .combobox__option"
	);
	const comboboxShowNumberOfRecordsPerPage = document.querySelector(
		"#span__number-of-records-perpage"
	);
	comboboxShowPage.addEventListener("click", function () {
		if (!comboboxOptions.classList.contains("show")) {
			comboboxOptions.classList.add("show");
		} else {
			comboboxOptions.classList.remove("show");
		}
	});

	comboboxShowPageOptions.forEach(function (comboboxShowPageOption) {
		comboboxShowPageOption.addEventListener("click", function (e) {
			e.stopPropagation();
			comboboxShowNumberOfRecordsPerPage.innerHTML =
				comboboxShowPageOption.innerHTML;
			comboboxOptions.classList.remove("show");
		});
	});
}

/**
 * Format lại thông tin ngày tháng dựa vào giá trị ngày tháng dạng string nhận được
 * @param {string} dateString: Gía trị ngày tháng dạng string
 * @returns {string} formattedDate: Thông tin ngày tháng có định dạng dd/mm/yyyy hoặc chuỗi rỗng
 *  (23/7/2023)
 */
function dateFormat(dateString) {
	if (typeof dateString != "undefined" && dateString.length > 0) {
		dateTimeObject = new Date(dateString);

		let day = dateTimeObject.getDate().toString().padStart(2, "0");
		let month = (dateTimeObject.getMonth() + 1).toString().padStart(2, "0");
		let year = dateTimeObject.getFullYear().toString();
		let formattedDate = `${day}/${month}/${year}`;
		return formattedDate;
	} else return "";
}

/**
 * Thêm dấu phấy ngăn cách cho các giá trị tiền tệ
 * @param {string} number: Giá trị tiền tệ nhận được
 * @returns {string} :Giá trị tiền đã được ngăn cách
 *  (24/7/2023)
 */
function moneyFormat(number) {
	if (number != null) {
		const num = parseInt(number);
		if (isNaN(num)) {
			return 0;
		} else return num.toLocaleString();
	} else return 0;
}
