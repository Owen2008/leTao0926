$(function(){
  $(".sure-btn").click(function(){
    var password=$(".password").val();
    var username=$(".username").val();
    // console.log(password)
   
    if(username.trim()===""){
      mui.toast("用户名不能为空");
      return;
    }
    if(password.trim()===""){
      mui.toast("密码不能为空");
      return;
    }
    $.ajax({
      url:"/user/login",
      type:"post",
      dataType:"json",
      data:{
        username:username,
        password:password
      },
      success:function(info){
      if(info.error===403){
        mui.toast("用户名或密码错误");
      return;
      }
      password=$(".password").val("");
      username=$(".username").val("");
      location.href="index.html"
    }
    })
  })
})
