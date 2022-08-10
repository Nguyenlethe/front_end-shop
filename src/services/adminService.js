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

// Lấy Dl từ bảng Allcode
function createNewUser (data) {
    return axios.post(`/admin/create-user`, data);
}

// Lấy Dl từ bảng Allcode
function createNewShop (data) {
    return axios.post(`/admin/create-shop`, data);
}


// Lấy Danh Sách User
function getAllUser (type) {
    return axios.get(`/admin/get-all-user?type=${type}`);
}


// Lấy Danh Sách User
function getAllShop (type) {
    return axios.get(`/admin/get-all-shop?type=${type}`);
}

// Delete User
function deleteUser (user) {
    return axios.delete(`/admin/delete-user`,{
        data: {
          id: user.id,
          avata: user.avata
        },
    });
}


// Change User
function changeUser (data) {
    return axios.post(`/admin/change-user`, data);
}

// Delete User
function deleteShop (shop) {
    return axios.delete(`/admin/delete-shop`,{
        data: {
          idManage: shop.manageId,
          avata: shop.avata
        },
    });
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    deleteShop,
    getAllShop,
    createNewShop,
    changeUser,
    deleteUser,
    getAllUser,
    createNewUser,
    getAllCode,
    getDataWards,
    getDataDistrict
}