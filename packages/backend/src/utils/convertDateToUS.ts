export const convertDateToUS = (dateString: string) => {
  if (!dateString) return null;

  const [day, month, year] = dateString.split('/'); // Extract parts from `DD/MM/YYYY`
  return new Date(`${month}/${day}/${year}`); // Convert to `MM/DD/YYYY`
};
