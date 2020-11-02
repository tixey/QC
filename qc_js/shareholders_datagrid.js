
var ShareHoldersStore = new DevExpress.data.CustomStore({
    loadMode: "raw",
    cacheRawData: false,
    key: 'ID',
    load: function(loadOptions) {
            
            var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=024&PAR='+QID;
            return $.getJSON(JSfile4Store);
    },
    byKey: function (key) {
                
            var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=024&PAR='+QID;
            return $.getJSON(JSfile4Store);
    },
    update: function(key, values){

                var PARAMS='ID,QID,NAME,SHARE,SHAREHOLDER_TYPE_ID,OWNERSHIP_TYPE_ID,NATIONALITY_ID,POLITICALLY_EXPOSED_ID,ADV_INFO_ID';
                var P_NAMES = PARAMS.split(',');
                var JSFile4Update = 'php/json_data.php?URL=quest_form.php&SP=026&PAR=POST';
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
                        data[pName] = null;
                    }
                    if(isValidDate(data[pName])){
                        data[pName] = formatDate(data[pName]);
                    }

                }
                //fixing null values     <--
                data['ID']  = key;
                data['QID'] = QID;
               

                return $.post(JSFile4Update, data,
                            function(data, status){
                                  /*  DevExpress.ui.notify(
                                        {message: "Shareholder's information updated!",
                                            position: {
                                                my: "center top",
                                                at: "center top"
                                            }
                                        },"info",5000);*/
                                //$("#business-shareholders-datagrid").dxDataGrid('instance').refresh();
                                            recalc_risk_assessment();
                            });
    },
    remove: function(key){
            var JSFile = 'php/json_data.php?URL=quest_form.php&SP=025&PAR='+key;
            return $.getJSON(JSFile, function(){
                                            DevExpress.ui.notify(
                                                        {message: "Shareholder deleted!",
                                                            position: {
                                                                my: "center top",
                                                                at: "center top"
                                                            }
                                                        },"error",3000);
                                            $("#business-shareholders-datagrid").dxDataGrid('instance').refresh();
                                                        recalc_risk_assessment();
                                    });

    },
    insert: function(values){
                var PARAMS='QID,NAME,SHARE,SHAREHOLDER_TYPE_ID,OWNERSHIP_TYPE_ID,NATIONALITY_ID,POLITICALLY_EXPOSED_ID,ADV_INFO_ID';
                var P_NAMES = PARAMS.split(',');
                var JSFile4Update = 'php/json_data.php?URL=quest_form.php&SP=028&PAR=POST';
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
                data['QID'] = QID;
                //fixing null values     <--

                return $.post(JSFile4Update, data,
                            function(data, status){
                                    DevExpress.ui.notify(
                                        {message: "Shareholder's information added!",
                                            position: {
                                                my: "center top",
                                                at: "center top"
                                            }
                                        },"info",5000);
                                //$("#Customers_001").dxDataGrid('instance').refresh();
                                            recalc_risk_assessment();
                            });
    }

});

var ShareHoldersDS = new DevExpress.data.DataSource({
    store: ShareHoldersStore
});

function add_shareholders_dataGrid(){
    $("#business-shareholders-datagrid").dxDataGrid({
            dataSource: ShareHoldersStore,
            keyExpr: "ID",
            showBorders: true,
            rowAlternationEnabled: false,
            showColumnLines: true,
            showRowLines: true,
            paging: {
                enabled: false
            },
            editing: {
                mode: "cell"
                ,allowUpdating: true
                ,allowDeleting: true
                ,allowAdding:   true
            },
            loadPanel:{
                enabled: false
            },
            columns: [
                {
                    dataField: "ID",
                    width: 50,
                    caption: "No.",
                    allowEditing: false
                },
                {
                    dataField: "NAME",
                    caption: "Name",
                    allowEditing: true
                }, {
                    dataField: "SHARE",
                    caption: "Share, %",
                    width: 75,
                    allowEditing: true
                },  {
                    dataField: "SHAREHOLDER_TYPE_ID",
                    caption: "Type",
                    lookup: {
                        dataSource: EntityTypes,
                        displayExpr: "NAME",
                        valueExpr: "ID"
                    }
                },{
                    dataField: "OWNERSHIP_TYPE_ID",
                    caption: "Level",
                    lookup: {
                        dataSource: OwnershipTypes,
                        displayExpr: "NAME",
                        valueExpr: "ID"
                    }
                },{
                    dataField: "NATIONALITY_ID",
                    caption: "Nationality",
                    dataType: "number",
                    lookup: {
                        dataSource: CountriesAndRisks,
                        displayExpr: "NAME",
                        valueExpr: "ID"
                    }
                },{
                    dataField: "POLITICALLY_EXPOSED_ID",
                    caption: "Polit. Exp. Pers.",
                    width: 100,
                    lookup: {
                        dataSource: LIST_YES_NO,
                        displayExpr: "NAME",
                        valueExpr: "ID"
                    }
                },{
                    dataField: "ADV_INFO_ID",
                    caption: "Adverse inf.",
                    width: 100,
                    lookup: {
                        dataSource: LIST_YES_NO,
                        displayExpr: "NAME",
                        valueExpr: "ID"
                    }
                },{
                    dataField: "ZONE",
                    caption: "Zone",
                    width: 100,
                    allowEditing: false
                },{
                    dataField: "QUEST_ID",
                    visible: false,
                    allowEditing: false
                },{
                    dataField: "CLIENT_ID",
                    visible: false,
                    allowEditing: false
                }

            ],

        onRowValidating : function(e){
            
        },
        rowUpdated: function(e){
            recalc_risk_assessment();
        },
        onInitNewRow(e){

        },
        onRowInserted : function(e){

        },
        onRowRemoved : function(e){

        },
        onInitialized: function(e){tablesProxy.TBL=1;}
        }).dxDataGrid("instance");
}
