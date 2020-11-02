if (typeof SELECTED_COMPANY_ID == 'undefined') {var SELECTED_COMPANY_ID=0;}
var COMPANY_ID_SELECTED_IN_SEARCH;
var oldValues;  

var cSearchData = {
    "Company": ""
};
var Companies = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: false,
	key: 'ID',
	load: function(loadOptions) {
			//document.getElementById('search-status').setAttribute("style","width: 65%; display: inline-block;text-align: left;");
			var JSfile4Store =  'php/json_data.php?URL=questionnaires.php&SP=008&PAR=0,';
			return $.getJSON(JSfile4Store/*,function() { document.getElementById('search-status').setAttribute("style","width: 65%; display: none;text-align: left;"); }*/);
	},
	byKey: function (key) {
		    //console.log(key);
            var JSfile4Store =  'php/json_data.php?URL=questionnaires.php&SP=008&PAR='+key+',';
            
            return $.getJSON(JSfile4Store);
     }
});
var QuestionnairesStore = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: false,
	key: 'ID',
	load: function(loadOptions) {
			var JSfile =  'php/json_data.php?URL=questionnaires.php&SP=009&PAR='+SELECTED_COMPANY_ID;
			return $.getJSON(JSfile);
	},
	byKey: function (key) {
		var JSfile =  'php/json_data.php?URL=questionnaires.php&SP=009&PAR='+key;
		return $.getJSON(JSfile);
	},
	update: function(key, values) {
        return $.post(JSFile4Update, data,
		            function(data, status){
		           			DevExpress.ui.notify(
	                            {message: "Customer information updated!",
	                                position: {
	                                    my: "center top",
	                                    at: "center top"
	                                }
	                            },"info",5000);
		                $("#Customers_001").dxDataGrid('instance').refresh();
		            });

	},
	remove: function(key){
		return $.getJSON(JSFile, function(){
							            DevExpress.ui.notify(
						                            {message: "Customer deleted!",
						                                position: {
						                                    my: "center top",
						                                    at: "center top"
						                                }
						                            },"error",3000);
		                				$("#Customers_001").dxDataGrid('instance').refresh();
								});

	},
	insert: function (values){
        return $.post(JSFile4Update, data,
		            function(data, status){
		            		DevExpress.ui.notify(
	                            {message: "Customer added!",
	                                position: {
	                                    my: "center top",
	                                    at: "center top"
	                                }
	                            },"info",5000);
		                $("#Customers_001").dxDataGrid('instance').refresh();
		            });    					
}
});

var EntityNames = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: false,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=customers.php&SP=007&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=customers.php&SP=007&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});
var UserNames = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: false,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=customers.php&SP=003&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=customers.php&SP=003&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
}); 
var StatusesStore = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: false,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=questionnaires.php&SP=010&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=questionnaires.php&SP=010&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
}); 
var StagesStore = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: false,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=questionnaires.php&SP=011&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=questionnaires.php&SP=011&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
}); 


function Loader(){
	    if(SELECTED_COMPANY_ID>0){
		    Companies.byKey(SELECTED_COMPANY_ID).done(function(result) {
	    		cSearchData.Company=result[0].NAME;
	    		CompanySearch();
	    		Questionnaires_001();
			});
		}else{
			CompanySearch();
			Questionnaires_001();
		}
}

function CompanySearch(){


	$(function(){
	    var cmpSearch = $("#CompanySearch").dxForm({
	    	formData: cSearchData,
	        readOnly: false,
	        validationGroup: "customerData",
	        items: [{
	            itemType: "group",
	            colCount: 20,
	            items: [
 
	            {
	                	dataField: "Company",
	                	editorType: "dxAutocomplete",
        				editorOptions: { 
		                	dataSource: Companies,
		                	placeholder: "Type Client's or Company's current or previous name...",
		                	valueExpr: "NAME",
		                	searchExpr: "SEARCH",
		                	itemTemplate: function(itemData, itemIndex, itemElement) {
                   				  itemElement.append("<div>" + itemData.SEARCH + "</div>");
        					},
		                	onValueChanged: function(data) {
		                		
		                		searchKeyWord = data.value;
    						},
    						onSelectionChanged:function(data) {
								if(typeof data.selectedItem == "undefined" || data.selectedItem == "" || data.selectedItem==null){
									COMPANY_ID_SELECTED_IN_SEARCH = 0;
								}else{

									COMPANY_ID_SELECTED_IN_SEARCH =data.selectedItem.ID;
								}

        						searchKeyWord = data.value;
            				}
		            },
	                	colSpan: 18,
	                	horizontalAlignment: "right",
	                },
	                {
	            	itemType: "button",
	                colSpan: 2,
	            	horizontalAlignment: "left",
	            	buttonOptions: {
	                	text: "Select Company",
	                	type: "default",
	                	useSubmitBehavior: false,
	                	onClick: function(e) { 
	                		SELECTED_COMPANY_ID = COMPANY_ID_SELECTED_IN_SEARCH;
	                		$("#Questionnaires_001").dxDataGrid('instance').refresh();
    					}
	            	}
	            	}] 
	        }]
	    }).dxForm("instance");

	});

}

