  	
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
		
		$(".fotoarticulo").change(function () {
			var idc = $(this).attr('id');
  		FotoURL(this, idc);
		});
		
  	

  	$(document).on('click', '#bsubmit', function (event) {
  		
  		event.preventDefault();

      var formData = new FormData($("form#catf")[0]);
      
      $("#bsubmit").val('Cargando...');
    	$("#bsubmit").prop('disabled', true);
    	$("#bsubmit").css('background-color', '');

  		$.ajax({
  			method: "POST",	
  			url: "index.php?crear=1",
  			dataType: 'json',
				data: formData,
				 contentType: false,
         processData: false,
			})
  		.done(function(e){
  			console.log(e);
  			if(e['er'] == ''){
  		var aviso = '<h2 class="text-info">&iexcl;Art&iacute;culo creado!</h2>';
    	var color = '#007bff';
  		$("#bsubmit").val('Creado');
    	$("#bsubmit").prop('disabled', true);	
  			}else{
  		$("#bsubmit").val('Intentar de nuevo');
    	$("#bsubmit").prop('disabled', false);
    	$("#bsubmit").css('background-color', '#dc3545');
    	var aviso = '<h6 class="text-danger">' + e['er'] + '</h6>';
  		var color = '#dc3545';
  			}
		
			$('#acarg').html(aviso + '. <h6 class="text-danger">' + e['erf']+ '</h6>');
			
  		$('.filas-cat').css('background-color', color);
  		
  		})
  		.fail(function() {
    		$("#bsubmit").val('Intentar de nuevo');
    		$("#bsubmit").prop('disabled', false);
  		})
  	});
  	
  	
  	$(document).on('click change', '#idart', function (event) {
  		
  		var idart = $(this).val();
  		
  		var img = $('#idart option:selected').attr('img');
  		
  			if(img == undefined){

  		img = 'loguito.png';
  			
  			}else{

  		img = 'fotos/' + img;
  		
  			}
  		
  		
  		$('#sfoto_articulo').attr('src', './imagenes/' + img);
  		
  $.ajax({
		  method: "POST",	
		  url: "index.php?selart=1",
		  data: {
		  idart: idart
		  }
			})
  		.done(function(art){
  		$('#selart').html(art);	
	  		})
  		.fail(function() {
    		
  		})
  	});

		  	$(document).on('click', '#psubmit', function (event) {
  		
  		event.preventDefault();

      var formData = new FormData($("form#fpf")[0]);
      
      $(this).val('Cargando...');
    	$(this).prop('disabled', true);
    	$(this).css('background-color', '');

  		$.ajax({
  			method: "POST",	
  			url: "index.php?insertar=1",
  			dataType: 'json',
				data: formData,
				 contentType: false,
         processData: false,
			})
  		.done(function(e){
  			console.log(e);
  			if(e['er'] == ''){
  		var aviso = '<h2 class="text-info">&iexcl;Art&iacute;culo publicado!</h2>';
    	var color = '#007bff';
  		$("#psubmit").val('Publicados');
    	$("#psubmit").prop('disabled', true);	
  			}else{
  		$("#psubmit").val('Intentar de nuevo');
    	$("#psubmit").prop('disabled', false);
    	$("#psubmit").css('background-color', '#dc3545');
    	var aviso = '<h6 class="text-danger">' + e['er'] + '</h6>';
  		var color = '#dc3545';
  			}
		
			$('#pcarg').html(aviso);
			
  		$('.filas-part').css('background-color', color);
  		
  		})
  		.fail(function (jqXHR, textStatus, error) {
      console.log("Post error: " + error);
    		$("#psubmit").val('Intentar de nuevo');
    		$("#psubmit").prop('disabled', false);
  		})
  	});
  	
		
		
		$(document).on('click change', '#sporciento_costo', function (event) {
  		
      var costo =  Number($("#scosto_articulo").val());
      var porciento =  Number($("#sporciento_costo").val());
     	
     	if(costo > 0){ 
      
      var precio = porciento / 100 *  costo + costo;
    	
    	var precio = Number.parseFloat(precio).toFixed(2);
    	
    	$("#sprecio_articulo").val(precio);	
    		
    		for(var h = 0; h < 3; h++){
			$("#scosto_articulo").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
     		}
			
		}
  	
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
                text: '<span class="fa fa-file-pdf-o"></span> Reporte PDF',
                className: 'btn-danger',
                init: function(api, node, config) {
       					$(node).removeClass('dt-button')
    						},
								messageTop: 'Generado el ' + fecha,                
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4, 5, 6, 7 ]
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
            text: '<span class="fa fa-file-excel-o"></span> Reporte Excel',
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
    			var video = e.target.result;
    			var ext = video.substring(0, 10);
    				if(ext != 'data:video'){
      	imgid.attr('src', video);
      			}
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
			
			var p = Number($('#' + idi).attr('p'));
			
			var principal_modal = $('#principal_modal').prop("checked");

				if(p == 1 && principal_modal == false){
			var foto = 'carretefotos';
				}else{
			var foto = 'foto';
				}
				
				if(principal_modal == true){
			var v = 0;
				}

  		$.ajax({
  			method: "POST",
  			url: "index.php?actart=" + foto + "&c=" + codigo_articulo + "&v=" + v,
  			dataType: 'json',  			
				data: fotoart,
				 contentType: false,
         processData: false,
			})
			
  		.done(function(er){
  			console.log(er);
			var e = er['er'];
			var	img = er['fa'];
  			if(e == 1 || e == 2){
  		var color = '2px solid #dc3545';
  			}else{
  		var color = '2px solid #28a745';
  			}
			
				if(e == 4){
			$('#portfolioModal').modal('hide');
			setTimeout(function(){
			$(".modal_ventana[idm*='modal_datos_" + codigo_articulo + "']").trigger('click');
			  },1000);
				}
			
				if(principal_modal == true || e == 3){		
			$('#portfolioModal').modal('hide');
			setTimeout(function(){
			$(".modal_ventana[idm*='modal_datos_" + codigo_articulo + "']").trigger('click');
			  },1000);
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
		
		$(".foto_articulo_modal input").change(function () {
			var idi = $(this).attr('id');
  		FotoArt(this, idi);
		});
		
$(document).on('click', '#EstablecerFoto, #EliminarFoto, #EliminarVideo', function (event) {
        $('#portfolioModal').modal('hide');
        $('#elpedCenter').modal('show');
        setTimeout(function(){$('#page-top').attr('class', 'modal-open');},1000);
});

$(document).on('click', '#cerrarimg, .cerrarimg', function (event) {
        $('#imgmod').prop('disabled', false);
        $('#imgelim').prop('disabled', false);
        $('#elpedCenter').modal('hide');
        $('#portfolioModal').modal('show');
        setTimeout(function(){$('#page-top').attr('class', 'modal-open');},1000);
        return false;
});

		$(document).on('click', '#cerrarvid', function (event) { 	 
		    $('#elpedCenter').modal('hide');
        $('#portfolioModal').modal('show');
        setTimeout(function(){$('#page-top').attr('class', 'modal-open');},1000);
        return false;

	});

			$(document).on('click', '#EliminarVideo', function (event) { 	 

		var cod = $('#EstablecerFoto').attr('cod');
		var fa = $('#modal_modal_datos_' + cod).attr('foto_articulo');
		$('#numped').attr('id', 'videlim');
		$('#cerrarped').attr('id', 'cerrarvid');
		$('#elpedLongTitle').text('Eliminando video');
		$('.removervid').remove();
		var vid = $('.videlim').attr('vid');
		$('#videlim').attr('vid', vid);
		$('#text-ped').html('&iquest;Segudo desea eliminar el siguiente video?');
		$('<div class="removervid"><video class="rounded bg-primary" width="250" height="150" controls><source src="imagenes/fotos/mas/' + vid + '#t=0.4" type="video/mp4"></video></div>').insertAfter('#text-ped');
	
	});		
	
	
	$(document).on('click', '#videlim', function (event) { 	 
	
	var vid = $(this).attr('vid');

	var cod = $('#EstablecerFoto').attr('cod');

		$.ajax({
  			method: "POST",
  			url: "index.php?eliminarFoto",
				data: {
					img: vid,
        },
			})

  		.done(function(vi){
					if(vi == 1){
  			$('#text-ped').html('<span class="text-secondary">&iexcl;El video ha sido eliminado!</span>');
  			$('#quitarlivid').parent().remove();
  			$('#ops_mod').hide();
  			$('#detalles_articulo1 #modal_imagea' +  cod).show();
				$('#EliminarVideo').attr('id','EliminarFoto');
				$('.videlim').remove();
				  			
  			setTimeout(function(){
	 	$('#cerrarvid').trigger('click');
		$('#cerrarvid').attr('id', 'cerrarped');
  			},2000);
  			
  			}else{
  			$('#text-ped').html('<span class="text-danger">No se pudo eliminar el video</span>');
  			}
  			
  		})	
		
		
	
		
	});		
	
			$(document).on('click', '#EliminarFoto', function (event) { 	 

		var img = $('#EstablecerFoto').attr('img');
		var cod = $('#EstablecerFoto').attr('cod');
		var fa = $('#modal_modal_datos_' + cod).attr('foto_articulo');
			if(img == '' || fa == img){
		$('#text-ped').html('No se puede eliminar la foto principal');
			}else{
		$('#numped').attr('id', 'imgelim');
		$('#imgelim').attr('img', img);
		$('#imgelim').attr('cod', cod);
		$('.removerimg').remove();
		$('#elpedLongTitle').text('Eliminando foto');
		$('#text-ped').html('&iquest;Segudo desea eliminar la siguiente foto?');
		$('<img class="removerimg" style="max-width: 100px" src="imagenes/fotos/mas/' + img + '" />').insertAfter('#text-ped');
			}
		
	});

	$(document).on('click', '#imgelim', function (event) {
		
	$(this).prop('disabled', true);
	var img = $(this).attr('img');
	var cod = $(this).attr('cod');
	var fa = $('#modal_modal_datos_' + cod).attr('foto_articulo');
		if(img == '' || img == undefined || img == fa){
	$('#ops_mod').hide();
		}else{

		$.ajax({
  			method: "POST",
  			url: "index.php?eliminarFoto",
				data: {
					img: img,
        },
			})

  		.done(function(fot){
					if(fot == 1){
  			$('#text-ped').html('<span class="text-secondary">&iexcl;La foto ha sido eliminada!</span>');
  			$('#imagea' + cod + ' .pic-1').attr('src', 'imagenes/fotos/' + fa);
  			$('#imagea' + cod + ' .pic-2').attr('src', 'imagenes/fotos/' + fa);
  			$('#detalles_articulo1 .pic-1').attr('src', 'imagenes/fotos/' + fa);
  			$('#detalles_articulo1 .pic-2').attr('src', 'imagenes/fotos/' + fa);
  			$('#modal_datos_' + cod).attr('foto_articulo', fa);
  			$('#quitarliimg').parent().remove();
  			$('#modal_modal_datos_' + cod).attr('foto_articulo', fa);
  			$('#imgelim').removeAttr('cod');
  			$('#imgelim').removeAttr('img');
  			$('#imgelim').attr('id', 'numped');
  			$('#ops_mod').hide();
  			
  			setTimeout(function(){
	 	$('#cerrarped').trigger('click');
  			},2000);
  			
  			}else{
  			$('#text-ped').html('<span class="text-danger">No se pudo eliminar la foto</span>');
  			}
  			
  		})	
		
		}
	
		
	});		
	

			$(document).on('click', '#EstablecerFoto', function (event) { 	 

		var img = $(this).attr('img');
		var cod = $(this).attr('cod');
		var fa = $('#modal_modal_datos_' + cod).attr('foto_articulo');
					if(img == '' || img == undefined  || img == 'undefined' || img == fa){
		$('#text-ped').html('Esta foto ya ha sido aplicada');
			}else{
		$('#numped').attr('id', 'imgmod');
		$('#cerrarped').attr('id', 'cerrarimg');
		$('#imgmod').attr('cod', cod);
		$('#imgmod').attr('img', img);
		$('#imgmod').text('Aplicar');
		$('.removerimg').remove();
		$('#elpedLongTitle').text('Estableciendo foto por defecto');
		$('#text-ped').html('Se establecer&aacute; la foto como la principal del producto');
		$('<img class="removerimg" style="max-width: 100px" src="imagenes/fotos/mas/' + img + '" />').insertAfter('#text-ped');
			}
		
	});
		
		$(document).on('click', '#imgmod', function (event) {
		
		$(this).prop('disabled', true);
		var img = $(this).attr('img');
		var cod = $(this).attr('cod');
		var fa = $('#modal_modal_datos_' + cod).attr('foto_articulo');

		$.ajax({
		  method: "POST",	
		  url: "index.php?actart=foto&c=" + cod + "&v=7",
			dataType: 'json',
		  data: {img:img, fa:fa}
			})
			.done(function(er){
			var e = er['er'];
				if(e == 7){
			$('#text-ped').html('Imagen establecida por defecto');
			$('#imagea' + cod + ' .pic-1').attr('src', 'imagenes/fotos/' + img);
			$('#imagea' + cod + ' .pic-2').attr('src', 'imagenes/fotos/' + img);
			$('.principal').parent().remove();
			$("#ulcarrete").prepend('<li><a href="#a"><img class="imgcarrete" src="imagenes/fotos/mas/' + fa + '" /></a></li>');
			$("#ulcarrete").prepend('<li><a href="#a"><img class="imgcarrete principal" src="imagenes/fotos/' + img + '" /></a></li>');
			$('#quitarliimg').parent().remove();
			$('#modal_datos_' + cod).attr('foto_articulo', img);
			$('#modal_modal_datos_' + cod).attr('foto_articulo', img);
			$('#EstablecerFoto').attr('img', '');
			$('#imgmod').removeAttr('cod');
			$('#imgmod').removeAttr('img');
			$('#imgmod').attr('id', 'numped');
			$('#ops_mod').hide();
	
  	  setTimeout(function(){
	 	$('#cerrarimg').trigger('click');
  	$('#cerrarimg').attr('id', 'cerrarped');
  			},2000);
  		}else{
  	$('#text-ped').html(e);	
  		}	
					})
		
});
		
			
	$(document).on('click', '.despachar_pedido', function (event) { 	 
		
		$('#cerrarimg').attr('id', 'cerrardesc');
		$('#numped').attr('id', 'desped');
		var idped = $(this).attr('idped');
		$('#desped').attr('idped', idped);
			
		$('#elpedLongTitle').text('Despachando pedido #' + idped);
		
		$('#text-ped').html('&iquest;Seguro tiene listo el pedido <strong class="text-warning">#' + idped + '</strong>?');
		
	});
	
	$(document).on('click', '#cerrarped', function (event) { 	 
		$('#desped').removeAttr('idped');
		$('#desped').attr('id', 'numped');	
		$('#numped').prop('disabled', false);
	  setTimeout(function(){$('#page-top').attr('class', 'modal-close');},1000);

	});
	
		$(document).on('click', '#desped', function (event) {
		
		var idped = $(this).attr('idped');
				
  	window.open("index.php?verped=" + idped + "&despachar=1", "fac", "resizable=no, toolbar=no, scrollbars=yes, menubar=no, status=no, directories=no, titlebar=no, resizable=yes, location=no");

  	  		setTimeout(function(){
		$('#desped').removeAttr('idped');
		$('#desped').attr('id', 'numped');
		$('#'+idped).attr('class', 'd-none');
  	$('#cerrarped').trigger('click');
  			},1000);
  		
		
		});
	
	
	$(document).on('click', '.foto_articulo_tabla img', function (event) {
		
		var im = $(this).attr('im');
		$('#'+im).trigger("click");
		
  });
  
  	$(document).on('click', '.foto_articulo_modal img', function (event) {
		
		var im = $(this).attr('im');
		$('#'+im).trigger("click");
		
  });
  
  
  $(document).on('click', '.cambiar_nombre', function (event) {
  
  var nombre_articulo = $(this).attr('nombre_articulo');
  
  $('#valt').val(nombre_articulo);
  
  $(this).parent().css('min-width', '200px');
		
  $(this).parent().html('<input type="text" value="' + nombre_articulo + '" id="nombre_articulo" name="nombre_articulo" class="form-control">');
  
  $('#nombre_articulo').focus();
  
  });
  
  $(document).on('click', '.cambiar_dato', function (event) {
  
  var dato_articulo = $(this).attr('dato_articulo');
  
  var tipo_articulo = $(this).attr('tipo_articulo');

  $(this).parent().css('min-width', '200px');
  
  $('#valt').val(dato_articulo);
  
  var codigo_articulo = $(this).attr('cod');
  	
  var htmlp = '';
  
  	if(tipo_articulo == 'precio'){
  var typ = 'number" min="0';
  	}else{
  var typ = 'text';
  	}  


		if(tipo_articulo == 'activo'){
	var typ = 'text" style="display:none';
		if(Number(dato_articulo) == 1){
	var htmlp = '<span cod="' + codigo_articulo + '" class="cambiar_dato fa fa-lock btn btn-danger" tipo_articulo="activo" dato_articulo="0" style="font-size:3rem"></span>';
	var datoarticulo = 0;
		}else{
	var htmlp = '<span cod="' + codigo_articulo + '" class="cambiar_dato fa fa-check btn btn-primary" tipo_articulo="activo" dato_articulo="1" style="font-size:3rem"></span>';
	var datoarticulo = 1;
		}
	
	var dato_articulo = datoarticulo;
		
		}
		
	if(tipo_articulo == 'aumentar'){
	var dato_articulo = Number(dato_articulo) + 1;
	var typ = 'hidden';
	}
	
	if(tipo_articulo == 'disminuir' || tipo_articulo == 'disminuir0'){
	var dato_articulo = Number(dato_articulo) - 1;
	var typ = 'hidden';
	}
		 

		if(tipo_articulo == 'descripcion'){
	
	$(this).parent().html('<div class="border" style="position:absolute;top:20%;left:20%"><textarea cod="' + codigo_articulo + '" cols="90" rows="15" tipo_articulo="' + tipo_articulo + '" id="dato_articulo" name="dato_articulo" class="form-control">' + dato_articulo + '</textarea></div>');
		
		}else{
		
		if(tipo_articulo != 'categoria'){
		
	$(this).parent().html('<input cod="' + codigo_articulo + '" type="' + typ + '" tipo_articulo="' + tipo_articulo + '" value="' + dato_articulo + '" id="dato_articulo" name="dato_articulo" class="form-control">' + htmlp);
		
		}
		
		}	

  $('#dato_articulo').focus();
  
  	if(tipo_articulo == 'activo' || tipo_articulo == 'aumentar' || tipo_articulo == 'disminuir' || tipo_articulo == 'disminuir0'){	
	$('#dato_articulo').trigger("blur");
		}
  
  });
  
  $(document).on('blur', '#dato_articulo', function (event) {
  
  var td = $(this).parent();
  
  var dato_articulo = $(this).val();
  
  var tipo_articulo = $(this).attr('tipo_articulo');
  
  td.css('min-width', '');
  
  var codigo_articulo = $(this).attr('cod');
  
		if(tipo_articulo == 'descripcion'){		
	td.parent().html('<span cod="' + codigo_articulo + '" class="cambiar_dato fa fa-edit fa-3x" tipo_articulo="' + tipo_articulo + '" dato_articulo="'+ dato_articulo + '"></span>');
		}else{
			if(tipo_articulo != 'categoria'){			
	td.html('<span cod="' + codigo_articulo + '" class="cambiar_dato" tipo_articulo="' + tipo_articulo + '" dato_articulo="'+ dato_articulo + '" style="white-space: normal;">' + dato_articulo + '</span>');	
			}
		}

		if(tipo_articulo == 'activo'){
		if(Number(dato_articulo) == 0){
	td.html('<span cod="' + codigo_articulo + '" class="cambiar_dato fa fa-lock btn btn-danger" tipo_articulo="activo" dato_articulo="0" style="font-size:3rem"></span>');
		}else{
	td.html('<span cod="' + codigo_articulo + '" class="cambiar_dato fa fa-check btn btn-primary" tipo_articulo="activo" dato_articulo="1" style="font-size:3rem"></span>');
		}
		} 
	
	var noelim = 1;
		
		if(tipo_articulo == 'disminuir' || tipo_articulo == 'aumentar' || tipo_articulo == 'disminuir0'){
	if(Number(dato_articulo) == 0){
	var noelim = 0;
	td.html('<strong class="text-danger">&iquest;Seguro de eliminar?</strong><br /><br /><span cod="' + codigo_articulo + '" class="cambiar_dato fa-2x" tipo_articulo="disminuir0" dato_articulo="' + dato_articulo + '" id="disminuir"><i class="fa fa-minus-square-o"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span cod="' + codigo_articulo + '" class="cambiar_dato fa-2x" tipo_articulo="aumentar" dato_articulo="' + dato_articulo + '" id="aumentar"><i class="fa fa-plus-square-o"></i></span>');
	}else{
		
	td.html(dato_articulo + '<br /><br /><span cod="' + codigo_articulo + '" class="cambiar_dato fa-2x" tipo_articulo="disminuir" dato_articulo="' + dato_articulo + '" id="disminuir"><i class="fa fa-minus-square-o"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span cod="' + codigo_articulo + '" class="cambiar_dato fa-2x" tipo_articulo="aumentar" dato_articulo="' + dato_articulo + '" id="aumentar"><i class="fa fa-plus-square-o"></i></span>');
	
		}
	
			if(tipo_articulo == 'disminuir0'){
		var noelim = 1;
		td.parent().hide();
			}	
	
		}

  var dato_articulo_a = $('#valt').val();
  
  var venart = $('#venart').val();
  
  	if(venart == '1'){
  var vendido_articulo = 0;
  	}else{
  var vendido_articulo = 1;
  	}
  
  if((dato_articulo != dato_articulo_a || tipo_articulo == 'categoria' || tipo_articulo == 'activo') && noelim == 1){
  
  
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
				if(e == 1){
			var color = '#dc3545';
				}else{
			var color = '#28a745';
			$('#dato_articulo').remove();
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

  	$(document).ready(function() {

    $(document).on('click', '#calcal, #cerrcal', function () {	
		
	  $(".calculadora").toggle("slow");


		});



		$(document).on('click', '.categoria_articulo', function () {
  	
  	var cat = $(this).attr('dato_articulo');
  	var cod = $(this).attr('cod');
  	var catart = $(this).parent();
  	
  	 $.ajax({
		  method: "POST",	
		  url: "index.php?cat=1",
		  data: {
		  cat: cat,
		  cod: cod
		  }
			})
			.done(function(ct){
		catart.html(ct);
			if(cod != 1){
		$('#dato_articulo').trigger("blur");
			}
		
			})
			.fail(function() {

			})
  
  	});		



	$(document).on('click', '.verdesc', function () {
  	
		$('#cerrarimg').attr('id', 'cerrardesc');
		$('#elpedLongTitle').text($(this).text());
		$('#text-ped').html('<small>' + $(this).attr('desc') + '</small>');
		$('#cerrarped').hide();
		$('#numped').hide();
		setTimeout(function(){$('#page-top').attr('class', 'modal-open');},1000);

  });
  
  $(document).on('click', '#cerrardesc', function () {
  	
		$(this).attr('id', 'cerrarimg');

  });		
  	
  	
});



$(function(){
    $(".val").click(function(e){
         e.preventDefault();
          var span = $(this).attr("data");
          $(".screen").append(span);
          $(".outcome").val($(".outcome").val() + span);
          return false;
    });

     $(".equal").click(function(){
     $(".outcome").val(eval($(".outcome").val()));
     var rdo = eval($(".outcome").val());
     if(rdo == 'Infinity'){rdo = '&infin;';}
     if(rdo == '-Infinity'){rdo = '-&infin;';}
          $(".screen").html(rdo);
     });

     $(".clear").click(function(){
          $(".outcome").val("");
          $(".screen").html("");
     });

     $(".min").click(function(){
         $(".cal").stop().animate({width: "0px", height: "0px", marginLeft: "700px", marginTop: "1000px"}, 500);
        setTimeout(function(){$(".cal").css("display", "none")}, 600);
     });

     $(".close").click(function(){
          $(".cal").css("display", "none");
     })
});

	
	setTimeout(function(){
		var html = $('#columnas_me').html();
		$('#articulos').before(html);
		$('#columnas_me').html('');
  },3000);

/*

var options = {
      body: theBody,
      icon: theIcon
  }
  var n = new Notification(theTitle,options);
  setTimeout(n.close.bind(n), 5000); 
  
*/

//Notification.requestPermission().then(function(result){});

/*if(Notification.permission !== "granted"){
    
alert('Acepta las notificaciones mi vida');

}*/

$(window).on('load',function(){
var bal = $('#balance_pie').text();
if(bal != ''){
if(parseFloat(bal) < 0){
var bal = '<span class="text-danger">RD$:' + bal + '</span>';
}else{
var bal = 'RD$:' + bal;
}

$('#balance_menu').html('EL BALANCE DE CAPITAL ES DE ' + bal);
}
});