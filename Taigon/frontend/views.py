from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')

def bad_request(request, exception):
    return redirect('')