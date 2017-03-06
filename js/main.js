/**
 * Created by liliwa on 16/12/21.
 */
$(function () {
    //当文档加载完执行
    //获取屏幕的宽高,看有没有大于或小于一定的值

    function resize() {
        //获取屏幕宽度
        var windowWidth = $(window).width();
//        console.log(windowWidth)
        //判断屏幕属于大还是小
        var isSmallScreen = windowWidth < 768;
        // 根据大小为界面上的每一张轮播图设置背景
//        $('#main_ad>.carousel-inner>.item')获取到的是一个dom数组
        $("#main_ad >.carousel-inner>.item").each(function (i,item) {
//            console.log(i)
            var $item =  $(item);//因为拿到的是dom对象 需要转化
            // $item.css('backgroundImage',$item.data(isSmallScreen?'image-xs':'image-lg'))
            var imgSrc = $item.data(isSmallScreen?'image-xs':'image-lg');
            //设置背景图片
            // 因为我们需要小图时 图片等比例缩放
            $item.css('backgroundImage','url("'+imgSrc+'")');
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'">')
            }
        })
    //    $element.data()  是一个函数,专门用于取元素上的自定义属性(data-abc)
    //    函数的参数就是我们要取的属性名称(abc)
    }
    //在注册时间之后想让这个函数直接执行  trigger
    $(window).on('resize', resize).trigger('resize');

    //初始化tooltip插件
    $('[data-toggle="tooltip"]').tooltip();

    //控制标签页的容器宽度
     var $ulContainer = $(".nav-tabs");
    //获取所有子元素宽度的和
    var width = 30;//因为原本的ul上面有pading-left
    //遍历子元素
    // console.log($ulContainer.children())
    $ulContainer.children().each(function (index,element) {
        // console.log(index);序号
        // console.log(element.clientWidth);宽度
        // console.log($(element).width());
        width += element.clientWidth;
    });
    //此时width的宽度为所有li的和

    //然后我去给ul加样式
    //判断当前的ul宽度是否大于屏幕,如果超出就显示横向滚动条
    if(width > $(window).width()){
        $ulContainer
            .css('width',width)
            .parent('overflow-x','scroll');
    }
    //给a注册事件

    var $newTitle = $('.news-title');
    $('#news .nav-pills a').on('click',function () {
        //获取当前点击元素
        var $this = $(this);
        //获取title
        var title = $this.data('title');
        //讲title设置到相应的位置
        $newTitle.text(title)
    })

    //2中思路   1.根据手指在轮播图上的滑动方向    2.根据获得的方向选择上一张 下一张

    //比大小
    //获取界面上的轮播图容器
    var $carousels = $(".carousel");
    var startX ,endX ;
    var offset = 50;

    //注册滑动事件
    $carousels.on('touchstart',function (e) {
        //手指触摸开始时,记录下x的坐标
        startX = e.originalEvent.touches[0].clientX;
        console.log(startX )
    });
    //结束一瞬间
    $carousels.on('touchmove',function (e) {
        endX = e.originalEvent.touches[0].clientX;
        console.log(endX)
    });
    $carousels.on('touchend',function (e) {
        console.log(endX);
        //控制精度,获取每次手指运动 的距离  当距离大于一定值时   我们认为是有方向变化的
        console.log(startX>endX?'左':'右️');
        var distance = Math.abs(startX-endX);
        if(distance>offset){
            //有方向变化
            //这个地方用当前对象最合适,因为还有一个轮播图的时候,我们就知道这样的俄好处了
        $(this).carousel(startX>endX?'next':'prev')
        }
        
    })





});
//jquery是当我们有错误时 ,他就不执行了

