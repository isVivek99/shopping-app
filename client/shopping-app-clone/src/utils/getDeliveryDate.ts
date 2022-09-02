export const getDeliveryDate = () => {
  const todaysDate = new Date();
  const currentDate = todaysDate.getDate();
  const currentMonth = todaysDate.getMonth();
  const currentYear = todaysDate.getFullYear();
  const deliveryDate = new Date(currentYear, currentMonth, currentDate + 3);
  return getDeliveryDateString(deliveryDate);
};

const getDeliveryDateString = (deliveryDate: any) => {
  const mm = getMonth(deliveryDate.getMonth());
  const dd = deliveryDate.getDate();

  return [(dd > 9 ? '' : '0') + dd, mm, deliveryDate.getFullYear()].join(' ');
};

const getMonth = (monthIndex: number) => {
  console.log(monthIndex, typeof monthIndex);

  switch (monthIndex) {
    case 0:
      return 'January';

    case 1:
      return 'February';

    case 2:
      return ' March';

    case 3:
      return 'April';

    case 4:
      return 'May';

    case 5:
      return 'June';

    case 6:
      return 'July';

    case 7:
      return 'August';

    case 8:
      return 'September';

    case 9:
      return 'October';

    case 10:
      return 'November';

    case 11:
      return 'December';

    default:
      return 'jan';
  }
};
