from django.db.models import Sum
from datetime import date
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from transactions.models import Transaction
from transactions.serializers import TransactionSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):
    today = date.today()

    income = Transaction.objects.filter(
        user=request.user,
        type="income",
        ).aggregate(
        total=Sum("amount")
        )

    total_income = income["total"] or 0

    expense = Transaction.objects.filter(
        user=request.user,
        type="expense",
        ).aggregate(
            total=Sum("amount")
        )

    total_expense = expense["total"] or 0

    transaction_count = Transaction.objects.filter(
        user=request.user
    ).count()

    balance = total_income - total_expense

    recent_transactions = Transaction.objects.filter(
        user=request.user
    ).order_by(
        "-created_at"
    )[:5]

    serializer = TransactionSerializer(
        recent_transactions,
        many=True,
    )

    

    category_breakdown = (
        Transaction.objects.filter(
            user=request.user,
            type="expense",
        )
        .values("category")
        .annotate(
            total=Sum("amount")
        )
    )
    monthly_income = (
        Transaction.objects.filter(
            user=request.user,
            type="income",
            transaction_date__year=today.year,
            transaction_date__month=today.month,
        )
        .aggregate(total=Sum("amount"))
    )

    monthly_income = monthly_income["total"] or 0


    monthly_expense = (
        Transaction.objects.filter(
            user=request.user,
            type="expense",
            transaction_date__year=today.year,
            transaction_date__month=today.month,
        )
        .aggregate(total=Sum("amount"))
    )

    monthly_expense = monthly_expense["total"] or 0



   
    
    return Response({
    "balance": balance,
    "total_income": total_income,
    "total_expense": total_expense,
    "transaction_count": transaction_count,
    "recent_transactions": serializer.data,
    "category_breakdown": category_breakdown,
    "monthly_income": monthly_income,
    "monthly_expense": monthly_expense,
})
    