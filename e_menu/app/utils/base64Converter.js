// import { Buffer } from "buffer";

// const base64Encode = (string) => {
//   // let buff = new Buffer.from(string);
//   // return buff.toString('base64');
//   return btoa(
//     encodeURIComponent(str).replace(
//       /%([0-9A-F]{2})/g,
//       function toSolidBytes(match, p1) {
//         return String.fromCharCode("0x" + p1);
//       }
//     )
//   );
// };

// const base64Decode = (string) => {
//   // let buff = new Buffer.from(string, 'base64');
//   // return buff.toString('ascii');
//   return decodeURIComponent(
//     atob(str)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );
// };

// export default {
//   base64Encode,
//   base64Decode,
// };
