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
    baseURL,
    data
  });

  const response = request;
  return response;
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
 * Handle save "Departemen" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveDepartemen(data) {
	return axiosCustom("POST", `${API_URI}/departemen`, data);
}

/**
 * Handle save "Jenis Cuti" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveJenisCuti(data) {
	return axiosCustom("POST", `${API_URI}/jeniscuti`, data);
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
 * @param  {Integer} id  id from Karyawan
 * @return {Object}      HTTP Response
**/
function deleteKaryawan(id) {
	return axiosCustom("DELETE", `${API_URI}/karyawan/${id}`);
}