from django.shortcuts import render,redirect
from . models import Source, UserIncome
from userpreferences.models import Userpreference
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
# Create your views here.

@login_required(login_url='/authentication/login')
def index(request):
    sources= Source.objects.all()
    income= UserIncome.objects.filter(owner=request.user)
    try:
        currency = Userpreference.objects.get(user=request.user).currency
    except Userpreference.DoesNotExist:
        currency = 'INR-Indian rupees' 
    context={
        'income': income,
        'currency':currency
    }
    return render(request,'income/index.html',context)




def add_expense(request):
    sources = Source.objects.all()
    context = {
        'sources': sources,
        'values': request.POST
    }
    if request.method == 'GET':
        return render(request, 'income/add-income.html', context)

    if request.method == 'POST':
        amount = request.POST['amount']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'income/add-income.html', context)
        description = request.POST['description']
        date = request.POST['income_date']
        source = request.POST['source']

        if not description:
            messages.error(request, 'description is required')
            return render(request, 'income/add-income.html', context)

        UserIncome.objects.create(owner=request.user, amount=amount, date=date,
                               source=source, description=description)
        messages.success(request, 'Income saved successfully')

        return redirect('income')

def income_edit(request, id):
    income=UserIncome.objects.get(pk=id)
    sources = Source.objects.all()
    context={
        'income':income,
        'values':income,
        'sources': sources
    }
    
    if request.method=='GET':
        
        return render(request,'income/edit-income.html',context)
    if request.method=='POST':
        amount = request.POST['amount']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'expenses/edit-income.html', context)
        description = request.POST['description']
        date = request.POST['income_date']
        source = request.POST['source']

        if not description:
            messages.error(request, 'description is required')
            return render(request, 'expenses/edit-income.html', context)
        income.owner=request.user
        income.amount=amount
        income.date=date
        income.source=source
        income.description=description
        income.save()
        messages.success(request, 'Income saved successfully')

        return redirect('income')
    



def delete_income(request,id):
    income=UserIncome.objects.get(pk=id)
    income.delete()
    messages.success(request,'income removed')
    return redirect('income')

# def search_income(request):
#     if request.method == 'POST':
#         search_str = json.loads(request.body).get('searchText')
#         income = UserIncome.objects.filter(
#             amount__istartswith=search_str, owner=request.user) | UserIncome.objects.filter(
#             date__istartswith=search_str, owner=request.user) | UserIncome.objects.filter(
#             description__icontains=search_str, owner=request.user) | UserIncome.objects.filter(
#             category__icontains=search_str, owner=request.user)
#         data = income.values()
#         return JsonResponse(list(data), safe=False)
    