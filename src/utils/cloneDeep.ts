export default function cloneDeep(
  obj: unknown,
  objectSettings: {
    usePrototype?: false | 'reuse' | 'collect';
    cloneDescriptors?: boolean;
    ignoreProps?: string[];
  } = {}
): unknown {
  const valueType = Object.prototype.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();

  // примитивы и функции
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (valueType === 'object') {
    const { usePrototype, cloneDescriptors, ignoreProps } = {
      usePrototype: false,
      cloneDescriptors: true,
      ignoreProps: [],
      ...objectSettings,
    };

    const clone = Object.create(
      usePrototype === 'reuse' ? Object.getPrototypeOf(obj) : Object.prototype,
      {}
    );

    const cloneProp = (target: Record<string, unknown>, prop: string, isOwnProp: boolean) => {
      const totalObj = target;

      if (!cloneDescriptors || !isOwnProp) {
        totalObj[prop] = cloneDeep((obj as Record<string, undefined>)[prop], objectSettings);
        return;
      }

      const descriptor = Object.getOwnPropertyDescriptor(obj, prop);

      if (descriptor) {
        if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
          descriptor.value = cloneDeep(descriptor.value, objectSettings);
        }

        Object.defineProperty(totalObj, prop, descriptor);
      }
    };

    // for-in без `hasOwnProperty` — нужен
    /* eslint-disable */
    for (const prop in obj) {
      if ((ignoreProps as string[]).includes(prop)) {
        continue;
      }

      const isOwnProp = Object.prototype.hasOwnProperty.call(obj, prop);

      if (usePrototype === 'collect') {
        cloneProp(clone, prop, isOwnProp);
      } else if (isOwnProp) {
        cloneProp(clone, prop, isOwnProp);
      }
    }
    /* eslint-enable */

    return clone;
  }

  if (valueType === 'array') {
    return (obj as []).map((val) => cloneDeep(val));
  }

  if (valueType === 'set') {
    const clone = new Set();

    (obj as Set<unknown>).forEach((item: unknown) => clone.add(cloneDeep(item)));

    return clone;
  }

  if (valueType === 'map') {
    const clone = new Map();

    (obj as Map<unknown, unknown>).forEach((value: unknown, key: unknown) =>
      clone.set(key, cloneDeep(value))
    );

    return clone;
  }

  if (valueType === 'date') {
    return new Date((obj as Date).valueOf());
  }

  throw new Error(`Клонирование значения типа ${valueType} не поддерживается`);
}
