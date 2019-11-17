



	//select box search

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, div, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  _div = div.getElementsByTagName("div");
  for (i = 0; i < _div.length; i++) {
    txtValue = _div[i].textContent || _div[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      _div[i].style.display = "";
    } else {
      _div[i].style.display = "none";
    }
  }
}
//search/filter table
function searchFunction(x) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  if (x === 1) {
    input = document.getElementById("searchName");
  } else if (x === 2) {
    input = document.getElementById("searchPhone");

  }
  filter = input.value.toUpperCase();
  table = document.getElementById("data");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i += 2) {
    td = tr[i].getElementsByTagName("td")[x];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        tr[i + 1].style.display = "";

      } else {
        tr[i].style.display = "none";
        tr[i + 1].style.display = "none";

      }
    }



  }
}
$(document).ready(function () {
  // not my code!!
  // 
  console.log("document loaded!!.....");
  $("#edit").on("click", ()=>{
    $("#form").attr('method', "PUT");
    $("#form").attr('action', "/api/workorder/1");
    console.log(`edit click: ${$("#form").attr('method')} :  ${$("#form").attr('action')}`);

  });

  $("#add").on("click", ()=>{
    $("#form").attr('method', "POST");
    $("#form").attr('action', "/api/workorder");
  })
  // ////////////////////////

  $(".selectOption").on("click",function(){
    console.log($(this).text())
    $("#myInput").val($(this).text())
  })
  //comment popOver
  $('[data-toggle="popover"]').popover();
  // Pagination function

  $('#data').after('<div><nav id="nav" aria-label="Page navigation example"><ul class="pagination"></ul></nav></div>');
  var rowsShown = 10;
  var rowsTotal = $('#data tbody tr').length;
  var numPages = rowsTotal / rowsShown;
  for (i = 0; i < numPages; i++) {
    var pageNum = i + 1;
    let newLi = $('<li class="page-item">');
    $(newLi).append('<a class="page-link" href="#" rel="' + i + '">' + pageNum + '</a>');
    $(".pagination").append(newLi);
  }
  $('#data tbody tr').hide();
  $('#data tbody tr').slice(0, rowsShown).show();
  $('#nav a:first').addClass('active');
  $('#nav a').bind('click', function () {

    $('#nav a').removeClass('active');
    $(this).addClass('active');
    var currPage = $(this).attr('rel');
    var startItem = currPage * rowsShown;
    var endItem = startItem + rowsShown;
    $('#data tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
      css('display', 'table-row').animate({ opacity: 1 }, 300);
  });
});
