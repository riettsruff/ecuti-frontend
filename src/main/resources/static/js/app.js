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