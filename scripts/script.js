// after the document has been loaded
$(document).ready(function() {

  // calling getProducts()
  getProducts()
  
  // submitting product form
  $(document).on("submit", "#product-form", function(event) {
    event.preventDefault()
    const isNew = $("#product-id").val().length > 0 ? false : true
    const toastMessage = isNew ? "New product has been added successfully" : "Product has been updated successfully"
    const toastAction = isNew ? "create" : "update"
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "post",
      dataType: "json",
      data: new FormData(this),
      processData: false,
      contentType: false,
      beforeSend: function() {
        // console.log("Data is now uploading ...")
      },
      success: function(response) {
        // console.log("Data successfully uploaded!")
        // console.log(response)
        if (response) {
          $("#product-form-modal").modal("hide")
          $("#product-form")[0].reset()
          $("#product-image").next().css("color", "#6c757d")
          $("#product-image").next().text("Image file (png, jpg or jpeg)")
          if (isNew){
            $("#current-page").val(1)
          }
          createToast(toastMessage, toastAction)
          getProducts()
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })

  // onchange event for displaying image name insted of a file input placeholder
  $(document).on("change", "#product-image", function() {
    let fileName = this.files[0].name
    $(this).next().css("color", "#495057")
    $(this).next().text(fileName)

    // FIRST todo: complete file input  
  })

  // onclick event for pagination
  $(document).on("click", "ul.pagination li a", function(event) {
    event.preventDefault()
    const targetPage = $(this).data("page")
    $("#current-page").val(targetPage)
    getProducts()
  })

  // onclick event for changing pagination limit
  $(document).on("click", ".page-limit-button", function(event) {
    event.preventDefault()
    let limit = this.value
    $("#dropdown-menu").html("Page limit: " + limit)
    $("#page-limit").val(limit)
    $("#current-page").val(1)
    $("#search-input").val("")
    $("#pagination").show()
    // todo: fix pagination with search
    getProducts()
  })

  // onclick event for getting product to update
  $(document).on("click", "a.product-update", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "get",
      dataType: "json",
      data: {
        id: productId,
        action: "get-single-product"
      },
      beforeSend: function() {
        // console.log("Data is loading ...")
      },
      success: function(response) {
        // console.log("Data successfully loaded!")
        // console.log(response)
        if (response) {
          $("#product-name").val(response.name)
          $("#product-code").val(response.code)
          $("#product-amount").val(response.amount)
          $("#product-purchase-price").val(response.purchase_price)
          $("#product-id").val(response.id)
          console.log(response)
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })

  // onclick event for reseting product form when adding new product
  $("#product-add-button").on("click", function() {
    $("#product-form")[0].reset()
    $("#product-image").next().css("color", "#6c757d")
    $("#product-image").next().text("Image file (png, jpg or jpeg)")
    $("#product-id").val("")
  })

  // onclick event for deleting
  $(document).on("click", "a.product-delete", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    if (confirm(`Are you shure you want to delete this product?`)) {
      $.ajax({
        url: "/php-crud/ajax.php",
        type: "get",
        dataType: "json",
        data: {
          id: productId,
          action: "delete-product"
        },
        beforeSend: function() {
          // console.log("Performing delete request ...")
        },
        success: function(response) {
          if (response.deleted) {
            // console.log("Product successfully deleted!")
            createToast("Product has been deleted successfully", "delete")
            getProducts()
          }
        },
        error: function(request, error) {
          console.log(arguments)
          console.log("Error: " + error)
        }
      })
    }
  })

  // onclick event for viewing product card
  $(document).on("click", "a.product-view", function(event) {
    event.preventDefault()
    let productId = $(this).data("id")
    $.ajax({
      url: "/php-crud/ajax.php",
      type: "get",
      dataType: "json",
      data: {
        id: productId,
        action: "get-single-product"
      },
      beforeSend: function() {
        // console.log("Data is loading ...")
      },
      success: function(response) {
        if (response) {
          const productCard = `
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <img src="uploads/${response.image}" alt="" class="rounded">
            </div>
            <div class="col-sm-6 col-md-8">
              <h4 class="text-primary" title="Product name">${response.name}</h4>
              <p title="Product code" class="mb-0"><i class="mr-3 fa-solid fa-barcode"></i>${response.code}</p>
              <p title="Product amount" class="mb-0"><i class="mr-3 fa-solid fa-cubes-stacked"></i>${response.amount}</p>
              <p title="Product purchase price" class="mb-0"><i class="mr-3 fa-solid fa-coins"></i>${response.purchase_price} G</p>
            </div>
          </div>
          `
          $("#product-card").html(productCard)
        }
      },
      error: function(request, error) {
        console.log(arguments)
        console.log("Error: " + error)
      }
    })
  })

  // event for search
  $(document).on("keyup", "#search-input", function() {
    let searchText = $(this).val()
    let pageLimit = $("#page-limit").val()
    if (searchText.length > 0) {
      $.ajax({
        url: "/php-crud/ajax.php",
        type: "get",
        dataType: "json",
        data: {
          searchText: searchText,
          limit: pageLimit,
          action: "search-products"
        },
        beforeSend: function() {
          // console.log("Data is loading ...")
        },
        success: function(response) {
          if (response) {
            let productRows = ""
            $.each(response, function(index, product) {
              productRows += createProductRow(product)
            })
            $("#product-table tbody").html(productRows)
            $("#pagination").hide()
          }
        },
        error: function(request, error) {
          console.log(arguments)
          console.log("Error: " + error)
        }
      })
    } else {
      getProducts();
      $("#pagination").show()
    }
  })

  // onclick event for clearing search input
  $(document).on("click", "#search-clear", function(event) {
    event.preventDefault()
    $("#current-page").val(1)
    $("#search-input").val("")
    $("#pagination").show()
    getProducts()
  })

  // onclick event for closing toast
  $(document).on("click", ".toast-box .toast-close", function() {
    $(this).parents(".toast-box").remove()
  })

})



// get products
function getProducts() {
  let currentPageNumber = $("#current-page").val()
  let pageLimit = $("#page-limit").val()
  $.ajax({
    url: "/php-crud/ajax.php",
    type: "get",
    dataType: "json",
    data: {
      page: currentPageNumber,
      limit: pageLimit,
      action: "get-multiple-products"
    },
    beforeSend: function() {
      // console.log("Data is loading ...")
    },
    success: function(response) {
      // console.log("Data successfully loaded!")
      // console.log(response)
      if (response.products) {
        let productRows = ""
        $.each(response.products, function(index, product) {
          productRows += createProductRow(product)
        })
        $("#product-table tbody").html(productRows)
        let productCount = response.count
        let pageCount = Math.ceil(parseInt(productCount) / pageLimit)
        // todo: zero rows bug fix (when deleting last row in page)
        pagination(pageCount, currentPageNumber)
      }
    },
    error: function(request, error) {
      console.log(arguments)
      console.log("Error: " + error)
    }
  })
}

// create product table row function
function createProductRow(product) {
  let productRow = ""

  if (product) {
    productRow = `
      <tr>
        <td scope="row"><img src=uploads/${product.image} alt=""></td>
        <td>${product.name}</td>
        <td>${product.code}</td>
        <td>${product.amount}</td>
        <td>${product.purchase_price} G</td>
        <td>
          <a
            href="#"
            title="View product card"
            data-id="${product.id}"
            class="product-view ml-3 text-dark"
            data-toggle="modal"
            data-target="#product-card-modal"
          >
            <i class="fa-xl fa-solid fa-eye"></i>
          </a>
          <a
            href="#"
            title="Edit product data"
            data-id="${product.id}"
            class="product-update ml-3 text-dark"
            data-toggle="modal"
            data-target="#product-form-modal"
          >
            <i class="fa-xl fa-solid fa-pen-to-square"></i>
          </a>
          <a
            href="#"
            title="Delete product"
            data-id="${product.id}"
            class="product-delete ml-3 text-danger"
          >
            <i class="fa-xl fa-solid fa-trash-can"></i>
          </a>
        </td>
      </tr>
    `
  }
  return productRow
}

// pagination function
function pagination(totalNumberOfPages, currentPageNumber) {
  let pageList = ""
  if (totalNumberOfPages > 1) {
    currentPageNumber = parseInt(currentPageNumber)
    const previousLiCondition = currentPageNumber == 1 ?  "disabled" : ""
    const nextLiCondition = currentPageNumber == totalNumberOfPages ? "disabled" : ""
    pageList += `<ul class="pagination justify-content-center">`
    pageList += `
      <li class="page-item ${previousLiCondition}">
        <a class="page-link" href="#" data-page="1">&lt;&lt;</a>
      </li>
    `
    pageList += `
      <li class="page-item ${previousLiCondition}">
        <a class="page-link" href="#" data-page="${currentPageNumber - 1}">&lt;</a>
      </li>
    `
    for (let pageNumber = 1; pageNumber <= totalNumberOfPages; pageNumber++) {
      const activeLiCondition = pageNumber == currentPageNumber ? "active" : ""
      pageList += `
        <li class="page-item ${activeLiCondition}">
          <a class="page-link" href="#" data-page="${pageNumber}">${pageNumber}</a>
        </li>
      `
    }
    pageList += `
      <li class="page-item ${nextLiCondition}">
        <a class="page-link" href="#" data-page="${currentPageNumber + 1}">&gt;</a>
      </li>
    `
    pageList += `
      <li class="page-item ${nextLiCondition}">
        <a class="page-link" href="#" data-page="${totalNumberOfPages}">&gt;&gt;</a>
      </li>
    `
    // todo: make pagination limit
    pageList += `</ul>`
  }
  $("#pagination").html(pageList)
}

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
  $(".toast-box").last().fadeIn().delay(2000).fadeOut(1000, function() {
    $(this).remove()
  })
}

// todo: create no-image image (image-placeholder)
