from django.db import models
from django.contrib.auth.models import User


class Budget(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="budgets",
    )

    category = models.CharField(max_length=50)

    limit_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    month = models.IntegerField()

    year = models.IntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"{self.user.username} - {self.category}"