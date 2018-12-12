$(document).ready(function(){

    $("#name").focus(function(){
        $(".name").css("borderColor","#41b883");
    });
    $("#name").blur(function(){
        $(".name").css("borderColor","#f2f2f2");
    });
    $("#password").focus(function(){
        $(".password").css("borderColor","#41b883");
    });
    $("#password").blur(function(){
        $(".password").css("borderColor","#f2f2f2");
    });
});