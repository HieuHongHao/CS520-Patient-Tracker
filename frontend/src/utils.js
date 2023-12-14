export default function formatDate(inputDate) {
    const dateParts = inputDate.split('-');
    const day = parseInt(dateParts[1], 10);
    const month = parseInt(dateParts[0], 10);
    const year = parseInt(dateParts[2], 10);
  
    const suffix = getNumberSuffix(day);
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const monthName = monthNames[month - 1];
  
    return `${day}${suffix} ${monthName} ${year}`;
  }
  
  function getNumberSuffix(number) {
    if (number >= 11 && number <= 13) {
      return 'th';
    }
  
    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  

  