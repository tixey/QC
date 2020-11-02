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
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>QComply - Log in</title>
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
    <link rel="icon" href="http://www.qcomply.com/V2/qc_logo.png">

    
    <link rel="stylesheet" type="text/css" href="qc_css/loginForm.css" />
    <script src="qc_js/login.js"></script>
    <script src="qc_js/MD5.js"></script>
    

</head>
<body class="dx-viewport" onload="
            <?php
                if($Auth == false){
                    echo 'show_login();';
                }else{
                    echo 'show_logout();';
                }
            ?>
">
        <div class="boxOptions">
            <div class="rect" data-options="dxItem: {ratio: 2}"><img src="http://www.qcomply.com/V2/qc_logo.svg" height="100%"></div>
            <div class="rect grey-light" data-options="dxItem: {ratio: 1}">
            <?php
                if($Auth == false){
            ?>
                <div class="login-form-container">
                    <form action="login-action" id="form-container">
                        <div id="form"></div>
                    </form>
                </div>
            <?php
                }else{

                echo '<span id="logged_in_span">You are logged in as <B>'.$_SESSION["USER_NAME"].'</B></span>';
            ?>
                <div id="logout_button"></div>
            <?php
                }
            ?>
            </div>
            <div class="rect" data-options="dxItem: {ratio: 2}">&nbsp;</div>
        </div>


</body>
</html>