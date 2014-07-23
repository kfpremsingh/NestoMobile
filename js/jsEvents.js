$(function () {
    var all_pages = '#tabArea,#home,#promotions,#gallery';

    $(document).off('pageshow', all_pages).on('pageshow', all_pages, function myCallback() {
        var _thisid = this.id; //this is the loading page id can be used to load scripts or write js/functions conditionally
        $.getScript('js/ajaxCall.js');
		$.getScript('js/login.js');
		$.getScript('js/updateUser.js');
       
    });

    $('body').off('click', '#checkbox').on('click', '#checkbox', function () {
        if ($('#checkbox').attr("value") == "block") {
            $(".hiddenFields").toggle();
        }
    }).off('click', '#subBut').on('click', '#subBut', function () {
        $('.visibleRow').css("display", "block");
    });
});