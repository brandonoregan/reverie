from django.conf import settings

from .models import Product


def formatStripeLineItem(itemsArray):
    """
    Accepts an array of item objects and converts each object into an acceptable line item for Stripe API.
    """

    print("CART ITEMS: ", itemsArray)
    line_items = []
    for item in itemsArray:
        unit_amount = int(float(item["price"]) * 100)

        line_items.append(
            {
                "price_data": {
                    "currency": "aud",
                    "unit_amount": unit_amount,
                    "product_data": {
                        "name": item["name"],
                        "images": [settings.REACT_SITE_URL + item["image"]],
                    },
                },
                "quantity": item["quantity"],
            }
        )

    return line_items


def updateInventory(purchased_products):
    """
    Accepts a list of products and updates the data base inventory
    """
    for product in purchased_products:
            db_product = Product.objects.get(name=product.description)
            db_product.stock_count -= product.quantity
            db_product.save()


