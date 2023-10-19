$(function () {
    document.onreadystatechange = function () {
        if (document.readyState = "complete") {
            $(".loading-box").fadeOut();
            $("body").addClass("slideIn")
        }
    };
    if (localStorage.getItem("count") == null) {
        localStorage.setItem("count", 27);
    }
    $("#change").text(localStorage.getItem("count"))
    var $maskRule = $("#mask-rule"),//规则遮罩层
        $maskawards = $("#mask-awards"),//红包遮罩层 
        $mask = $("#mask"),//红包遮罩层 
        $card = $("#card"),
        $close = $("#close"),
        $maskDown = $("#mask-down"),
        $canvasMask = $("#canvas-mask"),//canvas遮罩层
        $btn = $("#btn"),//刮奖按钮
        $change = localStorage.getItem("count"),//剩余次数
        data = {count: $change};//次数

    //点击弹出规则信息
    $(".awards-rule").click(function () {
        $maskRule.show();
        //禁止浏览器滚动
        $("html,body").addClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });

    //点击提交信息
    $(".get-info").click(function () {
        $maskRule.show();
        //禁止浏览器滚动
        $("html,body").addClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });

    //点击弹出中奖信息
    $(".awards-name").click(function () {
        $maskawards.show();
        //禁止浏览器滚动
        $("html,body").addClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });

    //关闭窗口
    $(".close-icon").click(function () {
        $(this).parent().parent().hide();
        $("html,body").removeClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });
    $(".kown-btn,.updata-btn").click(function () {
        $(this).parents(".box-rule").parent().hide();
        $("html,body").removeClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    });

    /*中奖信息提示*/
    function win() {
        //遮罩层显示
        $mask.show();
        $winning.addClass("reback");
        setTimeout(function () {
            $card.addClass("pull");
        }, 500);
        //关闭弹出层
        $("#close,.win,.btn").click(function () {
            $mask.hide();
            $winning.removeClass("reback");
            $card.removeClass("pull");
        });
    }

    //点击开始刮奖按钮
    $btn.click(function () {
        //随机生成奖项
        var a = ["未中奖，好运+1； 幸福快乐奖", "iphone16提货券", "5200提现券", "10g金条预定券", "YSL小金条口红", "生日蛋糕~", "美味大餐~", "美好祝愿奖，开心+1~"]
        //中奖概率
        var num = Math.floor(Math.floor(Math.random() * 999));
        let item = 0;
        if (num >= 0 && num < 150) {
            item = 1 // 0-99
        } else if (num >= 150 && num < 300) {
            item = 2 // 100-299
        } else if (num >= 300 && num < 450) {
            item = 3 // 100-299
        } else if (num >= 450 && num < 600) {
            item = 4 // 100-299
        } else if (num >= 600 && num < 750) {
            item = 5 // 100-299
        } else if (num >= 750 && num < 850) {
            item = 6 // 100-299
        } else if (num >= 850 && num < 950) {
            item = 7 // 100-299
        } else {
            item = 0 // 100-299
        }
        //中奖率
         //保存Item值
        if (data.count > 0) {
            data.count--;//减少抽奖次数
            localStorage.setItem("count", data.count);
            $("#change").text(data.count); //替换剩余抽奖次数
            $(".awbox").show(); //抽奖区域显示
            if (item > 0) {
                var items = localStorage.getItem("items");
                if (items == null) {
                    var arr = [];
                    arr.push(item);
                    localStorage.setItem("items", JSON.stringify(arr));
                    $("#atext,#mask_img_bg p").html(a[item]); //替换所得奖项

                } else {
                    var arrAfter = JSON.parse(localStorage.getItem("items"));
                    if (arrAfter.indexOf(item) >= 0) {
                        item = 0;
                    } else {
                        arrAfter.push(item);
                        localStorage.setItem("items", JSON.stringify(arrAfter));
                        $("#atext,#mask_img_bg p").html(a[item]); //替换所得奖项

                    }

                }


            }
            $(".awbox").attr('data-a', item);
            if (item == 0) {
                $("#mask_img_bg").html("<p><span  class='web-font'>未中奖，好运+1</span><br/> <a class='agine'><img src='./assets/images/flash.png'>再刮一次</a></p>");
                $(".agine").on("click", function () {
                    $('#redux').eraser('reset'); //涂抹板重置  
                    $canvasMask.show();
                    $(".awbox").hide();
                    $('#redux').show();
                });
            }
            ;
            $('#redux').eraser({
                size: 20,   //设置橡皮擦大小
                completeRatio: .6, //设置擦除面积比例
                completeFunction: showResetButton,  //大于擦除面积比例触发函数
            });
            $canvasMask.hide();
        } else {
            alert("没有次数了"); //抽奖次数用完
            $("#btn img").attr('src', "assets/images/cant.png");  //替换抽奖次数图片
        }
        ;

    });

    function showResetButton() {
        const item = $(".awbox").attr('data-a'); //读取Item 值
        //console.log(item + '结束后')
        if (item > 0) {
            $(".gole-awards").fadeIn(300);
            //禁止浏览器滚动
            $("html,body").addClass("overHiden");
            window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
        } else {
            $('#redux').hide();
        }
    }


    /*中奖后点击灰色区域隐藏*/
    $(".gole-awards .mask").click(function () {
        $("html,body").removeClass("overHiden");
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
        $('#redux').eraser('reset'); //涂抹板重置
        $(".gole-awards").fadeOut(300);
        $(".awbox").hide();
        $canvasMask.show();
    })

    /*判断是否为微信浏览器*/
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
    } else {
        // // 这里警告框会阻塞当前页面继续加载
        // alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
        // // 以下代码是用javascript强行关闭当前页面
        // var opened = window.open('about:blank', '_self');
        // opened.opener = null;
        // opened.close();
    }
});
