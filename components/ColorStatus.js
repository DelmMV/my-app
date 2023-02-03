export const ColorStatus = (order) => {
  if (order.Status === 7) {
    return {
      color: "grey",
    };
  } else if (order.Status === 5) {
    return {
      color: "#4169E1",
    };
  } else if (order.Status === 6) {
    return {
      color: "#00FF00",
    };
  } else if (order.Status === 12) {
    return {
      color: "#FFD700",
    };
  }
};
