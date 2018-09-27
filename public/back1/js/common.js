// NProgress.start();
// 进度条功能实现
$(document).ajaxStart(function(){
  NProgress.start()
})
$(document).ajaxStop(function(){
  NProgress.done();
})