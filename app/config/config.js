export const API_BASE_URL = "https://www.missmartins.dk";
export const API_TOKEN = "3975abafe3daba844eb93cbd8ff24710";
export const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const ROUTES = {
  INITIAL: "MISSMARTINS A/S",
  INVENTORY_LOOKUP: "Inventory lookup",
  LOCATION_SCAN: "Location scan",
  STOCK: "Stock",
  STOCK_ITEM: "Stock Item Scan",
};
export const TEXTS = {
  EMPTY: "--",
  INVENTORY_LOOKUP: "Inventory lookup",
  LOCATION_SCAN: "Location scan",
  INVOKE_CAMERA: "Invoke Camera",
  TOTAL_ITEMS: "Total Items",
  UPDATE_INVENTORY: "Update Inventory",
  UPDATE_INVENTORY_DATABASE: "Update Inventory in database",
};
export const COLORS = {
  GREY: "#F5F5F5",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  BLUE: "#007AFF",
  GREEN: "#0BD318",
  RED: "#FF1300",
};
export const SIZES = {
  TOP_OFFSET: 70,
  INNER_PADDING: 10,
  OUTER_PADDING: 10,
  ROUND_CORNER: 10,
};
export const REQUEST_STATES = {
  INITIAL: 0,
  PENDING: 1,
  FULLFILLED_INCORRECT: 2,
  REJECTED: 3,
  FULLFILLED_CORRECT: 4,
};
export const DELAYS = {
  TOAST: 1500,
  SCAN: 100,
};
