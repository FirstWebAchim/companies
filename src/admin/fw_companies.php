<?php

use FirstWeb\Companies\Classes\ApiController;
use FirstWeb\Companies\Classes\Controller;

require 'includes/application_top.php';

if (rth_is_module_disabled('MODULE_FW_COMPANIES')) {
    return;
}

$fwDevMode = false;

if ($fwDevMode === true) {
    restore_error_handler();
    restore_exception_handler();
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL ^ E_NOTICE);
}

$apiController = new ApiController();
$controller = new Controller();
$controller->addController($apiController);
$controller->invoke();
