/*!
    * Start Bootstrap - Freelancer v6.0.4 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
    */

    (function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });
 
  $('body').tooltip({ selector: '[rel="tooltip"]' });
  
 $(document).on('mouseenter mouseover', '.portfolio-item', function (event) { 	 
	
	$( "a" ).next( "h3" ).children(".cat-portfolio-item").css('visibility', 'hidden');


	});
	
	$(document).on('mouseleave mouseout', '.portfolio-item', function (event) { 	 
	
	$( "a" ).next( "h3" ).children(".cat-portfolio-item").css('visibility', 'visible');


	});
	
	$('.menu-cuenta').click(function() {
      
      $('#cuenta').toggle('slow');
      
    });
	
/*
	$(document).on('mouseenter mouseover', '.carro_compra', function (event) { 	 

	var cod = $(this).attr('cod');
	var cant = $(this).attr('cant');
	var c = $(this).attr('c');
	
	$(this).html('<i class="esconder' + cod + ' agregar_articulo fa fa-cart-plus pr-1 pb-4" cod="' + cod + '" cant="' + cant + '" c="' + c + '"></i>');						
		
	});
	
	$(document).on('mouseleave mouseout', '.carro_compra', function (event) {

	var cod = $(this).attr('cod');
	var cant = $(this).attr('cant');
	var c = $(this).attr('c');
	
	//$(this).html('<i class="esconder' + cod + ' agregar_articulo fa fa-shopping-cart pr-1 pb-4" cod="' + cod + '" cant="' + cant + '" c="' + c + '"></i>');
		
	});
	*/
	
	$(document).on('click', '.boped', function (event) { 	 
		
		$('#cerrarimg').attr('id', 'cerrardesc');
		var idped = $(this).attr('idped');
		var id_ped = $(this).attr('id_ped');
		
		$('#numped').attr('idped', idped);
		$('#numped').attr('id_ped', id_ped);
		$('#elpedLongTitle').text('Elinmando pedido #' + idped);
		$('#text-ped').html('&iquest;Seguro desea eliminar el pedido <strong class="text-warning">#' + idped + '</strong>?');
		
	});
	
	
	$(document).on('click', '#numped', function (event) {
		
  	var idped = $(this).attr('idped');
  	var id_ped = $(this).attr('id_ped');
	
		$.ajax({
  			method: "POST",
  			url: "index.php?elped=1",
				data: {
					fac: idped,
					id_ped: id_ped
        },
			})

  		.done(function(f){
  			$('#text-ped').html(f);
  			
  		setTimeout(function(){
  		$('#'+idped).attr('class', 'd-none');
  		$('#cerrarped').trigger('click');
  			
  			},1500);	

  		})

	});
		
	$(document).on('click', '#aumentar', function (event) { 	 
	
	event.preventDefault();
	
	var sl = Number($(this).attr('s'));
	var mt = Number($(this).attr('m'));
	
	var sl = sl + 0.1;
	var mt = mt + 4;
	
	$(this).css({'cursor': 'pointer','filter':''});
	
	$('#disminuir').css({'cursor': 'pointer','filter':''});
	
		if(sl > 1.3){
			
	$(this).css({'cursor': 'default','filter':'grayscale(100%)'});
		
		}else{
			
	if(!isNaN(sl)){
	
	var psl = sl * 100;
	
	var psl = Number.parseFloat(psl).toFixed(0);
	
		if($('#lcat').val() == '1'){
	var psl = psl * 2;
		}
			
	$('#porcentaje').text('' + psl + '%');
	
	$('#disminuir').attr('s', sl);
	$('#disminuir').attr('m', mt);

	$('#articuloszoom').css({'margin-top': '' + mt + '%', 'transform': 'scale(' + sl + ')'});
	
	$(this).attr('s', sl);
	$(this).attr('m', mt);
		
		}
		
		}
	
	});		
	
	
	$(document).on('click', '#disminuir', function (event) { 	 
	
	event.preventDefault();
	
	var sl = Number($(this).attr('s'));
	var mt = Number($(this).attr('m'));
	
	var sl = sl - 0.1;
	var mt = mt - 4;
	
	$(this).css({'cursor': 'pointer','filter':''});
	$('#aumentar').css({'cursor': 'pointer','filter':''});
	
		if(sl < 0.3){
			
	$(this).css({'cursor': 'default','filter':'grayscale(100%)'});
		
		}else{
	
		if(!isNaN(sl)){
	
	var psl = sl * 100;
	
	var psl = Number.parseFloat(psl).toFixed(0);
	
		if($('#lcat').val() == '1'){
	var psl = psl * 2;
		}
			
	$('#porcentaje').text('' + psl + '%');
	
	$('#aumentar').attr('s', sl);
	$('#aumentar').attr('m', mt);
		
	$('#articuloszoom').css({'margin-top': '' + mt + '%', 'transform': 'scale(' + sl + ')'});
	
	$(this).attr('s', sl);
	$(this).attr('m', mt);
	
	}
	
		}
	
	
	
	});
	
	$(document).on('click', '.vidcarrete', function (event) { 	 
	
	var cod = $('#foto_articulo_modal').attr('cod');
	$('#detalles_articulo1 #modal_imagea' +  cod).hide();
	$('#ops_mod').show();
	$('#EstablecerFoto').hide();
	$('#EliminarFoto').attr('id','EliminarVideo');
	$('#EliminarVideo').text('Eliminar Video');
	$('.videlim').remove();
	$(this).attr('id', 'quitarlivid');
	var vid = $(this).attr('vid');
	$('#detalles_articulo1 #modal_imagea' +  cod).before('<div class="videlim" vid="' + vid + '"><video class="rounded bg-primary" oncontextmenu="return false;" width="270" max-height="270" controls><source src="imagenes/fotos/mas/' + vid + '" type="video/mp4"></video></div>');
	});	
	
		$(document).on('click', '.imgcarrete', function (event) { 	 
	
	var img1 = $(this).attr('src');
	$('#detalles_articulo1 .pic-1').attr('src', img1);
	$('#detalles_articulo1 .pic-2').attr('src', img1);
	$('.imgcarrete').removeAttr('id');
	$(this).attr('id', 'quitarliimg');
	var cod = $('#foto_articulo_modal').attr('cod');
	$('#detalles_articulo1 #modal_imagea' +  cod).show();
	$('.videlim').remove();
	var fa = $('#modal_modal_datos_' + cod).attr('foto_articulo');
	$('#EstablecerFoto').attr('img', '');
	var img = img1.split('mas/')[1];
		if(img == '' || img == undefined  || img == 'undefined' || img == fa){
	$('#ops_mod').hide();
		}else{
	$('#EstablecerFoto').show();
	$('#EliminarVideo').text('Eliminar Foto');
	$('#EliminarVideo').attr('id','EliminarFoto');		
	$('#EstablecerFoto').attr('img', img);
	$('#ops_mod').show();
		}

	});	
		
		$(document).on('click', '.modal_ventana', function (event) { 	 
		
		var idm = $(this).attr('idm');
		var cod = $('#'+idm).attr('cod');
		$(this).attr('id', 'mod_' + cod);
		var nombre_articulo = $('#'+idm).attr('nombre_articulo');
		var foto_articulo = $('#'+idm).attr('foto_articulo');
		var descripcion_articulo = $('#'+idm).attr('descripcion_articulo');
		var codigo_html = $('.codigo_' + cod).html();
		var codigo_class = $('.codigo_' + cod).attr('class');
		var codigo_class = codigo_class.split(' ');
		var codigo_class = codigo_class[2] + ' ' + codigo_class[3] + ' ' + codigo_class[4];
		$('#portfolioModalLabel').text(nombre_articulo);
		$('#nombre-modal').text(nombre_articulo);
		$('#desc-modal').html(descripcion_articulo);
		$('#foto_articulo_modal').attr('cod', cod);
			
			$.ajax({
  			method: "POST",	
  			url: "index.php?carrete=1",
  			dataType: 'json',
				data: {cod:cod},
			})

  		.done(function(cm){
  		var detalles = '<div style="display:none" nombre_articulo="' + nombre_articulo + '" foto_articulo="' + foto_articulo + '" descripcion_articulo="' + descripcion_articulo + '" cod="' + cod + '" id="modal_datos_' + cod + '"></div><div class="' + codigo_class + '">' + codigo_html + '</div>';
			$('#detalles_articulo1').html(detalles);
					$('#detalles_articulo1 div').each(function () {  
					var idmodal = $(this).attr('id');
						if(idmodal != undefined){
					$(this).attr('id', 'modal_' + idmodal);
						}
						});
						$('#detalles_articulo1 a').each(function () {  
					var idmodal = $(this).attr('id');
						if(idmodal != undefined){
					$(this).attr('id', 'modal_' + idmodal);
						}
						});
						
						$('#detalles_articulo1 input').each(function () {  
					var idmodal = $(this).attr('id');
						if(idmodal != undefined){
					$(this).attr('id', 'modal_' + idmodal);
						}
						});
						
						$('#detalles_articulo1 span').each(function () {  
					var idmodal = $(this).attr('id');
						if(idmodal != undefined){
					$(this).attr('id', 'modal_' + idmodal);
						}
						});
				
				var carrete = cm['cm'];
				var tcarrete = cm['tc'];		
				
				if(carrete == '' || tcarrete < 1){ 
			$('.carreteminis').hide();
				}else{
			$('.carreteminis').show();
			var carrete = '<li><a href="#a"><img class="imgcarrete principal" src="imagenes/fotos/' + foto_articulo + '" /></a></li>' + carrete;
			$('#ulcarrete').html(carrete);
			$('#ops_mod').html('<div class="col-7"><span id="EstablecerFoto" img="" cod="' + cod + '" data-toggle="modal" data-target="#elpedCenter" class="btn btn-sm btn-primary">Establecer por defecto</span></div><div class="col-5"><span id="EliminarFoto" data-toggle="modal" data-target="#elpedCenter" class="btn btn-sm btn-danger">Eliminar foto</span></div>');
				}

			$("#detalles_articulo1 .title .modal_ventana[idm*='modal_datos_" + cod + "']").hide();
			$('#detalles_articulo1 #modal_mod_' + cod).removeAttr('id');
		
  		})
		
		
		/*
		
		
		//
		$('#portfolioModalLabel').text(nombre_articulo);
		$('#portfolioModalFoto').attr('src', 'imagenes/fotos/' + foto_articulo);
		$('#portfolioModalDescripcion').html(descripcion_articulo);*/

		});
		
		

	$(document).on('click', '.agregar_articulo', function (event) {
		
		event.preventDefault();
		
		var cod = $(this).attr('cod');
		var cant = $(this).attr('cant');

		var acant = Number($('#cantidad_articulo' + cod).val());
		
		if(acant > 0 && cant > 0){
		
		$.ajax({
  			method: "POST",	
  			url: "index.php?agregar=1",
  			dataType: 'json',
				data: {
					codigo_articulo: cod,
					agregar_cantidad: acant,
					cantidad_articulos: cant
        },
			})
  		.done(function(ped){
  		//console.log("Post error: " + ped);
  		var ca = Number($('#cantidad_articulo' + cod).val());
  			if(ca > ped['r']){
  		$('#cantidad_articulo' + cod).val(ped['r']);
  		$('#modal_cantidad_articulo' + cod).val(ped['r']);
  			}  		
  		
  		$('#cantidad_articulo' + cod).attr('max', ped['r']);
  		$('#modal_cantidad_articulo' + cod).attr('max', ped['r']);
  		
  		if(ped['r'] == 0){
		$('#imagea' + cod).attr('style', 'filter: grayscale(100%);');
		$('#modal_imagea' + cod).attr('style', 'filter: grayscale(100%);');
		$('#carrusel_imagea' + cod).attr('style', 'filter: grayscale(100%);');
		$('#agotado'+ cod).attr('class', 'fa-2x d-block product-agotado-label');
		$('#modal_agotado'+ cod).attr('class', 'fa-2x d-block product-agotado-label');
		$('.esconder'+ cod).hide('slow');
		$(this).hide('slow');
		$('#descuento'+ cod).hide('slow');
		$('#modal_descuento'+ cod).hide('slow');
		$('#a'+cod).html('Tienes <strong>' + ped['n'] + '</strong> en tu carrito');
		$('#modal_a'+cod).html('Tienes <strong>' + ped['n'] + '</strong> en tu carrito');
		$('#carrusel_a'+cod).html('Tienes <strong>' + ped['n'] + '</strong><br /> en tu carrito');
		$('#titlea'+cod).hide('slow');
		$('#modal_titlea'+cod).hide('slow');
		$('#carrusel_titlea'+cod).hide('slow');
			}else{
		$('#a'+cod).attr('class', 'badge badge-info mr-2');
		$('#modal_a'+cod).attr('class', 'badge badge-info mr-2');
		$('#carrusel_a'+cod).attr('class', 'badge badge-info mr-2');
		$('#a'+cod).html('Has agregado <strong>' + ped['a'] + '</strong> art&iacute;culos,<br />ya tienes <strong>' + ped['n'] + '</strong> en tu carrito');
		$('#modal_a'+cod).html('Has agregado <strong>' + ped['a'] + '</strong> art&iacute;culos,<br />ya tienes <strong>' + ped['n'] + '</strong> en tu carrito');
		$('#carrusel_a'+cod).html('<span style="font-size: 0.7em">Has agregado <strong>' + ped['a'] + '</strong><br />art&iacute;culos, ya tienes <strong>' + ped['n'] + '</strong><br />en tu carrito</span>');
		$('#titlea'+cod).attr('title', '');
		$('#modal_titlea'+cod).attr('title', '');
		$('#carrusel_titlea'+cod).attr('title', '');
			}
  		$('#carrito').show('slow');
			$('#carrito_cant').text(ped['c']);
  		})
  		.fail(function (jqXHR, textStatus, error) {
      //console.log("Post error: " + error);
    	$('#a'+cod).html('No se pudo agregar este art&iacute;culo,<br />intente de nuevo m&aacute;s tarde');
    	$('#modal_a'+cod).html('No se pudo agregar este art&iacute;culo,<br />intente de nuevo m&aacute;s tarde');
    	$('#carrusel_a'+cod).html('No se pudo agregar este art&iacute;culo,<br />intente de nuevo m&aacute;s tarde');
			$('#a'+cod).attr('class', 'badge badge-danger mr-2');	
			$('#modal_a'+cod).attr('class', 'badge badge-danger mr-2');	
			$('#carrusel_a'+cod).attr('class', 'badge badge-danger mr-2');	
  		})
  		
  	}
		
	});

	$(document).on('change', '#verpedido', function (event) {
		
		event.preventDefault();
		
		$('#pedidos').attr('noc', $(this).attr('noc'));
		$('#pedidos').attr('cod', $("#verpedido option:selected").text());
		$('#pedidos').attr('ped', $(this).val());
		$('#pedidos').trigger('click');
	
	});

