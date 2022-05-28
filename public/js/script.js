let checkboxes = document.querySelectorAll(".custom-checkbox")
let tabs = document.querySelectorAll(".tabLink")
let contents = document.querySelectorAll(".tabContent")
let userList = document.querySelector("#userList")

/*
function getUsers(){
  fetch('http://localhost:3001/users')
  .then(res => res.json())
  .then(result => {
    console.log(result);



    for (let i = 0; i < results.length; i++) {
        printUsers += `
        <li id=${results[i]._id}>
          <b>${results[i].username}</b>
          <i>${results[i]._id}</i>
          <div class="custom-checkbox">
          <input class="status" type="checkbox" name="status" ${results[i].subscription ? "checked" : ""} />
          <label for="status">
            <div class="status-switch" data-unchecked="Off" data-checked="On"></div>
          </label>
          </div>
        </li>
        `
      }
      printUsers += `</ul>`

  })
}*/

checkboxes.forEach(c => {
  c.addEventListener('click', () => {
    let checkbox = c.firstElementChild
    let userId = c.parentElement.id

    let update = {
      "_id": userId,
      "subscription": false
    }

    if(checkbox.hasAttribute('checked')){
      checkbox.removeAttribute('checked')
      update.subscription = false;
    } else {
      checkbox.setAttribute('checked', true)
      update.subscription = true;
    }

    fetch('http://localhost:3001/users/update/' + userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
      })
      .then(res => res.json())
      .then(data => {
        console.log("Subscription choice updated");
      })
  })
})

function openTab(e, tabName){
  if(e){
    tabs.forEach(tab => {
      tab.classList.remove('active');
    })
    e.target.classList.add('active')

    contents.forEach(content => {
      content.classList.remove('active');
    })
    tabName.classList.add('active')
  }
}