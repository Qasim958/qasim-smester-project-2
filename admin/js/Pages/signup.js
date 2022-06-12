async function testing() {
  const response = await fetch(SIGNUP_USER_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //   "Origin": "*",
      //   "Authorization": "Bearer " + result.jwt,
    },
    body: JSON.stringify({
      username: "qasim",
      email: "qasim@admin.com",
      password: "Pass1234",
    }),
  });

  console.log(await response.json());
}
// testing();
