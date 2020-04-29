import $ from 'jquery';

function getDimensions(e){
	return {
		mouseX: e.pageX,
		mouseY: e.pageY - $(window).scrollTop(),
		dropdownWidth: $(".modal-content").width(),
		dropdownHeight: $(".modal-content").innerHeight(),
		windowWidth: $(window).width(),
		windowHeight: $(window).height()
	}	
}

$(document).ready(function(e){ 

	$(window).scroll(function(){
		$(".modal").css( "display", "none" );
	})

	//Regular table
	$(document).on("mouseover", "div.kbnTableCellFilter__hover", function(e){
		let detailSpan = $(this).find(".details-span").length;
		let fieldElement = $(this).find(".field-element").length;
		let tableCellFilter = $(this).find("span.kbnTableCellFilter");

		if(detailSpan === 0 && fieldElement !== 0){
			tableCellFilter.append(`<span class="fa fa-plus-square-o details details-span">
				<span class="tooltip-container">Details</span></span>`);
		}
	});

	$(document).on("click", "span.details-span", function(e){
	    let parentWrapper = $(this).parent("span.kbnTableCellFilter")
	    let siblingElement = parentWrapper.siblings("span");
	    let childModalElement = siblingElement.find(".modal")

		//Make URL's visible
	    childModalElement.css( "display", "block" );

		let {
			mouseX, 
			mouseY, 
			dropdownWidth, 
			dropdownHeight,
			windowWidth,
			windowHeight
			} = getDimensions(e)

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

	//Document Table 
	$(document).on("mouseover", "td.kbnDocTableCell__dataField", function(e){
		let detailButton = $(this).find(".doc-details-button").length;
		let fieldElement = $(this).find(".field-element").length;
		let tableCellFilter = $(this).find("span.kbnDocTableCell__filter");

		if(detailButton === 0 && fieldElement !== 0){
			tableCellFilter.append(`<span class="fa fa-plus-square-o details doc-details-button kbnDocTableRowFilterButton">
				<span class="tooltip-container">Details</span></span>`);			
		}
	});

	$(document).on("click", "span.doc-details-button", function(e){
	    let parentWrapper = $(this).parent("span.kbnDocTableCell__filter")
	    let siblingElement = parentWrapper.siblings("div");
	    let childModalElement = siblingElement.find(".modal")

		//Make URL's visible
	    childModalElement.css( "display", "block" );

		let {
			mouseX, 
			mouseY, 
			dropdownWidth, 
			dropdownHeight,
			windowWidth,
			windowHeight
			} = getDimensions(e)

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
