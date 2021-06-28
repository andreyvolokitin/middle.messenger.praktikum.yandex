import helpers from '../../helpers';

helpers.float = function float(val: string): number {
  if (arguments.length !== 2) {
    throw new Error('Передайте одно значение');
  }

  return parseFloat(val);
};