$(document).on('click', '#gps', function (event) {
		
		event.preventDefault();
		
		var df = $('#direccion_factura').val();
		
				if(df == ''){

		 	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    	}
    
    function showPosition(position) {  	
  	var ubicacion = position.coords.latitude + '%2C' + position.coords.longitude;
  	$('#ubicacion').text(ubicacion);
		}

    	setTimeout(function(){
			
  	var ubicacion = $('#ubicacion').text();	
    	
    	if(ubicacion != undefined && ubicacion != '%2C'){
	
		$.ajax({
  			method: "POST",	
  			url: "index.php?ubic=1",
				data: {ubicacion:ubicacion,df:df},
			})

  		.done(function(direccion){
  			//console.log(direccion);
  			if(direccion == 1){
  		$('.alert').alert();	
  			}else{
  			if(direccion != ''){
  		$('#direccion_factura').val(direccion);
  			}
  		}
  		
  		})
  		
  		}
  		
  		},1200);
		}
});

$(document).on('click', '#pedidos', function (event) {
	
	$('#sesion_gf').hide();
	
});
	
	$(document).on('click', '#carrito, .cant_facq, .cant_facp, #pedidos', function (event) {
		
		event.preventDefault();
		
		$('#carritoModalLabel').text('PEDIDO DEL CARRITO DE COMPRAS');
		
		var noc = $(this).attr('noc');
		var cod = $(this).attr('cod');
		var cant = $(this).attr('cant');
		var ped = $(this).attr('ped');

		$.ajax({
  			method: "POST",	
  			url: "index.php?factura=1",
  			dataType: 'json',
				data: {noc:noc, cod:cod, cant:cant, ped:ped},
			})
  		.done(function(fac){
  		$('#factura_carrito').html(fac['fc']);	
  			if(Number(fac['la']) == 1){
  			}else{
  		setTimeout(function(){BotonC();},1000);
	  			if(Number(fac['ta']) == 0){
	  		$('#carrito').hide('slow');	
	  			}else{
	  		$('#carrito_cant').html(fac['ta']);
	  			}
  		}
  		
  		})
  		
  		.fail(function (jqXHR, textStatus, error) {
      //console.log("Post error: " + error);
  		})
  		
	});
	
	 $(window).on('load',function(){
        //$('#carritoModal').modal('show');
        //$('#carrito').trigger('click');
    $('#articulos_filter label').prepend('<div class="d-none d-md-block d-lg-block d-xl-block" id="calcal" style="position;relative;margin-bottom:-40px;;margin-left:-50px;width:50px;cursor:pointer;font-size:25pt;"><i rel="tooltip" title="Calculadora" class="fa fa-calculator" aria-hidden="true" style="cursor:pointer;"></i></div>');
   
    });
    
