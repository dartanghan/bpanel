# Create your views here.
from django.http import HttpResponse
from bmonitor.easyInstall import *
import json



def installerForm(request):
	return HttpResponse("Installer form")
	
def index(request):
	return installerForm(request)

# Obter o instalador para download
def download( request, hostdata ):
	if ( len( hostdata ) > 0 ):
		jsonhost=json.loads(hostdata)
		return HttpResponse(buildEasyInstallPackage(jsonhost))
	else: #SEM o JSON nao fazemos nada!
		return installerForm(request)
