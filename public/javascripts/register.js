$("button").attr("disabled", true);
const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

$("#InputPassword2, #InputEmail1").on("input", function () {
    var pass = $("#InputPassword1").val();
    var passcon = $("#InputPassword2").val();
    var email = $("#InputEmail1").val();
    var p=0, e = 0;

    $("#InputEmail1").popover({
        content: "Invalid Email",
        trigger: "manual"
    });
    $("#InputPassword1").popover({
        content: "Minimum length 5",
        trigger: "manual"
    });

    if (!emailReg.test(email)) {
        $("#InputEmail1").popover("show");
        p = 0;
    } else {
        $("#InputEmail1").popover("hide");
        p = 1;
    }

    if (passcon !== "") {
        if (passcon !== pass) {
            $("#InputPassword2").css({
                "border-width": "3px",
                "border-color": "red"
            });
            e = 0;
        } else {
            if (passcon.length < 5) {
                $("#InputPassword1").css({
                    "border-width": "3px",
                    "border-color": "red"
                });
                $("#InputPassword1").popover("show");
                e = 0;
            } else {
                $("#InputPassword1").popover("hide");
                $("#InputPassword1").css({
                    "border-width": "1px",
                    "border-color": "#ced4da"
                });
                $("#InputPassword2").css({
                    "border-width": "1px",
                    "border-color": "#ced4da"
                });
                e = 1;
            }
        }
    }

    if (p && e) {
        $("button").attr("disabled", false);
    } else {
        $("button").attr("disabled", true);
    }

})