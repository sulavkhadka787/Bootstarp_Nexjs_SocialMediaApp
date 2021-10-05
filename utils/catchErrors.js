const catchErrors = (error) => {
  let errorMsg = "";

  if (error.response) {
    //if the request was made and the server did not respond with a status code in the range of 2xx

    errorMsg = error.response.data;
    console.error("error.response==>>>>>", errorMsg);
  } else if (error.request) {
    //if the request was made and no response was received from the server
    errorMsg = error.request;
    console.error("error.request==>>>>>", errorMsg);
  } else {
    //if something else happened  while making the request
    errorMsg = error.message;
    console.error(errorMsg);
  }

  return errorMsg;
};

export default catchErrors;
