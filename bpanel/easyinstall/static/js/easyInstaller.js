// JAvascript usado para criar formulario para gerar
// instalador do Bmonitor Agent

var $SERVICES=[]

//Funcao para montar um formulario
function buildFormEasyInstall(){
	var $CSS = {
		"font-size": "9pt",
		"float" : "left"
	};
	var $LABEL_CSS = {
		"font-size": "10pt",
		"padding-right": "10px",
		"padding-left": "10px",
	}
	var $SELECT_CSS = {
		"font-size": "9pt",
		"width": "200px"
	}	
	

	//limpando conteudo do pageContent.
	$( "#pageContent" ).html({});
	// criando variaveis dos campos requeridos.
	var $INPUT_HOSTNAME = $('<p><label>Hostname:</label>'+
		'<input type="text" id="INPUT_HOSTNAME"></p>')
	var $INPUT_OPERSYS = $('<p><label>Sistema Operacional:</label>'+
		'<select id="INPUT_OPERSYS"><option value="LINUX">Linux</option><option value="WINDOWS">Windows</option></select></p>')
	var $INPUT_ARCH = $('<p><label>Arquitetura:</label>'+
		'<select id="INPUT_ARCH"><option value="x64">x64 - 64 Bits</option><option value="x86">x86 - 32 Bits</option></select></p>')
	var $SERVICES = $( '<hr/><p><label>Servi&ccedil;os:</label><select id="SERVICE_NAME">'+
		'<option value="postfix">PostFIX</option>'+
		'<option value="pgsql">PostGreSQL</option>'+
		'<option value="mysql">Mysql</option>'+
		'<option value="oracle">Oracle</option>'+
		'<option value="exchange">Exchange</option>'+
		'<option value="mssql">SQLServer</option>'+
		'</select>'+
		'<p><label> Insts: </label><input type="text" id="INSTANCE_NAME"/></p>'+
		'<div id="SUBMIT_SERVICE"/><fieldset><legend>Servi&ccedil;os</legend><div id="SERVICES"></fieldset></div></div>' );
	
	var $SOLICITAR_INSTALADOR = $( "<br/><hr/><br/><div id='SOLICITAR_INSTALADOR'></div>" );
	// Adicionando variaveis ao formulario
	$( "#pageContent" ).append($INPUT_HOSTNAME);
	$( "#pageContent" ).append($INPUT_OPERSYS);
	$( "#pageContent" ).append($INPUT_ARCH);
	$( "#pageContent" ).append($SERVICES);
	$( "#pageContent" ).append($SOLICITAR_INSTALADOR);
		
	$( "label" ).css($LABEL_CSS);
	$( "select" ).css($SELECT_CSS);
	$( "#SUBMIT_SERVICE" ).button({ label: "Adicionar" });
	$( "#SUBMIT_SERVICE" ).click(function(){
		var SELECT_SERVICE_NAME = $( "#SERVICE_NAME" ).val();
		var $parameters = {};
		if( SELECT_SERVICE_NAME == 'oracle' ){
			$parameters= {"ip":"localhost","port":"1521","username":"zabbix","password": "suporte"}; 
		}else if( SELECT_SERVICE_NAME == 'mysql' ){
			$parameters= {"ip":"localhost","port":"3306","username":"zabbix","password": "suporte"}; 
		}else if( SELECT_SERVICE_NAME == 'pgsql' ){
			$parameters= {"ip":"localhost","port":"5432","username":"zabbix","password": "suporte"}; 
		}
		var value = { service: $("#SERVICE_NAME").val(), instances: $("#INSTANCE_NAME").val().split(" "), parameters: $parameters };
		addService( value );
	});
	$( "#INSTANCE_NAME" ).attr('title','Insira os nomes das instancias separadas por espaco.');
	$( "#INSTANCE_NAME" ).prop('disabled', true);
	$( "#SERVICE_NAME" ).change(function(){
		if( this.value == 'oracle' ){
			$( "#INSTANCE_NAME" ).prop('disabled', false);
		}else{
			$( "#INSTANCE_NAME" ).prop('disabled', true);
		}
	});
	$( "#SOLICITAR_INSTALADOR" ).button({ label: "Solicitar instalador" }).click(function(){
		requestInstallerEasyInstall(buildJSONEasyInstall());
	});

}
// 
// services = [ {
// 	'service':"oracle", 
// 	'instances': [ "tasy","orcl","dbprod" ], 
// 	'parameters': dict([("ip","localhost"),("port","1521"),("username","zabbix"),("password","suporte")]) 
// }]

//funcao para montaro JSON de submissao
function buildJSONEasyInstall(){
	var $install_path;
	if( $("INPUT_OPERSYS").val() == 'WINDOWS' ){
		$install_path = "c:\\bmonitor\\";
	}else{
		$install_path = "/opt/bmonitor";
	}
	
	var $json_string = {
		host_name: $("#INPUT_HOSTNAME").val(),
		server_name: 'cluster.bouwen.com.br',
		oper_system: $("#INPUT_OPERSYS").val(),
		arch: $("#INPUT_ARCH").val(),
		install_path: $install_path,
		services: $SERVICES
	}
	

	var $jsno_string_teste = { 
		"host_name": "nononovo_teste.bouwen.com.br",
		"server_name": "cluster.bouwen.com.br",
		"oper_system": "WINDOWS",
		"arch" : "x64", 
		"install_path": "/opt/bmonitor",
		"services" : [ {
			"service":"postfix", 
			"instances": [], 
			"parameters":[]
		}]
	}
 
	return  JSON.stringify($json_string);



}

// adiciona um servico ao monitoramento, como:
// postfix, oracle, postgresql, etc
function addService( service ){
	$SERVICES.push( service );
	refreshServicesList();
}

function removeService( id ){
	$SERVICES.splice( id, 1 );
	refreshServicesList();
}

// redesenha a lista de servicos
function refreshServicesList(){
	$( "#SERVICES" ).html({});
	for ( i=0; i< $SERVICES.length; i++ ) {
		if( $SERVICES[i].instances && $SERVICES[i].instances.length > 0 && $SERVICES[i].instances[0] ){
			for( insts=0; insts< $SERVICES[i].instances.length; insts++ ){
				$( "#SERVICES" ).append('<p><div onclick="javascript:removeService( '+$SERVICES.indexOf($SERVICES[i])+' )" style="width: 200px" class="ui-widget ui-state-highlight"><div class="ui-icon ui-icon-circle-close" style="float: left"></div>'+$SERVICES[i].service+'['+$SERVICES[i].instances[insts]+']</div></p>');
			}
		}else{
			$( "#SERVICES" ).append('<p><div onclick="javascript:removeService( '+$SERVICES.indexOf($SERVICES[i])+' )" style="width: 200px" class="ui-widget ui-state-highlight"><div class="ui-icon ui-icon-circle-close" style="float: left"></div>'+$SERVICES[i].service+'[main]</div></p>');
		}
	}
}

//Envia o JSON para o servidor
function requestInstallerEasyInstall( $JSON_REQ ){
	//tricky, xaxixo, pog, afins...
	var easyinstall_attach = $('<iframe id="easyinstall_attach" src="" width="1" height="1" frameborder="0"/>');
	$( "#pageContent" ).append(easyinstall_attach);
	$('#easyinstall_attach').attr('src',"/easyinstall/download/"+$JSON_REQ);
}


