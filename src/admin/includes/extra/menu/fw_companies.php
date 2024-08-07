<?php

if (rth_is_module_disabled('MODULE_FW_COMPANIES')) {
    return;
}

$fwBoxName = [
    'de' => 'Firmen (First-Web)',
    'en' => 'Companies (First-Web)',
];
$fwLanguageCode = $_SESSION['language_code'] ?? '';
$fwSelectedBoxName = $fwBoxName[$fwLanguageCode] ?? $fwBoxName['de'];

$add_contents[BOX_HEADING_CATALOG][] = [
    'admin_access_name' => 'fw_companies',      // Eintrag fuer Adminrechte
    'filename' => 'fw_companies.php',           // Dateiname der neuen Admindatei
    'boxname' => $fwSelectedBoxName,            // Anzeigename im Menue
    'parameters' => '',                         // zusaetzliche Parameter z.B. 'set=export'
    'ssl' => ''                                 // SSL oder NONSSL, kein Eintrag = NONSSL
];
