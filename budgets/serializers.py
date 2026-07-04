from django.db.models import Sum
from transactions.models import Transaction
from rest_framework import serializers
from .models import Budget



class BudgetSerializer(serializers.ModelSerializer):
    spent = serializers.SerializerMethodField()
    remaining = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()
    is_over_budget = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = [
            "id",
            "category",
            "limit_amount",
            "month",
            "year",
            "created_at",
            "spent",
            "remaining",
            "progress",
            "is_over_budget",
        ]

    def get_spent(self, obj):
        spent = (
            Transaction.objects.filter(
                user=obj.user,
                category=obj.category,
                type="expense",
                transaction_date__month=obj.month,
                transaction_date__year=obj.year,
            )
            .aggregate(total=Sum("amount"))
        )

        return spent["total"] or 0

    def get_remaining(self, obj):
        return obj.limit_amount - self.get_spent(obj)

    def get_progress(self, obj):
        spent = self.get_spent(obj)

        if obj.limit_amount == 0:
            return 0

        return round((spent / obj.limit_amount) * 100, 2)

    def get_is_over_budget(self, obj):
        return self.get_spent(obj) > obj.limit_amount