"use strict";

// ASSIGNMENT 02 - Nâng cấp ứng dụng quản lý thú cưng
// YÊU CẦU 3 - Quản lý Breed

// ------------------
// ------------------
// INIT
// gọi hàm hiển thị ban đầu (data đã lưu trên LocalStorage)
renderTableData(breedArr, "breed");

// ------------------
// ------------------
// FUNCTION
// FUNCTION TO DELETE A PET
const deleteBreed = function (breedId) {
  // thêm onclick gọi hàm vào button Delete trong hàm renderTableData

  // Confirm before deleteBreed
  if (confirm("Are you sure?")) {
    // 1. xóa breed có id tương ứng khỏi breedArr
    // sử dụng hàm splice và id tương ứng ở đây chính là chỉ số hiện tại của object breed trong mảng breedArr
    breedArr.splice(breedId, 1);

    // 2. Cập nhật Table và LocalStorage
    renderTableData(breedArr, "breed");
    saveToStorage("breedArrStore", breedArr);
  }
};

// ------------------
// ------------------
// EVENT HANDLER
// FUNCTIONALITY: ADDING BREEDS
// 1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function () {
  // 2. Lấy dữ liệu từ các Form Input
  const breedData = {
    breed: breedInput.value.trim(),
    type: typeInput.value,
  };

  // 3. Validate dữ liệu, không đúng sẽ báo lỗi
  // create status variable
  let isValidate = true;

  // check data input không được bỏ trống
  if (breedData.breed === "") {
    alert(`Please input for Breed!`);
    isValidate = false;
  }
  if (breedData.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }

  // check data input không được trùng
  for (const b of breedArr) {
    if (b.breed === breedData.breed && b.type === breedData.type) {
      alert("This breed of type has already exist!");
      isValidate = false;
      break;
    }
  }

  // 4. Nếu Validate thành công thì tiếp tục
  if (isValidate) {
    // 5. Thêm breed vào danh sách
    breedArr.push(breedData);

    // 6. Xóa các dữ liệu nhập trong Form Input
    breedInput.value = "";
    typeInput.value = "Select Type";

    // 7. Cập nhật Table và LocalStorage
    renderTableData(breedArr, "breed");
    saveToStorage("breedArrStore", breedArr);
  }
});
