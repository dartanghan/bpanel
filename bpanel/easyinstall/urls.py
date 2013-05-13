from django.conf.urls.defaults import *
from easyinstall import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^download/(?P<hostdata>.*)$', views.download, name='download'),
)
