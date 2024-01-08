import MEnum from './enum.js'
/**
 * Format dữ liệu
 * @author nqtrong (15-08-2023)
 */
export const formatData = (type, value) => {
    try {
        const emulationType = MEnum.emulationType;
        let result = '';
        switch(type) {
            case 'object': 
                if (value == emulationType.object.group) result = 'Tập thể';
                else if (value == emulationType.object.personal) result = 'Cá nhân';
                else if (value == emulationType.object.family) result = 'Gia đình';
                else result = 'Cá nhân và tập thể';
                break;
            case 'commendation':
                if (value == emulationType.commendation.nationalLevel) result = 'Cấp Nhà nước';
                else if (value == emulationType.commendation.provincialLevel) result = 'Cấp Tỉnh/tương đương';
                else if (value == emulationType.commendation.districtLevel) result = 'Cấp Huyện/tương đương';
                else result = 'Cấp Xã/tương đương'
                break;
            case 'movement':
                if (value == emulationType.movement.regular) result = 'Thường xuyên';
                else if (value == emulationType.movement.periodic) result = 'Theo đợt';
                else result = 'Thường xuyên; Theo đợt';
                break;
            case 'inactive':
                if (value == emulationType.inactive.inactive) result = 'Sử dụng';
                else result = 'Ngừng sử dụng';
                break;
        }
    
        return result;
    } catch (error) {
        console.log(error);
        return '';
    } 
}

/**
 * Format dữ liệu về dạng Object với 2 trường là title và value
 */
export const formatDataToObject = (type, data) => {
    return Object.values(data).map(item => {
        return {
            title: formatData(type, item),
            value: item
        }
    }).filter(item => item.value != -1);
}