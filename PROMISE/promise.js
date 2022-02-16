// Promise.resolve().then(() => console.log("then"));

function fetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ response: { data: "cheesburger" } });
    }, 2000);
  });
}

const promise = fetch();

promise.then((cheesburger) => {
  console.log(cheesburger);
});

promise.catch((error) => {
  console.log(error);
});

promise.finally(() => {});

Promise.race([fetch(), fetch()]).then()
