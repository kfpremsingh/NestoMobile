$(function(){
	

 $('input[type="checkbox"]').click(function(){
            if($(this).attr("value")=="block"){
                $(".hiddenFields").toggle();
            }
            
        });

})	 