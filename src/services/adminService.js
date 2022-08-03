import axios from "../utils/axios";


// Lấy Dl từ bảng Allcode
function getAllCode (inputType) {
    return axios.get(`/admin/get-data-allcode?type=${inputType}`);
}

// Lấy Dl từ bảng Allcode
function getDataDistrict (inputType) {
    return axios.get(`/admin/get-data-district?type=${inputType}`);
}

// Lấy Dl từ bảng Allcode
function getDataWards (inputType) {
    return axios.get(`/admin/get-data-wards?type=${inputType}`);
}




// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllCode,
    getDataWards,
    getDataDistrict
}