$(function () {
    //头部下拉
    var flag = 1;
    $("#head-mid").on('click', function () {
        // $("#xiugai").slideToggle(200)
        // $("#gai-week").slideToggle(200)
        // $("xiugai").css()
        var xiugai = document.getElementById("xiugai")
        var headMid = document.getElementById("head-mid")
        var gaiWeek = document.getElementById("gai-week")
        var kechenBody = document.getElementById("kechen-body")
        xiugai.style.overflow = "hidden"
        gaiWeek.style.overflow = "hidden"
        var xiugaiheight = (flag == 1) ? 3.5 : 0;
        var kcBodyTop = (flag == 1) ? 6.2 : 2.7
        var xiugaiheight2 = 0;
        var kcBodyTop2 = 2.7
        var speed = 0.1
        var speed2 = 0.1
        var cleartime = setInterval(function () {
            if (flag == 1) {
                kcBodyTop -= xiugaiheight - Math.floor(xiugaiheight - speed)
                xiugaiheight = Math.floor(xiugaiheight - speed)
                gaiWeek.style.height = xiugaiheight + "em"
                xiugai.style.height = xiugaiheight + "em"
                kechenBody.style.marginTop = kcBodyTop + "em"
                speed += 0.15
                if (xiugaiheight == 0) {
                    clearInterval(cleartime);
                    console.log("结束")
                    flag = 2
                }
            }
            else {
                kcBodyTop = kcBodyTop + speed2
                xiugaiheight = xiugaiheight + speed2
                gaiWeek.style.height = xiugaiheight + "em"
                xiugai.style.height = xiugaiheight + "em"
                kechenBody.style.marginTop = kcBodyTop + "em"
                speed2 += 0.25
                if (xiugaiheight >= 3.5) {
                    xiugai.style.height = 3.5 + "em"
                    gaiWeek.style.height = 3.5 + "em"
                    kechenBody.style.marginTop = 6.2 + "em"
                    xiugai.style.overflow = "scroll"
                    clearInterval(cleartime);
                    console.log("结束")
                    flag = 1
                }
            }
        }, 120)
    })


    //课程块的构造函数
    function KCDiv(row, col, color, KCname, sum) {
        this.x = (col - 1) * 13.5 + 7;
        this.y = (row - 1) * 2.85 + 2.5 + 3.2 + 2.5 + 0.3;
        this.color = color;
        this.KCname = KCname;
        this.hieght = sum * 4;
        this.element = $("<div class='kc-sub'></div")
        this.longClick = 0
    }
    KCDiv.prototype.init = function () {
        this.element
            .text(this.KCname)
            .css({
                "height": `${this.hieght}em`,
                "top": `${this.y}em`,
                "left": `${this.x}%`,
                "width": '12%',
                "backgroundColor": "blue"
            })
            .appendTo("#KC-sum")
        this.press()
        // var div = document.createElement("div")
        // div.addClass = "kc-sub"
        // div.style.css = {

        // }
    }


    //长按删除
    KCDiv.prototype.press = function (e) {

        //长按效果实现就是touchstart的延迟
        longClick = 0;//设置初始为0
        this.element.on({
            "touchstart": function (e) {
                $("<div class='kc-sub animated bounceOut'></div").appendTo(this.element)
                timeOutEvent = setTimeout(function () {
                    var ele = e.target;
                    $(ele).css("z-index", 100)
                    //此显示遮罩层及删除按钮,触发事件，点击按钮，删除
                    $("<div class='del-btn animated fadeInUp'></div")
                        .text("删除")
                        .appendTo(e.target)
                        .on("touchstart", function () {
                            ele.remove();
                            $(".mask").remove()
                        })

                    //点击遮罩事件
                    $("<div class='mask animated fadeIn '></div")
                        .width("100%")
                        .height(document.body.clientHeight)
                        .appendTo("body")
                        .on("touchstart", function (e) {
                            e.target.remove()
                            $(".del-btn").remove()
                            $(".kc-sub").css("z-index", 0)
                        })

                    longClick = 1;//假如长按，则设置为1

                }, 500);
            },
            "touchmove": function () {
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
                e.preventDefault();
            },
            "touchend": function (e) {
                clearTimeout(timeOutEvent);
                if (timeOutEvent != 0) {//点击
                    //此处为点击事件----在此处添加跳转详情页
                }
                return false;
            }
        })
    }
    var kckuai = new KCDiv(10, 4, "red", "数学", 2);
    kckuai.init()
    var kckuai = new KCDiv(2, 6, "red", "数学", 2);
    kckuai.init()

    //添加课程
    $(".kebiao-table").on("touchstart", "tbody tr td+td", function (e) {
        //获取点击块的位置
        var col = parseInt(e.target.id.substr(0, 1))
        var row = parseInt(e.target.id.length == 3 ? e.target.id.substr(2, 1) : e.target.id.substr(2, 3))
        var left = (col - 1) * 13.2 + 8.5
        var top = (row - 1) * 2.85 + 8.2
        $("#add-sum").html(`<div class="add-class" style='top:${top}em;left:${left}%'>+</div>`)
        // $("#add-sum").on("touchmove",".add-class",function(e){
        //     endX = e.touches[0].clientX;
        //     console.log(endX)
        //     e.preventDefault();
        // })
        var statY = 0
        var flagStart = 0
        var emNum = 0
        document.getElementsByClassName("add-class")[0].addEventListener('touchmove', function (e) {
            var pageY = e.touches[0].pageY
            var ele = $(e.srcElement)
            if (flagStart == 0) {
                statY = pageY
                flagStart = 1
                emNum = ele.height() / 3
            }
            if (ele.height() >= 2.5 * emNum) {
                if (Math.abs(statY - pageY) >= 60) {
                    if (statY - pageY < 0) {
                        var height = ele.height() + 2.8 * emNum
                        ele.height(height / emNum + "em")
                        ele.css("line-height", height / emNum + "em")
                        statY = pageY
                    }
                    if (statY - pageY > 0) {
                        var height = ele.height() - 2.8 * emNum
                        ele.height(height / emNum + "em")
                        ele.css("line-height", height / emNum + "em")
                        statY = pageY
                    }
                }
                e.preventDefault();
            }
        });
    })


})