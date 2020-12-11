const API_URI = "http://206.189.94.183:8085";

async function axiosCustom(method, baseURL, data = null) {
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
	return axiosCustom("POST", `${API_URI}/cuti/save`, data);
}


// Departemen Endpoint

function saveDepartemen(data) {
	return axiosCustom("POST", `${API_URI}/departemen`, data);
}


// Jenis Cuti Endpoint

function saveJenisCuti(data) {
	return axiosCustom("POST", `${API_URI}/jeniscuti`, data);
}


// Karyawan Endpoint

function saveKaryawan(data) {
	return axiosCustom("POST", `${API_URI}/karyawan`, data);
}

function updateKaryawan(data) {
	return axiosCustom("PUT", `${API_URI}/karyawan/${data.id}`, data);
}

function deleteKaryawan(id) {
	return axiosCustom("DELETE", `${API_URI}/karyawan/${id}`);
}