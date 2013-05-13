#!/bin/bash
#########################
# BOUWEN Technologies	#
# Monitoramento Postfix #
# postfix.bmonitor		#
#########################

MAILLOG=/var/log/maillog
DAT2=$(mktemp)
PFLOGSUMM=/opt/zimbra/libexec/pflogsumm.pl
ZABBIX_CONF=/etc/zabbix/zabbix_agentd.bouwen.conf 
TAIL=/usr/bin/tail	
$TAIL -n500000 $MAILLOG | grep "`date --date '-1min' +%b' '%e' '%H':'%M`" | $PFLOGSUMM -h 0 -u 0 --no_bounce_detail --no_deferral_detail --no_reject_detail --no_no_msg_size --no_smtpd_warnings > $DAT2

case $1 in
"pfreceived") 
	grep -m 1 received $DAT2|cut -f1 -d"r"
	;;
"pfdelivered") 
	grep -m 1 delivered $DAT2|cut -f1 -d"d"
	;;
"pfforwarded") 
	grep -m 1 forwarded $DAT2|cut -f1 -d"f"
	;;
"pfdeferred") 
	grep -m 1 deferred $DAT2|cut -f1 -d"d"
	;;
"pfbounced") 
	grep -m 1 bounced $DAT2|cut -f1 -d"b"
	;;
"pfrejected") 
	grep -m 1 rejected $DAT2|cut -f1 -d"r"
	;;
"pfrejectwarnings") 
	grep -m 1 "reject warnings" $DAT2|cut -f1 -d"r"
	;;
"pfheld") 
	grep -m 1 held $DAT2|cut -f1 -d"h"
	;;
"pfdiscarded") 
	grep -m 1 discarded $DAT2|cut -f1 -d"d"
	;;
"pfbytesreceived") 
	grep -m 1 "bytes received" $DAT2 | sed 's/k/000/g' | sed 's/m/000000/g' |cut -f1 -d"b"
	;;
"pfbytesdelivered") 
	grep -m 1 "bytes delivered" $DAT2 | sed 's/k/000/g' | sed 's/m/000000/g' |cut -f1 -d"b"
	;;
esac;