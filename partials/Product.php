<?php
require_once "Database.php";
class Product extends Database
{
  protected $tableName="product";

  // add row
  public function addRow($data) {

    if (!empty($data)) {
      $fields=$placeholder=[];

      foreach ($data as $field => $value) {
        $fields[] = $field;
        $placeholder[] = ":{$field}";
      }
    }

  # $sql = "INSERT INTO {$this->tableName} (name, code, amount, purchase_price) VALUES (:name, :code, :amount, :purchase_price)";
    $sql = "INSERT INTO {$this->tableName} (" . implode(",", $fields) . ") VALUES (" . implode(",", $placeholder) . ")";    
    $statement = $this->connection->prepare($sql);

    try {
      $this->connection->beginTransaction();
      $statement->execute($data);
      $lastInsertId = $this->connection->lastInsertId();
      $this->connection->commit();
      return $lastInsertId;

    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
      $this->connection->rollBack();
    }
  }


  // upload image
  public function uploadImage($file) {
    if (!empty($file)) {
      $fileTempPath = $file["tmp_name"];
      $fileName = $file["name"];
    # $fileType = $file["type"];

      $fileNameNormalize = explode(".", $fileName);
      $fileExtension = strtolower(end($fileNameNormalize));
      $fileNameNew=md5(time() . $fileName) . "." . $fileExtension;
      $allowedExtensions = ["png", "jpg", "jpeg"];
      
      if (in_array($fileExtension, $allowedExtensions)) {
        $fileUploadDirectory = getcwd() . "/uploads/";
        $fileDestinationPath = $fileUploadDirectory . $fileNameNew;

        if (move_uploaded_file($fileTempPath, $fileDestinationPath)) {
          return $fileNameNew;
        }
      }
    }
  }


  // get single row
  public function getSingleRow($field, $value) {
    $sql = "SELECT * FROM {$this->tableName} WHERE {$field}={$value}";
    $statement = $this->connection->prepare($sql);
    $statement->execute();
    if ($statement->rowCount() > 0) {
      $result = $statement->fetch(PDO::FETCH_ASSOC);
    } else {
      $result = [];
    }
    return $result;
  }


  // get multiple rows
  public function getMultipleRows($start = 0, $limit = 4) {
    $sql = "SELECT * FROM {$this->tableName} ORDER BY id DESC LIMIT {$start}, {$limit}";
    $statement = $this->connection->prepare($sql);
    $statement->execute();

    if ($statement->rowCount() > 0) {
      $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    } else {
      $result = [];
    }
    return $result;
  }


  // get count of rows
  public function getCountRows() {
    $sql = "SELECT count(*) as rowsnum FROM {$this->tableName}";
    $statement = $this->connection->prepare($sql);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result["rowsnum"];
  }


  // update product


  // delete product


  // search product



}
