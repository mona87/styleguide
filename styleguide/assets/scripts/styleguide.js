console.log('Hello introduction module. This is an example of how to use Javascript in a cool.');


	var origColors = [];
	var newColors = [];

$('button.update-color').click(function(){
	//save colors from input
	$('.colors').each(function(key, value){
	// console.log($(value).val());

	//check for valid hex
	var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test($(value).val());

	if(isOk){
		origColors[key] = $(value).val();
	}

});
	$('.color').each(function(key, value){

		
		//save orginal colors to obj 
		var rgb = $(value).css('backgroundColor').match(/\d+/g);
		var r   = parseInt(rgb[0], 10);
		var g   = parseInt(rgb[1], 10);
		var b   = parseInt(rgb[2], 10);
		var hex = '#'+ r.toString(16) + g.toString(16) + b.toString(16);
		newColors.push({className: value, hexValue: hex});
	
	});

	newColors.map(function(i, index){


		if(!!origColors[index]){
			$(i.className).css('backgroundColor', origColors[index]);
		}
			
			
			
	})
	
});


