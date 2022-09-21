<?php
// require_once "partials/connect.php";
// $db = new Database();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- jquery cdn link -->
  <script defer src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
  <!-- bootstrap popper and js cdn link-->
  <script defer src="https://cdn.jsdelivr.$db = new Database();net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
  <!-- custom js -->
  <script defer src="scripts/script.js"></script>
  
  <!-- bootstrap css cdn link -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
  <!-- font awesome cnd link -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!-- custom css -->
  <link rel="stylesheet" href="style/bootstrap-override.css">
  <link rel="stylesheet" href="style/style.css">

  <!-- favicon -->
  <link rel="icon" href="media/favicon-32.png" type="image/png" sizes="32x32">
  <!-- page title -->
  <title>PHP CRUD</title>
</head>
<body>
  <h1 class="bg-dark text-light text-center py-2">PHP CRUD</h1>
  <div class="container">

    <!-- search form -->
    <div class="row my-3">
      <div class="col-10">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text bg-dark">
              <i class="fa-solid fa-magnifying-glass text-light"></i>
            </span>
          </div>
          <input type="text" class="form-control" placeholder="Search for product...">
        </div>
      </div>
      <div class="" style="width: 174px;">
        <button class="btn btn-dark btn-block" type="button" data-toggle="modal" data-target="#product-add-modal">Add product</button>
      </div>
    </div>

    <!-- product table -->
    <?php include "components/productTable.php"; ?>

    <!-- pagination -->
    <nav aria-label="Product pagination" id="product-pagination">
      <!-- <ul class="pagination justify-content-center">
        <li class="page-item disabled"><a class="page-link" href="">Previous</a></li>
        <li class="page-item active"><a class="page-link" href="">1</a></li>
        <li class="page-item"><a class="page-link" href="">2</a></li>
        <li class="page-item"><a class="page-link" href="">3</a></li>
        <li class="page-item"><a class="page-link" href="">Next</a></li>
      </ul> -->
    </nav>
    <input type="hidden" value="1" name="current-page" id="current-page">

    <!-- modal forms -->
    <?php include "components/modalAdd.php"; ?>
    <?php include "components/modalView.php"; ?>

  </div>
</body>
</html>
