$(document).ready(function(){

    $("#username").focus(function(){
        $(".name").css("borderColor","#41b883");
    });
    $("#username").blur(function(){
        $(".name").css("borderColor","#f2f2f2");
    });
    $("#password").focus(function(){
        $(".password").css("borderColor","#41b883");
    });
    $("#password").blur(function(){
        $(".password").css("borderColor","#f2f2f2");
    });
   $("#btn").click(
       function(){
        lianjie()
       }
   )
   function lianjie(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
    $.ajax({
        type:'get',
        url: `http://itcmsg.bnuz.edu.cn:8090/test/login?log=${username}&pwd=${password}`,
        dataType:'text',
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log("连接错误")
        },
        success:function(data){
            console.log(data);
        }
    })
}
});