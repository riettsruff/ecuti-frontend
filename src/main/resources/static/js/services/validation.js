const NUMERIC_REGEX = /^[0-9]*$/;

const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Handle input validation
 * @param  {Object} htmlInput  HTML Input
 * @return {Function}          Promise callback
**/
function inputValidation(htmlInput) {
  return new Promise((resolve, reject) => {
    if(htmlInput.data("required") && !htmlInput.val()) {
      return reject(`${htmlInput.data("label")} wajib diisi`);
    }

    if(htmlInput.data("format") && htmlInput.data("format") !== "PLAIN" && htmlInput.val()) {
      switch(htmlInput.data("format")) {
        case "NUMERIC":
          if(!NUMERIC_REGEX.test(htmlInput.val())) {
            return reject(`${htmlInput.data("label")} wajib berupa angka`);
          } 
        break;
        case "URL":
          if(!URL_REGEX.test(htmlInput.val())) {
            return reject(`Format ${htmlInput.data("label")} tidak valid`);
          }
        break;
        case "EMAIL":
          if(!EMAIL_REGEX.test(htmlInput.val())) {
            return reject(`Format ${htmlInput.data("label")} tidak valid`);
          }
      }
    }

    return resolve("Valid");
  });
}