$(".box.box-solid.box-item").click(function () {
    OpenDate($(this).data("valor"));
});

function dtUpdate(date) {
    strDate = date.substring(4, 6) + "/" + date.substring(0, 4);
    $('#dtSelect').val(strDate);
    $('#dtSelect').datepicker('update');
    //$('#dtSelect').datepicker('update', strDate);
}


function AderirDesafio(desafioid) {
    //alert(desafioid);
    var theQuery = $("#QUERY").val();
    //console.log("the query", theQuery);
    var fData = {
        QUERY: theQuery,
        desafio: desafioid
    }

    $.ajax({
        type: "GET",
        url: "/Iframe/AcceptDesafio", //"/DesafioMarcasDigital/jDesafiosDel/" + id,
        async: false,
        cache: false,
        data: fData,
        beforeSend: function () {
            $("#btnAderirDesafio").addClass("disabled").text("Aguarde...");
            //hideLoader();
            // $("#FormContent").html("<i class='fa fa-spin fa-spinner'></i> Carregando...");
        },
        success: function (response) {
            //ShowNotify("Desafio excluído", "", "success");
            //LoadGrid();
            //$("#adesaook").removeClass("hidden");
            window.location.href = "/Iframe/Request1?QUERY=" + theQuery + "&d=" + desafioid;

        },
        complete: function () {
            //console.log("End");
            //setTimeout(function () {
            //    UpdateStage();
            //}, 3000);
            $("#btnAderirDesafio").addClass("disabled").text("Aguarde...");
           
        }
    });

}


var d = $("#TempD").val();

if ($("#STARTDATE").val() != "") {
    var init = $("#STARTDATE").val() + "";
    OpenDate(init);
}

function CheckOption(d) {

    //console.log("Entrou check option", d);
    console.log("Entrou check option", $("#ddlAccount").val());

    $("#zeroreference").addClass("hidden");
    $("[data-ref=opt]").addClass("hidden");

    if ($("#dtSelect").val() == "") {
        //if ($("[data-ref=opt][data-rel='" + oVal + "'][data-account='" + oAcc + "']").length == 0)
        //    $("#waitingDates").removeClass("hidden");

        var $startDate = $("#STARTDATE").val();
        dtUpdate($startDate);

    }

    if (d > 0) {

        $("#adesaook").removeClass("hidden");

        var $sel = $("[data-id=" + d + "]");
        $("#ddlAccount").val($sel.data("account"));

    }
    else {
        $("#adesaook").addClass("hidden");
    }

    var oVal = $("#MesReferencia").val();
    if (oVal == "") {
        oVal = $("div.box.box-item.active").data("valor");
    }
    //getDate(); // $("#optForm").val();
    var oAcc = $("#ddlAccount").val();
    //console.log("CheckOpt Date: ", oVal);
    //$("[data-ref=opt][data-rel='" + oVal + "'][data-account='" + oAcc + "']").removeClass("hidden");

    //if ($("[data-ref=opt][data-rel='" + oVal + "'][data-account='" + oAcc + "']").length == 0)
    //    $("#zeroreference").removeClass("hidden");

    var toFind = "[data-ref=opt][data-rel='" + oVal + "'][data-sap='" + oAcc + "']";
    console.log("toFind", toFind);

    $(toFind).removeClass("hidden");

    if ($(toFind).length == 0)
        $("#zeroreference").removeClass("hidden");


}


function OpenDate(d) {

    //console.log("OpenDate", d);
    $("#ddlAccount").val("");

    $('#carousel-meses-contrato .carousel-inner .item').removeClass("active");
    if ($('#carousel-meses-contrato .carousel-inner .item[data-item=' + d + ']').length == 0) {
        $('#carousel-meses-contrato .carousel-inner .item[data-item').last().addClass("active");
    }
    else {
        $('#carousel-meses-contrato .carousel-inner .item[data-item=' + d + ']').addClass("active");
    }

    //console.log("Pré - Checked", d);
    d = $('#carousel-meses-contrato .carousel-inner .item.active').data("item");
    //console.log("date-in-use", d);

    $("[data-rel=timeline]").removeClass("active").parent().removeClass("active");
    $("[data-rel=timeline][data-valor=" + d + "]").addClass("active").parent().addClass("active");

    $("div[data-ref='opt'][data-rel]").addClass("hidden");
    $("div[data-ref='opt'][data-rel=" + d + "]").removeClass("hidden");

    $total = 0;
    $.each($("li.item-calendario"), function (pos, content) {
        $total = pos + 1;
    });
    //console.log("total", $total);

    var $myPos = $('li.item-calendario.active').data("contador");

    var $fim = $myPos + 2;
    if ($fim > $total) {
        $fim = $total;
    }
    $ini = $fim - 4;
    if ($ini < 1) {
        $ini = 1;
        $fim = 5;
    }

    $ini = $ini * 1;
    $fim = $fim * 1;

    $.each($("li.item-calendario"), function (pos, content) {
        $show = true;
        $checkPos = $(this).data("contador");
        $checkPos * 1;
        if ($checkPos < $ini || $checkPos > $fim) {
            $show = false;
        }

        $(this).addClass("hidden-xs");
        if ($show) {
            $(this).removeClass("hidden-xs");
        }
    });


    //console.log("ini", $ini);
    //console.log("fim", $fim);

    //console.log("Check", $('#carousel-meses-contrato .carousel-inner .item.active').length);

}

