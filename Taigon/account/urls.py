from rest_framework import routers
from .api import AccountViewset

router = routers.DefaultRouter()
router.register('api/account', AccountViewset, 'account')

urlpatterns = router.urls