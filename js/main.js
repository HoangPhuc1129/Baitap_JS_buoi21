// DOM Get Value
function getValue(selector) {
  return document.querySelector(selector);
}

// Create Function constructor
function Users(
  account,
  name,
  email,
  password,
  datepicker,
  salary,
  position,
  workHours
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.salary = salary;
  this.position = position;
  this.workHours = workHours;
}
Users.prototype.calcsSalary = function () {
  if (this.position === "Giám Đốc") {
    return this.salary * 3;
  } else if (this.position === "Trưởng phòng") {
    return this.salary * 2;
  } else return this.salary;
};
Users.prototype.arrangeUser = function () {
  // if (!this.workHours) {
  //   alert("vui lòng nhập giờ làm");
  //   return;
  // }
  switch (true) {
    case this.workHours >= 192:
      return "nhân viên Xuất Sắc";
    case this.workHours >= 176:
      return "nhân viên Giỏi";
    case this.workHours >= 160:
      return "nhân viên Khá";
    default:
      return "nhân viên Trung Bình";
  }
};
//create Array user to contain object user
let usersArray = [];

init();
//==============================================================================
function init() {
  usersArray = JSON.parse(localStorage.getItem("users")) || [];
  usersArray = usersArray.map((user) => {
    return new Users(
      user.account,
      user.name,
      user.email,
      user.password,
      user.datepicker,
      user.salary,
      user.position,
      user.workHours
    );
  });

  display(usersArray);

  resetForm();
}

getValue("#btnThemNV").onclick = function () {
  //B1:get input value
  let account = getValue("#tknv").value;
  let name = getValue("#name").value;
  let email = getValue("#email").value;
  let password = getValue("#password").value;
  let datepicker = getValue("#datepicker").value;
  let salary = getValue("#luongCB").value;
  let position = getValue("#chucvu").value;
  let workHours = getValue("#gioLam").value;

  // Check validate
  let isValid = validateForm();
  if (!isValid) {
    return;
  }

  //B2: create object contains infor above
  let user = new Users(
    account,
    name,
    email,
    password,
    datepicker,
    salary,
    position,
    workHours
  );

  //B3:Push new user into Array
  usersArray.push(user);

  // lưu trữ usersArray vào localStorage
  localStorage.setItem("users", JSON.stringify(usersArray));

  //B4:display
  display(usersArray);

  //B5:Reset form
  resetForm();
};

getValue("#btnTimNV").onclick = function () {
  let searchUser = getValue("#searchName").value;
  // if (!searchUser) {
  //   display(usersArray);
  //   return;
  // }
  // let searchTypeUser = usersArray.filter((user) => {
  //   return user.arrangeUser() === searchUser;
  // });
  searchUser = searchUser.toLowerCase();
  let searchTypeUser = usersArray.filter((user) => {
    let type = user.arrangeUser().toLowerCase();
    return type.includes(searchUser);
  });
  display(searchTypeUser);
};

function deleteUser(userAcc) {
  // let target = usersArray.findIndex((user) => {
  //   return user.account === userID;
  // });
  // if (userID !== -1) {
  //   usersArray.splice(target, 1);
  // }
  usersArray = usersArray.filter((user) => {
    return user.account !== userAcc;
  });

  // lưu trữ usersArray vào localStorage
  localStorage.setItem("users", JSON.stringify(usersArray));

  display(usersArray);
}

function updateUser() {
  let account = getValue("#tknv").value;
  let name = getValue("#name").value;
  let email = getValue("#email").value;
  let password = getValue("#password").value;
  let datepicker = getValue("#datepicker").value;
  let salary = getValue("#luongCB").value;
  let position = getValue("#chucvu").value;
  let workHours = getValue("#gioLam").value;

  // Check validate
  let isValid = validateForm();
  if (!isValid) {
    return;
  }

  let user = new Users(
    account,
    name,
    email,
    password,
    datepicker,
    salary,
    position,
    workHours
  );

  let index = usersArray.findIndex((value) => {
    return value.account === user.account;
  });

  usersArray[index] = user;

  // lưu trữ usersArray vào localStorage
  localStorage.setItem("users", JSON.stringify(usersArray));

  display(usersArray);

  resetForm();
  getValue("#tknv").disabled = false;
  getValue("#btnThemNV").disabled = false;
}

function editUser(userAcc) {
  let editUserNew = usersArray.find((user) => {
    return user.account === userAcc;
  });
  if (!editUserNew) {
    return;
  }
  getValue("#name").value = editUserNew.name;
  getValue("#tknv").value = editUserNew.account;
  getValue("#email").value = editUserNew.email;
  getValue("#password").value = editUserNew.password;
  getValue("#datepicker").value = editUserNew.datepicker;
  getValue("#chucvu").value = editUserNew.position;
  getValue("#luongCB").value = editUserNew.salary;
  getValue("#gioLam").value = editUserNew.workHours;

  getValue("#tknv").disabled = true;
  getValue("#btnThemNV").disabled = true;
}
//===============================================================================
function resetForm() {
  getValue("#tknv").value = "";
  getValue("#name").value = "";
  getValue("#email").value = "";
  getValue("#password").value = "";
  getValue("#datepicker").value = "";
  getValue("#luongCB").value = "";
  getValue("#chucvu").value = "";
  getValue("#gioLam").value = "";
}

