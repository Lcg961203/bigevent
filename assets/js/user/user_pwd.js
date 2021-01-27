$(function () {
    let form = layui.form

    // 添加表单的自定义校验规则

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {

            let oldPwd = $('[name=oldPwd]').val()
            if (oldPwd === value) {
                return '密码不能相同';
            }

        },


        // 确认新密码的校验
        reNewPwd: function (value) {
            // 获取新密码,判断密码内容是否和确认新密码一致

            let newPwd = $('[name=newPwd]').val()

            if (newPwd !== value) {
                return '两次输入的密码不一致'
            }
        }

    });

    // 实现修改密码

    $('#form').on('submit',function (e) {
        e.preventDefault()

        let data = $(this).serialize()

        axios.post('/my/updatepwd', data).then((res) => {
            if (res.data.status !== 0) {
                // 修改密码失败
                return layer.msg('更新密码失败')
            }

            // 成功
            layer.msg('更新密码成功')

            // 表单重置功能
            $('#form')[0].reset()
        })
    })
})