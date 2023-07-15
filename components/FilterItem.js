export function FilterItem(value, item) {
  if (value === null) {
    return item;
  } else if (value === 13) {
    return [
      ...item.filter(
        (e) => e.Status === 5 || e.Status === 6 || e.Status === 12
      ),
    ];
  } else {
    return [...item.filter((e) => e.Status === value)];
  }
}