/*
$( window ).bind("resize", function(){
       var ancho = $(window).width();
       		if(ancho > 545){
        	var fz = '100%';
      		var scale = 1;
      			}
     	 	$("#modalxl").css({'-webkit-transform':'scale('+ scale +')','transform':'scale('+ scale +')','font-size': fz});
     		
});



$( window ).bind("resize", function(){
       var ancho = $(window).width();
       	if(ancho > 545){
       var scale = (ancho / 990);
       var fz = scale * 85;
       var fz = Number.parseFloat(fz).toFixed(0) + '%';
       var scale = Number.parseFloat(scale).toFixed(1);
       //console.log(fz+' - '+scale);
     	 $("#modalxl").css({'-webkit-transform':'scale('+ scale +')','transform':'scale('+ scale +')','font-size': fz});
     		}else{
     	 //$('#carrito').trigger("click");	
     		}
			
			});

*/
    

		$(document).on('click', '#categoria_todas', function (event) { 	 

		var mostrar = $(this).text();
		
		$('#lcat').val('0');

		var cat = $('#categoria_cat').attr('cat');
		var categoria = $('#categoria_cat').attr('categoria');
		
		if(mostrar == 'Mostrar todas'){
		
		$(this).text('Mostrar '+ categoria);
	
		$('#categoria_cat').hide('slow');
		$('#codigo_ref').show('slow');
		$('.categoria_categorias').show('slow');
		
		}else{
	
	$(this).text('Mostrar todas');
	$('#categoria_cat').show('slow');
	$('#codigo_ref').hide('slow');
	$('.categoria_categorias').hide('slow');
	$('.categorias_' + cat).show('slow');
	
		}
		
		});


