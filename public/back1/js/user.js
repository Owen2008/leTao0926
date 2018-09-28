$(function(){
  $.ajax({
    type:"get",
    url:"/user/queryUser",
    data:{
      page:1,
      pageSize:4
    },
    dataType:"json",
    success:function(info){
    console.log(info)
    $("tbody").html(template("tmp",info))
    
    }
  })
})