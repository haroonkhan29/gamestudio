export const InputsData = [
  {
    name: "id",
    label: "Employee ID",
    id: "id",
    type: "number",
    placeholder: "Employee ID",
  },
  {
    name: "status",
    label: "Status",
    id: "status",
    type: "select",
    Options: [
      { name: "Active ", value: "active" },
      { name: "Former", value: "Former" },
    ],
  },
  {
    name: "fullName",
    label: "Name",
    id: "fullName",
    type: "text",
    placeholder: "Full Name",
  },
  {
    name: "email",
    label: "E-mail",
    id: "email",
    type: "email",
    placeholder: "Email Address",
  },
  {
    name: "dob",
    label: "Date-of-birth",
    id: "dob",
    type: "date",
    placeholder: "Date of Birth",

  },
  {
    name: "joining",
    label: "Joining Date",
    id: "joining",
    type: "date",
    placeholder: "Joining Date",
  },
  {
    name: "leavingDate",
    label: "Leaving Date",
    id: "leavingDate",
    type: "date",
    placeholder: "Leaving Date",
  },
  {
    name: "department",
    label: "Department",
    id: "department",
    type: "text",
    placeholder: "Department",
  },
  {
    name: "tittle",
    label: "Job Tittle",
    id: "tittle",
    type: "text",
    placeholder: "Job Tittle",
  },
  {
    name: "cnic",
    label: "Cnic Number",
    id: "cnic",
    type: "text",
    placeholder: "00000000000000",
  },
  {
    name: "account",
    label: "Account Number",
    id: "account",
    type: "text",
    placeholder: "Account Number",
  },
  {
    name: "salary",
    label: "Salary",
    id: "salary",
    type: "number",
    placeholder: "Salary",
  },
  

  {
    name: "gender",
    label: "Gender",
    id: "gender",
    type: "select",
    Options: [
      { name: "Male", value: "male" },
      { name: "Female", value: "female" },
      { name: "Other", value: "other" },

    ],
  },
  {
    name: "contact",
    label: "Contact Number",
    id: "contact",
    type: "text",
    placeholder: "i-e 3000000000",
  },
  {
    name: "addressCity",
    label: "City",
    id: "addressCity",
    type: "select",
    placeholder: "City",
    Options: [
      { name: "Abbottabad", value: "Abbottabad" },
      { name: "Faisalabad", value: "Faisalabad" },
      { name: "Islamabad", value: "Islamabad" },
      { name: "Karachi", value: "Karachi" },
      { name: "Lahore", value: "Lahore" },
      { name: "Multan", value: "Multan" },
      { name: "Peshawar", value: "Peshawar" },
      { name: "Rawalpindi", value: "Rawalpindi" },
      { name: "Gujjrat", value: "Gujjrat" },
      { name: "Gujranwala", value: "Gujranwala" },
      { name: "Mardan", value: "Mardan" },
      { name: "Quetta", value: "Quetta" },
      { name: "Hyderabad", value: "Hyderabad" },
      { name: "Sialkot", value: "Sialkot" },
      { name: "Dera Ghazi Khan", value: "Dera Ghazi Khan" },


    ],
  },
  {
    name: "addressPostalCode",
    label: "Postal Code",
    id: "addressPostalCode",
    type: "text",
    placeholder: "Postal Code",
  },

  {
    name: "profilePic",
    label: "Profile Picture",
    id: "profilePic",
    type: "file",
    className: "file-input", 

  },
];
