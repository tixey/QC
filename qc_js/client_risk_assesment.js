var TOTAL_RISK_RANGES = [
    {"ID":0, "MIN_SCORE": 0, "MAX_SCORE": 2, "LEVEL":"Normal Risk"},
    {"ID":1, "MIN_SCORE": 3, "MAX_SCORE": 4, "LEVEL":"Medium Risk"},
    {"ID":2, "MIN_SCORE": 5, "MAX_SCORE": 30, "LEVEL":"High Risk"}
]


var RA_TBL;
function client_risk_assessment_dataGrid(){
    RA_TBL = $("#client-risk-assesment").dxDataGrid({
            dataSource: CLIENT_RISK_ASSESSMENT,
            keyExpr: "ID",
            showBorders: true,
            rowAlternationEnabled: false,
            showColumnLines: true,
            showRowLines: true,
            paging: {
                enabled: false
            },
            columns: [
                {
                    dataField: "RISK_CATEGORY",
                    caption: "Risk Category"
                }, {
                    dataField: "SCORE",
                    caption: "Score",
                    width: 150
                }, {
                    dataField: "LEVEL",
                    caption: "Level",
                    width: 200
                }
            

            ],

            onInitialized: function(e){
                tablesProxy.TBL=1;
            },
            onRowPrepared: function (e) {  
    
                if (e.rowType == "header"){
                    e.rowElement.css('background-color', '#337ab7');
                    e.rowElement.css('font-weight', 'bold'); 
                    e.rowElement.css('color', 'white'); 
                };
                if (e.rowType == "data" && (e.key == 4 || e.key == 10 || e.key == 14|| e.key == 15)){ 
                    e.rowElement.css('background-color', '#ddd');  
                    e.rowElement.css('font-weight', 'bold');  
     
                }
            },
            summary: {
            totalItems: [{
                    name: "TotalScore",
                    showInColumn: "SCORE",
                    displayFormat: "TOTAL SCORE: {0}",
                    summaryType: "custom"
                },{
                    column: "Level",
                    name: "FinalLevel",
                    summaryType: "custom",
                    customizeText: function(data){
                        var TotalRisk = CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_COUNTRY_RISK].SCORE + 
                                        CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_CUST_COUNTERPARTY_RISK].SCORE + 
                                        CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_BUSINESS_REPUTATIONAL_RISK].SCORE + 
                                        CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_SENSITIVE_PRODUCT_SERVICE_RISK].SCORE;
                        for(i=0;i<TOTAL_RISK_RANGES.length;i++){
                            if(TotalRisk>=TOTAL_RISK_RANGES[i].MIN_SCORE && TotalRisk<=TOTAL_RISK_RANGES[i].MAX_SCORE){
                                return TOTAL_RISK_RANGES[i].LEVEL.toUpperCase();
                            }
                        }
                    }
                }
            ],
            calculateCustomSummary: function (options) {
                if (options.name === "TotalScore") {
                    if (options.summaryProcess === "start") {
                        options.totalValue = 0;
                    }
                    if (options.summaryProcess === "calculate") {
                        console.log(options.value);
                        if( options.value.ID == (CLIENT_RISK_CATEGORIES.SUM_COUNTRY_RISK+1) ||
                            options.value.ID == (CLIENT_RISK_CATEGORIES.SUM_CUST_COUNTERPARTY_RISK+1) ||
                            options.value.ID == (CLIENT_RISK_CATEGORIES.SUM_BUSINESS_REPUTATIONAL_RISK+1) ||
                            options.value.ID == (CLIENT_RISK_CATEGORIES.SUM_SENSITIVE_PRODUCT_SERVICE_RISK+1)
                            ){
                            options.totalValue  = options.totalValue + options.value.SCORE;
                        }
                    }
                }
            }
        }


        }).dxDataGrid("instance");
}




