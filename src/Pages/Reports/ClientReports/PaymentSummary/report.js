import reportData from './reportData.json';

// Utility helper function to query and generate report metrics
export const getFilteredReports = ({
  fromDate,
  toDate,
  selectedState,
  selectedClinic,
  selectedDoctor,
  searchDoctorText
}) => {
  return reportData.filter((item) => {
    const dateMatch = (!fromDate || item.date >= fromDate) && (!toDate || item.date <= toDate);
    const stateMatch = selectedState === 'All' || item.state === selectedState;
    const clinicMatch = selectedClinic === 'All' || item.clinicId === selectedClinic;
    const doctorMatch = selectedDoctor === 'All' || item.doctorId === selectedDoctor;
    const searchMatch = item.doctorName.toLowerCase().includes(searchDoctorText.toLowerCase());

    return dateMatch && stateMatch && clinicMatch && doctorMatch && searchMatch;
  });
};

export default reportData;