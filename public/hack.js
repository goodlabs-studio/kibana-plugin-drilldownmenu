import $ from 'jquery';

$(document).ready(function(e){ 

	$(window).scroll(function(){
		$(".modal").css( "display", "none" );
	})
  
	$(document).on("click", "div.tooltip-container", function(e){
		//Make URL's visible
	    $(this).siblings("div.modal").css( "display", "block" );

	   	let mouseX = e.pageX;
	    let mouseY = e.pageY - $(window).scrollTop();
	    let dropdownWidth = $(".modal-content").width();
	    let dropdownHeight = $(".modal-content").innerHeight();
	    let windowWidth = $(window).width();
	    let windowHeight = $(window).height();

		let widthOverflow = ((mouseX + dropdownWidth) > windowWidth);
		let heightOverflow = ((mouseY + dropdownHeight) > windowHeight);

	    //Reposition our dropdown depending on how far right/down it is positioned
	    if(widthOverflow){
	      mouseX = windowWidth - dropdownWidth;
	    } 
	    if(heightOverflow){
	      mouseY = windowHeight - dropdownHeight;
	    } 
	    
	    $(".modal").css({
	      'padding-top': `${mouseY}px`, 
	      'padding-left': `${mouseX}px`
	    });
  
	});
    
	$(document).on("click", "div.modal", function(e){
      	if (e.target !== this)      
        	return;

    	$(".modal").css( "display", "none" );
	});  
  
});
