function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
var materialsForAdd
$.get("/api/warehouse", function (data, status) {
    // alert("Data: " + data + "\nStatus: " + status);

}).then(function (res) {
     materialsForAdd = res.map(material => {
        return material.materialName
    })
     // material auto complete
     autocomplete(document.getElementById("materialInput"), materialsForAdd);
     console.log(materialsForAdd, "materials")
     // ////////////
});
// console.log(allMaterials.responseJSON,"all materials")



//  search name and phone 
function searchFunction(x) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    if (x === 1) {
        input = document.getElementById("searchName");
    } else if (x === 2) {
        input = document.getElementById("searchPhone");

    }
    filter = input.value.toUpperCase();
    table = document.getElementById("datax");
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
   
    let URL;
    let ID;
    console.log("document loaded!!.....");
    $(document).on('click', '.edit', function (e) {
        e.preventDefault();
        ID = $(this).attr("id");
        URL = `/api/workorder/${$(this).attr("id")}`;
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
                    $("#clientName").attr("value", element.clientName);
                    $("#installDate").attr("value", element.installationDate);
                    $("#clientPhone").attr("value", element.clientPhone);
                    $("#clientAddress").attr("value", element.clientAddress);
                    $("#jobAddress").attr("value", element.jobAddress);
                    $(`#${element.installerName}`).attr('selected', 'selected');
                    $("#materials").attr("value", element.materials);
                    $(`#${element.isComplete}`).attr('checked', 'checked');
                    $("#comments").attr("value", element.comments);
                    $("#submit").addClass("d-none");
                    $("#update").removeClass("d-none");
                });
            }
        });
    });

    $(document).on('click', '#update', function (e) {
        let data = {
            id: parseInt($(`#${ID}`).attr("id")),
            installationDate: $("#installDate").val(),
            clientName: $("#clientName").val(),
            clientPhone: $("#clientPhone").val(),
            clientAddress: $("#clientAddress").val(),
            jobAddress: $("#jobAddress").val(),
            installerName: $("#Installer option:selected").attr("value"),
            materials: $("#materials").val(),
            isComplete: $("input[name='isComplete']:checked").val(),
            comments: $("#comments").val(),

        };

        console.log(data);
        $.ajax({
            method: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
            dataType: 'json', // Set datatype - affects Accept header
            url: `/api/workorder/${data.id}`, // A valid URL
            headers: {
                "X-HTTP-Method-Override": "PUT"
            }, // X-HTTP-Method-Override set to PUT.
            data: data, // Some data e.g. Valid JSON as a string
            success: window.location.href = "/dashboard",

        })

    });

    $("#addBtn").on("click", () => {
        console.log("ADD");
        // reset all model files
        $("#clientName").attr("value", '');
        $("#installDate").attr("value", '');
        $("#clientPhone").attr("value", '');
        $("#clientAddress").attr("value", '');
        $("#jobAddress").attr("value", '');
        $("#Installer option:selected").attr('selected', false);
        $("#materials").attr("value", '');
        $("input[name='isComplete']:checked").attr('checked', false);
        $("#comments").attr("value", '');
        $("#update").addClass("d-none");
        $("#submit").removeClass("d-none");
    });
    // ///////////////////////

    $('[data-toggle="popover"]').popover();
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
        css('display', 'table-row').animate({
            opacity: 1
        }, 300);
    });
    // /////////////////
});




// {
//     "readyState": 4,
//     "responseText": "[{\"id\":1,\"materialName\":\"aqqqw\",\"materialSize\":\"23\",\"materialQuantity\":55,\"materialPrice\":\"88.00\",\"createdAt\":\"2019-11-17T09:19:18.000Z\",\"updatedAt\":\"2019-11-17T09:19:18.000Z\"},{\"id\":2,\"materialName\":\"www\",\"materialSize\":\"23\",\"materialQuantity\":55,\"materialPrice\":\"88.00\",\"createdAt\":\"2019-11-17T09:19:25.000Z\",\"updatedAt\":\"2019-11-17T09:19:25.000Z\"},{\"id\":3,\"materialName\":\"blueaada\",\"materialSize\":\"23\",\"materialQuantity\":55,\"materialPrice\":\"499.00\",\"createdAt\":\"2019-11-17T20:04:36.000Z\",\"updatedAt\":\"2019-11-17T20:04:36.000Z\"},{\"id\":4,\"materialName\":\"AASASFASF\",\"materialSize\":\"333\",\"materialQuantity\":22,\"materialPrice\":\"499.00\",\"createdAt\":\"2019-11-17T20:04:53.000Z\",\"updatedAt\":\"2019-11-17T20:04:53.000Z\"},{\"id\":5,\"materialName\":\"wwwddddd\",\"materialSize\":\"2355\",\"materialQuantity\":55,\"materialPrice\":\"88.00\",\"createdAt\":\"2019-11-19T07:10:44.000Z\",\"updatedAt\":\"2019-11-19T07:10:44.000Z\"},{\"id\":6,\"materialName\":\"aqqqwdsfdsdv\",\"materialSize\":\"4\",\"materialQuantity\":55,\"materialPrice\":\"4.00\",\"createdAt\":\"2019-11-19T08:18:10.000Z\",\"updatedAt\":\"2019-11-19T08:18:10.000Z\"}]",
//     "responseJSON": [{
//         "id": 1,
//         "materialName": "aqqqw",
//         "materialSize": "23",
//         "materialQuantity": 55,
//         "materialPrice": "88.00",
//         "createdAt": "2019-11-17T09:19:18.000Z",
//         "updatedAt": "2019-11-17T09:19:18.000Z"
//     }, {
//         "id": 2,
//         "materialName": "www",
//         "materialSize": "23",
//         "materialQuantity": 55,
//         "materialPrice": "88.00",
//         "createdAt": "2019-11-17T09:19:25.000Z",
//         "updatedAt": "2019-11-17T09:19:25.000Z"
//     }, {
//         "id": 3,
//         "materialName": "blueaada",
//         "materialSize": "23",
//         "materialQuantity": 55,
//         "materialPrice": "499.00",
//         "createdAt": "2019-11-17T20:04:36.000Z",
//         "updatedAt": "2019-11-17T20:04:36.000Z"
//     }, {
//         "id": 4,
//         "materialName": "AASASFASF",
//         "materialSize": "333",
//         "materialQuantity": 22,
//         "materialPrice": "499.00",
//         "createdAt": "2019-11-17T20:04:53.000Z",
//         "updatedAt": "2019-11-17T20:04:53.000Z"
//     }, {
//         "id": 5,
//         "materialName": "wwwddddd",
//         "materialSize": "2355",
//         "materialQuantity": 55,
//         "materialPrice": "88.00",
//         "createdAt": "2019-11-19T07:10:44.000Z",
//         "updatedAt": "2019-11-19T07:10:44.000Z"
//     }, {
//         "id": 6,
//         "materialName": "aqqqwdsfdsdv",
//         "materialSize": "4",
//         "materialQuantity": 55,
//         "materialPrice": "4.00",
//         "createdAt": "2019-11-19T08:18:10.000Z",
//         "updatedAt": "2019-11-19T08:18:10.000Z"
//     }],
//     "status": 200,
//     "statusText": "OK"
// }