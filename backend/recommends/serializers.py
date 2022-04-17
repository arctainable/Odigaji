from rest_framework import serializers
from .models import Taste
from cities.models import City, Visit

class Taste_serializer(serializers.ModelSerializer):

    class Meta:
        model = Taste
        fields = (
            "seasons",
            "mnt_sea",
            "urb_rur",
            "comp",
            "impo",
            "paint",
            "movie",
            "trans",
            "plan",
            "mor_eve",
            "get_seasons_display",
            "get_mnt_sea_display",
            "get_urb_rur_display",
            "get_comp_display",
            "get_impo_display",
            "get_paint_display",
            "get_movie_display",
            "get_trans_display",
            "get_plan_display",
            "get_mor_eve_display",
        )
