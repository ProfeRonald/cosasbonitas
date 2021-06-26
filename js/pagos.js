$(document).on('change', '#banco', function (event) { 	 
			
			$('#transacion').val('');

});


	$(document).on('change click keyup', '#transacion', function (event) { 	 
			
			var trans2 = $('#transacion2').val();
			var trans = $(this).val();	
			var trans = trans.substring(0, 100);	
			var trans = trans.replace(/[^\d]/g,"");
			
			if(trans != '' && trans != trans2){
	$('#transaciont').css("visibility", "hidden");
			}
		
		
			$(this).val(trans);
});
	
	$(document).on('blur', '#transacion', function (event) { 	 
		
		var trans = $(this).val();
		var trans2 = $('#transacion2').val();
		
			if(trans != '' && trans != trans2){
		$('#transaciont').css("visibility", "hidden");
		PagoPedido();
			}
		
	});
	
	function PagoPedido(){
			
			var trans = $('#transacion').val();
			var trans2 = $('#transacion2').val();
			var banco = $('#banco').val();
			var nf = $('#nf').val();
				
				if(trans != '' && trans != trans2){
			
			$.ajax({
  			method: "POST",
  			url: "index.php?pagopedido=1",
				data: { nf: nf,
								trans: trans,
								banco: banco
        },
			})

  		.done(function(p){
  		$('#transaciont').css("visibility", "visible");
  			if(p == '1'){
  		$('#transaciont').attr('class', 'mt-3 text-info');
  		$('#transaciont').html('&iexcl;N&uacute;mero de transaci&oacute;n actualizado! <img src="https://tienda.cosasbonitas.art/imagenes/fa_check.png" class="ml-2">');
  		$('#transacion2').val($('#transacion').val());	
		    for(var h = 0; h < 2; h++){
			$("#transaciont").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
     		}
				}else{
			$('#transaciont').text('No se pudo conectar la factura con el n\u00FAmero de la transaci\u00F3n');
  		$('#transaciont').attr('class', 'mt-3 text-danger');
				}
			
  		})
  	
  		}
	
	}
	
function PagoPayPal(idpp){
	$('#transacionpp').css("visibility", "hidden");
	var nf = $('#nf').val();
	
	$.ajax({
  			method: "POST",
  			url: "index.php?pagopedido=1",
				data: { nf: nf,
								trans: idpp,
								banco: 'pp'
        },
			})

  		.done(function(p){
  			
  			if(p == 1){
  		$('#paypal-button-container').html('<div style="position:fixed;top:0;left:0;z-index:5;width:100%;height:100%;opacity: 0.9" class="text-center p-5 bg-info"><div style="position:relative;z-index:10;font-size: 3rem" class="text-white m-5">Espere...</div></div>');		
			window.location = 'index.php?pagar=' + $('#nf').val();
				}else{
			$('#transacionpp').css("visibility", "visible");
				}
  		})
  		
}