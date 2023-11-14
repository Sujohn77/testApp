import moment from "moment";
import {momentLocalesFileMappings} from "./translationFileMappings";

const DATE_FORMAT = "YYYY-DD-MM";

// 💖 Here we tell moment to change locale in runtime
export const setMomentLocale = async locale => {
  momentLocalesFileMappings[locale]();
  return moment().locale(locale);
};

export function parseUnixDate(unixDate) {
  return moment.unix(unixDate).format(DATE_FORMAT);
}

export const nowUnixDate = () => {
  return moment().unix();
};
