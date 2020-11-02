$(function() {
   // $("#content").html(text);
 
    var drawer = $("#drawer").dxDrawer({
        opened: false,
        //height: 100%,
        openedStateMode: "overlap",
        closeOnOutsideClick: true,
        template: function() {
            var $list = $("<div>").addClass("panel-list");
 
            return $list.dxList({
                dataSource: navigation,
                hoverStateEnabled: false,
                focusStateEnabled: false,
                activeStateEnabled: false,
                onItemClick(e){
                    if(e.itemData.url=="logout.php"){
                        try_logout();
                        //window.open("login.php", "_self");
                    }else{
                        window.open(e.itemData.url, "_self");
                    }
                },
                width: 250,
                elementAttr: { class: "dx-theme-accent-as-background-color" }
            });
        }
    }).dxDrawer("instance");
 
    $("#toolbar").dxToolbar({
        items: [{
            widget: "dxButton",
            location: "before",
            options: {
                icon: "menu",
                onClick: function() {
                    drawer.toggle(); 
                }
            }
        }]
    });
    

});