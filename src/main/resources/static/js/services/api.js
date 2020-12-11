const API_URI = "http://206.189.94.183:8085";

async function AXIOS_CUSTOM(method, baseURL, data = null) {
  const request = await axios({
    method,
    baseURL,
    data
  });

  const response = request;
  return response;
}


// Cuti Endpoint

function saveCuti(data) {
	return AXIOS_CUSTOM("POST", `${API_URI}/cuti/save`, data);
}


// Departemen Endpoint

function saveDepartemen(data) {
	return AXIOS_CUSTOM("POST", `${API_URI}/departemen`, data);
}


// Jenis Cuti Endpoint

function saveJenisCuti(data) {
	return AXIOS_CUSTOM("POST", `${API_URI}/jeniscuti`, data);
}


// Karyawan Endpoint

function saveKaryawan(data) {
	return AXIOS_CUSTOM("POST", `${API_URI}/karyawan`, data);
}

function updateKaryawan(data) {
	return AXIOS_CUSTOM("PUT", `${API_URI}/karyawan/${data.id}`, data);
}

function deleteKaryawan(id) {
	return AXIOS_CUSTOM("DELETE", `${API_URI}/karyawan/${id}`);
}