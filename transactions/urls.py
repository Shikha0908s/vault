from django.urls import path
from .views import (
    TransactionListCreateView,
    TransactionDetailView,
)

urlpatterns = [
    path("", TransactionListCreateView.as_view(), name="transactions"),
    path("<int:pk>/", TransactionDetailView.as_view(), name="transaction-detail"),
]