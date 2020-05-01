from datetime import date, datetime


def price_calculator(service, data):
    final_price = service.price

    now = date.today()
    deadline_price_mutiplyer = service.deadline_price
    is_meeting = data.get('meeting_date') or False
    deadline = data.get('deadline_date') or False

    if deadline:

        deadline_date = datetime.strptime(deadline, "%m/%d/%Y").date()
        diff_in_days = abs((now - deadline_date).days)
        calc = deadline_price_mutiplyer * (14 - diff_in_days)
        final_price = calc + final_price

    return final_price
