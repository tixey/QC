var oldValues;    
function Customers_001(){
	$(function(){

	    var CustomersStore = new DevExpress.data.CustomStore({
	    	loadMode: "raw",
			cacheRawData: false,
	    	key: 'ID_CLIENT',
	    	load: function(loadOptions) {
	    			var JSfile =  'php/json_data.php?URL=customers.php&SP=001&PAR=0';
    				return $.getJSON(JSfile);
			},
       		byKey: function (key) {
            		var JSfile =  'php/json_data.php?URL=customers.php&SP=001&PAR='+key;
            		return $.getJSON(JSfile);
        	},
        	update: function(key, values) {
        		var PARAMS='ID_CLIENT,CLIENT_NAME,REG_NUMBER,COMPANY_REG_NAME,PREVIOUS_NAMES,REG_ADDRESS,REG_ADDRESS_COUNTRY_ID,COUNTRY_OF_INC_ID,DATE_OF_INCORPORATION,FISCAL_REG_NUM,CONTACT_PHONE,CONTACT_FAX,CONTACT_EMAIL,CONTACT_ADDRESS,CONTACT_COUNTRY_ID,ENTITY_TYPE_ID';
				var P_NAMES = PARAMS.split(',');
				var JSFile4Update = 'php/json_data.php?URL=customers.php&SP=004&PAR=POST';
				var data       = {};
				data.PARAMS    = PARAMS;
				var newValues  = values;
				
				   
				//fixing null values     -->
				for(var i=0;i<P_NAMES.length;i++){ 
					pName=P_NAMES[i];
				    // if null => null
					if (newValues[pName] != null) {
						data[pName] = newValues[pName];
					}else{
						data[pName] = oldValues[pName];
					}
					if(isValidDate(data[pName])){
						data[pName] = formatDate(data[pName]);
					}
				}
				//fixing null values     <--

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
				console.log(key);
				console.log(UID);
				var JSFile = 'php/json_data.php?URL=customers.php&SP=006&PAR='+key+','+UID;
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
        		var PARAMS='CLIENT_NAME,REG_NUMBER,COMPANY_REG_NAME,PREVIOUS_NAMES,REG_ADDRESS,REG_ADDRESS_COUNTRY_ID,COUNTRY_OF_INC_ID,DATE_OF_INCORPORATION,FISCAL_REG_NUM,CONTACT_PHONE,CONTACT_FAX,CONTACT_EMAIL,CONTACT_ADDRESS,CONTACT_COUNTRY_ID,CREATED_DATE,CREATED_BY,ENTITY_TYPE_ID';
				var P_NAMES = PARAMS.split(',');
				var JSFile4Update = 'php/json_data.php?URL=customers.php&SP=005&PAR=POST';
				var data       = {};
				data.PARAMS    = PARAMS;
				var newValues  = values;

				//fixing null values     -->
				for(var i=0;i<P_NAMES.length;i++){ 
					pName=P_NAMES[i];
				    // if null => null

				    if(Object.keys(values).indexOf(pName)!=-1){
				    	data[pName] = newValues[pName];
				    }else{
				    	data[pName] = null;
				    }

					if(isValidDate(data[pName])){
						data[pName] = formatDate(data[pName]);
					}
				}
				//fixing null values     <--

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




	    var CountryNames = new DevExpress.data.CustomStore({
	    	loadMode: "raw",
			cacheRawData: false,
	    	key: 'ID',
	    	load: function(loadOptions) {
	    			
	    			var JSfile4Store =  'php/json_data.php?URL=customers.php&SP=002&PAR=0';
    				return $.getJSON(JSfile4Store);
			},
       		byKey: function (key) {
       				
            		var JSfile4Store =  'php/json_data.php?URL=customers.php&SP=002&PAR='+key;
            		return $.getJSON(JSfile4Store);
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

	    $("#Customers_001").dxDataGrid({
	        dataSource: CustomersStore,
	        allowColumnReordering: false,
			allowColumnResizing: false,
			showBorders: true,
			rowAlternationEnabled: true,
			showColumnLines: true,
        	showRowLines: true,
			hoverStateEnabled: false,
			columnAutoWidth: true,
			wordWrapEnabled: false,
			columns: [
				{
                	dataField: "ID_CLIENT",
                	caption:  "Client ID",
                	dataType: "number"
            	},
            	{
                	dataField: "CLIENT_NAME",
                	caption:  "Client Name",
                	dataType: "string"
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
                	dataField: "Q_NUM",
                	caption:  "Quest. Number",
                	dataType: "number"
            	},
           		{
	                type: "buttons",
	                caption: 'View',
	                buttons: [
	                	{
	                		name:"Checked", text:"View questionnaires", icon: "find",
				            onClick: function(e) {
				               	window.open("questionnaires.php?CID="+e.row.data.ID_CLIENT,"_self");
				            }
	                	}
	                ]
            	},
            	{
            		dataField: "VALID_TO",
                	caption: "Valid Until",
                	dataType: "date",
                	format: 'dd.MM.yyyy'
            	},
            	{
            		dataField: "Expires",
                	caption: "Expires",
                	dataType: "number"
            	},
            	{
            		dataField: "CREATED_DATE",
                	caption: "Created",
                	dataType: "date",
                	format: 'dd.MM.yyyy'
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
            		dataField: "DELETED_DATE",
                	caption: "Deleted",
                	dataType: "date",
                	format: 'dd.MM.yyyy'
            	},
            	{
                	dataField: "DELETED_BY",
                	caption: "Deleted by",
                	dataType: "number",
    				setCellValue: function(newData, value, currentRowData) {
            			newData.DELETED_BY = value;
        			},
        			lookup: {
            			dataSource: UserNames,
            			valueExpr: "ID",
            			displayExpr: "NAME"
        			}
        		},{
	                type: "buttons",
	                caption: 'Actions',
	                buttons: [ "edit", "delete"]
            	},
        		{
					dataField: "REG_NUMBER",
					caption: "Reg. Number",
					dataType: "string",
					visible: false
				},
				{
					dataField: "COMPANY_REG_NAME",
					caption: "Registered Name",
					dataType: "string",
					visible: false
				},
				{
					dataField: "PREVIOUS_NAMES",
					caption: "Previous Name(s)",
					dataType: "string",
					visible: false
				},
				{
					dataField: "REG_ADDRESS",
					caption: "Registered Address",
					dataType: "string",
					visible: false
				},
				{
					dataField: "REG_ADDRESS_COUNTRY_ID",
					caption: "Country of Reg. Address",
					dataType: "number",
					setCellValue: function(newData, value, currentRowData) {
						newData.REG_ADDRESS_COUNTRY_ID = value;
					},
					lookup: {
						dataSource: CountryNames,
						valueExpr: "ID",
						displayExpr: "NAME"
					},
					visible: false
				},
				{
					dataField: "COUNTRY_OF_INC_ID",
					caption: "Country of Incorporation",
					dataType: "number",
					setCellValue: function(newData, value, currentRowData) {
						newData.COUNTRY_OF_INC_ID = value;
					},
					lookup: {
						dataSource: CountryNames,
						valueExpr: "ID",
						displayExpr: "NAME"
					},
					visible: false
				},
				{
					dataField: "DATE_OF_INCORPORATION",
					caption: "Date of Incorporation",
					dataType: "date",
				    format: 'dd.MM.yyyy',
				    visible: false
				},
				{
					dataField: "FISCAL_REG_NUM",
					caption: "Fiscal Reg. Number",
					dataType: "string",
					visible: false
				},
				{
					dataField: "CONTACT_PHONE",
					caption: "Telephone",
					dataType: "string",
					visible: false
				},
				{
					dataField: "CONTACT_FAX",
					caption: "Fax",
					dataType: "string",
					visible: false
				},
				{
					dataField: "CONTACT_EMAIL",
					caption: "Email",
					dataType: "string",
					visible: false
				},
				{
					dataField: "CONTACT_ADDRESS",
					caption: "Mailing Address",
					dataType: "string",
					visible: false
				},
				{
					dataField: "CONTACT_COUNTRY_ID",
					caption: "Mailing country",
					dataType: "number",
					setCellValue: function(newData, value, currentRowData) {
						newData.CONTACT_COUNTRY_ID = value;
					},
					lookup: {
						dataSource: CountryNames,
						valueExpr: "ID",
						displayExpr: "NAME"
					},
					visible: false
				}


			],
			editing: {
				allowUpdating: true,
				allowDeleting: true,
				allowAdding: true,
				useIcons: true,
			    mode: "popup",
			    form: {
			    	colCount: 2,
					items: [
					{
				    	itemType: "group",
						caption: "General Information",
				    	items: [
				    			{
				        			dataField: "ID_CLIENT",
			                		dataType: "number",
					            	editorOptions: {
					            		disabled: true
					        		}
								},
				        		{
				        			dataField: "CLIENT_NAME",
			                		editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^.{5,255}$/,
						                    message: "Should not be longer than 255 characters."
						            }]
								},{
				                	dataField: "ENTITY_TYPE_ID"
			            		}
								,{
									dataField: "CREATED_DATE",
				                	dataType: "date",
				                	format: 'dd.MM.yyyy',
				                	editorType: "dxDateBox",
					            	editorOptions: {
					            		disabled: true
				        			}
				        		}
				        		,{
				                	dataField: "CREATED_BY",
					            	editorOptions: {
					            		disabled: true
				        			}
			            		},
				        		{
				            		dataField: "DELETED_DATE",
				                	dataType: "date",
				                	format: 'dd.MM.yyyy',
				                	editorType: "dxDateBox",
					            	editorOptions: {
					            		disabled: true
				        			}
								},
				            	{
				                	dataField: "DELETED_BY",
				                	dataType: "number",
				               		editorOptions: {
					            		disabled: true
				        			}
				            	}
						]
					},
				    {
				    	itemType: "group",
						caption: "Incorporation details",
				    	items: [
				    			{
									dataField: "REG_NUMBER",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^[0-9A-Z()#/\-\[\]]{3,16}$/,
						                    message: "May include 0-1, A-Z and [(#-/)] characters."
						                }]
								},
								{
									dataField: "COMPANY_REG_NAME",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^.{5,255}$/,
						                    message: "Should not be longer than 255 characters."
						            }]
								},
								{
									dataField: "PREVIOUS_NAMES",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^.{5,500}$/,
						                    message: "Should not be longer than 500 characters."
						            }]
								},
								{
									dataField: "REG_ADDRESS",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^.{5,500}$/,
						                    message: "Should not be longer than 500 characters."
						            }]
								},
								{
									dataField: "REG_ADDRESS_COUNTRY_ID"
								},
								{
									dataField: "COUNTRY_OF_INC_ID"
								},
								{
									dataField: "DATE_OF_INCORPORATION",
									editorType: "dxDateBox"
								},
								{
									dataField: "FISCAL_REG_NUM",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^[0-9A-Z()#/\-\[\]]{3,16}$/,
						                    message: "May include 0-1, A-Z and [(#-/)] characters."
						                }]
								}
						]
					},
					{
				    	itemType: "group",
						caption: "Physical office address",
						colSpan:  2,
				    	colCount: 2,
				    	items: [
				    			{
									dataField: "CONTACT_ADDRESS",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^.{5,500}$/,
						                    message: "Should not be longer than 500 characters."
						            }]
									
								},
								{
									dataField: "CONTACT_PHONE",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^[0-9\-+()]{5,20}$/,
						                    message: "May include 0-9, A-Z and [(#-/)] characters."
						                }]
								},
								{
									dataField: "CONTACT_COUNTRY_ID"									
								},
								{
									dataField: "CONTACT_FAX",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^[0-9\-+()]{5,20}$/,
						                    message: "May include 0-9, A-Z and [(#-/)] characters."
						                }]
								},
								{
									dataField: "CONTACT_EMAIL",
									editorType: "dxTextBox",
									validationRules: [{
						                    type: "pattern",
						                    pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
						                    message: "Please enter a valid email."
						                }]
								}
								

				    	]
				    }
					]
				}
			},
			onInitNewRow(e) {
				e.data.CREATED_DATE = formatDate(new Date(Date.now()));
				e.data.CREATED_BY = UID;
				console.log(e);
			},
			onEditingStart(e){
				oldValues = e.data;
			},
			selection: {
            	mode: "multiple"
        	},
			groupPanel: {
	            emptyPanelText: "Customers",
	            visible: true
	        },
	        searchPanel: {
	            visible: true,
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
				fileName: "List of customers",
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