$(document).on('click blur change keyup', '#codigo_ref input', function (event) { 	 
			
			var cr = $(this).val();	
			var cr = cr.substring(0, 20);
			
			var cr = cr.replace(/[^\d]/g,"");
		
			$(this).val(cr);
		
			if(cr == '' || cr.length < 6 || cr.length > 20){
		$('.categoria_categorias').show("slow");
			}else{
		$('.categoria_categorias').hide("slow");
		$('.codigo_' + cr).show("slow");		
			}
		
	
		});
		
		
		$(document).on('click blur change keyup', '#telefono_factura', function (event) { 	 
			
			var tf = $(this).val();

			var tf = tf.substring(0, 10);
			
			var tf = tf.replace(/[^\d]/g,"");
			
			$(this).val(tf);

		});
		
		
		$(document).on('click blur', '#telefono_factura', function (event) { 	 
			
			var tf = $(this).val();
			
			var area = Number(tf.substring(0, 3));
			
				if(area != 809 && area != 829 && area != 849){

			$(this).val('');
				
				}

		});

		$(document).on('click', '.cant_fac', function (event) { 	 

		$(this).find('i').toggle("slow");
			
		});		

function IsEmail(email) {
  var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}

function IsTel(tel) {
	tel = tel.replace('-','');
	tel = tel.replace('-','');
  var regex = /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/;
  return regex.test(tel);
}

