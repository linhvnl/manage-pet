"use strict";

// ASSIGNMENT 02 - Nâng cấp ứng dụng quản lý thú cưng
// YÊU CẦU 7 (nâng cao) - Chức năng Import/Export dữ liệu

// ------------------
// ------------------
// ELEMENT - VARIABLE
// button
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");

// input file
const fileInput = document.getElementById("input-file");

// tạo mảng breed theo type Dog/Cat
// (cập nhật dữ liệu bằng hàm createBreedOfType, sử dụng để check breed trong hàm validateDataFile khi check data import có hợp lệ không)
const breedOfDog = [];
const breedOfCat = [];

// ------------------
// ------------------
// FUNCTION
// FUNCTION TO UPDATE DATA INTO ARRAY (mảng breed theo type Dog/Cat)
const createBreedOfType = function () {
  breedArr.forEach((breed) => {
    if (breed.type === "Dog") {
      breedOfDog.push(breed.breed);
    } else breedOfCat.push(breed.breed);
  });
};

// FUNCTION TO CHECK INPUT DATA FROM IMPORT FILE
const validateDataFile = function (pets) {
  // create status variable
  let isValidate = true;

  // check pets
  for (const pet of pets) {
    // check từng pet
    for (const property in pet) {
      // No value
      if (pet[property] === undefined || pet[property] === "") {
        isValidate = false;
        break;
      }

      // AGE AND WEIGHT 1-15
      if (property === "age" || property === "weight") {
        if (isNaN(pet[property])) {
          isValidate = false;
          break;
        }
        if (pet[property] < 1 || pet[property] > 15) {
          isValidate = false;
          break;
        }
      }

      // LENGTH 1-100
      if (property === "length") {
        if (isNaN(pet[property])) {
          isValidate = false;
          break;
        }
        if (pet[property] < 1 || pet[property] > 100) {
          isValidate = false;
          break;
        }
      }

      // TYPE selected right!
      if (property === "type") {
        if (pet[property] !== "Dog" && pet[property] !== "Cat") {
          isValidate = false;
          break;
        }
      }

      // BREED selected right (match of Type)!
      if (property === "breed") {
        if (pet.type !== "Dog" && pet.type !== "Cat") {
          isValidate = false;
          break;
        } else {
          createBreedOfType();
          isValidate =
            pet.type === "Dog"
              ? breedOfDog.includes(pet[property])
              : breedOfCat.includes(pet[property]);
          if (!isValidate) break;
        }
      }

      // CHECKED box
      if (
        ["vaccinated", "dewormed", "sterilized"].includes(property) &&
        typeof pet[property] !== "boolean"
      ) {
        isValidate = false;
        break;
      }
    }

    if (!isValidate) {
      alert("Import Data is invalid!");
      break;
    }
  }

  return isValidate;
};

// ------------------
// ------------------
// EVENT HANDLER
// FUNCTIONALITY: EXPORT FILE
// Bắt sự kiện click vào nút Export Data
exportBtn.addEventListener("click", function () {
  // tạo dữ liệu
  const blob = new Blob([JSON.stringify(petArr)], {
    type: "text/plain;charset=utf-8",
  });

  // tạo file bằng thư viện FileSaver bên ngoài
  saveAs(blob, "PetArray.json");

  // Thông báo đã Export Data thành công
  alert(
    "Export Data succeed!\nPlease see a 'PetArray.json' file in Folder Downloads."
  );
});

// FUNCTIONALITY: IMPORT FILE
// 1. Bắt sự kiện click vào nút Import Data
importBtn.addEventListener("click", function () {
  // 2. Check input đã nhập file import
  if (!fileInput.files[0]) {
    alert("Please import your file!");
    return;
  }

  // 3. Khởi tạo trình reader và biến lưu file, data (content của file)
  const reader = new FileReader();
  const importFile = fileInput.files[0];
  let importData = [];

  // 4. Bắt sự kiện "load" vào reader để xử lý dữ liệu import
  reader.addEventListener("load", function () {
    // 5. lấy content từ file import
    importData = JSON.parse(reader.result);

    // 6. Validate dữ liệu
    if (validateDataFile(importData)) {
      // 7. Cập nhật thú cưng vào danh sách petArr
      importData.forEach((importPet) => {
        // check Id đã tồn tại hay ID mới
        const indexPet = petArr.findIndex((pet) => pet.id === importPet.id);

        // nếu pet mới thì thêm vào petArr, đối với pet trùng ID với pet có sẵn thì ghi đè giá trị
        if (indexPet === -1) {
          petArr.push(importPet);
        } else petArr[indexPet] = importPet;
      });

      // 8. Cập nhật LocalStorage
      saveToStorage("petArrStore", petArr);

      // 9. Reset input file
      fileInput.value = "";

      // 10. Thông báo đã Import Data thành công
      alert("Data has been imported successfully!");
    }
  });

  // *** Đọc file import
  reader.readAsText(importFile);
});
