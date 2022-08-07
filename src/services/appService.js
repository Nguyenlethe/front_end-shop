import axios from "../utils/axios";


// Login hệ thống
function loginSystem (dataForm) {
    return axios.post(`/system/login`,dataForm);
}


// Đăng ký tài khoản với hệ thống
function resgisterSystem (dataForm) {
    return axios.post(`/system/register`,dataForm);
}


// Quên mật khẩu (Gửi email & check email)
function retrievalPassword (email) {
    return axios.post(`/system/forgot-password`,email);
}


// Xác nhận mật khẩu mới (Gửi Password mới)
function updatePassword (data) {
    return axios.post(`/system/update-password`,data);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    updatePassword,
    retrievalPassword,
    loginSystem,
    resgisterSystem
}