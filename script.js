"use strict";

// ASSIGNMENT 02 - Nâng cấp ứng dụng quản lý thú cưng

// ------------------
// ------------------
// ELEMENT - VARIABLE
// element button Healthy check
const healthyBtn = document.getElementById("healthy-btn");

// biến mảng lưu danh sách Healthy Pet
let healthyPetArr = [];

// biến trạng thái hiển thị All Pet/Healthy Pet (label trên button)
let healthyCheck = false;

// ------------------
// ------------------
// INIT
// gọi hàm hiển thị ban đầu (data đã lưu trên LocalStorage)
renderTableData(petArr);
// hiển thị option breed ban đầu
displayBreedOption();

// ------------------
// ------------------
// FUNCTION
// FUNCTION TO DISPLAY TABLE IN ALL/HEALTHY MODE
const displayMode = function (isHealthy) {
  // Gọi hàm renderTableData để hiển thị petArr/healthyPetArr
  if (isHealthy) {
    renderTableData(petArr);
  } else {
    // Gán lại mảng healthyPetArr sử dụng hàm filter
    healthyPetArr = petArr.filter(
      (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
    );
    renderTableData(healthyPetArr);
  }
};

// FUNCTION TO DELETE A PET
const deletePet = function (petId) {
  // thêm onclick gọi hàm vào button Delete trong hàm renderTableData

  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    // 1. tìm và xóa pet có id tương ứng khỏi petArr
    // sử dụng hàm splice và findIndex
    const indexPet = petArr.findIndex((element) => element.id === petId);
    petArr.splice(indexPet, 1);

    // 2. Cập nhật Table (theo MODE HIỆN TẠI) và LocalStorage
    displayMode(!healthyCheck);
    saveToStorage("petArrStore", petArr);
  }
};

// ------------------
// ------------------
// EVENT HANDLER
// FUNCTIONALITY: ADDING PETS
// 1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // 2. Lấy dữ liệu từ các Form Input
  const data = {
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
    date: new Date(),
    bmi: "?",
  };

  // 3. Validate dữ liệu
  if (validateData(data)) {
    // 4. Thêm thú cưng vào danh sách
    petArr.push(data);

    // 5. Xóa các dữ liệu nhập trong Form Input
    resetInput();

    // 6. Cập nhật Table và LocalStorage
    renderTableData(petArr);
    saveToStorage("petArrStore", petArr);
  }
});

// FUNCTIONALITY: FILTERING HEALTHY PETS
// Bắt sự kiện click vào nút Show All/Healthy Pet
healthyBtn.addEventListener("click", function (e) {
  // hàm displayMode (filter và hiển thị mảng theo yêu cầu All/Healthy
  displayMode(healthyCheck);

  // đổi lại hiển thị cho button
  healthyBtn.textContent = `Show ${healthyCheck ? "Healthy" : "All"} Pet`;

  // và cuối cùng cập nhật lại trạng thái cho biến healthyCheck
  healthyCheck = healthyCheck ? false : true;
});

// FUNCTIONALITY: DISPLAY BREED OPTIONS (depending on TYPE)
// YÊU CẦU 4 - Hiển thị Breed trong màn hình quản lý thú cưng
// Bắt sự kiện click vào input type
typeInput.addEventListener("change", displayBreedOption);
