/**
 * Lấy code mới
 * @author NQTrong
 * @param {int} type - code cần lấy là của nhân viên, khách hàng,...
 * @returns {Promise<string>} code mới
 */
async function getNewCode(type) {
    if (type == personType.employee) {
        url = 'https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode'
    } else if (type == personType.customer) {
        // get new customer code
    }
    const res = await fetch(url);
    return res.text();
}

/**
 * Lấy dữ liệu
 * @author NQTrong
 * @param {int} type - dữ liệu cần lấy là của nhân viên, khách hàng,...
 * @returns {Promise<Object>} dữ liệu
 */
async function getData(type) {
    try {
        if (type == personType.employee) {
            url = 'https://cukcuk.manhnv.net/api/v1/Employees'
        } else if (type == personType.customer) {
            // get new customer code
        }
        const res = await fetch(url);
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

/**
 * POST dữ liệu
 * @author NQTrong
 * @param {string} type - dữ liệu là của nhân viên, khách hàng,...
 * @param {Object} data - dữ liệu post
 * @returns {Promise<Object>} kết quả
 */
async function postData(type, data) {
    try {
        if (type == personType.employee) {
            url = 'https://cukcuk.manhnv.net/api/v1/Employees'
        } else if (type == personType.customer) {
            // get new customer code
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        
        return res;
    } catch (error) {
        console.log(error);
    }
}

/**
 * DELETE dữ liệu
 * @author NQTrong
 * @param {string} type - dữ liệu là của nhân viên, khách hàng,...
 * @param {string} id - id của dữ liệu cần xóa
 * @returns {Promise<Object>} kết quả
 */
async function deleteData(type, id) {
    try {
        if (type == personType.employee) {
            url = `https://cukcuk.manhnv.net/api/v1/Employees/${id}`
        } else if (type == personType.customer) {
            // get new customer code
        }
        const res = await fetch(url, {
            method: 'DELETE'
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET dữ liệu
 * @author NQTrong
 * @param {string} type - dữ liệu là của nhân viên, khách hàng,...
 * @param {string} id - id của dữ liệu cần lấy
 * @returns {Promise<Object>} kết quả
 */
async function getDataById(type, id) {
    try {
        if (type == personType.employee) {
            url = `https://cukcuk.manhnv.net/api/v1/Employees/${id}`
        } else if (type == personType.customer) {
            // get new customer code
        }
        const res = await fetch(url)
        return res;
    } catch (error) {
        console.log(error);
    }
}

/**
 * UPDATE dữ liệu
 * @author NQTrong
 * @param {string} type - dữ liệu là của nhân viên, khách hàng,...
 * @param {string} id - id của dữ liệu cần chỉnh sửa
 * @param {Object} data - dữ liệu post
 * @returns {Promise<Object>} kết quả
 */
async function updateDataById(type, id, data) {
    try {
        if (type == personType.employee) {
            url = `https://cukcuk.manhnv.net/api/v1/Employees/${id}`
        } else if (type == personType.customer) {
            // get new customer code
        }
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        
        return res;
    } catch (error) {
        console.log(error);
    }
}