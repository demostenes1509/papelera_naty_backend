module.exports = (promises) => {

    var result = Promise.resolve();
    promises.forEach(promise => {
      result = result.then(() => task());
    });
    return result;

}
  