function recalc_risk_assessment(){ 

    recalculateActivitiesRisk();

    CeoDirSignDS.load().done(
        function(result1){
            
            CLIENT_RISK_ASSESSMENT[7].SCORE = getRiskScoreById(QuestData.REGULATOR_COUNTRY_ID_RISK_ID);
            CLIENT_RISK_ASSESSMENT[7].LEVEL = getRiskLevelByID(QuestData.REGULATOR_COUNTRY_ID_RISK_ID);
            CLIENT_RISK_ASSESSMENT[6].SCORE = getRiskScoreById(QuestData.PUBLICLY_LISTED_COUNTRY_ID_RISK_ID);
            CLIENT_RISK_ASSESSMENT[6].LEVEL = getRiskLevelByID(QuestData.PUBLICLY_LISTED_COUNTRY_ID_RISK_ID);
            
            CLIENT_RISK_ASSESSMENT[5].SCORE = getRiskScoreById(QuestData.COMP_PREV_NAMES_AD_INF_ID_RISK_ID);
            CLIENT_RISK_ASSESSMENT[5].LEVEL = getRiskLevelByID(QuestData.COMP_PREV_NAMES_AD_INF_ID_RISK_ID);

            if(CLIENT_RISK_ASSESSMENT[5].SCORE<getRiskScoreById(QuestData.COMP_REG_NAME_ADV_INF_ID_RISK_ID)){
                CLIENT_RISK_ASSESSMENT[5].SCORE = getRiskScoreById(QuestData.COMP_REG_NAME_ADV_INF_ID_RISK_ID);
                CLIENT_RISK_ASSESSMENT[5].LEVEL = getRiskLevelByID(QuestData.COMP_REG_NAME_ADV_INF_ID_RISK_ID);
            }



            CLIENT_RISK_ASSESSMENT[4].SCORE = getRiskScoreById(1); // PEP
            CLIENT_RISK_ASSESSMENT[4].LEVEL = getRiskLevelByID(1); // PEP
            let ind = 1;
            for(i=0;i<result1.length;i++){
                if(result1[i].ADVERSE == 1){
                    CLIENT_RISK_ASSESSMENT[5].SCORE = getRiskScoreById(3);
                    CLIENT_RISK_ASSESSMENT[5].LEVEL = getRiskLevelByID(3);
                    ind = 3;
                }

                if(result1[i].PEP == 1){
                    CLIENT_RISK_ASSESSMENT[4].SCORE = getRiskScoreById(3);
                    CLIENT_RISK_ASSESSMENT[4].LEVEL = getRiskLevelByID(3);
                    ind = 3;
                }
            }
            qForm.getEditor("RISK_SCORE_CEO_DIRECTOR_SIGNATORIES").option("value", ind);

            ShareHoldersDS.load().done(
                function(result2){
                    let ind = 1;
                    for(i=0;i<result2.length;i++){
                        if(result2[i].ADV_INFO_ID == 1){
                            CLIENT_RISK_ASSESSMENT[5].SCORE = getRiskScoreById(3);
                            CLIENT_RISK_ASSESSMENT[5].LEVEL = getRiskLevelByID(3);
                            ind=3;
                        }

                        if(result2[i].POLITICALLY_EXPOSED_ID == 1){
                            CLIENT_RISK_ASSESSMENT[4].SCORE = getRiskScoreById(3);
                            CLIENT_RISK_ASSESSMENT[4].LEVEL = getRiskLevelByID(3);
                            ind=3;
                        }
                    }
                    qForm.getEditor("RISK_SCORE_SHAREHOLDERS").option("value", ind);


                    //var COUNTRY_RISK  = CLIENT_RISK_ASSESSMENT[0].SCORE+CLIENT_RISK_ASSESSMENT[1].SCORE+CLIENT_RISK_ASSESSMENT[2].SCORE;
                    var CUSTOMER_RISK = CLIENT_RISK_ASSESSMENT[4].SCORE+CLIENT_RISK_ASSESSMENT[5].SCORE+CLIENT_RISK_ASSESSMENT[6].SCORE+CLIENT_RISK_ASSESSMENT[7].SCORE+CLIENT_RISK_ASSESSMENT[8].SCORE;
                    var IND_ACT_RISK  = CLIENT_RISK_ASSESSMENT[10].SCORE+CLIENT_RISK_ASSESSMENT[11].SCORE+CLIENT_RISK_ASSESSMENT[12].SCORE;

                    //CLIENT_RISK_ASSESSMENT[3].SCORE = COUNTRY_RISK;
                    CLIENT_RISK_ASSESSMENT[9].SCORE = CUSTOMER_RISK;
                    CLIENT_RISK_ASSESSMENT[13].SCORE = IND_ACT_RISK;

                    var COUNTRY_RISK_MAX =    Math.max(CLIENT_RISK_ASSESSMENT[0].SCORE,CLIENT_RISK_ASSESSMENT[1].SCORE,CLIENT_RISK_ASSESSMENT[2].SCORE);  
                    CLIENT_RISK_ASSESSMENT[3].SCORE = COUNTRY_RISK_MAX;
                    if(COUNTRY_RISK_MAX == CLIENT_RISK_ASSESSMENT[0].SCORE){CLIENT_RISK_ASSESSMENT[3].LEVEL = CLIENT_RISK_ASSESSMENT[0].LEVEL.replace(/[0-9]{1,2}:/g,'');}    
                    if(COUNTRY_RISK_MAX == CLIENT_RISK_ASSESSMENT[1].SCORE){CLIENT_RISK_ASSESSMENT[3].LEVEL = CLIENT_RISK_ASSESSMENT[1].LEVEL.replace(/[0-9]{1,2}:/g,'');} 
                    if(COUNTRY_RISK_MAX == CLIENT_RISK_ASSESSMENT[2].SCORE){CLIENT_RISK_ASSESSMENT[3].LEVEL = CLIENT_RISK_ASSESSMENT[2].LEVEL.replace(/[0-9]{1,2}:/g,'');}  

                    var CUSTOMER_RISK_MAX =    Math.max(CLIENT_RISK_ASSESSMENT[4].SCORE,CLIENT_RISK_ASSESSMENT[5].SCORE,CLIENT_RISK_ASSESSMENT[6].SCORE,CLIENT_RISK_ASSESSMENT[7].SCORE,CLIENT_RISK_ASSESSMENT[8].SCORE);  
                    if(CUSTOMER_RISK_MAX == CLIENT_RISK_ASSESSMENT[4].SCORE){CLIENT_RISK_ASSESSMENT[9].LEVEL = CLIENT_RISK_ASSESSMENT[4].LEVEL.replace(/[0-9]{1,2}:/g,'');}    
                    if(CUSTOMER_RISK_MAX == CLIENT_RISK_ASSESSMENT[5].SCORE){CLIENT_RISK_ASSESSMENT[9].LEVEL = CLIENT_RISK_ASSESSMENT[5].LEVEL.replace(/[0-9]{1,2}:/g,'');} 
                    if(CUSTOMER_RISK_MAX == CLIENT_RISK_ASSESSMENT[6].SCORE){CLIENT_RISK_ASSESSMENT[9].LEVEL = CLIENT_RISK_ASSESSMENT[6].LEVEL.replace(/[0-9]{1,2}:/g,'');}
                    if(CUSTOMER_RISK_MAX == CLIENT_RISK_ASSESSMENT[7].SCORE){CLIENT_RISK_ASSESSMENT[9].LEVEL = CLIENT_RISK_ASSESSMENT[7].LEVEL.replace(/[0-9]{1,2}:/g,'');} 
                    if(CUSTOMER_RISK_MAX == CLIENT_RISK_ASSESSMENT[8].SCORE){CLIENT_RISK_ASSESSMENT[9].LEVEL = CLIENT_RISK_ASSESSMENT[8].LEVEL.replace(/[0-9]{1,2}:/g,'');}  




                    CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].SCORE = getRiskScoreById(QuestData.CONFLICT_OF_INTERESTS_ID_RISK_ID);
                    CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].LEVEL = getRiskLevelByID(QuestData.CONFLICT_OF_INTERESTS_ID_RISK_ID);

                    var IND_ACT_RISK_MAX  = Math.max(CLIENT_RISK_ASSESSMENT[10].SCORE,CLIENT_RISK_ASSESSMENT[11].SCORE,CLIENT_RISK_ASSESSMENT[12].SCORE);
                    if(IND_ACT_RISK_MAX == CLIENT_RISK_ASSESSMENT[10].SCORE){CLIENT_RISK_ASSESSMENT[13].LEVEL = CLIENT_RISK_ASSESSMENT[0].LEVEL.replace(/[0-9]{1,2}:/g,'');}    
                    if(IND_ACT_RISK_MAX == CLIENT_RISK_ASSESSMENT[11].SCORE){CLIENT_RISK_ASSESSMENT[13].LEVEL = CLIENT_RISK_ASSESSMENT[1].LEVEL.replace(/[0-9]{1,2}:/g,'');} 
                    if(IND_ACT_RISK_MAX == CLIENT_RISK_ASSESSMENT[12].SCORE){CLIENT_RISK_ASSESSMENT[13].LEVEL = CLIENT_RISK_ASSESSMENT[2].LEVEL.replace(/[0-9]{1,2}:/g,'');}  


                    CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COMPLEX_STRUCTURE].SCORE = getRiskScoreById(QuestData.COMPLEX_SHAREHOLDING_ID_RISK_ID);
                    CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COMPLEX_STRUCTURE].LEVEL = getRiskLevelByID(QuestData.COMPLEX_SHAREHOLDING_ID_RISK_ID);
                    
                    CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_SENSITIVE_PRODUCT_SERVICE_RISK].SCORE = getRiskScoreById(QuestData.PRODUCT_AND_SERVICES_ID_RISK_ID);
                    CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_SENSITIVE_PRODUCT_SERVICE_RISK].LEVEL = getRiskLevelByID(QuestData.PRODUCT_AND_SERVICES_ID_RISK_ID);

                    CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_SENSITIVE_PRODUCT_SERVICE_RISK].LEVEL = CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_SENSITIVE_PRODUCT_SERVICE_RISK].LEVEL.replace(/[0-9]{1,2}:/g,'');



                    RA_TBL.dataSource = CLIENT_RISK_ASSESSMENT;
                    RA_TBL.refresh();

                }
            )
        }
    );
    


}