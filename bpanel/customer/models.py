from django.db import models

class zbxhost(models.Model):
	zbxhost_name = models.CharField(max_length=512)

class zbxgroup(models.Model):
	zbxgroup_name = models.CharField(max_length=512)

class zbxuser(models.Model):
	zbxuser_login = models.CharField(max_length=256)
	zbxuser_phone = models.CharField(max_length=32)

class bill(models.Model):
	bill_value = models.DecimalField( max_digits=10, decimal_places=2 )
	bill_date = models.TimeField( auto_now=True )
	bill_paid = models.BooleanField()
	bill_paydate = models.TimeField( auto_now=False )
	bill_code = models.CharField(max_length=256)

class message(models.Model):
	msg_text = models.CharField(max_length=256)
	msg_number = models.CharField(max_length=32)
	msg_date = models.TimeField( auto_now=False )
	msg_hostname = models.CharField(max_length=512)
	bill = models.ForeignKey('bill')
	
class company(models.Model):
	company_id = models.IntegerField()
	company_name = models.CharField(max_length=256)
	
class company_bill(models.Model):
	bill = models.ForeignKey('bill')
	company = models.ForeignKey('company')
		
class company_zbxgroup(models.Model):
	zbxgroup = models.ForeignKey('zbxgroup')
	company = models.ForeignKey('company')
	

