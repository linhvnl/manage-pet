"use strict";

// ASSIGNMENT 02 - Nâng cấp ứng dụng quản lý thú cưng
// YÊU CẦU 6 - Chức năng Search

// ------------------
// ------------------
// ELEMENT - VARIABLE
// button
const findBtn = document.getElementById("find-btn");

// ------------------
// ------------------
// INIT
// gọi hàm hiển thị ban đầu (data đã lưu trên LocalStorage)
renderTableData(petArr, "search");
// hiển thị option breed ban đầu
displayBreedOption();

// ------------------
// ------------------
// FUNCTION
// FUNCTION TO FILTER PETS DEPENDING ON INPUT CONDITION
const filterData = function (dataArr, filterObj) {
  const findArr = dataArr.filter((pet) => {
    let isMatch = true;
    for (const [key, value] of Object.entries(filterObj)) {
      // check id và name
      if (key === "id" || key === "name") {
        if (!pet[key].toLowerCase().replaceAll(" ", "").includes(value)) {
          isMatch = false;
          break;
        }
      }

      // check type và breed
      if (key === "type" || key === "breed") {
        if (pet[key] !== value) {
          isMatch = false;
          break;
        }
      }

      // check dewormed, sterilized và vaccinated
      if (key === "dewormed" || key === "sterilized" || key === "vaccinated") {
        if (!pet[key]) {
          isMatch = false;
          break;
        }
      }
    }
    return isMatch;
  });
  return findArr;
};

// ------------------
// ------------------
// EVENT HANDLER
// FUNCTIONALITY: FINDING PETS
// 1. Bắt sự kiện Click vào nút "Find"
findBtn.addEventListener("click", function () {
  // 2. lấy input tìm kiếm
  const searchInput = {
    id:
      idInput.value.trim() === ""
        ? "No"
        : idInput.value.trim().toLowerCase().replaceAll(" ", ""),
    name:
      nameInput.value.trim() === ""
        ? "No"
        : nameInput.value.trim().toLowerCase().replaceAll(" ", ""),
    type: typeInput.value === "Select Type" ? "No" : typeInput.value,
    breed: breedInput.value === "Select Breed" ? "No" : breedInput.value,
    vaccinated: vaccinatedInput.checked === false ? "No" : true,
    dewormed: dewormedInput.checked === false ? "No" : true,
    sterilized: sterilizedInput.checked === false ? "No" : true,
  };

  // 3. dữ liệu cần check
  let searchCheck = {};
  for (const [key, value] of Object.entries(searchInput)) {
    if (value !== "No") searchCheck[key] = value;
  }

  // 4. tạo mảng kết quả tìm kiếm (bằng gọi hàm filterData)
  const findPetArr = filterData(petArr, searchCheck);

  // 5. hiển thị kết quả tìm kiếm
  renderTableData(findPetArr, "search");
});
