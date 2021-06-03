$(function () {
  getUserInfo();

  var layer = layui.layer;

  $("#btnLogout").on("click", function () {
    layer.confirm('您确认退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 删除localStrong的token
        localStorage.removeItem('token');
        // 重新跳转到登陆页面
        location.href = '/login.html'
        layer.close(index);
      });
  })
});

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    // headers 配置请求头
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      rendAvatar(res.data);
    },

    // 无论成功还是失败，最终会调用的 complete 回调函数
    complete: function (res) {
        // 在回调函数中可以通过 res.responseJSON 拿到服务器响应的数据
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清空 token
            localStorage.removeItem("token");
            // 强制跳转到登录页面
            location.href = '/login.html';
        }
    }
  });
}

// 渲染用户头像
function rendAvatar(user) {
  // 获取用户的名称
  var name = user.nickname || user.username;
  // 设置欢迎文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  // 按需渲染用户头像
  console.log(user);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $("text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    var firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName).show();
  }
}
