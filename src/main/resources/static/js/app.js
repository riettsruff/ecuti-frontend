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
   * Handle close modal button click event
  **/
  $(".modal .btn-close").on("click", function() {
    $(".modal").modal("hide");
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
   * Handle submit button from kind of leave modal click event
  **/
  $("#modal-kind-of-leave").on("click", ".submit-button", function() {
    let currentModal = $("#modal-kind-of-leave");
    let htmlInput = {
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

      // const _changePassword = await changePassword({...requestBody, karyawanId: currentIdKaryawan});

      // console.log(_changePassword); 
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
        tanggalPengajuan: "2020-12-17",
        perluPengganti: currentModal.find("#infocuti__perlupengganti").prop("checked")
      });

      if(_saveCuti.data) {
        swal("Sukses!", "Pengajuan cuti berhasil", "success");
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
  
});