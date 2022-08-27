import axios from "../utils/axios"; 


// Lấy Dl từ bảng Allcode
function getAllCode (inputType) {
    return axios.get(`/admin/get-data-allcode?type=${inputType}`);
}

// Lấy Dl từ bảng Allcode
function getDataDistrict (inputType) {
    return axios.get(`/admin/get-data-district?type=${inputType}`);
}

// Lấy data wards
function getDataWards (inputType) {
    return axios.get(`/admin/get-data-wards?type=${inputType}`);
}

// Tạo user
function createNewUser (data) {
    return axios.post(`/admin/create-user`, data);
}

// Tạo Shop
function createNewShop (data) {
    return axios.post(`/admin/create-shop`, data);
}

// Lấy Danh Sách User
function getAllUser (type) {
    return axios.get(`/admin/get-all-user?type=${type}`);
}

// Lấy Danh Sách Shop
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

// Change shop IMG
function editInfoShop (data) {
    return axios.post(`/admin/change-shop`, data);
}

// Change shop Not Img
function editInfoShopNotIMG (data) {
    return axios.post(`/admin/change-shop-notIMG`, data);
}


// Get one User
function getOneUser (id) {
    return axios.get(`/admin/get-one-user?id=${id}`);
}


// Post data Items
function addNewItems (data) {
    return axios.post(`/admin/create-new-items`,data);
}


// Get items
function getDataItems (type) {
    return axios.get(`/admin/get-data-items?type=${type}`);
}


// Xoa items
function deleteDataItems (id) {
    return axios.post(`/admin/delete-items`,id);
}

// Edit items
function editDataItems (data) {
    return axios.post(`/admin/change-items`,data);
}


// Lấy Danh Sách items theo DK
function getItemsWhere (data) {
    return axios.get(`/admin/get-all-items-where?category=${data.category}&type=${data.type}`);
}


// Lấy Danh Sách items Discount
function getAllDiscountItems (type) {
    return axios.get(`/admin/get-data-discount?type=${type}`);
}


// Search items
function searchData (data) {
    return axios.get(`/admin/search-data-items?table=${data.tabel}&type=${data.type}&value=${data.value}&idShop=${data.idShop}`);
}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    searchData,
    getAllDiscountItems,
    getItemsWhere,
    editDataItems,
    deleteDataItems,
    getDataItems,
    addNewItems,
    getOneUser,
    editInfoShopNotIMG,
    editInfoShop,
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