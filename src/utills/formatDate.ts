export const toLocalDate = (dateString:string) => {
    const dateObject = new Date(dateString);

    const localTime = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
    return localTime
}