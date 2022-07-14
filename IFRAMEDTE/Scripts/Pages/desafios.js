$("#dtSelect").datepicker({
    minViewMode: 'months',
    language: "pt-BR",
    autoclose: true,
    format: 'mm/yyyy',
    inline: true
}).on('changeDate', function (ev) {
    //if (ev.date.valueOf() < startDate.valueOf()) {
    //}
    CheckOption();
});


var jcarousel = $('.jcarousel');

jcarousel
    .on('jcarousel:reload jcarousel:create', function () {
        var carousel = $(this),
            width = carousel.innerWidth();

        //if (width >= 500) {
        width = width / 3;
        //} else if (width >= 350) {
        //    width = width / 2;
        //}

        carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
    })
    .jcarousel({
        wrap: 'circular'
    });

$('.jcarousel-control-prev')
    .jcarouselControl({
        target: '-=1'
    });

$('.jcarousel-control-next')
    .jcarouselControl({
        target: '+=1'
    });

$('.jcarousel-pagination')
    .on('jcarouselpagination:active', 'a', function () {
        $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function () {
        $(this).removeClass('active');
    })
    .on('click', function (e) {
        e.preventDefault();
    })
    .jcarouselPagination({
        perPage: 1,
        item: function (page) {
            return '<a href="#' + page + '">' + page + '</a>';
        }
    });

$(".box.box-solid.box-item").click(function () {
    OpenDate($(this).data("valor"));
});


function dtUpdate(date) {
    strDate = date.substring(4, 6) + "/" + date.substring(0, 4);
    $('#dtSelect').val(strDate);
    $('#dtSelect').datepicker('update');
    //$('#dtSelect').datepicker('update', strDate);
}

//function getDate() {
//    var $val = $('#dtSelect').val() + "";
//    return $val.substring(3, 7) + $val.substring(0, 2);
//    //console.log($('#dtSelect').val());

//}

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
        url: "/Iframe/AcceptDesafioAsync", //"/DesafioMarcasDigital/jDesafiosDel/" + id,
        async: true,
        cache: false,
        data: fData,
        beforeSend: function () {
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
        }
    });

}


var d = $("#TempD").val();

if ($("#STARTDATE").val() != "") {
    var init = $("#STARTDATE").val() + "";
    OpenDate(init);
}

function CheckOption(d) {

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
    //getDate(); // $("#optForm").val();
    var oAcc = $("#ddlAccount").val();
    console.log("CheckOpt Date: ", oVal);
    $("[data-ref=opt][data-rel='" + oVal + "'][data-account='" + oAcc + "']").removeClass("hidden");

    if ($("[data-ref=opt][data-rel='" + oVal + "'][data-account='" + oAcc + "']").length == 0)
        $("#zeroreference").removeClass("hidden");
}

function OpenDate(d) {
    $("[data-rel=timeline]").removeClass("active").parent().removeClass("active");
    $("[data-rel=timeline][data-valor=" + d + "]").addClass("active").parent().addClass("active");

    $("#MesReferencia").val(d);

    setTimeout(function () {
        CheckVisible();
    }, 1);

    CheckOption();
}

function CheckVisible() {
    if ($('.jcarousel li.active').length > 0) {
        var carousel = $('.jcarousel'),
            item = carousel.find('li.active');

        var pos = carousel.jcarousel('visible').index(item);

        if (pos < 0) {

            $('.jcarousel').jcarousel('scroll', '+=1');

            setTimeout(function () {
                CheckVisible();
            }, 1);
        }
        //else {

        //    if (pos + "" == "1") {
        //        $('.jcarousel').jcarousel('scroll', '-=1');
        //        $('.jcarousel').jcarousel('reload');
        //        console.log("pos = 2", pos);
        //    }

        //    //if (carousel.jcarousel('visible').index(item) == 0) {
        //    //    
        //    //}
        //    //else if (carousel.jcarousel('visible').index(item) == 2) {
        //    //    $('.jcarousel').jcarousel('scroll', '-=1');
        //    //}
        //}

    }
}


$("#optForm").change(CheckOption);
$("#ddlAccount").change(CheckOption);

CheckOption(d);

