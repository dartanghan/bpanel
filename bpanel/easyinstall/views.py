# Create your views here.
from django.http import HttpResponse
from django.template import Context, loader
from bmonitor.easyInstall import *
from bmonitor.BmonitorZBX_gateway import *
import json
import mimetypes


def installerForm(request):
	template = loader.get_template('easyinstall/core.html')
	context = Context({})
	return HttpResponse(template.render(context))
	
def index(request):
	return installerForm(request)

# Gateway para o ZABBIX
def zbx_request(request, jsonreq):
	return HttpResponse(requestZBXData(jsonreq))

# Obter o instalador para download
def download( request, hostdata ):
	if ( len( hostdata ) > 0 ):
		jsonhost=json.loads(hostdata)
		buildEasyInstallPackage(jsonhost)
 		fp = open('/tmp/bmonitor/'+jsonhost['host_name']+'.zip', 'rb')
 		response = HttpResponse(fp.read())
 		fp.close()
 		type, encoding = mimetypes.guess_type('/tmp/bmonitor/'+jsonhost['host_name']+'.zip')
 		if type is None:
 			type = 'application/octet-stream'
 		response['Content-Type'] = type
 		if encoding is not None:
 			response['Content-Encoding'] = encoding
 		response['Content-Disposition'] = 'attachment; filename=' + jsonhost['host_name']+'.zip'
 		return response
	else: #SEM o JSON nao fazemos nada!
		return installerForm(request)


