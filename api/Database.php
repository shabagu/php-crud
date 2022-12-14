<?php

class Database {
  
  private $dbserver = "localhost";
  private $dbname = "php_crud_db";
  private $dbuser = "root";
  private $dbpassword = "";
  protected $connection;

  public function __construct() {
    try {
      # dsn is Data Source Name
      $dsn = "mysql:host={$this->dbserver}; dbname={$this->dbname}; charset=utf8";
      $options = array(PDO::ATTR_PERSISTENT);
      $this->connection = new PDO($dsn, $this->dbuser, $this->dbpassword, $options);

    } catch (PDOException $e) {
      echo "Connection error: " . $e->getMessage();
    }
  }
  
}