function BotonC(){
	var n_f = $('#nombre_factura').val();
	var d_f = $('#direccion_factura').val();
	var t_f = $('#telefono_factura').val();
	var c_f = $('#correo_factura').val();
	var cc = Number($('#cantidad_canasta').text());
	var gm = 0;
	
	
	if(n_f != '' && d_f != ''  && t_f != '' && c_f != '' && cc > 0){

	if(IsEmail(c_f)){
	
		if(IsTel(t_f)){		
	$("#botonc").html('<h5 class="llenardatos mt-3 d-print-none btn-lg btn-primary rounded p-2 my-1 fa fa-reload" style="cursor:pointer;color:black;"> Cambiar la direcci&oacute;n</h5><h5 class="mt-3 d-print-none btn-lg btn-info rounded p-2 my-1 fa fa-floppy-o" style="cursor:pointer" id="guardar"> Finalizar pedido</h5>');
	$("#botoncm").html('<h5 class="llenardatos mt-3 d-print-none btn-lg btn-primary rounded p-2 my-1 fa fa-reload" style="cursor:pointer;color:black;"> Cambiar la direcci&oacute;n</h5><h5 class="mt-3 d-print-none btn-lg btn-info rounded p-2 my-1 fa fa-floppy-o" style="cursor:pointer" id="guardarm"> Finalizar pedido</h5>');
	var dfac = '<div class="text-info text-uppercase font-weight-bold">' + n_f + '</div><div>' + d_f + '</div><div><strong>Tel.:</strong> ' + t_f + '</div><div><strong>Correo:</strong> ' + c_f + '</div>';
	$('#datos_factura').html(dfac);
	$('#datos_facturam').html(dfac);
	$('#cerrardatos').trigger("click");
		}else{
	$("#botonc").html('<h5 class="llenardatos badge d-print-none badge-warning rounded p-2 my-1 fa fa-floppy-o" style="cursor:pointer" id="guardar"> Debe introducir un n&uacute;mero de tel&eacute;fono v&aacute;lido.</h5>');
	$("#botoncm").html('<h5 class="llenardatos badge d-print-none badge-warning rounded p-2 my-1 fa fa-floppy-o" style="cursor:pointer" id="guardar"> Debe introducir un n&uacute;mero de tel&eacute;fono v&aacute;lido.</h5>');
		}
	}else{
	$("#botonc").html('<h5 class="llenardatos badge d-print-none badge-warning rounded p-2 my-1 fa fa-floppy-o" style="cursor:pointer" id="guardar"> Inicie sesi&oacute;n en CosasBonitas.Art para validar su correo electr&oacute;nico.</h5>');
	$("#botoncm").html('<h5 class="llenardatos badge d-print-none badge-warning rounded p-2 my-1 fa fa-floppy-o" style="cursor:pointer" id="guardar"> Inicie sesi&oacute;n en CosasBonitas.Art para validar su correo electr&oacute;nico.</h5>');
	}
	
	}else{
  
  	if(cc > 0){
  
	$("#botonc").html('<div style="cursor:pointer;font-size: 1.3rem;white-space: normal" class="llenardatos d-print-none badge badge-warning rounded p-2 my-1 fa fa-ban mx-2"> Debe llenar los datos de env&iacute;o para poder guardar.</div>');
	$("#botoncm").html('<div style="cursor:pointer;font-size: 1.3rem;white-space: normal" class="llenardatos d-print-none badge badge-warning rounded p-2 my-1 fa fa-ban mx-2"> Debe llenar los datos de env&iacute;o para poder guardar.</div>');
	
		}else{
			
	$("#botonc").html('<div class="d-print-none badge badge-warning rounded p-2 my-1 mx-2 fa fa-ban"> Debe agregar al menos un art&iacute;culo para poder guardar.</div>');
	$("#botoncm").html('<div class="d-print-none badge badge-warning rounded p-2 my-1 mx-2 fa fa-ban"> Debe agregar al menos un art&iacute;culo para poder guardar.</div>');
		
		}
	
	} 		

}

$(document).on('click', '.llenardatos', function (event) {
        $('#carritoModal').modal('hide');
        $('#exampleModalLong').modal('show');
        setTimeout(function(){$('#page-top').attr('class', 'modal-open');},1000);
});

