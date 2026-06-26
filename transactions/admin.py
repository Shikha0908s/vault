from django.contrib import admin
from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "amount",
        "type",
        "category",
        "transaction_date",
    )

    list_filter = (
        "type",
        "category",
        "transaction_date",
    )

    search_fields = (
        "title",
        "category",
    )

    ordering = ("-transaction_date",)