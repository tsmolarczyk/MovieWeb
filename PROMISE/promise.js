// Promise.resolve().then(() => console.log("then"));

const promise = fetch(
  "https://mocki.io/v1/b7bdd6fb-da64-4861-95ff-39132d5efe05"
);

promise.then((respone) => {
  console.log(response);
});

promise.catch((error) => {
  console.log(error);
});

promise.finally(() => {});
