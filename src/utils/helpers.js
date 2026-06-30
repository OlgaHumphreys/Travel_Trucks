/** Format a whole-number price as a two-decimal currency string, e.g. 8000 -> "8000.00" */
export const formatPrice = (value) => {
  const num = Number(value) || 0;
  return num.toFixed(2);
};

/** Apply client-side equipment filters that the mock API can't query directly. */
export const matchesEquipment = (camper, equipment) => {
  return Object.entries(equipment).every(([key, isActive]) => {
    if (!isActive) return true;
    return Boolean(camper[key]);
  });
};

/** Human-readable labels for the camper "form" (vehicle type). */
export const FORM_LABELS = {
  panelTruck: 'Van',
  fullyIntegrated: 'Fully Integrated',
  alcove: 'Alcove',
};

/** Equipment keys with their display labels, grouped for the filter bar and feature list. */
export const EQUIPMENT_OPTIONS = [
  { key: 'AC', label: 'AC' },
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'TV', label: 'TV' },
  { key: 'radio', label: 'Radio' },
  { key: 'refrigerator', label: 'Refrigerator' },
  { key: 'microwave', label: 'Microwave' },
  { key: 'gas', label: 'Gas' },
  { key: 'water', label: 'Water' },
];

export const VEHICLE_TYPES = [
  { key: 'panelTruck', label: 'Van' },
  { key: 'fullyIntegrated', label: 'Fully Integrated' },
  { key: 'alcove', label: 'Alcove' },
];
