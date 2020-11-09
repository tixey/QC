if (typeof SELECTED_COMPANY_ID == 'undefined') {var SELECTED_COMPANY_ID=0;}
var COMPANY_ID_SELECTED_IN_SEARCH;
var oldValues;  

var cSearchData = {
    "Company": ""
};

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
		var JSfile = 'php/json_data.php?URL=questionnaires.php&SP=035&PAR=POST';
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
		if(SELECTED_COMPANY_ID > 0){
			console.log(values);
			var JSfile = 'php/json_data.php?URL=questionnaires.php&SP=035&PAR=POST';
       		var PARAMS='CLIENT_ID,DATE_FROM,DATE_TO';
			var data       = {};
			data.PARAMS    = PARAMS;

			data.CLIENT_ID = values.CLIENT_ID;
			data.DATE_FROM = formatDate(values.VALID_FROM);
			data.DATE_TO   = formatDate(values.VALID_UNTIL);

	        return $.post(JSfile, data,
			            function(data, status){
			            		DevExpress.ui.notify(
		                            {message: "Questionnaire added!",
		                                position: {
		                                    my: "center top",
		                                    at: "center top"
		                                }
		                            },"info",5000);
			                $("#Questionnaires_001").dxDataGrid('instance').refresh();
			            });    
		}					
}
});




function Loader(){
	    if(SELECTED_COMPANY_ID>0){ 
		    GlobalQCData.GLOBAL_STORES.Companies.store.byKey(SELECTED_COMPANY_ID).done(result => {
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
		                	dataSource: GlobalQCData.GLOBAL_STORES.Companies.store,
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
				        newData.ENTITY_TYPE_ID = GlobalQCData.GLOBAL_STORES.Companies.store.__rawData.filter((company) => { return company.ID == value;})[0].ENTITY_TYPE_ID;
        			},
        			lookup: {
            			dataSource: GlobalQCData.GLOBAL_STORES.Companies.store,
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
            			dataSource: GlobalQCData.GLOBAL_STORES.Entities.store,
            			valueExpr: "ID",
            			displayExpr: "NAME"
        			},

  
        		},
            	{
                	dataField: "STAGE_ID",
                	caption:  "Stage",
                	dataType: "number",
                	setCellValue: function(newData, value, currentRowData) {
            			newData.STAGE_ID = value;
        			},
        			lookup: {
            			dataSource: GlobalQCData.GLOBAL_STORES.Stages.store,
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
            			dataSource: GlobalQCData.GLOBAL_STORES.Statuses.store,
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
            			dataSource: GlobalQCData.GLOBAL_STORES.Users.store,
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
			    mode: "popup",
	            popup: {
	                title: "Create new questionnaire",
	                showTitle: true,
	                position: {
	                    my: "top",
	                    at: "top",
	                    of: window
	                }
	            },
	            form: {
	                items: [
								
				              	{
				                	dataField: "CLIENT_ID",
				                	caption: "Client",
				                	dataType: "number",
				    				setCellValue: function(newData, value, currentRowData) {
				            			newData.CLIENT_ID = value;
				            			newData.ENTITY_TYPE_ID = GlobalQCData.GLOBAL_STORES.Companies.store.__rawData.filter((company) => { return company.ID == value;})[0].ENTITY_TYPE_ID;
				        			},
				        			lookup: {
				            			dataSource: GlobalQCData.GLOBAL_STORES.Companies.store,
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
				            			dataSource: GlobalQCData.GLOBAL_STORES.Entities.store,
				            			valueExpr: "ID",
				            			displayExpr: "NAME"
				        			},

				        			editorOptions: {
				        				readOnly: true
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
				                	dataField: "STAGE_ID",
				                	caption:  "Stage",
				                	dataType: "number",
				                	setCellValue: function(newData, value, currentRowData) {
				            			newData.STAGE_ID = value;
				        			},
				        			lookup: {
				            			dataSource: GlobalQCData.GLOBAL_STORES.Stages.store,
				            			valueExpr: "ID",
				            			displayExpr: "NAME"
				        			},
				        			editorOptions: {
				        				readOnly: true
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
				            			dataSource: GlobalQCData.GLOBAL_STORES.Statuses.store,
				            			valueExpr: "ID",
				            			displayExpr: "NAME"
				        			},
				        			editorOptions: {
				        				readOnly: true
				        			}
				            	}
	                ] 
	            }
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
			                options: { 
								icon: "unselectall", 
								hint: "Duplicate selected questionnaire...", 
								onClick: function() { 


									var SelectedQuest = $("#Questionnaires_001").dxDataGrid('instance').getSelectedRowKeys();

									if(SelectedQuest.length == 1){
										/*var JSFile = 'php/json_data.php?URL=questionnaires.php&SP=036&PAR=POST';*/
										var PARAMS = 'pQID';
										var data       = {};
										data.PARAMS    = PARAMS;
										data.pQID = SelectedQuest[0];
										return Helper.postJson('036',data)
													.then(
														(reponse) => {
															DevExpress.ui.notify(
																{
																	message: "Questionnaire is duplicated!",
																	position: {
																		my: "center top",
																		at: "center top"
																	}
																},"success",3000);
															$("#Customers_001").dxDataGrid('instance').refresh();
															return reponse;
														} 
													);
									}else{
										DevExpress.ui.notify(
											{
												message: "Please select questionnaire for duplication!",
												position: {
													my: "center top",
													at: "center top"
												}
											},"error",3000);
									}
									
								} 
							},
			                location: "after"
			            });
	                }else{
	                	tbItems.push(item);
	                }
	            }); 
 				e.toolbarOptions.items = tbItems;
	            // Adds a new item

	        },
			onInitNewRow: function(e) {
				e.data.CLIENT_ID = SELECTED_COMPANY_ID;
				e.data.STAGE_ID  = 1;
				e.data.STATUS_ID = 1;
				e.data.VALID_FROM  = new Date();
				e.data.VALID_UNTIL = Helper.dateAdd(new Date(), 'year', 1);
				e.data.ENTITY_TYPE_ID = GlobalQCData.GLOBAL_STORES.Companies.store.__rawData.filter((company) => { return company.ID == SELECTED_COMPANY_ID;})[0].ENTITY_TYPE_ID;
			},
			selection: {
            	mode: "single"
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
		
	    }).dxDataGrid('instance');


	});

}