function display(usersArray) {
  // let userDisplay = "";
  // for (let i = 0; i < usersArray.length; i++) {
  //   let user = usersArray[i];
  //   userDisplay += ` <tr>
  //   <td>${user.account}</td>
  //   <td>${user.name}</td>
  //   <td>${user.email}</td>
  //   <td>${user.datepicker}</td>
  //   <td>${user.position}</td>
  //   <td>${user.calcsSalary()}</td>
  //   <td>${user.arrangeUser()}</td>
  //   <td>
  //   <button onclick="deleteUser('${
  //     user.id
  //   }')" class="btn btn-danger">Xóa</button>
  //   </td>

  //   </tr>`;
  // }

  let userDisplay = usersArray.reduce((result, user) => {
    return (
      result +
      ` <tr>
      <td>${user.account}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.datepicker}</td>
      <td>${user.position}</td>
      <td>${user.calcsSalary()}</td>
      <td>${user.arrangeUser()}</td>
      
      <td>
      <button onclick="editUser('${
        user.account
      }')" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Edit</button>
      <button onclick="deleteUser('${
        user.account
      }')" class="btn btn-danger">Delete</button>
      </td>

      </tr>`
    );
  }, "");
  getValue("#tableDanhSach").innerHTML = userDisplay;
}

//Validation

// Account
function validateAccount() {
  let account = getValue("#tknv").value;
  let spanEl = getValue("#tbTKNV");
  //kiểm tra rỗng
  if (!account) {
    spanEl.innerHTML = " Tài khoản không được để trống ";
    return false;
  }
  // kiếm tra lượng kí tự
  if (account.length > 6) {
    spanEl.innerHTML = "Tài khoản tối đa 4 - 6 ký số";
    return false;
  }
  //Kiếm tra dịnh dạng số
  let regex = /^[0-9]*$/;
  if (!regex.test(account) || account.length > 6 || account.length < 4) {
    spanEl.innerHTML = "Tài khoản phải từ 4 - 6 ký số";

    return false;
  }
  spanEl.innerHTML = "";
  return true;
}

// Username
function validateName() {
  let name = getValue("#name").value;
  let spanEl = getValue("#tbTen");

  //kiểm tra rỗng
  if (!name) {
    spanEl.innerHTML = " Tên nhận viên không được để trống ";
    return false;
  }
  // Tên nhân viên phải là chữ
  let regex = /^[a-zA-Z\-]+$/;
  if (!regex.test(name)) {
    spanEl.innerHTML = " Tên nhận viên phải là chữ ";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}

// Email
function validateEmail() {
  let email = getValue("#email").value;
  let spanEl = getValue("#tbEmail");
  // kiểm tra rỗng
  if (!email) {
    spanEl.innerHTML = "Email không được để trống";
    return false;
  }
  // kiếm tra định dạng email
  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(email)) {
    spanEl.innerHTML = "Email không đúng định dạng ";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}

// Password
function validatePassword() {
  let password = getValue("#password").value;
  let spanEl = getValue("#tbMatKhau");
  //kiểm tra rỗng
  if (!password) {
    spanEl.innerHTML = " Mật khẩu không được để trống ";
    return false;
  }
  // kiểm tra định dạng mật khẩu
  let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
  if (!regex.test(password)) {
    spanEl.innerHTML =
      "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return false;
  }
  if (password.length < 6 || password.length > 10) {
    spanEl.innerHTML = "Mật khẩu từ 6-10 ký tự ";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}

// Datepicker
function validateDate() {
  let date = getValue("#datepicker").value;
  let spanEl = getValue("#tbNgay");
  //kiểm tra rỗng
  if (!date) {
    spanEl.innerHTML = "Ngày làm không để trống";
    return false;
  }
  //định dạng date MM/DD/YYYY
  let regex =
    /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
  if (!regex.test(date)) {
    spanEl.innerHTML = "Định dạng ngày tháng chưa đúng";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}

// salary
function validateSalary() {
  let salary = getValue("#luongCB").value;
  let spanEl = getValue("#tbLuongCB");
  //kiểm tra rỗng
  if (!salary) {
    spanEl.innerHTML = "Chưa nhập lương cơ bản";
    return false;
  }
  let regex = /^[0-9]*$/;
  if (!regex.test(salary)) {
    spanEl.innerHTML = "Lương cơ bản phải là số";
    return false;
  }
  if (salary < 1000000 || salary > 20000000) {
    spanEl.innerHTML = "Lương cơ bản 1.000.000 - 20.000.000";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}

// position check mistake
function validatePosition() {
  let position = getValue("#chucvu").value;
  let spanEl = getValue("#tbChucVu");

  //kiểm tra rỗng
  if (!position || position === "") {
    spanEl.innerHTML = "Chưa chọn chức vụ";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

//Working hours
function validateHours() {
  let hours = getValue("#gioLam").value;
  let spanEl = getValue("#tbGiolam");

  //kiểm tra rỗng
  if (!hours) {
    spanEl.innerHTML = "Chưa điền giờ làm";
    return false;
  }
  let regex = /^[0-9]*$/;
  if (!regex.test(hours)) {
    spanEl.innerHTML = "Số giờ làm trong tháng từ 80 - 200 giờ";
    return false;
  }
  if (hours < 80 || hours > 200) {
    spanEl.innerHTML = "Số giờ làm trong tháng từ 80 - 200 giờ";

    return false;
  }
  spanEl.innerHTML = "";
  return true;
}

// Validate Form
function validateForm() {
  let isValid = true;
  isValid =
    validateAccount() &
    validateName() &
    validateEmail() &
    validatePassword() &
    validateDate() &
    validateSalary() &
    validateHours() &
    validatePosition();
  if (!isValid) {
    // alert("Form không hợp lệ");
    return false;
  }
  return true;
}
