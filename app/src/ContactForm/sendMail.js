function sendMail(formState) {
  return fetch('https://edotornoee.execute-api.eu-west-1.amazonaws.com/dev/contactForm', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(formState),
  });
}

export default sendMail;
