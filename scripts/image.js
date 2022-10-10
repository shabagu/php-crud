$(document).ready(function() {

  // showing image name in file input
  $(document).on("change", "#product-image", function() {
    let fileName = this.files[0].name
    $(this).next().css("color", "#495057")
    $(this).next().text(fileName)
    $("#product-image-clear").prop("disabled", false)
    $("#product-image-clear").text("Clear")
    $(".custom-file-label").attr("label-content", "Change")
  })

  // deleting/clearing image
  $(document).on("click", "#product-image-clear", function(event) {
    event.preventDefault()

    let imageType = $("#product-image").attr("image-type")
    let imageName = $("#product-image").attr("image-name")

    if ($("#product-id").val() == "") {

      // clearing file input (when adding new product)
      $("#product-image").val("")
      $("#product-image").next().css("color", "#6c757d")
      $("#product-image").next().text("Image file")
      $("#product-image-clear").prop("disabled", true)
      $(".custom-file-label").attr("label-content", "Select")
      
    } else if ($("#product-image").val() != "") {

      // clearing file input (when changing existing product)
      $("#product-image").val("")
      $("#product-image").next().text(imageName)
      switch (imageType) {

        // presenting image option
        case "normal":
          $("#product-image-clear").text("Delete")
          setTimeout(() => {
            $("#product-image-clear").blur()
          }, 100)
          break;

        // broken image option
        case "broken":
          $("#product-image-clear").text("Delete")
          setTimeout(() => {
            $("#product-image-clear").blur()
          }, 100)
          $("#product-image").next().css("color", "#ff0000")
          break;

        // no image option
        case "no-image":
          $("#product-image-clear").prop("disabled", true)
          $(".custom-file-label").attr("label-content", "Select")
        break;
      }

    } else {

      // completely deleting image file
      if (confirm("Are you shure you want to delete this product image?")) {
        let productId = $("#product-id").val()
        $.ajax({
          url: "/php-crud/ajax.php",
          type: "get",
          dataType: "json",
          data: {
            id: productId,
            action: "delete-product-image"
          },
          beforeSend: function() {},
          success: function(response) {
            if (response) {
              getProducts()
              $("#product-image").val("")
              $("#product-image").next().text("(no image)")
              $("#product-image-clear").prop("disabled", true)
              $("#product-image-clear").text("Clear")
              $(".custom-file-label").attr("label-content", "Select")
            }
          },
          error: function (request, error) {
            console.log(arguments)
            console.log("Error: " + error)
          }
        })
      }
    }
  })

})


// covering broken images function
// * images are considered broken if the image file is missing the on server,
// but database contains image informaition
function imageMissing(element) {
  $(element).attr("src", "media/image-broken.png")
}
