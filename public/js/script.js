let checkboxes = document.querySelectorAll(".custom-checkbox")

checkboxes.forEach(c => {
  c.addEventListener('click', () => {
    console.log("klickad");
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