$(document).on('click', '#cerrardatos, .cerrardatos', function (event) {
        $('#exampleModalLong').modal('hide');
        $('#carritoModal').modal('show');
        setTimeout(function(){$('#page-top').attr('class', 'modal-open');},1000);
        return false;
});

			$(document).on('click', '#introducir_datos', function (event) {
				
				var n_f = $('#nombre_factura').val();
			 	var d_f = $('#direccion_factura').val();
				var t_f = $('#telefono_factura').val();
				var c_f = $('#correo_factura').val();
				t_f = t_f.replace('-','');
				t_f = t_f.replace('-','');
				
				if(n_f != '' && d_f != '' && t_f != '' && c_f != ''){
				
				if(d_f.length < 9){
			$("#dir_noval").show('slow');	
				}else{		
			$("#dir_noval").hide('slow');			
					if(n_f.length < 5){
				$("#nombre_noval").show('slow');
					}else{
				$("#nombre_noval").hide('slow');	
						if(IsEmail(c_f)){
					$("#correo_noval").hide('slow');
							if(IsTel(t_f)){
						$("#tel_noval").hide('slow');	
						setTimeout(function(){BotonC();},1000);
							}else{
						$("#tel_noval").show('slow');	
							}
						}else{
					$("#correo_noval").show('slow');
						}
					}
				}
						}else{
			$(this).html('<i class="fa fa-ban"></i> Debe completar los datos');
			$(this).attr('class', 'mt-3 btn btn-danger btn-block');			
			
			setTimeout(function(){
				$('#introducir_datos').html('<i class="fa fa-sign-in"></i> Introducir datos');
				$('#introducir_datos').attr('class', 'mt-3 btn btn-success btn-block');
  		},4000);
					}
  		
			});

			$(document).on('click', '#guardar, #guardarm', function (event) {

			  var pedido_html = $('#factura_carrito').html();
			 
			 	var n_f = $('#nombre_factura').val();
			 	var d_f = $('#direccion_factura').val();
				var t_f = $('#telefono_factura').val();

				var url = $('#url').val();
			 			 
			 var nf = $('#nf').text();
	
	  	$.ajax({
  			method: "POST",	
  			url: "index.php?guardar=1",
				data: {
					pedido_html: pedido_html,
					nf: nf,
					n_f: n_f,
					d_f: d_f,
					t_f: t_f
        },
			})
  		.done(function(e){
  			//console.log(e);
  			if(e == 1 || e == 0){
  		$('#fac_aviso').html('');		
  		$("#guardar").attr('class', 'badge d-print-none badge-danger rounded p-2 my-1 fa fa-floppy-o');
  		$("#guardarm").attr('class', 'badge d-print-none badge-danger rounded p-2 my-1 fa fa-floppy-o');
  		$("#guardar").html(' No se pudo guardar, &iexcl; Intente de nuevo!');
  		$("#guardarm").html(' No se pudo guardar, &iexcl; Intente de nuevo!');

  		setTimeout(function(){
			$("#guardar").attr('class', 'btn-info d-print-none rounded p-2 my-1 fa fa-floppy-o');
			$("#guardarm").attr('class', 'btn-info d-print-none rounded p-2 my-1 fa fa-floppy-o');
  		$("#guardar").text(' Guardar');
  		$("#guardarm").text(' Guardar');
  		},4000);
  			
  			}else{
  			
  			if(e == 2 || e == 3){
  		$('#fac_aviso').html('');
  		$("#guardar").attr('class', 'llenardatos badge d-print-none badge-warning rounded p-2 my-1 fa fa-floppy-o');
  		$("#guardarm").attr('class', 'llenardatos badge d-print-none badge-warning rounded p-2 my-1 fa fa-floppy-o');
  			if(e == 3){
  		$("#guardar").html(' Inicie sesi&oacute;n en CosasBonitas.Art para validar su correo electr&oacute;nico.');
			$("#guardarm").html(' Inicie sesi&oacute;n en CosasBonitas.Art para validar su correo electr&oacute;nico.');
  			}else{
  		$("#guardar").html(' Debe llenar los datos de env&iacute;o para poder guardar.');
			$("#guardarm").html(' Debe llenar los datos de env&iacute;o para poder guardar.');
  			}
  		setTimeout(function(){
			$("#guardar").attr('class', 'btn-info d-print-none rounded p-2 my-1 fa fa-floppy-o');
			$("#guardarm").attr('class', 'btn-info d-print-none rounded p-2 my-1 fa fa-floppy-o');
  		$("#guardar").text(' Guardar');
  		$("#guardarm").text(' Guardar');
  		},8000);
  			}else{	
  		$("#guardar").attr('class', 'mt-3 mb-1 d-print-none border border-info font-weight-bold btn-lg btn-success rounded p-2 fa fa-floppy-o');
  		$("#guardarm").attr('class', 'mt-3 mb-1 d-print-none border border-info font-weight-bold btn-lg btn-success rounded p-2 fa fa-floppy-o');  		
  		$("#guardar").html(' &iexcl;Factura guardada!');
  		$("#guardarm").html(' &iexcl;Factura guardada!');
  		$("#guardar").removeAttr('id');
  		$("#guardarm").removeAttr('id');
  		var cod = e.split('_cb_')[0];
  		$("#pedidos").attr('cod', cod);
  		$("#pedidos").attr('ped', e + '.html');
  		var pc = Number($("#pedidos_cant").text()) + 1;
  		$("#pedidos_cant").text(pc);
  		$("#pedidos").show('slow');
  		setTimeout(function(){
			$('#fac_aviso').html('<div style="position:fixed;top:0;left:0;z-index:1995;width:100%;height:100%;opacity: 0.7" class="text-center p-5 bg-info"><div style="position:relative;z-index:2000;margin-top: 25%;font-size: 4rem" class="font-weight-bold text-white m-5">Espere...</div></div>');		
  		},1500);
  		setTimeout(function(){
  		$('#carritoModal').modal('hide');
  		$("#carrito").hide('slow');
  		window.location = 'index.php?pagar=' + cod;
  		},2500);
  		}
  		
  		}
  		})

			});				


		$(document).on('mouseenter click', '.categoria_menu', function (event) { 	 
		
		var cat = $(this).attr('cat');
		var categoria = $(this).attr('categoria');
		
		$('#categoria_cat').attr('cat', cat);
		$('#categoria_cat').attr('categoria', categoria);
		$('#categoria_cat').text(categoria);
		$('#categoria_todas').trigger("click");
		
		});
		
	$('#carrito_cant').text($('#totalu').text());
		
  })(jQuery); // End of use strict
  
  $('.btn-plus, .btn-minus').on('click', function(e) {
  const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
  const input = $(e.target).closest('.input-group').find('input');
  if (input.is('input')) {
    input[0][isNegative ? 'stepDown' : 'stepUp']()
  }
  
});

