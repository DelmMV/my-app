import { days } from "../utils/constans.js";

function addLeadingZero(d) {
  return d < 10 ? "0" + d : d;
}

function getUserTime(t) {
  let tr = t - 840 * 60;
  let Y = t.getFullYear();
  let M = addLeadingZero(t.getMonth() + 1);
  let D = addLeadingZero(t.getDate());
  let d = days[t.getDay()];
  let h = addLeadingZero(t.getHours());
  let m = addLeadingZero(t.getMinutes());
  return `${h}:${m}`;
}

export default getUserTime;
