$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 点击上传,模拟点击了文件域
    $('#chooseBtn').click(function () {
        $('#file').click()
    })

    // 文件域change事件
    $('#file').on('change', function () {
        // 获取到用户选择的图片(文件域的DOM对象的files属性)
        console.log(this);
        let file = this.file[0]
        console.log(file);

        // 如果files不存在,用户没有选择图片,后续操作不执行,返回
        if (!file) {
            return
        }


        // 把用户选择的图片设置到裁切区域(预览区域和裁切大小都要发生改变)
        // 根据选择的文件,常见一个对象的url地址
        let newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 点击确定,实现上传头像
    $('#sureBtn').click(function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png')

        axios.post('/my/update/avatar', 'avatar=' + encodeURIComponent(dataURL)).then((res) => {
            // 提示
            if (res.data.status !== 0) {
                // 失败
                return layer.msg('更换头像失败')
            }

            // 反之,成功
            layer.msg('更换头像成功')
            // 页面中的头像发生变化
            window.parent.getUserInfo()
        })
    })

})