import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PaymentSearchHeader from "./PaymentSearchHeader";
import PaymentTable from "./PaymentTable";
import PaymentSummary from "./PaymentSummary";
import { fetchDoctorData } from "../../../services/apiService";

const CreatePayment = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");

  const [cases, setCases] = useState([]);
  const [selectedCases, setSelectedCases] = useState([]);
  const [payingAmounts, setPayingAmounts] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [otherMfsName, setOtherMfsName] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchDoctorData();
      setDoctorsList(data);
    };
    getData();
  }, []);

  const handleSelectDoctor = (doctor) => {
    setClientName(doctor.doctor_name);
    setClinicName(doctor.clinic_name);
    setAddress(doctor.patients?.[0]?.addresses?.[0]?.full_address || "Dhaka, Bangladesh");

    const formattedCases = doctor.patients?.flatMap((pat) =>
      pat.cases.map((c) => ({
        id: c.case_id,
        caseNumber: c.case_id,
        receivedDate: c.created_at,
        patientName: pat.patient_name,
        workType: c.items?.[0]?.type || "Dental Work",
        amount: c.invoice?.due_amount || c.invoice?.total_amount || 0,
        status: c.status,
      }))
    ) || [];

    setCases(formattedCases);
    setSelectedCases([]);
    setPayingAmounts({});
  };

  const handleSelectClinic = (clinic) => {
    setClinicName(clinic);
    const matchedDoc = doctorsList.find((d) => d.clinic_name === clinic);
    if (matchedDoc) {
      handleSelectDoctor(matchedDoc);
    }
  };

  const handleSelectAll = () => {
    if (selectedCases.length === cases.length) {
      setSelectedCases([]);
    } else {
      setSelectedCases(cases.map((c) => c.id));
    }
  };

  const handleSelectCase = (id) => {
    if (selectedCases.includes(id)) {
      setSelectedCases(selectedCases.filter((item) => item !== id));
    } else {
      setSelectedCases([...selectedCases, id]);
    }
  };

  const handleAmountChange = (id, val) => {
    setPayingAmounts((prev) => ({
      ...prev,
      [id]: Number(val),
    }));
  };

  const totalAmount = selectedCases.reduce((sum, id) => {
    const caseItem = cases.find((c) => c.id === id);
    const customAmount = payingAmounts[id];
    return sum + (customAmount !== undefined ? customAmount : caseItem ? caseItem.amount : 0);
  }, 0);

  // Submit with SweetAlert2 Auto-Close & Toastify
  const handleSubmit = () => {
    if (selectedCases.length === 0) {
      toast.warn("Please select at least one case to pay!");
      return;
    }

    const selectedMethodName =
      paymentMethod === "Other MFS"
        ? `Other MFS (${otherMfsName || "Not specified"})`
        : paymentMethod;

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to pay ${totalAmount} TK via ${selectedMethodName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981", // emerald-500
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, Confirm Payment",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Auto-close SweetAlert in 3 seconds without OK button
        Swal.fire({
          title: "Requested!",
          text: "Your payment request has been submitted.",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        toast.success("Your payment has been requested for confirm!");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error("Payment request cancelled!");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <PaymentSearchHeader
        clientName={clientName}
        setClientName={setClientName}
        clinicName={clinicName}
        setClinicName={setClinicName}
        address={address}
        doctorsList={doctorsList}
        onSelectDoctor={handleSelectDoctor}
        onSelectClinic={handleSelectClinic}
        onSearch={() => console.log("Searching...")}
      />

      <div className="flex flex-col md:flex-row gap-6">
        <PaymentTable
          cases={cases}
          selectedCases={selectedCases}
          payingAmounts={payingAmounts}
          onSelectAll={handleSelectAll}
          onSelectCase={handleSelectCase}
          onAmountChange={handleAmountChange}
        />

        <PaymentSummary
          totalAmount={totalAmount}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          otherMfsName={otherMfsName}
          setOtherMfsName={setOtherMfsName}
          onFileChange={(e) => setReceiptFile(e.target.files[0])}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreatePayment;