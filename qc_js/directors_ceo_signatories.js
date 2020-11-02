

var CeoDirSignStore = new DevExpress.data.CustomStore({
    loadMode: "raw",
    cacheRawData: false,
    key: 'ID',
    load: function(loadOptions) {
            var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=030&PAR='+QID;

            return $.getJSON(JSfile4Store);
    },
    byKey: function (key) {
            var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=030&PAR='+QID;

            return $.getJSON(JSfile4Store);
    },
    update: function(key, values){
            var PARAMS='ID,QID,NAME,CEO,DIRECTOR,SIGN,DESIGNATION,NATIONALITY,PEP,ADVERSE';
            var P_NAMES = PARAMS.split(',');
            var JSFile4Update = 'php/json_data.php?URL=quest_form.php&SP=031&PAR=POST';
            var data       = {};
            data.PARAMS    = PARAMS;
            var newValues  = values;

            //fixing null values     -->
            for(var i=0;i<P_NAMES.length;i++){ 
                pName=P_NAMES[i];
                // if null => null
                
                if (newValues[pName] != null) {
                    if(newValues[pName]== true ){newValues[pName]=1;}
                    if(newValues[pName]== false ){newValues[pName]=0;}
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
            var JSFile = 'php/json_data.php?URL=quest_form.php&SP=032&PAR='+key;

            return $.getJSON(JSFile, function(){
                                            DevExpress.ui.notify(
                                                        {message: "CEO/Director/Signatory's information deleted!",
                                                            position: {
                                                                my: "center top",
                                                                at: "center top"
                                                            }
                                                        },"error",3000);
                                            $("#business-directors-ceo-signatories").dxDataGrid('instance').refresh();
                                                        recalc_risk_assessment();
                                    });
    },
    insert: function(values){

            var PARAMS='NAME,CEO,DIRECTOR,SIGN,DESIGNATION,NATIONALITY,PEP,ADVERSE,QID';
            var P_NAMES = PARAMS.split(',');
            var JSFile4Update = 'php/json_data.php?URL=quest_form.php&SP=033&PAR=POST';
            var data       = {};
            data.PARAMS    = PARAMS;
            var newValues  = values;

            //fixing null values     -->
            for(var i=0;i<P_NAMES.length;i++){ 
                pName=P_NAMES[i];
                // if null => null
                
                if (newValues[pName] != null) {
                    if(newValues[pName]== true ){newValues[pName]=1;}
                    if(newValues[pName]== false ){newValues[pName]=0;}
                    data[pName] = newValues[pName];
                }else{
                    data[pName] = null;
                }
                if(isValidDate(data[pName])){
                    data[pName] = formatDate(data[pName]);
                }

            }
            //fixing null values     <--

            data['QID'] = QID;

            return $.post(JSFile4Update, data,
                function(data, status){
                        DevExpress.ui.notify(
                            {message: "CEO/Director/Signatory's information added!",
                                position: {
                                    my: "center top",
                                    at: "center top"
                                }
                            },"info",5000);
                                    recalc_risk_assessment();
                    //$("#Customers_001").dxDataGrid('instance').refresh();
                });
    }
});

var CeoDirSignDS = new DevExpress.data.DataSource({
    store: CeoDirSignStore
});

function add_directors_ceo_signatories_dataGrid(){
    $("#business-directors-ceo-signatories").dxDataGrid({
            dataSource: CeoDirSignStore,
            showBorders: true,
            rowAlternationEnabled: false,
            showColumnLines: true,
            showRowLines: true,
            keyExpr: "ID",
            paging: {
                enabled: false
            },
            editing: {
                mode: "cell"
                ,allowUpdating: true
                ,allowDeleting: true
                ,allowAdding: true
            },loadPanel:{
                enabled: false
            },
            columns: [
                {
                    dataField: "ID",
                    caption: "No.",
                    allowEditing: false
                },
    			{
                    dataField: "NAME",
                    caption: "Name",
                    width: 200,
                    allowEditing: true
                }, {
                    dataField: "CEO",
                    caption: "CEO",
                    dataType: "boolean",
                    allowEditing: true
                },  {
                    dataField: "DIRECTOR",
                    caption: "Dir.",
                    dataType: "boolean",
                    allowEditing: true
                },  {
                    dataField: "SIGN",
                    caption: "Sign",
                    dataType: "boolean",
                    allowEditing: true
                },            {
                    dataField: "DESIGNATION",
                    caption: "Designation",
                    dataType: "date",
                    format: "dd.MM.YYYY"
                },

                {
                    dataField: "NATIONALITY",
                    caption: "Nationality",
                    lookup: {
                        dataSource: CountriesAndRisks,
                        displayExpr: "NAME",
                        valueExpr: "ID"
                    }
                },
                {
                    dataField: "PEP",
                    caption: "Polit. Exp. Pers.",
                    width: 100,
                    lookup: {
                        dataSource: LIST_YES_NO,
                        displayExpr: "NAME",
                        valueExpr: "ID"
                    }
                },
                {
                    dataField: "ADVERSE",
                    caption: "Adverse inf.",
                    width: 100,
                    lookup: {
                        dataSource: LIST_YES_NO,
                        displayExpr: "NAME",
                        valueExpr: "ID"
                    }
                },
                {
                    dataField: "ZONE",
                    caption: "Zone",
                    allowEditing: false
                }
            ],
        onRowValidating : function(e){

        },
        onInitNewRow(e){

        },
        rowUpdated: function(e){

        },
        onRowInserted : function(e){

        },
        onRowRemoved : function(e){

        },
        onInitialized: function(e){tablesProxy.TBL=1;}

        }).dxDataGrid("instance");
}
