var formData = {
    "Username": "",
    "Password": ""
};

var sessionRecheck = null;


function show_logout(){
    boxes();
    $(function(){
        $("#logout_button").dxButton({
                    stylingMode: "contained",
                    text: "Log out",
                    type: "danger",
                    width: 90,
                    onClick: function() { 
                        DevExpress.ui.notify(
                            {message: "Logging out",
                                position: {
                                    my: "center top",
                                    at: "center top"
                                }
                            },"info",5000);
                        try_logout();
                    }
                });
    });
}
function show_login(){
    boxes();
    $(function(){
        var formWidget = $("#form").dxForm({
            formData: formData,
            readOnly: false,
            showColonAfterLabel: true,
            showValidationSummary: true,
            validationGroup: "loginData",
            items: [{
                itemType: "group",
                caption: "Log in",
                items: [{
                    dataField: "Username",
                    validationRules: [{
                        type: "required",
                        message: "Username is required"
                    }, {
                        type: "pattern",
                        pattern: "^[a-zA-Z0-9_]+$",
                        message: "Prohibited characters in username"
                    }]
                }, {
                    dataField: "Password",
                    editorOptions: {
                        mode: "password"
                    },
                    validationRules: [{
                        type: "required",
                        pattern: "^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{6,}$",
                        message: "Password should have at least 6 characters, include upper and lower case letters, digits and special characters."
                    }]
                    }
                ]
            }, 
            {
                itemType: "button",
                horizontalAlignment: "center",
                buttonOptions: {
                    text: "Log in",
                    type: "success",
                    useSubmitBehavior: true
                }
            }]
        }).dxForm("instance");

        $("#form-container").on("submit", function(e) {
            
            try_login(formData.Username, MD5(formData.Password), 
                    function (){
                            DevExpress.ui.notify({
                                message: "Unable to log in! Incorrect login or password.",
                                position: {
                                    my: "center top",
                                    at: "center top"
                                }
                            }, "error", 10000);
                    }
            );
            e.preventDefault();
        });
    });
}

function boxes(){
        $(".boxOptions").dxBox({
            direction: "row", 
            width: "100%",
            height: "100%"
        });
}

function try_logout(callback){
    $.post("php/auth.php", 
            {username: "LOGOUT-COMMANND"}, 
            function(data,status){
                window.open("login.php","_self");
            }
    );
}
function check_session(uid){
    $.post("php/check_session.php", 
            {userid: uid}, 
            function(data,status){
                if(!data.SESSION_ALIVE){
                    console.log('Session expired! Logging out...');
                    stopSessionRecheck();
                    try_logout();
                }
            },
            "json"
    );
}
function try_login(userName, PWD, callback){
    $.post("php/auth.php", { username: ""+userName+"", hash: ""+PWD+"" },
            function(data, status){
                if(data=='"Authorized"'){
                    window.open("customers.php","_self");
                }else{
                    
                   callback();
                }

            }               
    );

}


if(UID>0 && sessionRecheck == null){
    startSessionRecheck();
}

function startSessionRecheck() {
  var sessionRecheck = setInterval(function(){
        check_session(UID);
    }, 90000);
}

function stopSessionRecheck() {
  clearInterval(sessionRecheck);
  sessionRecheck=null;
}