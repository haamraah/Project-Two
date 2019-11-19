   //Filter through data
   function searchFunction() {
       // Declare variables
       var input, filter, table, tr, td, i, txtValue;
      
           input = document.getElementById("searchName");
      
       filter = input.value.toUpperCase();
       table = document.getElementById("data");
       tr = table.getElementsByTagName("tr");

       // Loop through all table rows, and hide those who don't match the search query
       for (i = 1; i < tr.length; i += 2) {
           td = tr[i].getElementsByTagName("td")[0];
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
       // { { !--edit button-- } }
       let URL;
       let ID;
       console.log("document loaded!!.....");
       $(document).on('click', '.edit', function (e) {
           e.preventDefault();
           ID = $(this).attr("id");
           URL = `/api/warehouse/${$(this).attr("id")}`;
           console.log("EDIT: " + URL);

           $.ajax({
               type: 'GET',
               url: URL,
               data: {
                   get_param: 'value'
               },
               dataType: 'json',
               success: function (data) {
                   $.each(data, function (index, element) {
                       console.log(element);
                       $("#materialName").attr("value", element.materialName);
                       $("#materialSize").attr("value", element.materialSize);
                       $("#materialQuantity").attr("value", element.materialQuantity);
                       $("#materialPrice").attr("value", element.materialPrice);

                       $("#submit").addClass("d-none");
                       $("#update").removeClass("d-none");
                   });
               }
           });
       });

       $(document).on('click', '#update', function (e) {
           let data = {
               id: parseInt($(`#${ID}`).attr("id")),
               materialName: $("#materialName").val(),
               materialSize: $("#materialSize").val(),
               materialQuantity: $("#materialQuantity").val(),
               materialPrice: $("#materialPrice").val(),

           };

           console.log(data.id, "data.id");

           $.ajax({
               url: `/api/warehouse/${data.id}`,
               type: 'PUT',
               data: data,
              
           }).then(data => {
               console.log(data,"data")
               window.location.href = "/warehouse";

           }).catch(err => {
               if (err) throw (err)
           });

       });

       $("#addBtn").on("click", () => {
           console.log("ADD");
           // reset all model files
           $("#materialName").attr("value", "");
           $("#materialSize").attr("value", "");
           $("#materialQuantity").attr("value", "");
           $("#materialPrice").attr("value", "");
           $("#update").addClass("d-none");
           $("#submit").removeClass("d-none");
       })
       // { { !--end edit button-- } }

    //    $('#data').after('<div><nav id="nav" aria-label="Page navigation example"><ul class="pagination"></ul></nav></div>');
    //    var rowsShown = 10;
    //    var rowsTotal = $('#data tbody tr').length;
    //    var numPages = rowsTotal / rowsShown;
    //    for (i = 0; i < numPages; i++) {
    //        var pageNum = i + 1;
    //        let newLi = $('<li class="page-item">');
    //        $(newLi).append('<a class="page-link" href="#" rel="' + i + '">' + pageNum + '</a>');
    //        $(".pagination").append(newLi);
    //    }
    //    let hide = $('#data tbody tr').hide();
    //    let slice = $('#data tbody tr').slice(0, rowsShown).show();
    //    $('#nav a:first').addClass('active');
    //    $('#nav a').bind('click', function () {
    //        $('#nav a').removeClass('active');
    //        $(this).addClass('active');
    //        var currPage = $(this).attr('rel');
    //        var startItem = currPage * rowsShown;
    //        var endItem = startItem + rowsShown;
    //        $('#data tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
    //        css('display', 'table-row').animate({
    //            opacity: 1
    //        }, 300);
    //    });

   });