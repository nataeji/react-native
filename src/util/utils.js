export default {
  cutString : (str, length = 20) => {
    if(str.length < length){
      return str;
    }
    return `${str.substr(0, length)} ...`;
  },
}
