let checkboxes = document.querySelectorAll(".custom-checkbox")

checkboxes.forEach(c => {
  c.addEventListener('click', () => {
    let checkbox = c.firstElementChild

    if(checkbox.hasAttribute('checked')){
      checkbox.removeAttribute('checked')
    } else {
      checkbox.setAttribute('checked', true)
    }
  })
})

