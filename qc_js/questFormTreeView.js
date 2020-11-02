
function generateTreeView(e, editor_name){
	var treeView;
    var syncTreeViewSelection = function(treeView, value){
        if (!value) {
            treeView.unselectAll();
            return;
        }
        
        value.forEach(function(key){
            treeView.selectItem(key);
        });
    };
    var value = e.component.option("value"),
        $treeView = $("<div>").dxTreeView({
            dataSource: e.component.option("dataSource"),
            dataStructure: "plain",
            keyExpr: e.component.option("keyExpr"),
            selectionMode: "multiple",
            displayExpr: e.component.option("displayExpr"),
            selectByClick: true,
            onContentReady: function(args){
                syncTreeViewSelection(args.component, value);
            },
            selectNodesRecursive: false,
            showCheckBoxesMode: "normal",
            onItemSelectionChanged: function(args){
                var value = args.component.getSelectedNodesKeys();
				e.component.option("value", value);
				
				if(value!=null && value.length>0){
			
					var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=018&PAR='+value.toString().replace(/,/g, ';');
					$.getJSON(JSfile4Store,	
					function(result){
						qForm.getEditor(editor_name).option("value",result[0].RISK_ID);
					});
				}
            }
        });
    treeView = $treeView.dxTreeView("instance");
    e.component.on("valueChanged", function(args){
        var value = args.value;
        syncTreeViewSelection(treeView, value);
 		});

    return $treeView;
}