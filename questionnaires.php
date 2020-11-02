<?php
    require( 'php/config.php' );
    require( 'php/db_functions.php' );
    $Auth = false;
    $UID = 0;
    
    session_start();
    if(isset($_SESSION["USER_ID"])){
        $UID = $_SESSION["USER_ID"];
        $Auth = true;
    }

    $REQUEST = $_SERVER['QUERY_STRING'];
    $CID = '';

    if (preg_match('/(CID=){1}.+/', $REQUEST, $match)) {
        $CID = str_replace('CID=','',$match[0]);
    }
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>QComply  -  Questionnaires</title>


    <?php
        if(!$Auth){
    ?>
    <script type="text/javascript">window.open("login.php","_self");</script>
    <?php
        }
    ?>
    <?php
        if($CID!=''){
    ?>
    <script type="text/javascript">var SELECTED_COMPANY_ID=<? echo $CID; ?>;</script>
    <?php
        }
    ?>
    <script><?php echo 'var UID='.$UID.';'; ?></script>


    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cldrjs/0.4.4/cldr.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cldrjs/0.4.4/cldr/event.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cldrjs/0.4.4/cldr/supplemental.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cldrjs/0.4.4/cldr/unresolved.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize/message.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize/number.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize/currency.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize/date.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/dx.common.css" />
    <link rel="stylesheet" type="text/css" href="css/dx.light.css" />
    <script src="js/jszip.min.js"></script>
    <script src="js/dx.all.js"></script>

    <script src="qc_js/globals.js"></script>
    <script src="qc_js/nav_data.js"></script>
    <link rel="stylesheet" type="text/css" href="qc_css/nav_menu.css" />
    <script src="qc_js/nav_menu.js"></script>
    <script src="qc_js/questionnaires.js"></script>
    <link rel="stylesheet" type="text/css" href="qc_css/questionnaires.css" />

    <script src="qc_js/login.js"></script>

</head>
<body class="dx-viewport" onload="Loader();">
    <div class="main-container">
        <div id="toolbar"></div>
        <div id="drawer">
            <div id="content" class="dx-theme-background-color">
                <div class="sholder">
                    <div class="side-sholder">&nbsp;</div>
                    <div class="mdl-sholder"><div id="CompanySearch"></div></div>
                    <div class="side-sholder">&nbsp;</div>
                </div>
                <div id="Questionnaires_001"></div>
            </div>
        </div>
    </div>
</body>
</html>