$(document).ready(function() {

  // getting pagination limit from cookies (or setting default value)
  getPaginationLimitCookie(7)

  // pagination jump
  $(document).on("click", "ul.pagination li a", function(event) {
    event.preventDefault()
    const targetPage = $(this).data("page")
    $("#current-page").val(targetPage)

    getProducts()
  })

  // changing pagination limit
  $(document).on("click", ".page-limit-button", function(event) {
    event.preventDefault()
    let limit = this.value
    $("#dropdown-menu").html("Page limit: " + limit + " ")
    $("#page-limit").val(limit)
    $("#current-page").val(1)
    $("#search-input").val("")
    // $("#pagination").show()
    $("#pagination-dropdown").removeAttr("hidden")

    getProducts()

    $.cookie("paginationLimit", limit)
  })

})




// get pagination limit from cookies
function getPaginationLimitCookie(defaultValue) {
  const cookieValue = $.cookie("paginationLimit")
  let limit = defaultValue

  if (Number.isInteger(Number(cookieValue))) {
    limit = cookieValue
  }

  $("#dropdown-menu").html("Page limit: " + limit + " ")
  $("#page-limit").val(limit)
  $("#current-page").val(1)
  $("#search-input").val("")
  // $("#pagination").show()
  $("#pagination-dropdown").removeAttr("hidden")
}

// create pagination function
function createPagination(pagesTotal, currentPage) {

  let pageList = ""

  if (pagesTotal > 1) {
    currentPage = parseInt(currentPage)

    const previousLiCondition = currentPage == 1 ?  "disabled" : ""
    const nextLiCondition = currentPage == pagesTotal ? "disabled" : ""

    pageList += `<ul class="pagination justify-content-center">`
    pageList += `
      <li class="page-item ${previousLiCondition}">
        <a class="page-link" href="#" data-page="1">&lt;&lt;</a>
      </li>
    `
    pageList += `
      <li class="page-item ${previousLiCondition}">
        <a class="page-link" href="#" data-page="${currentPage - 1}">&lt;</a>
      </li>
    `
    const maxWidth = 10
    let startPage = 1
    let endPage = Math.min(pagesTotal, maxWidth)
    if (currentPage >= maxWidth) {
      startPage += currentPage - maxWidth + 1
      endPage += currentPage - maxWidth + 1

      if (endPage >= pagesTotal) {
        endPage = pagesTotal
      }
      if (currentPage == pagesTotal) {
        startPage -= 1
      }
    }

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      const activeLiCondition = pageNumber == currentPage ? "active" : ""
      pageList += `
        <li class="page-item numeric ${activeLiCondition}">
          <a class="page-link" href="#" data-page="${pageNumber}">${pageNumber}</a>
        </li>
      `
    }

    pageList += `
      <li class="page-item ${nextLiCondition}">
        <a class="page-link" href="#" data-page="${currentPage + 1}">&gt;</a>
      </li>
    `
    pageList += `
      <li class="page-item ${nextLiCondition}">
        <a class="page-link" href="#" data-page="${pagesTotal}">&gt;&gt;</a>
      </li>
    `

    pageList += `</ul>`
  }
  $("#pagination").html(pageList)
}
