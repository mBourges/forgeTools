import decode from 'jwt-decode';

function getTokenExpirationDate(token) {
  const decoded = decode(token);

  if (!decoded.exp) {
    return null;
  }

  const date = new Date(0);

  date.setUTCSeconds(decoded.exp);

  return date;
}

function isTokenExpired(token) {
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;

  if (date === null) {
    return false;
  }

  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
}

function calculateTokenTimeLeft(token) {
  const decoded = decode(token);

  if (!decoded.exp) {
    return -1;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  return (decode(token).exp - currentTimestamp) * 1000;
}

const mainExport = {
  calculateTokenTimeLeft,
  getTokenExpirationDate,
  isTokenExpired
};

export default mainExport;
module.exports = mainExport;
