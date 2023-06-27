export const GeneralFetch = async (
  authToken,
  method,
  Url,
  bodyParams,
  isLoding,
  onSuccess,
  onError
) => {
  console.log("Url ==>>   ", Url);
  console.log(
    "BodyParams ==>>   ",
    method == "POST" ? JSON.stringify(bodyParams) : "no body for get"
  );
  var body = JSON.stringify(bodyParams);
  var myHeaders = new Headers({
    "Content-Type": "application/json",
    "x-auth-token": authToken,
  });
  var requestOptions =
    method == "POST" && bodyParams != null
      ? {
          method: method,
          headers: myHeaders,
          body: body,
          redirect: "follow",
        }
      : {
          method: method,
          headers: myHeaders,
          redirect: "follow",
        };
  try {
    isLoding(true);
    await fetch(Url, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        isLoding(false);
        console.log("Response ==>>   ", JSON.stringify(responseJson));
        onSuccess(responseJson);
      })
      .catch(function (error) {
        onError(error.message);
        isLoding(false);
      });
  } catch (error) {
    isLoding(false);
    console.log("GeneralFetch try catch-->  ", error);
  }
};
