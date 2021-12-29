export const PatientData = [
  {
    Name: "John Doe",
    Date: "12/12/12",
    Address: "DoorNo.1-123, Example Street, Some Landmark, Some City, Arunachal Pradesh, Pincode-123345",
    Contact: "1234567890",
    Service: "Concierge",
  },
  {
    Name: "Another John Doe",
    Date: "12/12/12",
    Address: "DoorNo.1-123, Example Street, Some Landmark, Some City, Arunachal Pradesh, Pincode-123345",
    Contact: "1234567890",
    Service: "Concierge",
  },
  {
    Name: "Yet Another John Doe",
    Date: "12/12/12",
    Address: "DoorNo.1-123, Example Street, Some Landmark, Some City, Arunachal Pradesh, Pincode-123345",
    Contact: "1234567890",
    Service: "Concierge",
  },
];

export const columns = [
  {
    Header: "Name",
    accessor: "name",
    cname:"patientname"
  },
  {
    Header: "Date/Time",
    accessor: "Date",
    cname:"dateofjoining"
  },
  {
    Header: "Address",
    accessor: "address",
    cname:"address"
  },
  {
    Header: "Contact No.",
    accessor: "contact",
    cname:"phonenumber"
  },
  {
    Header: "Service Required",
    accessor: "service",
    cname:"service"
  },
];
