const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/data.json';

export const fetchDoctorData = async () => {
  try {
    const isLocalJson = BASE_URL.endsWith('.json');
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Local JSON data directly loads full payload
    if (isLocalJson) {
      return data.doctors || [];
    }

    // Real API Endpoint Structure Handlers
    return data;
  } catch (error) {
    console.error("Error fetching doctor/patient data:", error);
    return [];
  }
};