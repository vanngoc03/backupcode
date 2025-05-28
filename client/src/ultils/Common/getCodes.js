import { getNumbersPrice, getNumbersArea } from "./getNumnbers";

// export const getCodePrice = (totals, min, max) => {
//   return totals.map((item) => {
//     const arrMaxMin = getNumbersPrice(item.value);

//     if (arrMaxMin.length === 1) {
//       if (item.value.includes("Dưới")) {
//         return { ...item, min: 0, max: arrMaxMin[0] };
//       } else if (item.value.includes("Trên")) {
//         return { ...item, min: arrMaxMin[0], max: 9999999 };
//       }
//     }

//     // Nếu có min và max cụ thể
//     return {
//       ...item,
//       min: arrMaxMin[0],
//       max: arrMaxMin[1],
//     };
//   });
// };

// export const getCodeArea = (totals) => {
//   return totals.map((item) => {
//     const arrMaxMin = getNumbersArea(item.value);

//     if (arrMaxMin.length === 1) {
//       if (item.value.includes("Dưới")) {
//         return { ...item, min: 0, max: arrMaxMin[0] };
//       } else if (item.value.includes("Trên")) {
//         return { ...item, min: arrMaxMin[0], max: 9999999 };
//       }
//     }

//     // Nếu có min và max cụ thể
//     return {
//       ...item,
//       min: arrMaxMin[0],
//       max: arrMaxMin[1],
//     };
//   });
// };

// export const getCodes = (entry, prices, min, max) => {
//   const pricesWithMinMax = getCodePrice(prices, min, max);
//   return pricesWithMinMax.filter();
// };

// export const getCodesArea = (arrMinMax, areas) => {
//   const areasWithMinMax = getCodeArea(areas);
//   return areasWithMinMax.filter(
//     (item) =>
//       (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) ||
//       (item.max >= arrMinMax[0] && item.max <= arrMinMax[1])
//   );
// };

export const getCodePrice = (priceNumber, prices) => {
  for (let item of prices) {
    const numbers = getNumbersPrice(item.value);
    let min = 0,
      max = 0;

    if (numbers.length === 1) {
      if (item.value.includes("Dưới")) {
        min = 0;
        max = numbers[0];
      } else if (item.value.includes("Trên")) {
        min = numbers[0];
        max = Infinity;
      }
    } else if (numbers.length === 2) {
      [min, max] = numbers;
    }

    if (priceNumber >= min && priceNumber <= max) {
      return item.code;
    }
  }

  return null;
};

export const getCodeArea = (areaNumber, areas) => {
  for (let item of areas) {
    const numbers = getNumbersArea(item.value);
    let min = 0,
      max = 0;

    if (numbers.length === 1) {
      if (item.value.includes("Dưới")) {
        min = 0;
        max = numbers[0];
      } else if (item.value.includes("Trên")) {
        min = numbers[0];
        max = Infinity;
      }
    } else if (numbers.length === 2) {
      [min, max] = numbers;
    }

    if (areaNumber >= min && areaNumber <= max) {
      return item.code;
    }
  }

  return null;
};
