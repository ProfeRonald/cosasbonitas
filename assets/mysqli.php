<?php

##################################################################
# R.Ronald Jimenez - Proyecto escuelaRD                          #
# ============================================                   #
# Copyright (c) 2020                                             #
# http://proferonald.com                                         #
##################################################################

		if(!defined('CARGA_INTERNA')){
	die (":D");
		}

		class sql_db{
	var $db_connect_id;
	var $query_result;
	var $row = array();
	var $rowset = array();
	var $num_queries = 0;
	   var $time;
	
function __construct($sqlserver, $sqluser, $sqlpassword, $database, $persistency = true){
	$this->persistency = $persistency;
	$this->user = $sqluser;
	$this->password = $sqlpassword;
	$this->server = $sqlserver;
	$this->dbname = $database;
		if($this->persistency){
	$this->db_connect_id = mysqli_connect("p:".$this->server, $this->user, $this->password);
		}else{
	$this->db_connect_id = @mysqli_connect($this->server, $this->user, $this->password);
		}
		if($this->db_connect_id){
		if($database != ""){
	$this->dbname = $database;
	$dbselect = mysqli_select_db($this->db_connect_id, $this->dbname);
	mysqli_set_charset($this->db_connect_id, "utf8mb4");
		if(!$dbselect){
	mysqli_close($this->db_connect_id);
	$this->db_connect_id = $dbselect;
		}
		}
	return $this->db_connect_id;
		}else{
	return false;
		}
}

function sql_query($query = "", $transaction = FALSE){
	unset($this->query_result);
		if($query != ""){
	@set_time_limit(90);
	$this->query_result = mysqli_query($this->db_connect_id, $query);
		}
		if($this->query_result){
	//unset($this->row[$this->query_result]);
	//unset($this->rowset[$this->query_result]);
	return $this->query_result;
		}else{
	return false;
		}
}

function sql_numrows($query_id = 0){
		if(!$query_id){
	$query_id = $this->query_result;
		}
		if($query_id){
	$result = mysqli_num_rows($query_id);
	return $result;
		}else{
	return false;
		}
}

function sql_affectedrows()
	{
		if($this->db_connect_id)
		{
			$result = @mysqli_affected_rows($this->db_connect_id);
			return $result;
		}
		else
		{
			return false;
		}
	}

function sql_fetchrow($query_id=0){
		if(!$query_id){
	$query_id = $this->query_result;
		}
		if($query_id){
	$stime = Mtime();
	$this->row[(int) $this->num_queries] = mysqli_fetch_array($query_id);
	$this->time += (Mtime()-$stime);
	return $this->row[(int) $this->num_queries];
		}else{
	return false;
		}
}

}

function Mtime() {
	    list($u, $s) = explode(' ', microtime());
	    return ((float)$u + (float)$s);
}

?>