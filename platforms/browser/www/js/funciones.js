$(document).ready(inicio);
        // Creo el array
        lista_compra=[];
        
        function inicio(){ 
        	// Creo los eventos
        	$("#guardar").click(validar);
        	$("#tarea").keypress(teclado);
        	leer_guardado();
        }
        function leer_guardado(){
        	// Leo el localstorage (datos locales)
        	leido=localStorage.lista;                    	
        	if (leido!=undefined && leido.length>0 && leido!=null){
        		// Si hay datos guardados
        		lista_compra=leido.split("**");
        		rellenar_lista();
        	}
        }
        function rellenar_lista(){
        	$("#div_lis").empty();
        	for (k=0; k<lista_compra.length;k++){
        		$("#div_lis").append("<div class='linea'><p><input type='checkbox' onclick='comprobar(this)' value="+lista_compra[k]+" >"+lista_compra[k]+"<img src='img/btn_delete.png' class='btn_delete' onclick='borrar(this)'></p></div>");
        	}

        }
        function guardar_datos(){
        	// Guardo datos locales, pero antes los convierto a texto
        	conversion=lista_compra.join("**");
        	localStorage.lista=conversion;
        }
        function teclado(e){
        	// Detecto la pulsación del enter (código ASCII: 13)
        	if (e.keyCode==13){
        		validar();
        	}                    	
        }
        function validar(){
        	cosa=$("#tarea").val();
        	if (lista_compra.indexOf(cosa.toLowerCase())<0 && cosa.length>0){
        		lista_compra.push(cosa);
        		$("#div_lis").append("<div class='linea'><p><input type='checkbox' onclick='comprobar(this)' value="+cosa+" >"+cosa+"<img src='img/btn_delete.png' class='btn_delete' onclick='borrar(this)'></p></div>");
        		guardar_datos();
        	}
        	$("#tarea").val("").focus();
        }
        function borrar(e){
        	// Borro el dato del array (con splice) y del html (con remove)
        	buscar=$(e).parent().index();
        	lista_compra.splice(buscar,1);
        	$(e).parent().remove();
        	guardar_datos();
        }
        function comprobar(e){
	        if ($(e).is(":checked")) {
	        	buscar = $(e).val()
	        	$(e).parent().css("text-decoration","line-through");
	        	console.log($(e).parent().css("text-decoration"));
		    }
		    if (!$(e).is(":checked")) {
	        	buscar = $(e).val()
	        	$(e).parent().css("text-decoration","none");
	        	console.log($(e).parent().css("text-decoration"));
		    }
        }
