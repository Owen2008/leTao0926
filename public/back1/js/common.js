// NProgress.start();
// 进度条功能实现
$(document).ajaxStart(function(){
  NProgress.start()
})
$(document).ajaxStop(function(){
  NProgress.done();
})
$(function(){
  // 点击退出显示模态框
  $(".glyphicon-log-out").click(function(){
  $("#myModal").modal("show");
  })
  $(".logOut").click(function(){
    $.ajax({
      url:"/employee/employeeLogout",
      dataType:"json",
      type:"get",
      success:function(info){
      if(info.success){
        location.href="login.html"
      }
      }
    })
  })

// 左侧// 侧边栏隐藏
  $(".glyphicon-align-justify").click(function(){
    console.log(1)
    $(".left_aside").toggleClass("sideHiden")
    $(".topbar").toggleClass("sideHiden")
    $(".container-fluid").toggleClass("sideHiden")
  })
});
// 二级导航显示
$(function(){
  $(".category").click(function(){
    $(".category .updown").stop().slideToggle();
   
  })
  
})