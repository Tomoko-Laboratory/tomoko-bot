export default function wait(promise) {
  return promise.then((data) => [null, data]).catch((error) => [error, null]);
}
