// 
const comboboxShowPage = document.querySelector(".combobox__show-page");
const comboboxOptions = document.querySelector("#table__combobox-options");
const comboboxShowPageOptions = document.querySelectorAll(".combobox__show-page .combobox__options .combobox__option");
const comboboxShowNumberOfRecordsPerPage = document.querySelector("#span__number-of-records-perpage");

/**
 * Thêm event cho combo box
 * Author: Nguyễn Quý Trọng (20/7/2023)
 */
function addEventComboBox () {
    comboboxShowPage.addEventListener('click', function () {
        if (!comboboxOptions.classList.contains("show")) {
            comboboxOptions.classList.add("show");
        }
        else {
            comboboxOptions.classList.remove("show");
        }
    });
    
    comboboxShowPageOptions.forEach(function (comboboxShowPageOption) {
        comboboxShowPageOption.addEventListener("click", function (e) {
            e.stopPropagation();
            comboboxShowNumberOfRecordsPerPage.innerHTML = comboboxShowPageOption.innerHTML;
            comboboxOptions.classList.remove("show");
        });
    });
}

addEventComboBox();