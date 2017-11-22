import { API_BASE_URL, API_TOKEN, HEADERS } from "../config/config";

export const getBarcodeData = barcodeId => {
  return fetch(
    `${API_BASE_URL}/api/scan/${barcodeId}?token=${API_TOKEN}&_format=json`,
    {
      method: "GET",
      headers: HEADERS,
    },
  );
};

export const updateStockInLocation = (locationId, items) => {
  return fetch(
    `${API_BASE_URL}/api/stock-location/${locationId}?token=${API_TOKEN}&_format=json`,
    {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({items: items}),
    },
  );
};
