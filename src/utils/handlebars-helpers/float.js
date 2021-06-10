function float(val) {
  if (arguments.length !== 2) {
    throw new Error('Передайте одно значение');
  }

  return parseFloat(val);
}

module.exports = float;
