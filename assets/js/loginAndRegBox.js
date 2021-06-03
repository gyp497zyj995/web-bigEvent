$(function () {
    // 点击 去注册 a标签
    $("#link-login").on('click', function () {
        $("#Reg-box").show();
        $("#login-box").hide();
    });

    // 点击 去登录 a标签
    $("#link-r eg").on('click', function () {
        $("#Reg-box").hide();
        $("#login-box").show();
    })

    // 从 layui 中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个叫做 pwd 校验规则
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repass: function (value) {
            // 形参value：表单的值
            // 拿到密码框的 value 与 确认密码框的 value 进行比较
            var rePass = $("#Reg-box [name=repassword]").val();
            console.log(rePass, value);
            if (rePass !== value) {
                return "两次密码输入不一致";
            } 
        }
    })
    // 注册事件
    $("#Reg-box").on("submit", function (e) {
        // 阻止事件的默认行为
        e.preventDefault();

        // 发起 post 请求
        var data = { 
            username: $("#Reg-box [name=reusername]").val(), 
            password: $("#Reg-box [name=repassword]").val()
        };
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            } 
            layer.msg('注册成功，请登录');
            $("#link-reg").click();
        })
    })

    // 登录事件
    $("#form-login").on("submit", function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();

        // 发起 post 请求
        $.ajax({
            "url": "/api/login",
            "method": "post",
            "data": $(this).serialize(),
            "success": function (res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败");
                }
                layer.msg("登录成功");

                // 将登录成功后 token 值，保存到localStorage
                localStorage.setItem('token', res.token);

                // 跳转页面
                location.href = '/index.html';
            }
        })

    })
})