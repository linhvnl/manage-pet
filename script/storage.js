"use strict";

// ASSIGNMENT 02 - Nâng cấp ứng dụng quản lý thú cưng
// element - function giống nhau sẽ dùng code chung ở storage.js

// ------------------
// ------------------
// YÊU CẦU 1
// Bổ sung Animation cho Sidebar
const navEl = document.querySelector("#sidebar");

navEl.addEventListener("click", function () {
  // bật/tắt class active để đổi kiểu hiển thị cho sidebar
  this.classList.toggle("active");
});

// ------------------
// ------------------
// ELEMENT - VARIABLE
// input
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

// button
const submitBtn = document.getElementById("submit-btn");

// Element table body
const tableBodyEl = document.getElementById("tbody");

// biến mảng lưu danh sách pet và breed, lấy từ LocalStorage
const petArr = getFromStorage("petArrStore", []);
const breedArr = getFromStorage("breedArrStore", []);

// ------------------
// ------------------
// FUNCTION

// YÊU CẦU 2
// FUNCTION lưu DATA xuống LocalStorage ()
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// FUNCTION lấy DATA từ LocalStorage theo Key tương ứng
function getFromStorage(key, defaultVal) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
}

// FUNCTION TO CHECK INPUT DATA
// với tham số style: kiểu check validate (add, edit)
const validateData = function (pet, style = "add") {
  // create status variable
  let isValidate = true;

  // check data input
  for (const property in pet) {
    // NO input ID, NAME
    if (pet[property] === "") {
      alert(`Please input for ${property}`);
      isValidate = false;
      break;
    }

    // ID is unique
    if (property === "id" && style === "add") {
      let isError = false;
      for (let i = 0; i < petArr.length; i++) {
        if (pet.id === petArr[i].id) {
          alert("ID must be unique!");
          isError = true;
          break;
        }
      }
      if (isError) {
        isValidate = false;
        break;
      }
    }

    // AGE AND WEIGHT 1-15
    if (property === "age" || property === "weight") {
      if (isNaN(pet[property])) {
        alert(`Please input for ${property}`);
        isValidate = false;
        break;
      }
      if (pet[property] < 1 || pet[property] > 15) {
        alert(
          `${property === "age" ? "Age" : "Weight"} must be between 1 and 15!`
        );
        isValidate = false;
        break;
      }
    }

    // LENGTH 1-100
    if (property === "length") {
      if (isNaN(pet[property])) {
        alert(`Please input for ${property}`);
        isValidate = false;
        break;
      }
      if (pet[property] < 1 || pet[property] > 100) {
        alert("Length must be between 1 and 100!");
        isValidate = false;
        break;
      }
    }

    // TYPE selected!
    if (property === "type" && pet[property] === "Select Type") {
      alert("Please select Type!");
      isValidate = false;
      break;
    }

    // BREED selected!
    if (property === "breed" && pet[property] === "Select Breed") {
      alert("Please select Breed!");
      isValidate = false;
      break;
    }
  }

  return isValidate;
};

// FUNCTION TO RENDER TABLE
// với tham số style: kiểu hiển thị danh sách (home, edit, breed)
const renderTableData = function (arr, style = "home") {
  // Guard
  if (
    style !== "home" &&
    style !== "edit" &&
    style !== "breed" &&
    style !== "search"
  ) {
    alert("No Style!");
    return;
  }

  // 1. xóa nội dung hiện có của bảng
  tableBodyEl.innerHTML = "";

  // 2. tạo hàng mới tương ứng với từng thú cưng
  for (const i in arr) {
    // tạo hàng mới
    const row = document.createElement("tr");

    // viết nội dung HTML của 1 hàng
    if (style === "breed") {
      // style "breed"
      row.innerHTML = `
    <tr>
      <td>${+i + 1}</td>
      <td>${arr[i].breed}</td>
      <td>${arr[i].type}</td>

      <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${i}')">Delete</button>
      </td>

    </tr>
  `;
    } else {
      // style "home" và "edit"
      row.innerHTML = `
    <tr>
      <th scope="row">${arr[i].id}</th>
      <td>${arr[i].name}</td>
      <td>${arr[i].age}</td>
      <td>${arr[i].type}</td>
      <td>${arr[i].weight} kg</td>
      <td>${arr[i]["length"]} cm</td>
      <td>${arr[i].breed}</td>

      <td>
        <i class="bi bi-square-fill" style="color: ${arr[i].color}"></i>
      </td>
      <td><i class="bi ${
        arr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        arr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        arr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>

      <td>${new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(arr[i].date))}</td>

      ${
        style === "search"
          ? " "
          : `<td>
      ${
        style === "home"
          ? `<button type="button" class="btn btn-danger" onclick="deletePet('${arr[i].id}')">Delete</button>`
          : `<button type="button" class="btn btn-warning" onclick="startEditPet('${arr[i].id}', '${i}')">Edit</button>`
      }
      </td>`
      }
    </tr>
  `;
    }

    // thêm hàng vào bên trong bảng
    tableBodyEl.appendChild(row);
  }
};

