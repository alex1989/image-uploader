class WrongImageFile extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongImageFile';
  }
}

module.exports = {
  WrongImageFile,
}
