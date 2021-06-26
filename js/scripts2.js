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
    
    $(document).on('click', '#sesionAdmin', function (event) { 	 
  		event.preventDefault();
  		var clave = $('input#clave').val();
  		$.ajax({
  			method: "POST",	
  			url: "index.php?eclave=1",
				data: {
					clavea: clave
        },
			})
  		.done(function( data ){
  			window.location = 'index.php?admin=1';
  		})
  		.fail(function() {
    		$("#success").text('Ha fallado!');	
  		})
  	});
  	
  	function FotoURL(input, idc){
  		if(input.files && input.files[0]) {
    		var reader = new FileReader();
    		reader.onload = function (e) {
      		$('.' + idc + ' input + label').css('background-image', 'url(' + e.target.result + ')');
      		$('.' + idc + ' input + label').css('border-radius', '0.5rem');
      		$('.' + idc).hide();
      		$('.' + idc).fadeIn(650);
    		};
    		reader.readAsDataURL(input.files[0]);
  		}
		}
		
		$(".foto_articulo").change(function () {
			var idc = $(this).attr('id');
  		FotoURL(this, idc);
		});
		
		$(document).on('click', '.categoria_articulo', function () {
  		var ssrc = $(this).attr('src');
  			if(ssrc == 'imagenes/hogar.png'){
  		$(this).attr('src', 'imagenes/personal.png');
  			}
  			if(ssrc == 'imagenes/personal.png'){
  		$(this).attr('src', 'imagenes/tecnologia.png');
  			}
  			if(ssrc == 'imagenes/tecnologia.png'){
  		$(this).attr('src', 'imagenes/hogar.png');
  			}
  		var ni = $(this).attr('ni');
  		var srcn = $(this).attr('src');
  		$('#categoria_articulo' + ni).val(srcn);
  	});
  	
  	
  	$(document).on('click', '#bsubmit', function (event) {   		 
  		
  		event.preventDefault();

      var formData = new FormData($("form#catf")[0]);
      
      $("#bsubmit").val('Cargando...');
    	$("#bsubmit").prop('disabled', true);
    	$("#bsubmit").css('background-color', '');

  		$.ajax({
  			method: "POST",	
  			url: "index.php?incat=1",
  			dataType: 'json',
				data: formData,
				 contentType: false,
         processData: false,
			})
  		.done(function( cats ){
  			console.log(cats);
  			if(cats == null){
  		$("#bsubmit").val('Intentar de nuevo');
    	$("#bsubmit").prop('disabled', false);
    	$("#bsubmit").css('background-color', '#dc3545');
  			}else{
  		var er = 0;	
  			$.each(cats, function(i, cat) {
  		var e = Number(cat['e']);
  		var c = cat['c'];
  			if(e == 1){
  		var color = '#dc3545';
    	er++;
  			}else{
  	  var color = '#007bff';		
  		$('.elim' + c).remove();
  		$('.noelim' + c).html('<h2 class="text-white">&iexcl;Cargado!</h2>');
  			}
  			
  		$('.bg-u' + c).css('background-color', color);

				})
  		
  			if(er > 0){
  		$("#bsubmit").val('Intentar de nuevo');
    	$("#bsubmit").prop('disabled', false);
  			}else{
  		$("#bsubmit").val('Articulos introducidos!');
    	$("#bsubmit").prop('disabled', true);	
  			}
  		
  		}
  		
  		})
  		.fail(function() {
    		$("#bsubmit").val('Intentar de nuevo');
    		$("#bsubmit").prop('disabled', false);
  		})
  	});
  	
  	$(document).ready(function() {
  	
  	function getBase64FromImageUrl(url) {
    var img = new Image();
		img.crossOrigin = "anonymous";
    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };
  		img.src = url;
	}
  		
  	var fecha = $('#fechah').text();
  	var tarts = Number($('#tarts').val()) + 4;
  	var mes = fecha.split(' ')[2];
    var table = $('#articulos').DataTable( {
    		"columnDefs": [ {
          "targets": 'no-sort',
          "orderable": false,
    		} ],
    		colReorder: {
        realtime: true
    		},
    		dom: 'Blfrtip',
    		lengthMenu: [
				[ 5, 10, 25, 50, -1 ],
				[ '5', '10', '25', '50', 'Todo' ]
				],
        buttons: [
            {
                extend: 'pdfHtml5',
                text: '<span class="fas fa-file-pdf"></span> Reporte PDF',
                className: 'btn-danger',
                init: function(api, node, config) {
       					$(node).removeClass('dt-button')
    						},
								messageTop: 'Generado el ' + fecha,                
                exportOptions: {
                    columns: [ 1, 2, 3, 4, 5, 6, 7, 9, 10 ]
                },
                footer: true,
                filename: 'CosasBonitas_' + mes,
                customize: function ( doc ) {
                		doc.styles.tableFooter.alignment = 'center';
                    doc.content.splice( 1, 0, {
                        margin: [ 0, 0, 0, 12 ],
                        alignment: 'center',
                        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABwCAIAAABzfh4qAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzY2MjUzOTVDQzNCMTFFQThGMENBODMzRDhGNUVERDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzY2MjUzOTZDQzNCMTFFQThGMENBODMzRDhGNUVERDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjYyNTM5M0NDM0IxMUVBOEYwQ0E4MzNEOEY1RUREMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjYyNTM5NENDM0IxMUVBOEYwQ0E4MzNEOEY1RUREMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ptl9Gp0AAA5JSURBVHja7F17TBVX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'
                    } );
                }
            },
          {
            extend: 'excelHtml5',
            customize: function( xlsx ) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
 
                $('row c[r^="A' + tarts + '"]', sheet).attr( 's', '51' );
                $('row c[r^="C"]', sheet).attr( 's', '51' );
                $('row c[r^="F"]', sheet).attr( 's', '51' );
                $('row c[r^="H"]', sheet).attr( 's', '51' );
            },
            text: '<span class="fas fa-file-excel"></span> Reporte Excel',
            className: 'btn-success',
            init: function(api, node, config) {
   					$(node).removeClass('dt-button')
						},
            messageTop: 'Generado el ' + fecha,
            footer: true,
            exportOptions: {
                    columns: [ 1, 2, 3, 4, 5, 6, 7, 9, 10 ]
                },
            autoFilter: true,
            sheetName: 'CosasBonitas_' + mes
        }
        
        ],
    		"order": [],
    		responsive: true,
        "language": {
            "lengthMenu": "<div style='position:relative;left:10%;top:10%'> Mostrar _MENU_ productos por p&aacute;gina</div>",
            "zeroRecords": "No se encontraron productos",
            "info": "Mostrando p&aacute;gina _PAGE_ de _PAGES_",
            "infoEmpty": "No se encuntra ning&uacute;n producto",
            "infoFiltered": "(filtrado de _MAX_ productos en total)",
            "sSearch":         "Buscar producto:",
            "oPaginate": {
							"sFirst":    "Primera",
							"sLast":     "Última",
							"sNext":     "Siguiente",
							"sPrevious": "Anterior"
						},
        }
  
    } );

    $(document).on('click', 'a.toggle-vis', function (e) {
        e.preventDefault();
        
      var colorl = $(this).attr('class');
 				
 				if(colorl == 'toggle-vis text-info'){
 			$(this).attr('class', 'toggle-vis text-primary');	
 				}else{
 			$(this).attr('class', 'toggle-vis text-info');		
 				}
 				
        // Get the column API object
        var column = table.column( $(this).attr('data-column') );
 
        // Toggle the visibility
        column.visible( ! column.visible() );
    } );
    
    
  
  //$('#articulos_filter').css({'position':'relative','bottom':'20%'});
  
  
  $('#articuloss').DataTable({
    dom: 'Bfti',
    pageLength: -1,
    buttons: [
        {
            extend: 'pdfHtml5',
            orientation: 'landscape',
            pageSize: 'TABLOID',
            customize: function (doc) {
                var tblBody = doc.content[1].table.body;
                // ***
                //This section creates a grid border layout
                // ***
                doc.content[1].layout = {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1;},
                vLineWidth: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;},
                hLineColor: function(i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';},
                vLineColor: function(i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';}
                };
                // ***
                //This section loops thru each row in table looking for where either
                //the second or third cell is empty.
                //If both cells empty changes rows background color to '#FFF9C4'
                //if only the third cell is empty changes background color to '#FFFDE7'
                // ***
                $('#articuloss').find('tr').each(function (ix, row) {
                    var index = ix;
                    var rowElt = row;
                    $(row).find('td').each(function (ind, elt) {
                        if (tblBody[index][1].text == '' && tblBody[index][2].text == '') {
                            delete tblBody[index][ind].style;
                            tblBody[index][ind].fillColor = '#FFF9C4';
                        }
                        else
                        {
                            if (tblBody[index][2].text == '') {
                                delete tblBody[index][ind].style;
                                tblBody[index][ind].fillColor = '#FFFDE7';
                            }
                        }
                    });
                });
            }
        },
        'excelHtml5']
  } );
  
  
  
  
  
    
    
	} );
	
	
  	function FotoArt(input, idi){
  		var imgid = $('[im=' + idi + ']');
  		if(input.files && input.files[0]) {
    		var reader = new FileReader();
    		reader.onload = function (e) {
      		imgid.attr('src', e.target.result);
    		};
    		reader.readAsDataURL(input.files[0]);
  		}
  			
  			var fotoart = new FormData();

        var foto_art = $('#'+idi)[0].files[0];

        fotoart.append('foto_art',foto_art);
  			
  			var codigo_articulo = $('#' + idi).attr('cod');
  			
  			var venart = $('#venart').val();
  
			  	if(venart == '1'){
			  var v = 0;
			  	}else{
			  var v = 1;
			  	}
  		
  		$.ajax({
  			method: "POST",
  			url: "index.php?actart=foto&c=" + codigo_articulo + '&v=' + v,
				data: fotoart,
				 contentType: false,
         processData: false,
			})
			
  		.done(function(e){
  			
  			if(e == 1){
  		var color = '2px solid #dc3545';
  			}else{
  		var color = '2px solid #28a745';
  			}
			
			var fondo = imgid.css({"border": color}).show()
				
      	setTimeout(function(){
			fondo.css({border: ''});
        },3000);
        
				for(var h = 0; h < 5; h++){
			imgid.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
     		}
  			
  		})

  		.fail(function() {
  		
  		var fondo = imgid.css({border: '2px solid #dc3545'}).show()

      	setTimeout(function(){
			fondo.css({border: ''});
        },3000);
        
				for(var h = 0; h < 5; h++){
			imgid.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
     		}
  			
  		})
  		
		}
		
		$(".foto_articulo_tabla input").change(function () {
			var idi = $(this).attr('id');
  		FotoArt(this, idi);
		});
		
		
	
	$(document).on('click', '.foto_articulo_tabla img', function (event) {
		
		var im = $(this).attr('im');
		$('#'+im).trigger("click");
		
  } );
  
  $(document).on('click', '.cambiar_nombre', function (event) {
  
  var nombre_articulo = $(this).attr('nombre_articulo');
  
  $('#valt').val(nombre_articulo);
  
  $(this).parent().css('min-width', '200px');
		
  $(this).parent().html('<input type="text" value="' + nombre_articulo + '" id="nombre_articulo" name="nombre_articulo" class="form-control">');
  
  $('#nombre_articulo').focus();
  
  });
  
  $(document).on('blur', '#nombre_articulo', function (event) {
  
  var nombre_articulo = $(this).val();
  
  $(this).parent().css('min-width', '');
  
  var codigo_articulo = $(this).closest('tr').attr('cod');
  
  var td = $(this).parent();
  	
  $(this).parent().html('<span class="cambiar_nombre" nombre_articulo="'+ nombre_articulo + '">' + nombre_articulo + '</span>');
  
  var nombre_articulo_a = $('#valt').val();
  
  if(nombre_articulo != nombre_articulo_a){
  
  
  $.ajax({
		  method: "POST",	
		  url: "index.php?actart=nombre",
		  data: {
		  nombre_articulo: nombre_articulo,
			codigo_articulo: codigo_articulo
		  }
			})
			.done(function(e){
				if(e == 1){
			var color = '#dc3545';
				}else{
			var color = '#28a745';
				}
			var fondo = td.css({"backgroundColor": color}).show()
	    	setTimeout(function(){
					fondo.css({backgroundColor: ''});
	      },3000);
				for(var h=0;h<3;h++){
			td.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
	   		}
			})
			.fail(function() {
			})
  	
  
  }
  
  });
  
  
  
  $(document).on('click', '.cambiar_dato', function (event) {
  
  var dato_articulo = $(this).attr('dato_articulo');
  
  var tipo_articulo = $(this).attr('tipo_articulo');

  $(this).parent().css('min-width', '200px');
  
  $('#valt').val(dato_articulo);

  if(tipo_articulo == 'categoria'){
  	
  	var typ = 'text" style="display:none';
		
		switch(dato_articulo) {
  		case 'hogar':
  	var datoarticulo = 'personal';
    	break;
  		case 'personal':
  	var datoarticulo = 'tecnologia';
  		break;
    	case 'tecnologia':
  	var datoarticulo = 'hogar';
    	break;
		}
	
	var dato_articulo = datoarticulo;
	
	var htmlp = '<img class="cambiar_dato" tipo_articulo="categoria" dato_articulo="' + dato_articulo + '" src="imagenes/' + dato_articulo + '.png" style="width:40px;height:40px">';
  
  }else{
  	
  var htmlp = '';
  
  	if(tipo_articulo == 'precio'){
  var typ = 'number" min="0';
  	}else{
  var typ = 'text';
  	}  
  
  }

		if(tipo_articulo == 'activo'){
	var typ = 'text" style="display:none';
		if(Number(dato_articulo) == 1){
	var htmlp = '<span class="cambiar_dato fas fa-lock btn btn-danger" tipo_articulo="activo" dato_articulo="0" style="font-size:3rem"></span>';
	var datoarticulo = 0;
		}else{
	var htmlp = '<span class="cambiar_dato fas fa-check btn btn-primary" tipo_articulo="activo" dato_articulo="1" style="font-size:3rem"></span>';
	var datoarticulo = 1;
		}
	
	var dato_articulo = datoarticulo;
		
		}
		
	if(tipo_articulo == 'aumentar'){
	var dato_articulo = Number(dato_articulo) + 1;
	var typ = 'hidden';
	}
	
	if(tipo_articulo == 'disminuir'){
	var dato_articulo = Number(dato_articulo) - 1;
	var typ = 'hidden';
	}
		 

		if(tipo_articulo == 'descripcion'){
	
	$(this).parent().html('<textarea row="2" tipo_articulo="' + tipo_articulo + '" id="dato_articulo" name="dato_articulo" class="form-control">' + dato_articulo + '</textarea>');
		
		}else{
		
	$(this).parent().html('<input type="' + typ + '" tipo_articulo="' + tipo_articulo + '" value="' + dato_articulo + '" id="dato_articulo" name="dato_articulo" class="form-control">' + htmlp);
	
		}	

  $('#dato_articulo').focus();
  
  	if(tipo_articulo == 'categoria' || tipo_articulo == 'activo' || tipo_articulo == 'aumentar' || tipo_articulo == 'disminuir'){	
	$('#dato_articulo').trigger("blur");
		}
  
  });
  
  $(document).on('blur', '#dato_articulo', function (event) {
  
  var td = $(this).parent();
  
  var dato_articulo = $(this).val();
  
  var tipo_articulo = $(this).attr('tipo_articulo');
  
  td.css('min-width', '');
  
  var codigo_articulo = $(this).closest('tr').attr('cod');
	
  	if(tipo_articulo == 'categoria'){	
	td.html('<img class="cambiar_dato" tipo_articulo="categoria" dato_articulo="' + dato_articulo + '" src="imagenes/' + dato_articulo + '.png" style="width:40px;height:40px">');
		}else{
		if(tipo_articulo == 'descripcion'){		
	td.html('<span class="cambiar_dato fas fa-edit" tipo_articulo="' + tipo_articulo + '" dato_articulo="'+ dato_articulo + '"></span>');
		}else{
	td.html('<span class="cambiar_dato" tipo_articulo="' + tipo_articulo + '" dato_articulo="'+ dato_articulo + '">' + dato_articulo + '</span>');	
		}
		}
	
		if(tipo_articulo == 'activo'){
		if(Number(dato_articulo) == 0){
	td.html('<span class="cambiar_dato fas fa-lock btn btn-danger" tipo_articulo="activo" dato_articulo="0" style="font-size:3rem"></span>');
		}else{
	td.html('<span class="cambiar_dato fas fa-check btn btn-primary" tipo_articulo="activo" dato_articulo="1" style="font-size:3rem"></span>');
		}
		} 
		
		if(tipo_articulo == 'disminuir' || tipo_articulo == 'aumentar'){
	td.html(dato_articulo + '<br /><br /><span class="cambiar_dato fa-2x" tipo_articulo="disminuir" dato_articulo="' + dato_articulo + '" id="disminuir"><i class="fa fa-minus-square-o"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cambiar_dato fa-2x" tipo_articulo="aumentar" dato_articulo="' + dato_articulo + '" id="aumentar"><i class="fa fa-plus-square-o"></i></span>');
		}

  var dato_articulo_a = $('#valt').val();
  
  var venart = $('#venart').val();
  
  	if(venart == '1'){
  var vendido_articulo = 0;
  	}else{
  var vendido_articulo = 1;
  	}
  
  if(dato_articulo != dato_articulo_a || tipo_articulo == 'categoria' || tipo_articulo == 'activo'){
  
  
  $.ajax({
		  method: "POST",	
		  url: "index.php?actart=dato",
		  data: {
		  dato_articulo: dato_articulo,
			codigo_articulo: codigo_articulo,
			tipo_articulo: tipo_articulo,
			vendido_articulo: vendido_articulo
		  }
			})
			.done(function(e){
				console.log(e);
				if(e == 1){
			var color = '#dc3545';
				}else{
			var color = '#28a745';
				}
			var fondo = td.css({"backgroundColor": color}).show()
	    	setTimeout(function(){
					fondo.css({backgroundColor: ''});
	      },3000);
				for(var h=0;h<3;h++){
			td.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
	   		}
			})
			.fail(function() {
			var fondo = td.css({"backgroundColor": '#dc3545'}).show()
	    	setTimeout(function(){
					fondo.css({backgroundColor: ''});
	      },3000);
				for(var h=0;h<3;h++){
			td.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
	   		}	
			})
  	
  
  }
  
  });
  
  $('body').tooltip({ selector: '[rel="tooltip"]' });
	
	$(document).on('mouseenter', '.carro_compra', function (event) { 	 

	var cod = $(this).attr('cod');
	var cant = $(this).attr('cant');
	var c = $(this).attr('c');
	
	$(this).html('<i class="esconder' + cod + ' fa fa-cart-plus pr-1 pb-4" cod="' + cod + '" cant="' + cant + '" c="' + c + '"></i>');						
		
	});
	
	$(document).on('mouseleave', '.carro_compra', function (event) {

	var cod = $(this).attr('cod');
	var cant = $(this).attr('cant');
	var c = $(this).attr('c');
	
	$(this).html('<i class="esconder' + cod + ' fa fa-shopping-cart pr-1 pb-4" cod="' + cod + '" cant="' + cant + '" c="' + c + '"></i>');
		
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
	
		$(document).on('click', '.modal_ventana', function (event) { 	 
		
		var idm = $(this).attr('idm');
		
		var nombre_articulo = $('#'+idm).attr('nombre_articulo');
		var foto_articulo = $('#'+idm).attr('foto_articulo');
		var descripcion_articulo = $('#'+idm).attr('descripcion_articulo');
		
		$('#portfolioModalLabel').text(nombre_articulo);
		$('#portfolioModalFoto').attr('src', 'imagenes/fotos/' + foto_articulo);
		$('#portfolioModalDescripcion').html(descripcion_articulo);
		
	
		});
		
		

	$(document).on('click', '.agregar_articulo, .agregar_articulo i', function (event) {
		
		event.preventDefault();
		
		var cod = $(this).attr('cod');

		var acant = Number($('#cantidad_articulo' + cod).val());
		
		var cant = Number($(this).attr('cant'));
		
			if(acant > cant){
		var acant = cant;
			}
		
		if(acant > 0 && cant > 0){

		for(var h = 0; h < 5; h++){
			$(this).fadeTo('slow', 0.2).fadeTo('slow', 1.0);
    }
    
    var carrocb = 'carrocb';
		var carro_cb = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + carrocb.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		
			if(carro_cb != null){
		var und = /undefined:/g;
		var carro_cb = carro_cb.replace(und, '');		
		var und2 = /:undefined/g;
		var carro_cb = carro_cb.replace(und2, '');
			}
		
		var carro_ck = '';
		
		for(var i = 0; i < acant; i++){
		carro_ck += ':' + cod;
			}
    
    var carro_cb = carro_cb + ':' + carro_ck;
    
    var carro_cb = carro_cb.split(':');
		carro_cb = carro_cb.filter(c => c);
		var carro_cb = carro_cb.join(':');
		
		var arro_cb = carro_cb.split(cod).length;
		
		console.log(arro_cb);
		
		//document.cookie = 'carrocb=' + carro_cb + '; max-age=3000000;';
    		
		var cant = cant - acant;
		
		var c = Number($(this).attr('c')) + acant;
				
		$(this).attr('c', c);
		
		var c = Number($(this).attr('c'));
	
		var carrocb = 'carrocb';
		var carro_cb = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + carrocb.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		
		var cc = carro_cb.split(':').length;
				
		$('#carrito').show('slow');
		$('#carrito_cant').text(cc);
		
		$(this).attr('cant', cant);
		
		var cant = $(this).attr('cant');
		
		$('#cantidad_articulo' + cod).attr('max', cant);
		
		var max = $('#cantidad_articulo' + cod).attr('max');
		
		console.log(cant);
		
			if(max == 0){
		$('#cantidad_articulo' + cod).val('0');
		$('#cantidad_articulo' + cod).val('0');
		$('#imagea' + cod).attr('style', 'filter: grayscale(100%);');
		$('#agotado'+ cod).attr('class', 'fa-2x d-block product-agotado-label');
		$('.esconder'+ cod).hide();
		$('#descuento'+ cod).hide();
			}
		
		var titlef = $('#titlea'+cod).attr('titlef');
		
		$('#titlea'+cod).attr('title', '');
		
		$('#a'+cod).attr('class', 'badge badge-info mr-2');
				
		$('#a'+cod).html('Has agregado <strong>' + c + '</strong> en tu carrito');
		
		setTimeout(function(){
			$('#titlea'+cod).attr('title', titlef);
			$('#a'+cod).attr('class', 'badge badge-info mr-2');
  	},3000);
  	
  	}

	});
	
	 $(window).on('load',function(){
        $('#carritoModal').modal('show');
    });
		
		$(document).on('click', '#categoria_todas', function (event) { 	 
		
		var mostrar = $(this).text();
		
		$('#lcat').val('0');

		var cat = $('#categoria_cat').attr('cat');
			
			/*
			 
			$('.categoria_' + cat + ' .product-content').css({'margin-left':'0%', 'transform': 'scale(1)'});
			$('.categoria_' + cat + ' .social').css({'margin-right':'0%', 'margin-bottom':'0%', 'transform': 'scale(1)'});
			$('.categoria_' + cat + ' .product-discount-label').css({'margin-right':'0%', 'margin-top':'0%', 'transform': 'scale(1)'});
			$('.categoria_' + cat).css({'transform': 'scale(1)'});
			$('.categoria_' + cat).attr('class', 'col-md-4 col-sm-6 categoria_' + cat);	
			$('#articuloszoom').css({'margin-top': '0%', 'transform': 'scale(1)'});
			$('#disminuir').attr('s', '1');
			$('#disminuir').attr('m', '0');
			$('#aumentar').attr('s', '1');
			$('#aumentar').attr('m', '0');
			
			var lcat = $('.categoria_' + cat).length;
		
			if(lcat == 1 && mostrar != 'Mostrar todas'){
				$('.categoria_' + cat).attr('class', 'col categoria_' + cat);	
				$('#articuloszoom').css({'margin-top': '-25%', 'transform': 'scale(0.5)'});
				$('.categoria_' + cat + ' .product-content').css({'margin-left':'33.5%', 'transform': 'scale(2)'});
				$('.categoria_' + cat + ' .social').css({'margin-right':'15.5%', 'margin-bottom':'10.5%', 'transform': 'scale(2)'});
				$('.categoria_' + cat + ' .product-discount-label').css({'margin-right':'6.5%', 'margin-top':'6%', 'transform': 'scale(2)'});
				$('#porcentaje').text('100%');
				$('#disminuir').attr('s', '0.5');
				$('#disminuir').attr('m', '-25');
				$('#aumentar').attr('s', '0.5');
				$('#aumentar').attr('m', '-25');
				$('#lcat').val('1');
			}
		
			$('.categoria_categorias .product-content').css({'margin-left':'0%', 'transform': 'scale(1)'});
			$('.categoria_categorias .social').css({'margin-right':'0%', 'margin-bottom':'0%', 'transform': 'scale(1)'});
			$('.categoria_categorias .product-discount-label').css({'margin-right':'0%', 'margin-top':'0%', 'transform': 'scale(1)'});
			$('.categoria_categorias').css({'transform': 'scale(1)'});
			$('.categoria_categorias').attr('class', 'col-md-4 col-sm-6 categoria_categorias');	
			$('#articuloszoom').css({'margin-top': '0%', 'transform': 'scale(1)'});
			$('#disminuir').attr('s', '1');
			$('#disminuir').attr('m', '0');
			$('#aumentar').attr('s', '1');
			$('#aumentar').attr('m', '0');
			
			var lcat = $('.categoria_categorias').length;
		
			if(lcat == 1 && mostrar != 'Mostrar todas'){
				$('.categoria_categorias').attr('class', 'col categoria_categorias');	
				$('#articuloszoom').css({'margin-top': '-25%', 'transform': 'scale(0.5)'});
				$('.categoria_categorias .product-content').css({'margin-left':'33.5%', 'transform': 'scale(2)'});
				$('.categoria_categorias .social').css({'margin-right':'15.5%', 'margin-bottom':'10.5%', 'transform': 'scale(2)'});
				$('.categoria_categorias .product-discount-label').css({'margin-right':'6.5%', 'margin-top':'6%', 'transform': 'scale(2)'});
				$('#porcentaje').text('100%');
				$('#disminuir').attr('s', '0.5');
				$('#disminuir').attr('m', '-25');
				$('#aumentar').attr('s', '0.5');
				$('#aumentar').attr('m', '-25');
				$('#lcat').val('1');
			}
			
			*/
		
		var tcat = $('#categoria_cat').text();
		
		if(mostrar == 'Mostrar todas'){
		
		$(this).text('Mostrar '+ tcat);
	
		$('#categoria_cat').hide();
		
		$('.categoria_hogar').show();
		$('.categoria_personal').show();
		$('.categoria_tecnologia').show();

		}else{
	
	$(this).text('Mostrar todas');
	$('#categoria_cat').show();
		

		if(cat == 'hogar'){
	$('.categoria_personal').hide();
	$('.categoria_tecnologia').hide();
	$('.categoria_hogar').show();
		}
		
		if(cat == 'personal'){
	$('.categoria_tecnologia').hide();
	$('.categoria_hogar').hide();
	$('.categoria_personal').show();
		}
		
		if(cat == 'tecnologia'){
	$('.categoria_personal').hide();
	$('.categoria_hogar').hide();
	$('.categoria_tecnologia').show();
		}
	
		}
		
		});

		$(document).on('click', '.cant_fac', function (event) { 	 

		$(this).find('i').toggle("slow");
			
		});
		
		$(document).on('click', '.cant_facq', function (event){
			
			event.preventDefault();
			
		var c = Number($(this).parent().find('span').text()) - 1;
		
		var cod = Number($(this).parent().attr('cod'));

			if(c < 0){
		$('#noc' + cod).hide('slow');
		$(this).parent().parent().parent().hide('slow');
			}else{
		var carrocb = 'carrocb';
		var carro_cb = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + carrocb.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		var carro_cb = carro_cb.replace(cod,'');
		var carro_cb = carro_cb.split(':');
		carro_cb = carro_cb.filter(c => c);
		var carro_cb = carro_cb.join(':');
		var cc = carro_cb.split(':').length;
		$('#carrito_cant').text(cc);
		document.cookie = 'carrocb=' + carro_cb + '; max-age=3000000;';
		$(this).parent().find('span').text(c);
		var c = Number($(this).parent().find('span').text());
		var pre = Number($(this).parent().attr('pre'));
		var prec = pre * c;
		$('#pre' + cod).text(prec);
		var desc = (Number($(this).parent().attr('desc')) * prec) / 100;
		var desc = Number.parseFloat(desc).toFixed(2);
		$('#desc' + cod).text('-' + desc);
		var cantidad_canasta = Number($('#cantidad_canasta').text()) - 1;
		$('#cantidad_canasta').text(cantidad_canasta);
		var subtotal_canasta = Number($('#subtotal_canasta').attr('stf')) - pre;
		var subtotal_canasta = Number.parseFloat(subtotal_canasta).toFixed(2);
		$('#subtotal_canasta').text('RD$:' + subtotal_canasta);
		$('#subtotal_canasta').attr('stf', subtotal_canasta);
		
		var desct = 0;
		$(".desct" ).each(function( index ) {
  	
  	desct += Number($( this ).text());
		});
		
		var desct = Number.parseFloat(desct).toFixed(2);
		
		$('#descuento_canasta').text(desct);
		var pdesct = desct * -1;
		var total_canasta = subtotal_canasta - pdesct;
		var total_canasta = Number.parseFloat(total_canasta).toFixed(2);
		$('#total_canasta').text('RD$:' + total_canasta);

			}
				
		
		var cant = Number($(this).parent().attr('cant'));
					
		});

		$(document).on('mouseenter click', '.categoria_menu', function (event) { 	 
		
		var cat_menu = $(this).attr('cat_menu');
		var cat_text = $(this).find('h3').text();
		
		$('#categoria_cat').attr('cat', cat_menu);
		$('#categoria_cat').text(cat_text);
		$('#categoria_todas').trigger("click");
		
		});
		
	setTimeout(function(){
		$('#lista_arts').appendTo('#lista_articulos');
		$('#total_arts').appendTo('#total_factura');
		var cac = Number($('#cantidad_canasta').text());
			if(cac > 0){
		$('#carrito_cant').text(cac);
			}
		
		var html = $('#columnas_me').html();
		$('#articulos').before(html);
		$('#columnas_me').html('');
  },3000);
  	
  })(jQuery); // End of use strict
  
  $('.btn-plus, .btn-minus').on('click', function(e) {
  const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
  const input = $(e.target).closest('.input-group').find('input');
  if (input.is('input')) {
    input[0][isNegative ? 'stepDown' : 'stepUp']()
  }
  
});