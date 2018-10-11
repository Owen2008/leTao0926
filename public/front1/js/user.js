$(function(){
  render()
function render(){
 $.ajax({
   url:"/user/queryUserMessage",
   type:"get",
   dataType:"json",
   success:function(info){
     console.log(info)
    if(info.error===400){
      location.href="login.html";
      return;
    }
    $(".user-message").html( template ( "user-tpl", info))
   }
 })
}






  $(".logout-btn").click(function(){
    $.ajax({
      url:"/user/logout",
      type:"get",
      dataType:"json",
      success:function(info){
       
      if(info.success){
        location.href="login.html"
      }
      }
    })
  })
})