$('#carousel-meses-contrato').on('slid.bs.carousel', function () {
    $val = $("#carousel-meses-contrato > .carousel-inner > .active").data("item");
    //console.log("Item Marcado: ", $val);
    OpenDate($val);
})


//function OpenDate(d) {
//    $("[data-rel=timeline]").removeClass("active").parent().removeClass("active");
//    $("[data-rel=timeline][data-valor=" + d + "]").addClass("active").parent().addClass("active");

//    $("#MesReferencia").val(d);

//    setTimeout(function () {
//        CheckVisible();
//    }, 1);

//    CheckOption();
//}

//function CheckVisible() {
//    if ($('.jcarousel li.active').length > 0) {
//        var carousel = $('.jcarousel');
//        var item = carousel.find('li.active');

//        var pos = carousel.jcarousel('visible').index(item);

//        if (pos < 0) {

//            $('.jcarousel').jcarousel('scroll', '+=1');

//            setTimeout(function () {
//                CheckVisible();
//            }, 1);
//        }
//        //else {

//        //    if (pos + "" == "1") {
//        //        $('.jcarousel').jcarousel('scroll', '-=1');
//        //        $('.jcarousel').jcarousel('reload');
//        //        console.log("pos = 2", pos);
//        //    }

//        //    //if (carousel.jcarousel('visible').index(item) == 0) {
//        //    //    
//        //    //}
//        //    //else if (carousel.jcarousel('visible').index(item) == 2) {
//        //    //    $('.jcarousel').jcarousel('scroll', '-=1');
//        //    //}
//        //}

//    }
//}


$("#optForm").change(CheckOption);
$("#ddlAccount").change(CheckOption);

//CheckOption(d);

function SaveBonificacao(mes, desafioid) {
    $sel = "input[name=rdBonificacao" + mes + "]:checked";
    $selBon = $($sel).val();
    $selPrd = $("#slProduto" + mes).val();

    console.log("Salvar Bonificação: mes " + mes + " bonificação: " + $selBon + " produto: " + $selPrd);


    var theQuery = $("#QUERY").val();
    //console.log("the query", theQuery);
    var fData = {
        QUERY: theQuery,
        desafio: desafioid,
        tipoBonificacao: $selBon,
        produto: $selPrd
    }

    $.ajax({
        type: "POST",
        url: "/Iframe/AcceptBonificacao", //"/DesafioMarcasDigital/jDesafiosDel/" + id,
        async: false,
        cache: false,
        data: fData,
        beforeSend: function () {
            //$("#btnAderirDesafio").addClass("disabled").text("Aguarde...");
            //hideLoader();
            // $("#FormContent").html("<i class='fa fa-spin fa-spinner'></i> Carregando...");
        },
        success: function (response) {
            //ShowNotify("Bonificação selecionada!!!", "", "success");.
            //LoadGrid();
            //$("#adesaook").removeClass("hidden");
            //window.location.href = "/Iframe/Request1?QUERY=" + theQuery + "&d=" + desafioid;

            $spSelBox = '[data-ref="opt"][data-id=' + mes + '] div.box-change-bonificacao';
            console.log("desafioid", $('[data-ref="opt"][data-id=' + mes + '] div.box-change-bonificacao'));
            //$('[data-ref="opt"][data-id=' + mes + '] div.box-change-bonificacao').addClass("bg-green").html("<strong>Nova bonificação selecionada!!!</strong>");
            $('[data-ref="opt"][data-id=' + mes + '] div.box-change-bonificacao h4').html("<strong>Nova bonificação selecionada!!!</strong>");
            $('[data-ref="opt"][data-id=' + mes + '] div.box-change-bonificacao .bonificacao-btn-save').addClass("hidden");
            $('[data-ref="opt"][data-id=' + mes + '] div.box-change-bonificacao input').prop("disabled", true);
            $('[data-ref="opt"][data-id=' + mes + '] div.box-change-bonificacao select').prop("disabled", true);

        },
        complete: function () {
            //console.log("End");
            //setTimeout(function () {
            //    UpdateStage();
            //}, 3000);
            //$("#btnAderirDesafio").addClass("disabled").text("Aguarde...");

        }
    });
}
