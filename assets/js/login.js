$(function () {
    // 去注册账号
    $('#gotoRegi').click(function () {
        // 显示注册界面
        $('.regiBox').show()
        // 隐藏登录界面
        $('.loginBox').hide()
    })

    // 去登录
    $('#gotoLogin').click(function () {
        // 隐藏注册界面
        $('.loginBox').show()
        $('.regiBox').hide()
        // 显示登录界面
    })

    // ============================== 表单自定义校验规则 ================================

    let form = layui.form
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repass: function (value, item) {
            let pwd = $('.regiBox [name=password]').val()
            if (value !== pwd) {
                return '请输入正确密码'
            }
        }
    });
})

$('.regiBox form').on('submit', function (e) {
    // 阻止默认跳转
    e.preventDefault()

    // 收集表单数据
    let data = $(this).serialize()

    axios.post('http://api-breakingnews-web.itheima.net/api/reguser', data).then((res) => {
        // 实现弹框 layer.mag('只想弱弱提示')
        if (res.data.status !== 0) {
            // 注册失败
            return layer.msg(res.data.message)
        }

        // 注册成功
        layer.msg('注册成功,请登录')

        // 展示登录界面 ==> 把登录的按钮的click触发
        $('#gotoLogin').click()
    })
})

// ============================= 登录 ======================
$('.loginBox form').on('submit', function (e) {
    // 阻止默认跳转
    e.preventDefault()

    // 收集表单数据
    let data = $(this).serialize()

    axios.post('http://api-breakingnews-web.itheima.net/api/login', data).then((res) => {
        // 实现弹框 layer.mag('只想弱弱提示')
        if (res.data.status !== 0) {
            // 登录失败
            return layer.msg(res.data.message)
        }
        // 需要吧服务器相应回来的token信息 (随机码) 随身携带,方便后期使用本体存储来存储token
        localStorage.setItem('token', res.data.token)
        
        layer.msg('登陆成功', function () {
            // 关闭页面后 跳转index.html页面
            console.log(location.href = '/home/index.html');
        })
    })
})