import moment from 'moment';

export const getTimeFromNow = (unixEpoch: number | null): string => {
  if (unixEpoch === null) return '-';
  return moment.unix(unixEpoch).fromNow();
};

// unix expoch to Jun 09 2024 18:07:47
export const getFormattedDate = (unixEpoch: number | null): string => {
  if (unixEpoch === null) return '-';
  return moment.unix(unixEpoch).format('MMM DD YYYY HH:mm:ss');
};