// FUNCTION TO CLEAR INPUT DATA
// nếu không truyền đối số thì hàm resetInput sẽ clear input (trả về mặc định ban đầu)
const resetInput = function (pet = {}) {
  idInput.value = pet.id ?? "";
  nameInput.value = pet.name ?? "";
  ageInput.value = pet.age ?? "";
  typeInput.value = pet.type ?? "Select Type";
  weightInput.value = pet.weight ?? "";
  lengthInput.value = pet["length"] ?? "";
  colorInput.value = pet.color ?? "#000000";
  breedInput.value = pet.breed ?? "Select Breed";
  vaccinatedInput.checked = pet.vaccinated ?? false;
  dewormedInput.checked = pet.dewormed ?? false;
  sterilizedInput.checked = pet.sterilized ?? false;
};

// YÊU CẦU 4 - Hiển thị Breed trong option lựa chọn Breed
// FUNCTION TO DISPLAY BREED OPTIONS
const renderBreed = function (arr) {
  // 1. nội dung mặc định ban đầu của input
  breedInput.innerHTML = "<option>Select Breed</option>";

  // 2. tạo từng option theo mảng truyền vào
  arr.forEach((a) => {
    // tạo 1 option mới
    const option = document.createElement("option");

    // viết nội dung HTML của 1 option
    // option.textContent = `${a.breed}`;
    option.innerHTML = `${a.breed}`;

    // thêm 1 option vào input breed
    breedInput.appendChild(option);
  });
};

// FUNCTION TO DISPLAY BREED OPTIONS OF TYPE
const displayBreedOption = function () {
  // 1. hiển thị mặc định (tất cả breed) và return
  if (typeInput.value === "Select Type") return renderBreed(breedArr);

  // 2. nếu người dùng đã chọn type là Dog/Cat
  // tạo mảng breed lọc theo type
  const breedOfType = breedArr.filter(
    (breed) => breed.type === typeInput.value
  );
  // hiển thị ra input breed (theo type)
  renderBreed(breedOfType);
};

//////////////////////////////
//////////////////////////////
// PET: test - example data
const testPet = function () {
  const data01 = {
    id: "P001",
    name: "Tom",
    age: 3,
    type: "Cat",
    weight: 5,
    length: 50,
    color: "red",
    breed: "Tabby",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: new Date(2022, 2, 1),
    // bmi: "?",
  };
  const data02 = {
    id: "P002",
    name: "Tyke",
    age: 5,
    type: "Dog",
    weight: 3,
    length: 40,
    color: "green",
    breed: "Mixed Breed",
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    date: new Date(2022, 2, 2),
    // bmi: "?",
  };
  const data03 = {
    id: "P003",
    name: "Tyke",
    age: 5,
    type: "Dog",
    weight: 3,
    length: 40,
    color: "green",
    breed: "Mixed Breed",
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    date: new Date(2022, 2, 2),
    // bmi: "?",
  };

  petArr.push(data01);
  petArr.push(data02);
  petArr.push(data03);
  saveToStorage("petArrStore", petArr);
};
// BREED: test - example data
const testBreed = function () {
  const breed01 = {
    breed: "Mixed Breed",
    type: "Dog",
  };
  const breed02 = {
    breed: "Husky",
    type: "Dog",
  };
  const breed03 = {
    breed: "Doberman Pinscher",
    type: "Dog",
  };
  const breed04 = {
    breed: "Tabby",
    type: "Cat",
  };
  const breed05 = {
    breed: "Mixed Breed",
    type: "Cat",
  };
  const breed06 = {
    breed: "Domestic Short Hair",
    type: "Cat",
  };
  breedArr.push(breed01, breed02, breed03, breed04, breed05, breed06);
  saveToStorage("breedArrStore", breedArr);
};
// chạy data để test
// if (!getFromStorage("petArrStore")) testPet();
// if (!getFromStorage("breedArrStore")) testBreed();
