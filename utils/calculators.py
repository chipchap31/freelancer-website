from datetime import date, datetime


class PriceCalculator():

    """
    Calculates the quote price depending on the services price 
    and the data provided by the user
    """

    def __init__(self, total=0):
        self.total = total

    def process_data(self, service_data, user_data):
        # todays date
        today = date.today()

        deadline_price_mult = service_data.deadline_price
        concept_price_mult = service_data.concept_price

        deadline_date = user_data.get('deadline_date') or False

        if deadline_date:
            deadline_date = datetime.strptime(deadline_date, "%m/%d/%Y").date()

            # calculate the difference between now and deadline data in days
            diff_in_days = abs((today - deadline_date).days)

            multiplier = (24 - diff_in_days)

            self.total = multiplier * deadline_price_mult

    def get_total(self):
        return self.total
