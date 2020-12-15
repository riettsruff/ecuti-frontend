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
        swal("Oops!", "Update password gagal", "success");
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

      const _changePassword = await changePassword({...requestBody, karyawanId: currentIdKaryawan});

      console.log(_changePassword); 
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

    };
  });


  /**
   * Handle jenis cuti from pengajuan cuti form on change event
  **/
  $("#form-pengajuan-cuti").on("change", ".infocuti__jeniscuti", function(event) {
    // let val = event.target.data
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