$(document).ready(function(){
    let URL;

    console.log("document loaded!!.....");
    $(document).on('click','.edit',function(e){
        e.preventDefault();
        URL = `http://localhost:3000/api/workorder/${$(this).attr("id")}`;
        console.log(URL);

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
                });
            }
        });
    });

  $("#addBtn").on("click", ()=>{
    console.log("ADD");
    // reset all
    $("#clientName").attr("value", '');
    $("#installDate").attr("value",  '');
    $("#clientPhone").attr("value",  '');
    $("#clientAddress").attr("value",  '');
    $("#jobAddress").attr("value",  '');
    console.log($("select[name='installerName']:selected"));
    $("#Installer option:selected").attr('selected', false);
    $("#materials").attr("value",  '');
    $("input[name='isComplete']:checked").attr('checked', false);
    $("#comments").attr("value",  '');
  })
});

