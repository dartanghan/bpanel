# BouwenZBX Gateway

import urllib2
import json

def requestZBXData( jsonreq ):
	c = urllib2.Request('http://www.bouwen.com.br/bmonitor/api_jsonrpc.php', jsonreq, {'Content-Type': 'application/json'})
	d = urllib2.urlopen(c)
	data = d.read()
	print  data
	return data
	
#requestZBXData( '{"jsonrpc":"2.0","method":"user.login","params":{"user":"teste","password":"teste"},"id":1}' )
#http://172.16.1.114/easyinstall/zbxreq/?jsonreq={"jsonrpc":"2.0","method":"user.login","params":{"user":"dartanghan","password":"bouwen$001"},"id":1}
