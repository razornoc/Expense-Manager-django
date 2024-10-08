from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path('',views.index,name="income"),
    path('add-income',views.add_expense,name="add-income"),
    path('income-edit/<int:id>',views.income_edit,name="income-edit"),
    path('income-delete/<int:id>',views.delete_income,name="income-delete"),
    # path('search-income/',csrf_exempt(views.search_income),name="search_income")
]
