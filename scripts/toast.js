$(document).ready(function() {

  // closing toast
  $(document).on("click", ".toast-box .toast-close", function(event) {
    event.preventDefault()
    $(this).parents(".toast-box").remove()
  })

})


// create toast function
function createToast(message, action) {
  let iconName
  switch (action) {
    case "create" : iconName = "fa-square-plus"
      break
    case "update" : iconName = "fa-pen-to-square"
      break
    case "delete" : iconName = "fa-trash-can"
      break
    default : iconName = "fa-question"
  }
  let icon = `<i class="fa-xl fa-solid ${iconName} pr-2"></i>`
  let toast = `
    <div class="toast-box bg-dark text-light">
      <div class="d-flex justify-content-between">
        <div>${icon} <span class="h5">success</span></div>
        <div><i class="toast-close fa-2xl fa-regular fa-circle-xmark"></i></div>
      </div>
      <div class="mt-3">${message}</div>
    </div>
  `
  $("#toast-container").append(toast)
  $(".toast-box").last().hide().fadeIn(200).delay(1000).fadeOut(400, function() {
    $(this).remove()
  })
}