function Questionnaires_001(){
	$(function(){
	    $("#Questionnaires_001").dxDataGrid({
	        dataSource: QuestionnairesStore,
	        allowColumnReordering: false,
			allowColumnResizing: false,
			showBorders: true,
			rowAlternationEnabled: true,
			showColumnLines: true,
        	showRowLines: true,
			rowAlternationEnabled: true,
			hoverStateEnabled: false,
			columnAutoWidth: true,
			wordWrapEnabled: false,
			columns: [
				{
                	dataField: "ID",
                	caption:  "ID",
                	dataType: "number"
            	},
              	{
                	dataField: "CLIENT_ID",
                	caption: "Company",
                	dataType: "number",
    				setCellValue: function(newData, value, currentRowData) {
            			newData.CLIENT_ID = value;
        			},
        			lookup: {
            			dataSource: Companies,
            			valueExpr: "ID",
            			displayExpr: "NAME"
        			}
        		},
              	{
                	dataField: "ENTITY_TYPE_ID",
                	caption: "Entity",
                	dataType: "number",
    				setCellValue: function(newData, value, currentRowData) {
            			newData.ENTITY_TYPE_ID = value;
        			},
        			lookup: {
            			dataSource: EntityNames,
            			valueExpr: "ID",
            			displayExpr: "NAME"
        			}
        		},
            	{
                	dataField: "STAGE_ID",
                	caption:  "Stage",
                	dataType: "number",
                	setCellValue: function(newData, value, currentRowData) {
            			newData.STAGE_ID = value;
        			},
        			lookup: {
            			dataSource: StagesStore,
            			valueExpr: "ID",
            			displayExpr: "NAME"
        			}
            	},
            	{
                     width: 50,
                     alignment: 'center',
                     cellTemplate: function (container, options) {
                     	if(options.row.data.STATUS_ID==6){
	                         $('<span style="color: #449d44;">').addClass('icn dx-icon-todo').appendTo(container);
                     	}else if(options.row.data.STATUS_ID==3 ||options.row.data.STATUS_ID==5){
	                         $('<span style="color: #f05b41;">').addClass('icn dx-icon-close').appendTo(container);
                     	}
                     	else if(options.row.data.STATUS_ID==8){
	                         $('<span style="color: #c9302c;">').addClass('icn dx-icon-warning').appendTo(container);
                     	}
                     }
                 },
            	{
                	dataField: "STATUS_ID",
                	caption:  "Status",
                	dataType: "number",
                	setCellValue: function(newData, value, currentRowData) {
            			newData.STATUS_ID = value;
        			},
        			lookup: {
            			dataSource: StatusesStore,
            			valueExpr: "ID",
            			displayExpr: "NAME"
        			}
            	},
            	{
            		dataField: "CREATED_DATETIME",
                	caption: "Created",
                	dataType: "datetime",
                	format: "dd.MM.yyyy hh:mm:ss"
            	},
            	{
    				dataField: "CREATED_BY",
                	caption: "Created by",
                	dataType: "number",
    				setCellValue: function(newData, value, currentRowData) {
            			newData.CREATED_BY = value;
        			},
        			lookup: {
            			dataSource: UserNames,
            			valueExpr: "ID",
            			displayExpr: "NAME"
        			}
        		},
            	{
            		dataField: "VALID_FROM",
                	caption: "Valid From",
                	dataType: "date",
                	format: 'dd.MM.yyyy'
            	},
            	{
            		dataField: "VALID_UNTIL",
                	caption: "Valid Until",
                	dataType: "date",
                	format: 'dd.MM.yyyy'
            	},
            	{
	                type: "buttons",
	                caption: 'Actions',
	                buttons: [
	                	{
	                		name:"Get", text:"Get Questionnaire for revision", icon: "background",
				            onClick: function(e) {
				            	window.open("quest_form.php?QID="+e.row.data.ID,"_self");
				            }
	                	},
	                	"delete"
	                ]
            	}

			],
			editing: {
				allowUpdating: false,
				allowDeleting: true,
				allowAdding: true,
				useIcons: true,
			    mode: "popup"
			},
			onToolbarPreparing: function (e) {
            	var tbItems=[];
	            // Modifies an existing item
	            $.each(e.toolbarOptions.items, function(_, item) {
	                if(item.name === "addRowButton") {
	                    item.options.hint="Create new questionnaire...";
	                    tbItems.push(item);
	                    tbItems.push({
			                widget: "dxButton", 
			                options: { icon: "unselectall", hint: "Duplicate selected questionnaire...", onClick: function() { console.log('click Duplicate'); } },
			                location: "after"
			            });
	                }else{
	                	tbItems.push(item);
	                }
	            }); 
 				e.toolbarOptions.items = tbItems;
	            // Adds a new item

	        },
			onInitNewRow(e) {
				//e.data.CREATED_DATE = formatDate(new Date(Date.now()));
				//e.data.CREATED_BY = UID;
				
			},
			selection: {
            	mode: "multiple"
        	},
			groupPanel: {
	            emptyPanelText: "Questionnaires",
	            visible: true
	        },
	        searchPanel: {
	            visible: false,
	            width: 340,
	            placeholder: "Search..."
	        },
			filterRow: { visible: false },
			headerFilter: { visible: true },
			paging: {
			        pageSize: 1000
			},
			export: {
				allowExportSelectedData: true,
				enabled: true,
				excelFilterEnabled: true,
				excelWrapTextEnabled: true,
				fileName: "List of questionnaires",
				ignoreExcelErrors: true,
				proxyUrl: undefined,
				texts: {
					exportAll: "Export all data",
					exportSelectedRows: "Export selected rows",
					exportTo: "Export"
					}
			},
		
	    });


	});

}
