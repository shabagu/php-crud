<?php
$action = $_REQUEST["action"];

if (!empty($action)) {
  require_once "partials/Product.php";
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
    $imageName = $product->uploadImage($image);
    $productData = [
      "name" => $name,
      "code" => $code,
      "amount" => $amount,
      "purchase_price" => $purchasePrice,
      "image" => $imageName,
    ];
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
if ($action == "get-products") {
  $page = (!empty($_GET["page"])) ? $_GET["page"] : 1;
  $limit = 4;
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
if ($action == "get-product-to-update") {
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

  $response = $product->searchRows($searchText);

  echo json_encode($response);
  exit();
}

// todo: rename action names
