export const timeConvert = (n) => {
  let num = n;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  let time = rhours > 0 ? `${rhours}h ${rminutes}m` : `${rminutes}m`;
  return time;
};
