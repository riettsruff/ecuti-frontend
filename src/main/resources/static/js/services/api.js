console.log(bearerToken);

const API_URI = "http://206.189.94.183:8085";

/**
 * Axios customization for API requests
 * @param  {String} method  HTTP Method
 * @param  {String} baseURL API Endpoint
 * @param  {Object} data    Body Request
 * @return {Object}         HTTP Response
**/
async function axiosCustom(method, baseURL, data = null) {
  const request = await axios({
    method,
    url: baseURL,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${bearerToken}`
    },
    data: JSON.stringify(data)
  });

  const response = request;
  return response;
}

/**
 * Handle save "Karyawan" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveKaryawan(data) {
  return axiosCustom("POST", `${API_URI}/karyawan`, data);
}

/**
 * Handle update "Karyawan" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function updateKaryawan(data) {
  return axiosCustom("PUT", `${API_URI}/karyawan/${data.id}`, data);
}

/**
 * Handle delete "Karyawan" data by id
 * @param  {Integer} id  Karyawan Id
 * @return {Object}      HTTP Response
**/
function deleteKaryawan(id) {
  return axiosCustom("DELETE", `${API_URI}/karyawan/${id}`);
}

/**
 * Handle update "Email Karyawan" data
 * @param  {Object} data  Body Request
 * @param  {Integer} id   Karyawan Id
 * @return {Object}       HTTP Response
**/
function updateEmailKaryawan(data, id) {
  return axiosCustom("PUT", `${API_URI}/karyawan/${id}/email?email=${data.email}`, data);
}

/**
 * Handle post "Ubah Password" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function changePassword(data) {
  return axiosCustom("POST", `${API_URI}/auth/changepassword`, data);
}

/**
 * Handle save "Jenis Cuti" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveJenisCuti(data) {
  return axiosCustom("POST", `${API_URI}/jenisCuti/save`, data);
}

/**
 * Handle update "Jenis cuti" data
 * @param  {Object} data  Body Request
 * @param  {Integer} id   jenisCutiId
 * @return {Object}       HTTP Response
**/
function updateJenisCuti(data, id) {
  return axiosCustom("PUT", `${API_URI}/jenisCuti/${id}`, data);
}

/**
 * Handle get "Jenis cuti" data by id
 * @param  {Integer} id   jenisCutiId
 * @return {Object}       HTTP Response
**/
function getJenisCutiById(id) {
  return axiosCustom("GET", `${API_URI}/jenisCuti/${id}`);
}

/**
 * Handle delete "Jenis cuti" data by id
 * @param  {Integer} id   jenisCutiId
 * @return {Object}       HTTP Response
**/
function deleteJenisCutiById(id) {
  return axiosCustom("DELETE", `${API_URI}/jenisCuti/${id}`);
}

/**
 * Handle save "Departemen" data
 * @param  {Object} data  Body Request
 * @param  {Integer} id   Departemen Id
 * @return {Object}       HTTP Response
**/
function saveDepartemen(data, id) {
  return axiosCustom("POST", `${API_URI}/departemen/save`, data);
}

/**
 * Handle get "Departemen" data by id
 * @param  {Integer} id   Departemen Id
 * @return {Object}       HTTP Response
**/
function getDepartemenById(id) {
  return axiosCustom("GET", `${API_URI}/departemen/${id}`);
}

/**
 * Handle update "Departemen" data by id
 * @param  {Object} data  Body Request
 * @param  {Integer} id   Departemen Id
 * @return {Object}       HTTP Response
**/
function updateDepartemen(data, id) {
  return axiosCustom("PUT", `${API_URI}/departemen/${id}`, data);
}

/**
 * Handle save "Cuti" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveCuti(data) {
  return axiosCustom("POST", `${API_URI}/cuti/save`, data);
}

/**
 * Handle save "Persetujuan Cuti" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveCutiApproval(data) {
  return axiosCustom("POST", `${API_URI}/cuti/approval`, data);
}

/**
 * Handle update "Cuti" data by id
 * @param  {Object} data  Body Request
 * @param  {Integer} id   cutiId
 * @return {Object}       HTTP Response
**/
function updateCuti(data, id) {
  return axiosCustom("PUT", `${API_URI}/cuti/${id}`, data);
}

/**
 * Handle delete "Cuti" data by id
 * @param  {Integer} id   cutiId
 * @return {Object}       HTTP Response
**/
function deleteCuti(id) {
  return axiosCustom("DELETE", `${API_URI}/cuti/${id}`, data);
}

/**
 * Handle get "Cuti" data by id
 * @param  {Integer} id   cutiId
 * @return {Object}       HTTP Response
**/
function getCutiById(id) {
  return axiosCustom("GET", `${API_URI}/cuti/${id}`);
}

/**
 * Handle auth "Register" Karyawan data
 * @param  {Object} data   Body Request
 * @return {Object}        HTTP Response
**/
function authRegister(data) {
  return axiosCustom("POST", `${API_URI}/auth/register`, data);
}