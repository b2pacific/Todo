$("button").attr("disabled", true);
const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

$("#InputEmail1").on("input", function () {
    var email = $("#InputEmail1").val();
    var flag = 0;

    $("#InputEmail1").popover({
        content: "Invalid Email",
        trigger: "manual"
    });

    if (!emailReg.test(email)) {
        $("#InputEmail1").popover("show");
        flag = 0;
    } else {
        $("#InputEmail1").popover("hide");
        flag = 1;
    }

    if (flag) {
        $("button").attr("disabled", false);
    } else {
        $("button").attr("disabled", true);
    }
})