#!/bin/bash

BMON_FOLDER=/opt/bmonitor

#
# instalando script de startup
# 
function chk(){
	cp bmonitor /etc/init.d	
	chmod +x /etc/init.d/bmonitor
	chkconfig --add bmonitor
	chkconfig bmonitor on
}

function usradd(){
	useradd -m zabbix
	usermod -s /bin/bash zabbix
	usermod -G oinstall zabbix
}

#
# 
#
function installFiles(){
	#criando
	mkdir -p $BMON_FOLDER
	#copiando 
	cp -r ./* $BMON_FOLDER/
	chown zabbix. -R $BMON_FOLDER
	ln -s $BMON_FOLDER/conf/bmonitor.conf /etc
}

usradd;
installFiles;
chk;

echo "Para executar digite:  /etc/init.d/bmonitor start"
echo "Para parar digite:  /etc/init.d/bmonitor stop"
