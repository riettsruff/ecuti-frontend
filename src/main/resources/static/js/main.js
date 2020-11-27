$(document).ready(function() {

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