// form validation for signup
function validateForm() {
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var phoneNumber = document.getElementById("phoneNumber");
  var password = document.getElementById("password");
  var cnfpassword = document.getElementById("cnfpassword");
  var valid = true;
  removeMessage();
  if (name.value.length == 0) {
    name.nextElementSibling.innerHTML = "**Name can not be blank!";
    valid = false;
  }
  if (email.value.length == 0) {
    email.nextElementSibling.innerHTML = "**Email can not be blank!";
    valid = false;
  }
  if (phoneNumber.value.length < 10) {
    phoneNumber.nextElementSibling.innerHTML =
      "**Phone number can not be less than 10 Digit!";
    valid = false;
  }
  if (password.value.length < 6) {
    password.nextElementSibling.innerHTML =
      "**Password should atleat 6 digit long!";
    valid = false;
  }
  if (cnfpassword.value != password.value) {
    cnfpassword.nextElementSibling.innerHTML = "**Password does not match!";
    valid = false;
  }

  return valid;
}

function removeMessage() {
  var errerPara = document.querySelectorAll(".error");
  [].forEach.call(errerPara, function (el) {
    el.innerHTML = "";
  });
}