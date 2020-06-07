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
				<span class="tooltip-container table-regular-tooltip-container">Details</span></span>`);
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
				<span class="tooltip-container doc-regular-tooltip-container">Details</span></span>`);			
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

	$(document).on("mouseover", '[data-test-subj*="tableDocViewRow"]', function(e){
	    let docViewerButtons = $(this).find(".kbnDocViewer__buttons");
	    let fieldElement = $(this).find(".field-element").length;
	    let detailButton = $(this).find(".docviewer-details-button").length;

	    if(detailButton === 0 && fieldElement !== 0){
			docViewerButtons.append(`<span class="euiToolTipAnchor docviewer-details-button"><button class="euiButtonIcon euiButtonIcon--primary kbnDocViewer__actionButton details doc-details-button" type="button" aria-label="Filter for value" data-test-subj="addInclusiveFilterButton"><span class="tooltip-container doc-expand-tooltip-container">Details</span><svg class="svg-icon" width="16" height="16" viewBox="0 0 20 20">
							<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
						</svg></button></span>`);			
		}
	})

	$(document).on("click", "span.docviewer-details-button", function(e){
	    let parentWrapper = $(this).parent("td.kbnDocViewer__buttons")
	    let siblingElement = parentWrapper.siblings("td");
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