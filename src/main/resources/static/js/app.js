$(document).ready(function() {
  /**
   * Handle document click event
  **/
  $(this).on("click", function() {
    $(".user-action-caret-down-icon").removeClass("rotate");
    $(".user-action-area").removeClass("active");
  });

  /**
   * Handle user section click event
  **/
  $(".user-section").on("click", function(event) {
    event.stopPropagation();

    $(this)
      .find(".user-action-caret-down-icon")
      .toggleClass("rotate");
    $(this)
      .find(".user-action-area")
      .toggleClass("active")
      .on("click", function(event) {
        event.stopPropagation();
      });
  });

  /**
   * Handle modal area click event
  **/
  $(".modal").on("click", function(event) {
    event.stopPropagation();
  });

  /**
   * Handle close modal button click event
  **/
  $(".modal .btn-close").on("click", function() {
    $(".modal").modal("hide");
  });

  /**
   * Handle my profile action click event
  **/
  $(".my-profile-action").on("click", function() {
    $("#modal-profile").modal("show");
  });

  /**
   * Handle change email action click event
  **/
  $(".change-email-action").on("click", function() {
    $("#modal-change-email").modal("show");
  });

  /**
   * Handle change password action click event
  **/
  $(".change-password-action").on("click", function() {
    $("#modal-change-password").modal("show");
  });

  /**
   * Handle add jenis cuti button click event
  **/
  $(".add-jenis-cuti-button").on("click", function() {
    $("#modal-kind-of-leave").modal("show");
  });

  /**
   * Handle add departemen button click event
  **/
  $(".add-departemen-button").on("click", function() {
    $("#modal-departemen").modal("show");
  });

  /**
   * Handle detail cuti button click event
  **/
  $(".detail-cuti-action-button").on("click", async function() {
    const idCuti = $(this).data("id");
    const modalCuti = $("#modal-cuti");

    const _getCutiById = await getCutiById(idCuti);

    if(_getCutiById.status === 200) {
      modalCuti.find(".form-group-jatah-cuti").css("display", "none");
      modalCuti.find(".modal-footer").css("display", "none");

      modalCuti.find("#infopribadi__id").val(_getCutiById.data.karyawan.id);
      modalCuti.find("#infopribadi__namalengkap").val(_getCutiById.data.karyawan.nama);
      modalCuti.find("#infopribadi__jabatan").val(_getCutiById.data.karyawan.jabatan);
      modalCuti.find("#infopribadi__bagian").val(_getCutiById.data.karyawan.departemen.nama);
      modalCuti.find("#infocuti__jeniscuti").val(_getCutiById.data.jenisCuti.id);
      modalCuti.find("#infocuti__tanggalmulaicuti").val(_getCutiById.data.tanggalMulai);
      modalCuti.find("#infocuti__tanggalselesaicuti").val(_getCutiById.data.tanggalSelesai);
      modalCuti.find("#infocuti__keterangan").val(_getCutiById.data.keterangan);
      modalCuti.find("#infocuti__perlupengganti").prop("checked", _getCutiById.data.perluPengganti);

      modalCuti.find("#infocuti__jeniscuti").attr("disabled", "disabled");
      modalCuti.find("#infocuti__tanggalmulaicuti").attr("disabled", "disabled");
      modalCuti.find("#infocuti__tanggalselesaicuti").attr("disabled", "disabled");
      modalCuti.find("#infocuti__keterangan").attr("disabled", "disabled");
      modalCuti.find("#infocuti__perlupengganti").prop("disabled", "disabled");

      modalCuti.modal("show");
    } else {
      swal("Oops!", "Internal Server Error", "warning");
    }
  });

  /**
   * Handle edit cuti button click event
  **/
  $(".edit-cuti-action-button").on("click", async function() {
    const idCuti = $(this).data("id");
    const modalCuti = $("#modal-cuti");

    const _getCutiById = await getCutiById(idCuti);

    if(_getCutiById.status === 200) {
      modalCuti.find(".form-group-jatah-cuti").css("display", "none");

      modalCuti.find("#infopribadi__id").val(_getCutiById.data.karyawan.id);
      modalCuti.find("#infopribadi__namalengkap").val(_getCutiById.data.karyawan.nama);
      modalCuti.find("#infopribadi__jabatan").val(_getCutiById.data.karyawan.jabatan);
      modalCuti.find("#infopribadi__bagian").val(_getCutiById.data.karyawan.departemen.nama);
      modalCuti.find("#infocuti__jeniscuti").val(_getCutiById.data.jenisCuti.id);
      modalCuti.find("#infocuti__tanggalmulaicuti").val(_getCutiById.data.tanggalMulai);
      modalCuti.find("#infocuti__tanggalselesaicuti").val(_getCutiById.data.tanggalSelesai);
      modalCuti.find("#infocuti__keterangan").val(_getCutiById.data.keterangan);
      modalCuti.find("#infocuti__perlupengganti").prop("checked", _getCutiById.data.perluPengganti);

      modalCuti.modal("show");
    } else {
      swal("Oops!", "Internal Server Error", "warning");
    }
  });

  /**
   * Handle accept cuti action button click event
  **/
  $(".accept-cuti-action-button").on("click", function() {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Catatan",
          type: "text",
        },
      },
    }).then(async (val) => {
      const _saveCutiApproval = await saveCutiApproval({
        catatan: val,
        cutiId: $(this).data("id"),
        terima: true
      });

      if(_saveCutiApproval.status === 200) {
        swal("Sukses!", "Pengajuan Cuti berhasil diterima", "success").then(() => {
          location.reload();
        });
      } else {
        swal("Oops!", "Internal Server Error", "warning");
      }
    });
  });

  /**
   * Handle reject cuti action button click event
  **/
  $(".accept-cuti-action-button").on("click", function() {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Catatan",
          type: "text",
        },
      },
    }).then(async (val) => {
      const _saveCutiApproval = await saveCutiApproval({
        catatan: val,
        cutiId: $(this).data("id"),
        terima: false
      });

      if(_saveCutiApproval.status === 200) {
        swal("Sukses!", "Pengajuan Cuti berhasil ditolak", "success").then(() => {
          location.reload();
        });
      } else {
        swal("Oops!", "Internal Server Error", "warning");
      }
    });
  });

  /**
   * Handle delete cuti button click event
  **/
  $(".delete-cuti-action-button").on("click", function() {
    swal({
      title: "Yakin ingin hapus?",
      text: "Data akan dihapus secara permanen.",
      buttons: {
        catch: {
          text: "Batal",
          value: "cancel",
          className: "netral-color-custom",
        },
        defeat: {
          text: "Hapus",
          value: "delete",
          className: "warning-color-custom",
        },
      },
    }).then(async value => {
      if(value === "delete") {
        const _deleteCuti = await deleteCuti($(this).data("id"));
        
        if(_deleteCuti.status === 200) {
          swal("Sukses!", "Cuti berhasil dihapus", "success").then(() => location.reload());
        } else { 
          swal("Oops!", "Cuti gagal dihapus", "warning");
        }
      } else {
        return;
      }
    });
  });

  /**
   * Handle add karyawan button click event
  **/
  $(".add-karyawan-button").on("click", function() {
    $("#modal-karyawan").modal("show");
  });

  /**
   * Handle edit karyawan button click event
  **/
  $("#karyawan-table").on("click", ".edit-action-button", async function() {
    const karyawanForm = $("#form-karyawan");
  });

  /**
   * Handle karyawan submit button click event
  **/
  $("#form-karyawan").on("click", ".submit-button", function() {
    let currentForm = $("#form-karyawan");
    let htmlInput = {
      departemenId: currentForm.find("#karyawan__departemen"),
      email: currentForm.find("#karyawan__email"),
      jabatan: currentForm.find("#karyawan__jabatan"),
      nama: currentForm.find("#karyawan__nama"),
      username: currentForm.find("#karyawan__username")
    };

    Promise.all(
      Object
        .values(htmlInput)
        .map(item => inputValidation(item))
    ).then(async () => {
      const requestBody = Object.fromEntries(
        Object.entries(htmlInput).map(item => {
          return [item[0], item[1].val()];
        })
      );

      if(currentForm.find("#karyawan__id").val()) {

      } else {
        console.log({...requestBody, password: "secret", status: "aktif"});
        const _saveKaryawan = await authRegister({...requestBody, password: "secret123", status: "aktif"});

        if(_saveKaryawan.status === 200) {
          swal("Sukses!", "Karyawan berhasil ditambahkan.", "success").then(() => {
            $("#modal-karyawan").modal("hide");
            location.reload();
          });
        } else {
          swal("Oops!", "Karyawan gagal ditambahkan", "warning");
        }
      }
    }).catch(err => {
      swal("Oops!", err, "warning");
    });
  });

  /**
   * Handle delete karyawan button click event
  **/
  $("#karyawan-table").on("click", ".delete-action-button", async function() {
    swal({
      title: "Yakin ingin hapus?",
      text: "Data akan dihapus secara permanen.",
      buttons: {
        catch: {
          text: "Batal",
          value: "cancel",
          className: "netral-color-custom",
        },
        defeat: {
          text: "Hapus",
          value: "delete",
          className: "warning-color-custom",
        },
      },
    }).then(async value => {
      if(value === "delete") {
        const _deleteKaryawan = await deleteKaryawan($(this).data("id"));
        
        if(_deleteKaryawan.status === 200) {
          swal("Sukses!", "Karyawan berhasil dihapus", "success").then(() => location.reload());
        } else { 
          swal("Oops!", "Karyawan gagal dihapus", "warning");
        }
      } else {
        return;
      }
    });
  });

  /**
   * Handle edit departemen button click event
  **/
  $("#departemen-table").on("click", ".edit-action-button", async function() {
    const departemenForm = $("#form-departemen");
    const _getDepartemenById = await getDepartemenById($(this).data("id"));

    if(_getDepartemenById.status === 200) {
      departemenForm.find("#departemen__id").val(_getDepartemenById.data.id);
      departemenForm.find("#departemen__nama").val(_getDepartemenById.data.nama);
      departemenForm.find("#departemenForm__manager").val(_getDepartemenById.data.managerId);

      $("#modal-departemen").modal("show");
    } else {
      swal("Oops!", "Internal Server Error", "warning");
    }
  });

  /**
   * Handle departemen form submit button click event
  **/
  $("#modal-departemen").on("click", ".submit-button", function() {
    let currentModal = $("#modal-departemen");
    let htmlInput = {
      id: currentModal.find("#departemen__id"),
      nama: currentModal.find("#departemen__nama"),
      managerId: currentModal.find("#departemen__manager")
    };

    Promise.all(
      Object
        .values(htmlInput)
        .map(item => inputValidation(item))
    ).then(async () => {
      const requestBody = Object.fromEntries(
        Object.entries(htmlInput).map(item => {
          return [item[0], item[1].val()];
        })
      );

      if(htmlInput.id.val()) {
        const _updateDepartemen = await updateDepartemen({nama: requestBody.nama, managerId: requestBody.managerId }, requestBody.id);

        if(_updateDepartemen.status === 200) {
          swal("Sukses!", "Departemen berhasil diupdate.", "success").then(() => {
            currentModal.modal("hide");
            location.reload();
          });
        } else {
          swal("Oops!", "Departemen gagal diupdate.", "warning");
        }
      } else {
        const _saveDepartemen = await saveDepartemen({nama: requestBody.nama, managerId: requestBody.managerId });

        if(_saveDepartemen.status === 200) {
          swal("Sukses!", "Departemen berhasil ditambahkan.", "success").then(() => {
            currentModal.modal("hide");
            location.reload();
          });
        } else {
          swal("Oops!", "Departemen gagal ditambahkan.", "warning");
        }
      }
    }).catch(err => {
      swal("Oops!", err, "warning");
    });
  });

  /**
   * Handle edit jenis cuti button click event
  **/
  $("#jenis-cuti-table").on("click", ".edit-action-button", async function() {
    const kindOfLeaveForm = $("#form-kind-of-leave");
    const _getJenisCutiById = await getJenisCutiById($(this).data("id"));

    if(_getJenisCutiById.status === 200) {
      kindOfLeaveForm.find("#kindofleave__id").val(_getJenisCutiById.data.id);
      kindOfLeaveForm.find("#kindofleave__nama").val(_getJenisCutiById.data.nama);
      kindOfLeaveForm.find("#kindofleave__jumlahjatahcuti").val(_getJenisCutiById.data.jumlahJatahCuti);

      $("#modal-kind-of-leave").modal("show");
    } else {
      swal("Oops!", "Internal Server Error", "warning");
    }
  });

  /**
   * Handle jenis cuti form submit button click event
  **/
  $("#modal-kind-of-leave").on("click", ".submit-button", function() {
    let currentModal = $("#modal-kind-of-leave");
    let htmlInput = {
      id: currentModal.find("#kindofleave__id"),
      nama: currentModal.find("#kindofleave__nama"),
      jumlahJatahCuti: currentModal.find("#kindofleave__jumlahjatahcuti")
    };

    Promise.all(
      Object
        .values(htmlInput)
        .map(item => inputValidation(item))
    ).then(async () => {
      const requestBody = Object.fromEntries(
        Object.entries(htmlInput).map(item => {
          return [item[0], item[1].val()];
        })
      );

      if(htmlInput.id.val()) {
        const _updateJenisCuti = await updateJenisCuti(requestBody, htmlInput.id.val());

        if(_updateJenisCuti.status === 200) {
          swal("Sukses!", "Jenis Cuti berhasil diupdate.", "success").then(() => {
            currentModal.modal("hide");
            location.reload();
          });
        } else {
          swal("Oops!", "Jenis Cuti gagal diupdate.", "warning");
        }
      } else {
        const _saveJenisCuti = await saveJenisCuti({nama: requestBody.nama, jumlahJatahCuti: requestBody.jumlahJatahCuti });

        if(_saveJenisCuti.status === 200) {
          swal("Sukses!", "Jenis Cuti berhasil ditambahkan.", "success").then(() => {
            currentModal.modal("hide");
            location.reload();
          });
        } else {
          swal("Oops!", "Jenis Cuti gagal ditambahkan.", "warning");
        }
      }
    }).catch(err => {
      swal("Oops!", err, "warning");
    });
  });

  /**
   * Handle delete jenis cuti button click event
  **/
  $("#jenis-cuti-table").on("click", ".delete-action-button", function() {
    swal({
      title: "Yakin ingin hapus?",
      text: "Data akan dihapus secara permanen.",
      buttons: {
        catch: {
          text: "Batal",
          value: "cancel",
          className: "netral-color-custom",
        },
        defeat: {
          text: "Hapus",
          value: "delete",
          className: "warning-color-custom",
        },
      },
    }).then(async value => {
      if(value === "delete") {
        const _deleteJenisCutiById = await deleteJenisCutiById($(this).data("id"));
        
        if(_deleteJenisCutiById.status === 200) {
          swal("Sukses!", "Jenis Cuti berhasil dihapus", "success").then(() => location.reload);
        } else { 
          swal("Oops!", "Jenis Cuti gagal dihapus", "warning");
        }
      } else {
        return;
      }
    });
  });

  /**
   * Handle submit button from change email modal click event
  **/
  $("#modal-change-email").on("click", ".submit-button", function() {
    let currentModal = $("#modal-change-email");
    let htmlInput = {
      email: currentModal.find("#changeemail__newemail")
    };

    Promise.all(
      Object
        .values(htmlInput)
        .map(item => inputValidation(item))
    ).then(async () => {
      const requestBody = Object.fromEntries(
        Object.entries(htmlInput).map(item => {
          return [item[0], item[1].val()];
        })
      );

      const _updateEmailKaryawan = await updateEmailKaryawan(requestBody, currentIdKaryawan);

      if(_updateEmailKaryawan.data) {
        swal("Sukses!", "Update email berhasil", "success");
        $(".modal-body-table-info [data-row='email'] .info-value").html(requestBody.email);
      } else {
        swal("Oops!", "Update password gagal", "warning");
      }
    }).catch(err => {
      swal("Oops!", err, "warning");
    });
  });

  /**
   * Handle submit button from change password modal click event
  **/
  $("#modal-change-password").on("click", ".submit-button", function() {
    let currentModal = $("#modal-change-password");
    let htmlInput = {
      oldPassword: currentModal.find("#changepassword__oldpass"),
      newPassword: currentModal.find("#changepassword__newpass")
    };

    Promise.all(
      Object
        .values(htmlInput)
        .map(item => inputValidation(item))
    ).then(async () => {
      const requestBody = Object.fromEntries(
        Object.entries(htmlInput).map(item => {
          return [item[0], item[1].val()];
        })
      );

      const _changePassword = await changePassword({...requestBody, karyawanId: currentIdKaryawan});

      if(_changePassword.data) {
        swal("Sukses!", "Update password berhasil", "success");
      } else {
        swal("Oops!", "Update password gagal", "warning");
      }
    }).catch(err => {
      swal("Oops!", err, "warning");
    });
  });

  /**
   * Handle submit button from pengajuan cuti form click event
  **/
  $("#form-pengajuan-cuti").on("click", ".submit-button", function() {
    let currentModal = $("#form-pengajuan-cuti");
    let htmlInput = {
      tanggalMulai: currentModal.find("#infocuti__tanggalmulaicuti"),
      tanggalSelesai: currentModal.find("#infocuti__tanggalselesaicuti"),
      keterangan: currentModal.find("#infocuti__keterangan")
    };   

    Promise.all(
      Object
        .values(htmlInput)
        .map(item => inputValidation(item))
    ).then(async () => {
      const requestBody = Object.fromEntries(
        Object.entries(htmlInput).map(item => {
          return [item[0], item[1].val()];
        })
      );

      const _saveCuti = await saveCuti({
        ...requestBody, 
        jenisCutiId: currentModal.find("#infocuti__jeniscuti").data("jatah"), 
        karyawanId: currentIdKaryawan, 
        status: "tertunda",
        tanggalPengajuan: dateFormat(new Date(), "yyyy-MM-dd"),
        perluPengganti: currentModal.find("#infocuti__perlupengganti").prop("checked")
      });

      if(_saveCuti.status === 200) {
        swal("Sukses!", "Pengajuan cuti berhasil", "success").then(() => location.reload);
      } else {
        swal("Oops!", "Pengajuan cuti gagal", "warning");
      }
    }).catch(err => {
      swal("Oops!", err, "warning");
    });
  });

  /**
   * Handle jenis cuti from pengajuan cuti form onchange event
  **/
  $("#form-pengajuan-cuti").on("change", "#infocuti__jeniscuti", function(event) {
    let jmlJatahCuti = $(this).find(":selected").data("jatah");

    if(sisaCuti - jmlJatahCuti < 0) {
      swal("Oops!", "Maaf, Sisa jatah cuti anda tidak cukup", "warning");
    } else {
      $("#form-pengajuan-cuti #infocuti__tanggalselesaicuti").attr("disabled", "disabled");

      $("#form-pengajuan-cuti #infocuti__jumlahcutidiambil").val(jmlJatahCuti);
      $("#form-pengajuan-cuti #infocuti__sisacuti").val(sisaCuti - jmlJatahCuti);

      $("#form-pengajuan-cuti #infocuti__tanggalmulaicuti").val("");
      $("#form-pengajuan-cuti #infocuti__tanggalselesaicuti").val("");
    }
  });

  /**
   * Handle tanggal mulai from pengajuan cuti form onchange event
  **/
  $("#form-pengajuan-cuti").on("change", "#infocuti__tanggalmulaicuti", function(event) {
    let tglMulaiCuti = event.target.value;
    let jmlJatahCuti = +$("#form-pengajuan-cuti #infocuti__jumlahcutidiambil").val();

    if(jmlJatahCuti > 0) {
      let _tglMulaiCuti = new Date(tglMulaiCuti);
      let _tglSelesaiCuti = new Date(tglMulaiCuti);

      if(_tglMulaiCuti >= new Date()) {
        _tglSelesaiCuti.setDate(_tglMulaiCuti.getDate() + jmlJatahCuti - 1);

        $("#form-pengajuan-cuti #infocuti__tanggalselesaicuti").val(`${_tglSelesaiCuti.getFullYear()}-${_tglSelesaiCuti.getMonth()+1}-${_tglSelesaiCuti.getDate()}`);

        let totalWeekend = 0;

        for(let i = _tglMulaiCuti; i <= _tglSelesaiCuti; i.setDate(i.getDate() + 1)) {
          if(i.getDay() === 0 || i.getDay() === 6) totalWeekend++;
        }

        $("#form-pengajuan-cuti #infocuti__sisacuti").val(sisaCuti - (jmlJatahCuti - totalWeekend));
      } 
    }
  });

  /**
   * Handle tanggal mulai from pengajuan cuti form onblur event
  **/
  $("#form-pengajuan-cuti").on("blur", "#infocuti__tanggalmulaicuti", function(event) {
    if(event.target.value === "" || new Date(event.target.value) < new Date()) {
      $("#form-pengajuan-cuti #infocuti__tanggalselesaicuti").val("");
    }
  });

  /**
   * Handle tanggal mulai from pengajuan cuti form onkeyup event
  **/
  $("#form-pengajuan-cuti").on("keyup", "#infocuti__tanggalmulaicuti", function(event) {
    if(event.target.value === "" || new Date(event.target.value) < new Date()) {
      $("#form-pengajuan-cuti #infocuti__tanggalselesaicuti").val("");
    }
  });

  /**
   * Handle tanggal selesai from pengajuan cuti form onchange event
  **/
  $("#form-pengajuan-cuti").on("change", "#infocuti__tanggalselesaicuti", function(event) {
    let _tglMulaiCuti = new Date($("#form-pengajuan-cuti #infocuti__tanggalmulaicuti").val());
    let _tglSelesaiCuti = new Date(event.target.value);

    let totalWeekend = 0;
    let totalDay = 0;

    for(let i = _tglMulaiCuti; i <= _tglSelesaiCuti; i.setDate(i.getDate() + 1)) {
      if(i.getDay() === 0 || i.getDay() === 6) totalWeekend++; 
      totalDay++;
    }

    if(sisaCuti - (totalDay - totalWeekend) < 0) {
      swal("Oops!", "Maaf, Sisa jatah cuti anda tidak cukup", "warning");
    } else {
      $("#form-pengajuan-cuti #infocuti__jumlahcutidiambil").val(totalDay);
      $("#form-pengajuan-cuti #infocuti__sisacuti").val(sisaCuti - (totalDay - totalWeekend));
    }
  });

  /**
   * Apply the datepicker to the "Tanggal Mulai Cuti" input
  **/
  $("#infocuti__tanggalmulaicuti").datepicker({
    format: 'yyyy-mm-dd',
    startDate: new Date()
  });

  /**
   * Apply the datepicker to the "Tanggal Selesai Cuti" input
  **/
  $("#infocuti__tanggalselesaicuti").datepicker({
    format: 'yyyy-mm-dd',
    startDate: new Date()
  });

  /**
   * Customize "Tabel Riwayat Cuti" DataTable
  **/
  $('#riwayat-cuti-table').DataTable({
    columnDefs: [
      {
        targets: [-1],
        orderable: false
      },
      {
        targets: [0, -1],
        className: "dt-head-center dt-body-center"
      }
    ]
  });

  /**
   * Customize "Tabel Persetujuan Cuti" DataTable
  **/
  $('#persetujuan-cuti-table').DataTable({
    columnDefs: [
      {
        targets: [-1],
        orderable: false
      },
      {
        targets: [0, -1],
        className: "dt-head-center dt-body-center"
      }
    ]
  });

  /**
   * Customize "Tabel Karyawan" DataTable
  **/
  $('#karyawan-table').DataTable({
    columnDefs: [
      {
        targets: [-1],
        orderable: false
      },
      {
        targets: [0, -1, -2],
        className: "dt-head-center dt-body-center"
      }
    ]
  });

  /**
   * Customize "Tabel Jenis Cuti" DataTable
  **/
  $('#jenis-cuti-table').DataTable({
    columnDefs: [
      {
        targets: [-1],
        orderable: false
      },
      {
        targets: [0, -1],
        className: "dt-head-center dt-body-center"
      }
    ]
  });

  /**
   * Customize "Tabel Departemen" DataTable
  **/
  $('#departemen-table').DataTable({
    columnDefs: [
      {
        targets: [-1],
        orderable: false
      },
      {
        targets: [0, -1],
        className: "dt-head-center dt-body-center"
      }
    ]
  });
  
});