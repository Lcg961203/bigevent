$(function () {
    // 发送ajax请求获取用户信息
    let form = layui.form
    function getUserInfo() {
        axios.get('/my/userinfo').then(res => {
            console.log(res.data.data)

            // 给表单赋值
            console.log(form.val('form', res.data.data));
        })
    }
    getUserInfo()

    // 添加自定义校验
    form.verify({
        // 对用户昵称做个成都限制
        nickname: function (value) {
            // 如果长度大于6
            if (value.length > 6) {
                // 那么就返回并提示用户
                return '昵称长度需要在1-6个字符';
            }
        }
    })

    // 实现修改功能

    $('#form').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()

        let data = $(this).serialize()

        // 发送ajax请求获取响应回来的数据
        axios.post('/my/userinfo', data).then((res) => {
            console.log(res)

            // 如果服务器响应回来的数据不等于0 那就失败
            if (res.data.status !== 0) {
                // 返回,提示用户修改信息失败
                return layer.msg('修改用户信息失败')
            }

            // 反之等于0,成功,提示用户信息修改成功
            layer.msg('修改用户信息成功')

            // window.parent ==> 获取的是父页面index页面的window对象
            // 并更新用户信息
            window.parent.getUserInfo()
        })
    })

    // 重置功能
    $('#resetBtn').click(function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 再次发送ajax请求,获取到用户的信息,重新填充到表单中
        getUserInfo()
    })
})