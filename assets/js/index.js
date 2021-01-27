function getUserInfo() {
    axios.get('/my/userinfo', {
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // }
    }).then(res => {
        console.log(res);


        if (res.data.status !== 0) {
            return layer.msg('获取用户信息失败')
        }
        
        avatarAndName(res.data)
    })
}
getUserInfo()

// 处理邮箱和昵称
function avatarAndName(res) {
    // 处理名字(优先级:优先展示nickname)
    let name = res.data.nickname || res.data.username

    // 修改文字
    $('#welcome').text('欢迎' + name)

    // 处理头像(2选1, 根据user_picde结果来做区分)
    if (res.data.user_pic) {
        // 如果有自己的头像,展示只记得,隐藏文字头像
        $('.layui-nav-img').attr('src', res.data.user_pic).show()
        $('.text_avatar').hide()
    } else {
        // 没有自己的头像,隐藏,展示文字头像
        $('.layui-nav-img').hide()
        // 文字头像的文字是名字的第一个字符的大写
        let first = name[0].toUpperCase()
        $('.text_avatar').text(first).show()
    }
}

// 退出
$('#logoutBtn').click(function () {
    layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
        //do something
        
        // 退出
        // 思路1: 点击退出,删除本地存储的token信息
        localStorage.removeItem('token')
        // 思路2: 页面跳转至登录login页面
        location.href = '/home/login.html'
        layer.close(index);
      });
})