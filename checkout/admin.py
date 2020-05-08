from django.contrib import admin
from .models import OrderLineModel, OrderModel

# Register your models here.


class OrderLineAdminInline(admin.TabularInline):
    model = OrderLineModel


class OrderAdmin(admin.ModelAdmin):
    inlines = (OrderLineAdminInline,)


admin.site.register(OrderModel, OrderAdmin)
