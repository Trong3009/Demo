const emulationMsg = {
    warning: {
        emulationName: {
            VN: 'Tên danh hiệu thi đua không được để trống.',
            ENG: 'Emulation name is required'
        },
        movement: {
            VN: 'Loại phong trào không được để trống.',
            ENG: 'Movement type is required',
        },
        emulationCode: {
            VN: 'Mã danh hiệu không được để trống',
            ENG: 'Emulation code is required'
        },
        object: {
            VN: 'Đối tượng khen thưởng không được để trống.',
            ENG: 'Object type is required'
        }
    }
};

const emulationToastMessage = {
    title: {
        success: {
            VN: 'Thành công!',
            ENG: 'Success!'
        },
        warning: {
            VN: 'Cảnh báo!',
            ENG: 'Warning!'
        },
        error: {
            VN: 'Có lỗi!',
            ENG: 'Error!',
        },
        info: {
            VN: 'Thông báo!',
            ENG: 'Info!'
        }
    },
    content: {
        add: {
            success: {
                VN: 'Thêm mới danh hiệu thi đua thành công',
                ENG: 'Add new emulation successfully'
            },
            warning: {
        
            },
            error: {
        
            },
            info: {
        
            }
        },
        update: {
            success: {
                VN: 'Cập nhật danh hiệu thi đua thành công',
                ENG: 'Update emulation successfully'
            },
            warning: {
        
            },
            error: {
        
            },
            info: {
        
            }
        }
    }
};

const iconDesc = {
    setting: {
        VN: 'Thiết lập hệ thống',
        ENG: 'Setting'
    },
    book: {
        VN: 'Văn bản quy định',
        ENG: 'Regulatory documents'
    },
    more: {
        VN: 'Chức năng khác',
        ENG: 'More options'
    },
    question: {
        VN: 'Hướng dẫn',
        ENG: 'Help'
    },
    notify: {
        VN: 'Thông báo',
        ENG: 'Notifycation'
    },
    pencil: {
        VN: 'Sửa',
        ENG: 'Update'
    },
    threeDot: {
        VN: 'Thêm',
        ENG: 'More'
    },
    close : {
        VN: 'Đóng',
        ENG: 'Close'
    },
    mail : {
        VN: 'Hộp thư',
        ENG: 'Mail'
    }
};

const resource = {
    emulationMsg,
    emulationToastMessage,
    iconDesc
};

export default resource;