function closePrint () {
  document.body.removeChild(this.__container__);
}

function setPrint () {
  this.contentWindow.__container__ = this;
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;
  this.contentWindow.focus(); // Required for IE
  this.contentWindow.print();
}

function printPage (sURL) {
  var oHiddFrame = document.createElement("iframe");
  oHiddFrame.onload = setPrint;
  oHiddFrame.style.position = "fixed";
  oHiddFrame.style.right = "0";
  oHiddFrame.style.bottom = "0";
  oHiddFrame.style.width = "0";
  oHiddFrame.style.height = "0";
  oHiddFrame.style.border = "0";
  	if(sURL == 1){
  var nf = $('#nf').text();
	  
	var url = $('#url').val();
	  
	var cabecera = '<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="utf-8" />\n<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n<title>Pedido #' + nf + ' - CosasBonitas.Art</title>\n<meta name="description" content="Tienda de art&iacute;culos decorados y embellecidos inspirados en tu estilo personal" />\n<meta name="author" content="CosasBonitas.Art" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n<link rel="apple-touch-icon" href="' + url + 'imagenes/logos/favicon.png" />\n<link rel="shortcut icon" href="' + url + 'imagenes/logos/favicon.png" />\n<link href="' + url + 'css/styles.css" rel="stylesheet" />\n</head>\n<body>';

	var factura = cabecera + document.getElementById('factura_carrito').innerHTML + '</body>\n</html>';		

	oHiddFrame.srcdoc = factura;
		}else{
  oHiddFrame.src = sURL;
 		}
  document.body.appendChild(oHiddFrame);
}

/*
$(window).on('load',function(){
var nots = Number($('#notificaciones').text());
if(nots > 0){
if(Notification.permission === "granted"){
var opciones = {
      body: 'Te amo mi corazon hermoso',
      icon: 'imagenes/loguito1.png'
  }	


var notificacion = new Notification("Tienes " + nots + " pedidos en CosasBonitas que atender!", opciones);
notificacion.onclick = function(event) {
  event.preventDefault(); 
  window.open('https://www.cosasbonitas.art/tienda/index.php?admin=1&vendidos=2#npedidos', '_blank');
}

}
}

});
*/


/*

function prueba_notificacion() {
if (Notification) {
if (Notification.permission !== "granted") {
Notification.requestPermission()
}
var title = "Xitrus"
var extra = {
icon: "http://xitrus.es/imgs/logo_claro.png",
body: "Notificación de prueba en Xitrus"
}
var noti = new Notification( title, extra)
noti.onclick = {
// Al hacer click
}
noti.onclose = {
// Al cerrar
}
setTimeout( function() { noti.close() }, 10000)
}
}

*/


/* Avoiding jQuery || git.io/zQuery 
function onDOMReady(f){/in/.test(document.readyState)?setTimeout(arguments.callee.name+'('+f+')',9):f()}
function isNotBatman(a,h){for(;a&&a!==document;a=a.parentNode){if(a.classList.contains(h.substr(1))){return 1}}}
function fadeElement(a,b){if(b!=='show'){return a.style.opacity=setTimeout(function(){a.style.display='none'},200)*0}a.style.display='block';setTimeout(function(){a.style.opacity=1},30)}
function addListener(a,b,c){((typeof a=="string")?document.querySelector(a):a).addEventListener(b,c)}

/* The actual jCtx code || git.io/justContext.js 
onDOMReady(function(){
	Array.from(document.querySelectorAll(".jctx-host")).forEach((z,i)=>{
		addListener(z,"contextmenu",function(event){
			Array.from(document.querySelectorAll(".jctx")).forEach((k,i)=>{k.style.display='none'});
			event.preventDefault();
			var mID='';
			Array.from(z.classList).forEach((y,i)=>{if(~y.indexOf("jctx-id-")){mID='.'+y}});
			x=document.querySelector(".jctx"+mID);
			var maxLeft=(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)-10-x.getBoundingClientRect().width;
			var maxTop=(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)-10-x.getBoundingClientRect().height;
			fadeElement(x,'show');
			x.style.left=(event.pageX>maxLeft?maxLeft:event.pageX)+"px",
			x.style.top=(event.pageY>maxTop?maxTop:event.pageY)+"px"
		})
	});
	Array.from(document.querySelectorAll(".jctx li")).forEach((x,i)=>{
		addListener(x,"click",function(){
			if(eval("typeof(handleMenuAction)==typeof(Function)")&&!x.classList.contains("disabled")) handleMenuAction(x.getAttribute("data-action"));
			fadeElement(x.parentElement,'hide')
		})
	});
	addListener(document,"mousedown",function(e){
		if(!isNotBatman(e.target,".jctx-host")) Array.from(document.querySelectorAll(".jctx")).forEach((x,i)=>{fadeElement(x,'hide')})
	})
}); */

