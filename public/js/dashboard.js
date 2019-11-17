$(document).ready(function(){
    let URL;
    let ID;
    console.log("document loaded!!.....");
    $(document).on('click','.edit',function(e){
        e.preventDefault();
        ID = $(this).attr("id");
        URL = `http://localhost:3000/api/workorder/${$(this).attr("id")}`;
        console.log("EDIT: "+URL);

        $.ajax({
            type: 'GET',
            url: URL,
            data: { get_param: 'value' },
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index, element) {
                    console.log(element);
                    $("#clientName").attr("value",  element.clientName);
                    $("#installDate").attr("value",  element.installationDate);
                    $("#clientPhone").attr("value",  element.clientPhone);
                    $("#clientAddress").attr("value",  element.clientAddress);
                    $("#jobAddress").attr("value",  element.jobAddress);
                    $(`#${element.installerName}`).attr('selected','selected');
                    $("#materials").attr("value",  element.materials);
                    $(`#${element.isComplete}`).attr('checked', 'checked');
                    $("#comments").attr("value",  element.comments);
                    $("#submit").addClass("d-none");
                    $("#update").removeClass("d-none");
                });
            }
        });
    });

    $(document).on('click','#update',function(e){
        let data = {
                id: parseInt($(`#${ID}`).attr("id")),
                installationDate: $("#installDate").val(),
                clientName:  $("#clientName").val(),
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
            url: `http://localhost:3000/api/workorder/${data.id}`, // A valid URL
            headers: {"X-HTTP-Method-Override": "PUT"}, // X-HTTP-Method-Override set to PUT.
            data: data, // Some data e.g. Valid JSON as a string
            success: window.location.reload(),
        }).then( window.location.reload())

    });

    $("#addBtn").on("click", ()=>{
        console.log("ADD");
        // reset all model files
        $("#clientName").attr("value", '');
        $("#installDate").attr("value",  '');
        $("#clientPhone").attr("value",  '');
        $("#clientAddress").attr("value",  '');
        $("#jobAddress").attr("value",  '');
        $("#Installer option:selected").attr('selected', false);
        $("#materials").attr("value",  '');
        $("input[name='isComplete']:checked").attr('checked', false);
        $("#comments").attr("value",  '');
        $("#update").addClass("d-none");
        $("#submit").removeClass("d-none");
    })
});

