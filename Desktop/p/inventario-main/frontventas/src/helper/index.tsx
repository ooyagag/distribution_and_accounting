export const setFormikErrors = (errorObject : any, setErrorFunction : any) => {
    const errors = Object.keys(errorObject);
    errors.map((item) => ( setErrorFunction(item.toLowerCase(), errorObject[item].join('\r\n'))
    ));
  };