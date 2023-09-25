export const trimLineBreaks = (term: string) => {
  return term.replace(/(\r\n|\n|\r)/gm, '');
};

export const AVAILABLE_VALUES =
  /(FWC (?:[0-9]|1[0-9]|2[0-4])(?:, (?:[0-9]|1[0-9]))*|(?:QAT|ECU|SEN|NED|ENG|IRN|USA|WAL|ARG|KSA|MEX|POL|FRA|AUS|DEN|TUN|ESP|CRC|GER|JPN|BEL|CAN|MAR|CRO|BRA|SRB|SUI|CMR|POR|GHA|URU|KOR) (?:[1-9]|1[0-9]))\b/g;
