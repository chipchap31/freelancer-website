from datetime import date, datetime


def price_calculator(service, data):
    final_price = service.price
    # get todays date
    now = date.today()

    deadline_price_mult = service.deadline_price
    concept_price_mult = service.concept_price

    is_meeting = data.get('meeting_date') or False
    deadline = data.get('deadline_date') or False
    concept_amount = data.get('concept_amount')
    if deadline:

        deadline_date = datetime.strptime(deadline, "%m/%d/%Y").date()
        # calculate the difference between now and deadline data in days
        diff_in_days = abs((now - deadline_date).days)

        final_price = deadline_price_mult * \
            (14 - diff_in_days) + final_price

    # concept_multiplyer
    final_price = concept_price_mult * concept_amount
    return final_price


class PriceCalculator():

    """
    Calculates the quote price depending on the services price 
    and the data provided by the user
    """

    def __init__(self, total=0):
        self.total = total
        self.service_data = service_data

    def calculate(self, service_data, user_data):
        return
