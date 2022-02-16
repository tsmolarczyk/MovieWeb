// then('good')
// catch('bad')

// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("foo");
//   }, 300);
// });

// myPromise
//   .then(good, bad)
//   .then(handleResolvedB, handleRejectedB)
//   .then(handleResolvedC, handleRejectedC);

// // Promise.resolve().then(() => console.log("then"));

// function fetch() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve({ response: { data: "cheesburger" } });
//     }, 2000);
//   });
// }

// const promise = fetch();

// promise.then((cheesburger) => {
//   console.log(cheesburger);
// });

// promise.catch((error) => {
//   console.log(error);
// });

// promise.finally(() => {});

// Promise.race([fetch(), fetch()]).then()

// function job() {
//   const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(function ({ consolelog("hello world")}
//     ;
//     }, 2000);
//   });
// }

// job();

// function job(data) {
//   return new Promise(function (resolve, reject) {
//     if (isNaN(data)) {
//       reject("error");
//       return;
//     } else if (data % 2 != 0) {
//       setTimeout(function () {
//         resolve("odd");
//       }, 1000);
//     } else {
//       setTimeout(function () {
//         reject("even");
//       }, 2000);
//     }
//   });
// }
// console.log(job("col"));
// console.log(job(122));
