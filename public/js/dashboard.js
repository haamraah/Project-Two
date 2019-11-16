// document.onload = function(e) {
//   console.log("document loaded!..");
// };

$(document).ready(function(){
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
});