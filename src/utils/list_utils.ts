export const GroupBy = <T, K>(array: T[], getKey: (item: T) => K) => {
  return array.reduce((map, item) => {
    const key = getKey(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
    return map;
  }, new Map<K, T[]>());
};
