class Wait {
  now = (MS = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, MS);
    });
  };
}

export default Wait;