$( document ).ready(function() {

function HoverCarrete(elm, settings) {
  this.DOM = {
    scope: elm,
    wrap: elm.querySelector("#ulcarrete").parentNode };

  this.containerWidth = 0;
  this.scrollWidth = 0;
  this.posFromLeft = 0; // Stripe position from the left of the screen
  this.stripePos = 0; // When relative mouse position inside the thumbs stripe
  this.animated = null;
  this.callbacks = {};

  this.init();
}

HoverCarrete.prototype = {
  init() {
    this.bind();
  },

  destroy() {
    this.DOM.scope.removeEventListener("mouseenter", this.callbacks.onMouseEnter);
    this.DOM.scope.removeEventListener("mousemove", this.callbacks.onMouseMove);
  },

  bind() {
    this.callbacks.onMouseEnter = this.onMouseEnter.bind(this);
    this.callbacks.onMouseMove = e => {
      if (this.mouseMoveRAF)
      cancelAnimationFrame(this.mouseMoveRAF);

      this.mouseMoveRAF = requestAnimationFrame(this.onMouseMove.bind(this, e));
    };

    this.DOM.scope.addEventListener("mouseenter", this.callbacks.onMouseEnter);
    this.DOM.scope.addEventListener("mousemove", this.callbacks.onMouseMove);
  },

  // calculate the thumbs container width
  onMouseEnter(e) {
    this.nextMore = this.prevMore = false; // reset

    this.containerWidth = this.DOM.wrap.clientWidth;
    this.scrollWidth = this.DOM.wrap.scrollWidth;
    // padding in percentage of the area which the mouse movement affects
    this.padding = 0.2 * this.containerWidth;
    this.posFromLeft = this.DOM.wrap.getBoundingClientRect().left;
    var stripePos = e.pageX - this.padding - this.posFromLeft;
    this.pos = stripePos / (this.containerWidth - this.padding * 2);
    this.scrollPos = (this.scrollWidth - this.containerWidth) * this.pos;

    // temporary add smoothness to the scroll 
    this.DOM.wrap.style.scrollBehavior = "smooth";

    if (this.scrollPos < 0)
    this.scrollPos = 0;

    if (this.scrollPos > this.scrollWidth - this.containerWidth)
    this.scrollPos = this.scrollWidth - this.containerWidth;

    this.DOM.wrap.scrollLeft = this.scrollPos;
    this.DOM.scope.style.setProperty("--scrollWidth", this.containerWidth / this.scrollWidth * 100 + "%");
    this.DOM.scope.style.setProperty("--scrollLleft", this.scrollPos / this.scrollWidth * 100 + "%");

    // lock UI until mouse-enter scroll is finihsed, after aprox 200ms
    clearTimeout(this.animated);
    this.animated = setTimeout(() => {
      this.animated = null;
      this.DOM.wrap.style.scrollBehavior = "auto";
    }, 200);

    return this;
  },

  // move the stripe left or right according to mouse position
  onMouseMove(e) {
    // don"t move anything until inital movement on "mouseenter" has finished
    if (this.animated) return;

    this.ratio = this.scrollWidth / this.containerWidth;

    // the mouse X position, "normalized" to the carreteminis position
    var stripePos = e.pageX - this.padding - this.posFromLeft;

    if (stripePos < 0)
    stripePos = 0;

    // calculated position between 0 to 1
    this.pos = stripePos / (this.containerWidth - this.padding * 2);

    // calculate the percentage of the mouse position within the carreteminis
    this.scrollPos = (this.scrollWidth - this.containerWidth) * this.pos;

    this.DOM.wrap.scrollLeft = this.scrollPos;

    // update scrollbar
    if (this.scrollPos < this.scrollWidth - this.containerWidth)
    this.DOM.scope.style.setProperty("--scrollLleft", this.scrollPos / this.scrollWidth * 100 + "%");

    // check if element has reached an edge
    this.prevMore = this.DOM.wrap.scrollLeft > 0;
    this.nextMore = this.scrollWidth - this.containerWidth - this.DOM.wrap.scrollLeft > 5;

    this.DOM.scope.setAttribute("data-at",
    (this.prevMore ? "left " : " ") + (
    this.nextMore ? "right" : ""));

  } };


var carreteminisElm = document.querySelector(".carreteminis");
new HoverCarrete(carreteminisElm);

});