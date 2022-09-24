"use strict";
var selectedRow = null;

// var arr = new Array();
var arrNew = [];

var dataFromStorage = JSON.parse(window.localStorage.getItem("localData"));

if (dataFromStorage) {
  arrNew = dataFromStorage;
  insertNewRecordfromLocal(dataFromStorage);
}

const btnsOpenModal = document.querySelector(".btn-cont");
const btnsCloseModal = document.querySelector(".close-modal");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function onFormSubmit() {
  // init();
  closeModal();
  event.preventDefault();
  var currentData = null;
  var formData = readFormData();
  debugger;
  currentData = formData;

  if (selectedRow == null) {
    insertNewRecord(currentData);
    arrNew.push(formData);
  } else {
    updateRecord(currentData);
  }
  // // localStorage.setItem("localData", JSON.stringify(formData));

  // debugger;
  // var previousLocalstorageData = getData();
  // var finalLocalstorageData = previousLocalstorageData
  //   ? previousLocalstorageData.concat([currentData])
  //   : [currentData];
  // debugger;

  localStorage.setItem("localData", JSON.stringify(arrNew));

  resetForm();

  return;
}

const getData = function () {
  // console.log(JSON.parse(localStorage.getItem("localData")));
  JSON.parse(localStorage.getItem("localData"));
};

function readFormData() {
  var formData = {};
  formData["empId"] = document.getElementById("empId").value;
  formData["fullName"] = document.getElementById("fullName").value;
  formData["userName"] = document.getElementById("userName").value;
  formData["email"] = document.getElementById("email").value;
  // formData["male"] = document.getElementById("male").value;
  // formData["female"] = document.getElementById("female").value;

  return formData;
}

function insertNewRecord(currentData) {
  var table = document
    .getElementById("storeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = currentData.empId;
  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = currentData.fullName;
  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = currentData.userName;
  var cell4 = newRow.insertCell(3);
  cell4.innerHTML = currentData.email;
  // var cell5 = newRow.insertCell(4);
  // cell5.innerHTML = data.male;
  // var cell5 = newRow.insertCell(4);
  // cell5.innerHTML = data.female;
  var cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<button  onclick="onEdit(this)">Edit</button> <button onclick="onDelete(this)">Delete</button>`;
}
function insertNewRecordfromLocal(data) {
  for (let i = 0; i < data.length; i++) {
    var table = document
      .getElementById("storeList")
      .getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data[i].empId;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data[i].fullName;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data[i].userName;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data[i].email;
    // var cell5 = newRow.insertCell(4);
    // cell5.innerHTML = data.male;
    // var cell5 = newRow.insertCell(4);
    // cell5.innerHTML = data.female;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button  onclick="onEdit(this)">Edit</button> <button onclick="onDelete(this)">Delete</button>`;
  }
}
function onEdit(table) {
  openModal();
  selectedRow = table.parentElement.parentElement;
  document.getElementById("empId").value = selectedRow.cells[0].innerHTML;
  document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("userName").value = selectedRow.cells[2].innerHTML;
  document.getElementById("email").value = selectedRow.cells[3].innerHTML;
  // document.getElementById("male").value = selectRow.cells[4].innerHTML;
  // document.getElementById("female").value = selectRow.cells[4].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.empId;
  selectedRow.cells[1].innerHTML = formData.fullName;
  selectedRow.cells[2].innerHTML = formData.userName;
  selectedRow.cells[3].innerHTML = formData.email;
  arrNew[selectedRow.sectionRowIndex - 1] = formData;

  // selectRow.cells[4].innerHTML = formData.male;
  // selectRow.cells[4].innerHTML = formData.female;
}

function onDelete(table) {
  selectedRow = table.parentElement.parentElement;
  if (confirm("Do you want to delete this record?")) {
    var row = table.parentElement.parentElement;
    arrNew.splice(selectedRow.sectionRowIndex - 1, 1);
    localStorage.setItem("localData", JSON.stringify(arrNew));
    document.getElementById("storeList").deleteRow(row.rowIndex);
    //localStorage.removeItem(arrNew[row.rowIndex - 1]);

    resetForm();
  }
}
function resetForm() {
  document.getElementById("empId").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("userName").value = "";
  document.getElementById("email").value = "";
  // document.getElementById("male").value = "";
  // document.getElementById("female").value = "";

  selectedRow = null;
}

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
// for (let i = 0; i < btnsOpenModal.length; i++)
btnsOpenModal.addEventListener("click", openModal);

//overlay.addEventListener("click", closeModal);

// document.addEventListener("keydown", function (e) {
//   console.log(e.key);
//   if (e.key === "Escape" && !modal.classList.contains("hidden")) {
//     closeModal();
//   }
// });
