// restore previous data from the server
$(document).ready(() => data.restore());

function setChildrenProperties() {
  // Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByTagName("LI");

  for (node of myNodelist) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    node.appendChild(span);
  }

  // Click on a close button to hide the current list item
  let close = document.getElementsByClassName("close");

  for (obj of close) {
    obj.onclick = function () {
      this.parentElement.remove();
      data.save();
    }
  }

  // Add a "checked" symbol when clicking on a list item
  var list = document.querySelector('ul');
  list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
      data.save();
    }
  }, false);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  setChildrenProperties();

  let close = document.getElementsByClassName("close");

  for (obj of close) {
    obj.onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

  data.save();
}