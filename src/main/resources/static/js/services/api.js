console.log(bearerToken);

const API_URI = "http://206.189.94.183:8085";

/**
 * Axios customization for API requests
 * @param  {String} method  HTTP Method
 * @param  {String} baseURL API Endpoint
 * @param  {Object} data    Body Request
 * @return {Object}         HTTP Response
**/
async function fetchCustom(method, baseURL, data = null) {
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

  // fetch(baseURL, {
  //   method,
  //   headers: {
  //     "Content-type": "application/json",
  //      Authorization: `Bearer ${bearerToken}`
  //   },
  //   body: JSON.stringify(data)
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log()
  // });
  // fetch(baseURL, {
  //   method,
  //   body: data,
  //   headers: {
  //     "Content-type": "application/json",
  //      Authorization: `Bearer ${bearerToken}`
  //   }
  // }).then(res => res.json())
  // .then(json => console.log(json));
}

/**
 * Handle save "Karyawan" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveKaryawan(data) {
  return fetchCustom("POST", `${API_URI}/karyawan`, data);
}

/**
 * Handle update "Karyawan" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function updateKaryawan(data) {
  return fetchCustom("PUT", `${API_URI}/karyawan/${data.id}`, data);
}

/**
 * Handle delete "Karyawan" data by id
 * @param  {Integer} id  id from Karyawan
 * @return {Object}      HTTP Response
**/
function deleteKaryawan(id) {
  return fetchCustom("DELETE", `${API_URI}/karyawan/${id}`);
}

/**
 * Handle update "Email Karyawan" data
 * @param  {Object} data  Body Request
 * @param  {Integer} id   id from Karyawan
 * @return {Object}       HTTP Response
**/
function updateEmailKaryawan(data, id) {
  return fetchCustom("PUT", `${API_URI}/karyawan/${id}/email?email=${data.email}`, data);
}

/**
 * Handle post "Ubah Password" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function changePassword(data) {
  return fetchCustom("POST", `${API_URI}/auth/changepassword`, data);
}

/**
 * Handle save "Jenis Cuti" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveJenisCuti(data) {
  return fetchCustom("POST", `${API_URI}/jeniscuti/save`, data);
}

/**
 * Handle update "Jenis cuti" data
 * @param  {Object} data  Body Request
 * @param  {Integer} id   jenisCutiId
 * @return {Object}       HTTP Response
**/
function updateJenisCuti(data, id) {
  return fetchCustom("PUT", `${API_URI}/jeniscuti/${id}`, data);
}

/**
 * Handle delete "Jenis cuti" data by id
 * @param  {Object} data  Body Request
 * @param  {Integer} id   jenisCutiId
 * @return {Object}       HTTP Response
**/
function deleteJenisCuti(data, id) {
  return fetchCustom("DELETE", `${API_URI}/jeniscuti/${id}`, data);
}

/**
 * Handle save "Departemen" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveDepartemen(data) {
  return fetchCustom("POST", `${API_URI}/departemen/save`, data);
}

/**
 * Handle save "Cuti" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveCuti(data) {
  return fetchCustom("POST", `${API_URI}/cuti/save`, data);
}

/**
 * Handle save "Persetujuan Cuti" data
 * @param  {Object} data  Body Request
 * @return {Object}       HTTP Response
**/
function saveCutiApproval(data) {
  return fetchCustom("POST", `${API_URI}/cuti/approval`, data);
}

/**
 * Handle update "Cuti" data by id
 * @param  {Object} data  Body Request
 * @param  {Integer} id   cutiId
 * @return {Object}       HTTP Response
**/
function updateCuti(data, id) {
  return fetchCustom("PUT", `${API_URI}/cuti/${id}`, data);
}

/**
 * Handle delete "Cuti" data by id
 * @param  {Integer} id   cutiId
 * @return {Object}       HTTP Response
**/
function deleteCuti(id) {
  return fetchCustom("DELETE", `${API_URI}/cuti/${id}`, data);
}

// (async function() {
//   var oe = await fetchCustom("POST", `${API_URI}/jeniscuti/save`, { nama: "Sunatan", jumlahJatahCuti: 3 });

//   console.log(oe);
// })();