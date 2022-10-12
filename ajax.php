<?php
$action = $_REQUEST["action"];

if (!empty($action)) {
  require_once "api/Product.php";
  $product = new Product();
}

// submit product form action
if ($action == "submit-product-form" && !empty($_POST)) {
  $name = $_POST["name"];
  $code = $_POST["code"];
  $amount = $_POST["amount"];
  $purchasePrice = $_POST["purchase-price"];
  $image = $_FILES["image"];
  $productId = (!empty($_POST["product-id"])) ? $_POST["product-id"] : "";

  $imageName="";
  if (!empty($image["name"])) {
    $imageInitilName = $image["name"];
    $imageName = $product->uploadImage($image);
    $productData = [
      "name" => $name,
      "code" => $code,
      "amount" => $amount,
      "purchase_price" => $purchasePrice,
      "image" => $imageName,
      "image_initial" => $imageInitilName,
    ];
    if ($productId) {
      $product->deleteImageFile($productId); // deleting old image file
    }
  } else {
    $productData = [
      "name" => $name,
      "code" => $code,
      "amount" => $amount,
      "purchase_price" => $purchasePrice,
    ];
  }

  if ($productId) {
    $product->updateRow($productData, $productId);
  } else {
    $productId = $product->addRow($productData);
  }

  if (!empty($productId)) {
    $response = $product->getSingleRow("id", $productId);
    
    echo json_encode($response);
    exit();
  }
}

// get products action
if ($action == "get-multiple-products") {
  $page = (!empty($_GET["page"])) ? $_GET["page"] : 1;
  $limit = (!empty($_GET["limit"])) ? $_GET["limit"]: 7;
  $start = ($page - 1) * $limit;
  
  $products = $product->getMultipleRows($start, $limit);

  if (!empty($products)) {
    $productList = $products;
  } else {
    $productList = [];
  }

  $productCount = $product->getCountRows();
  $response = ["count" => $productCount, "products" => $productList];

  echo json_encode($response);
  exit();
}

// get product to update action
if ($action == "get-single-product") {
  $productId = (!empty($_GET["id"])) ? $_GET["id"] : "";

  if (!empty($productId)) {
    $response = $product->getSingleRow("id", $productId);

    echo json_encode($response);
    exit();
  }
}

// delete product action
if ($action == "delete-product") {
  $productId = (!empty($_GET["id"])) ? $_GET["id"] : "";

  if (!empty($productId)) {
    $product->deleteImageFile($productId);
    $isDeleted = $product->deleteRow($productId);
    if ($isDeleted) {
      $response = ["deleted" => true];
    } else {
      $response = ["deleted" => false];
    }
    
    echo json_encode($response);
    exit();
  }
}

//search products action
if ($action == "search-products") {
  $searchText = (!empty($_GET["searchText"])) ? trim($_GET["searchText"]) : "";
  $page = (!empty($_GET["page"])) ? $_GET["page"]: 1;
  $limit = (!empty($_GET["limit"])) ? $_GET["limit"]: 7;
  $start = ($page - 1) * $limit;

  $response = $product->searchRows($searchText, $start, $limit);

  echo json_encode($response);
  exit();
}

// delete image action
if ($action == "delete-product-image") {
  $productId = (!empty($_GET["id"])) ? $_GET["id"] : "";
  
  if (!empty($productId)) {
    $isFileDeleted = $product->deleteImageFile($productId);
    $isFieldsDeleted = $product->deleteImageFields($productId);
    
    $response = ["file" => $isFileDeleted, "fields" => $isFieldsDeleted];
    
    echo json_encode($response);
    exit();
  }
}
