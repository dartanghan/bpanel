# BouwenZBX Gateway

import urllib2
import json

def requestZBXData( request_query ):
	c = urllib2.Request('http://www.bouwen.com.br/bmonitor/api_jsonrpc.php', request_query, {'Content-Type': 'application/json'})
	d = urllib2.urlopen(c)
	data = d.read()
	return data
