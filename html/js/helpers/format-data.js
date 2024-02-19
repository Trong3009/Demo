/**
 * Format dữ liệu
 * @author NQTrong
 * @param {string} type - kiểu format
 * @param {string} value - dữ liệu format
 * @returns {string} kết quả sau format
 */
function formatData(type, value) {
    try {
        if (type != 'gender' && !value) return '';
        let result;
    
        switch(type) {
            case 'date':
                const date = new Date(value);
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : day;
                let year = date.getFullYear();
                result = `${day}/${month}/${year}`;
                break;
            case 'gender':
                if (value == gender.male) result = 'Nam';
                else if (value == gender.female) result = 'Nữ';
                else result = 'Khác';
                break;
            
            default:
                result = '';
                break;
        }
    
        return result;
    } catch (error) {
        console.log(error);
    } 
}