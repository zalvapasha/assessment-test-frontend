import { getCurrentDate } from "./getCurrentDate";

export const validateInput = (userName, userAddress, userGender, userDate) => {
  // Parsing currentDate back to the correct format for comparison
  const currentDateParts = getCurrentDate().split(" ")[0].split("-");
  const currentDate = new Date(
    `${currentDateParts[2]}-${currentDateParts[1]}-${currentDateParts[0]}`
  );

  const selectedDateParts = userDate.split("-");
  const selectedDate = new Date(
    `${selectedDateParts[2]}-${selectedDateParts[1]}-${selectedDateParts[0]}`
  );

  if (!userName || !userAddress || !userGender || !userDate) {
    return "All fields are required!";
  }

  if (selectedDate >= currentDate) {
    return "The date of birth cannot be today or in the future.";
  }

  if (userName.length > 20) {
    return "Name cannot be longer than 20 characters";
  }
  if (userAddress.length > 20) {
    return "Address cannot be longer than 20 characters";
  }

  if (!["Pria", "Wanita"].includes(userGender)) {
    return "Please select a valid gender!";
  }

  const dateRegex = /^\d{2}-\d{2}-\d{4}$/; // Regex for DD-MM-YYYY format
  if (!dateRegex.test(userDate)) {
    return "Invalid date format! Use DD-MM-YYYY.";
  }

  return null;
};
