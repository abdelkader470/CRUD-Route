var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var bookList = [];
var regex = {
  siteName: { value: /^(\w){3,}(\s*(\w){1,})*$/, isvalid: false },
  siteURL: {
    value:
      /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/){1}(\w){2,}\.(\w{2,})(\.\w{2,})?(\/)?((\w){0,}(\/){1}(\w){1,})*$/,
    isvalid: false,
  },
};
if (localStorage.getItem("bookList") != null) {
  bookList = JSON.parse(localStorage.getItem("bookList"));
  displayBooks(bookList);
}

function validateInputs(element) {
  if (regex[element.id].value.test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    regex[element.id].isvalid = true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    regex[element.id].isvalid = false;
  }
  togglebtn();
}

function togglebtn() {
  if (regex.siteName.isvalid && regex.siteURL.isvalid) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

function addBook() {
  var book = {
    siteName: siteName.value,
    siteURL: siteURL.value,
  };
  var isDuplicate = bookList.some(
    (existingBook) =>
      existingBook.siteName.toLowerCase() === book.siteName.toLowerCase()
  );

  if (isDuplicate) {
    alert("This site name already exists. Please enter a unique site name.");
    return;
  }
  bookList.push(book);
  localStorage.setItem("bookList", JSON.stringify(bookList));
  displayBooks(bookList);
  submitBtn.disabled = true;
  clear();
}

function displayBooks(list) {
  var cartona = ``;

  for (var i = 0; i < bookList.length; i++) {
    cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${list[i].siteName}</td>
            <td>    
            <a href="${list[i].siteURL}" 
                class="btn  btn-sm text-white py-2 px-3"
                style="background-color: #9eb23b"
                target="_blank"

            >
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </a>
            </td>
            <td>
            <button class="btn btn-sm text-white py-2 px-3" onclick="deleteBook(${i})" style=" background-color: #e06666;">
                <i class="fa-solid fa-trash-can pe-2"></i>Delete
            </button>
            </td>
        </tr>
    `;
  }
  document.getElementById("table-body").innerHTML = cartona;
}

function clear() {
  siteName.value = "";
  siteURL.value = "";
  submitBtn.disabled = true;
}

function deleteBook(index) {
  bookList.splice(index, 1);
  localStorage.setItem("bookList", JSON.stringify(bookList));
  displayBooks(bookList);
}
