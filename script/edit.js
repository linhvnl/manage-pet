"use strict";

// ASSIGNMENT 02 - Nâng cấp ứng dụng quản lý thú cưng
// YÊU CẦU 5 - Chức năng Edit

// ------------------
// ------------------
// ELEMENT - VARIABLE
// element chứa form input data
const formContainer = document.getElementById("container-form");

// ------------------
// ------------------
// INIT
// gọi hàm hiển thị ban đầu (data đã lưu trên LocalStorage)
renderTableData(petArr, "edit");

// ------------------
// ------------------
// FUNCTION
// FUNCTION TO START TO EDIT PET
const startEditPet = function (petId, petIndex) {
  // thêm onclick gọi hàm vào button Edit trong hàm renderTableData

  // khởi tạo option cho breed
  typeInput.value = petArr[petIndex].type;
  displayBreedOption();

  // set input là thông tin của pet cần edit
  resetInput(petArr[petIndex]);

  // hiển thị form input
  formContainer.classList.remove("hide");
};

// ------------------
// ------------------
// EVENT HANDLER
// FUNCTIONALITY: DISPLAY BREED OPTIONS (depending on TYPE)
// Bắt sự kiện click vào input type
typeInput.addEventListener("change", displayBreedOption);

// FUNCTIONALITY: SUBMIT A EDITED PET
// 1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // 2. Lấy dữ liệu từ các Form Input
  const editData = {
    id: idInput.value.trim(),
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  // 3. Validate dữ liệu
  if (validateData(editData, "edit")) {
    // 4. tìm index của pet đang edit trong danh sách
    const indexEditPet = petArr.findIndex((pet) => pet.id === editData.id);

    // 5. Sửa pet trong danh sách
    editData.date = petArr[indexEditPet].date;
    petArr[indexEditPet] = editData;

    // 6. Xóa các dữ liệu nhập trong Form Input
    resetInput();

    // 7. Cập nhật Table và LocalStorage
    renderTableData(petArr, "edit");
    saveToStorage("petArrStore", petArr);

    // 8. ẩn form input
    formContainer.classList.add("hide");
  }
});
