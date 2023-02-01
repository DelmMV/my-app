export function FilterItem(value, item) {
  if (value === null) {
    return item;
  } else {
    return [...item.filter((e) => e.Status === value)];
  }
}
