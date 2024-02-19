/**
 * Kiểm tra thông tin bắt buộc nhập
 * @author NQTrong
 * @param {Element[]} elementArray - danh sách input kiểm tra
 * @returns {boolean|Element} - kết quả kiểm tra
 */
function checkInputRequire(elementArray) {
    try { 
        let elementError;
        elementArray.forEach(el => {
            if (!el.value) {
                elementError = el;
            }
        });

        if (elementError) {
            return elementError;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Kiểm tra định dạng của thông tin
 * @author NQTrong
 * @update DVHIEU 21-07-2023 - nếu email trống thì không kiểm tra
 * @param {string} type - kiểu định dạng cần kiểm tra
 * @param {Element} el - elment cần kiểm tra
 * @returns {boolean|Element} - kết quả kiểm tra
 */
function checkInputFormat(type, el) {
    try {
        let elementError = null;
        if (!el.value) {
            return null;
        }
    
        switch(type) {
            case 'email':             
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (!emailRegex.test(el.value)) {
                    elementError = el;
                }
                break;
            default:
                break;
        }
        
        if (elementError) {
            return elementError;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Ngày sinh, ngày làm căn cước không được lớn hơn hiện tại
 * @author NQTrong
 * @param {Element[]} elementArray - danh sách input kiểm tra
 * @returns {boolean} tất cả ngày/tháng/năm đã hợp lệ(true) hay chưa(false)
 */
function checkInputDateValid(elementArray) {
    try { 
        let elementError = null;
        elementArray.forEach(el => {
            if (el.value && !checkDateValid(el.value)) {
                elementError= el;
            }
        });

        if (elementError) {
            return elementError;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Kiểm tra ngày có hợp lệ hay không
 * @param {Date} inputDate - ngày đưa vào kiểm tra 
 * @author NQTrong
 * @returns {boolean} - tất cả ngày/tháng/năm đã hợp lệ(true) hay chưa(false)
 */
function checkDateValid(inputDate) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const curretnMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const date = new Date(inputDate)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (year > currentYear) return false;
    else if (year == 2023 && month > curretnMonth) return false;
    else if (year == 2023 && month == curretnMonth && day > currentDay) return false;

    return true;
}