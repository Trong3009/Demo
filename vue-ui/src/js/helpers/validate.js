/**
 * Kiểm tra giá trị bắt buộc nhập của input
 * @author nqtrong (15-08-2023)
 */
export const checkInputRequire = (value) => {
    if (value) return true;
    return false;
}

/**
 * Kiểm tra giá trị bắt buộc nhập của checkbox
 */
export const checkCheckboxRequire = (arrayValue) => {
    return arrayValue.includes(true);
}