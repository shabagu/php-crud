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
  <!-- (05:25:00 - revision) -->
  <h1 class="bg-dark text-light text-center py-2">PHP CRUD</h1>
  <div class="container">

    <!-- todo: toast -->
    <div class="display-message text-center bg-dark text-light mb-3"></div>

    <!-- search form -->
    <?php include "components/productSearch.php"; ?>

    <!-- product table -->
    <?php include "components/productTable.php"; ?>

    <!-- modal forms -->
    <?php include "components/modalForm.php"; ?>
    <?php include "components/modalCard.php"; ?>
    
  </div>
</body>
</html>
