// 每次调用 $.get() 或者 $.post() 或者 $.ajax()的时候
// 会先调用 $.ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 ajax 请求之前，统一拼接请求的跟路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;

    // 统一为有权限的接口，设置请求头 headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 全局统一挂载 complete 回调函数
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
})