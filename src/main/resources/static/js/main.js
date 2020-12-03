$(document).ready(function() {

  $(this).on("click", function() {
    $(".user-action-caret-down-icon").removeClass("rotate");
    $(".user-action-area").removeClass("active");
  });

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

  $("#infocuti__tanggalmulaicuti").datepicker({
    format: 'yyyy-mm-dd',
    startDate: new Date()
  });

  $("#infocuti__tanggalselesaicuti").datepicker({
    format: 'yyyy-mm-dd',
    startDate: new Date()
  });

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