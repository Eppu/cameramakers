function sendMail(formState) {
  return fetch('https://hj8jn2gu90.execute-api.eu-west-1.amazonaws.com/v1a', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(formState),
  });
}

export default sendMail;
