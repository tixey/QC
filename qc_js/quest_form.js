if (typeof SELECTED_COMPANY_ID == 'undefined') {var SELECTED_COMPANY_ID=0;}
var COMPANY_ID_SELECTED_IN_SEARCH;
var oldValues;  


var tables4Load = {TBL:5};
var tablesProxy = new Proxy(tables4Load, {
  set: function (target, key, value) {
      target[key] = target[key] - value;
      if(target[key] == 0){recalc_risk_assessment();}
      return true;
  }
});

var QuestData = {
	"CLIENT_NAME":"Apple Inc.",
	"CLIENT_ID":1,

	"COMP_REG_NAME":"Apple Inc.", 
	"COMP_REG_NAME_ADV_INF_ID":2, 
	"COMP_REG_NAME_ADV_INF_ID_RISK_ID":1,

	"COMP_PREV_NAMES":"Apple Inc.", 
	"COMP_PREV_NAMES_AD_INF_ID":2, 
	"COMP_PREV_NAMES_AD_INF_ID_RISK_ID":1,

	"LEGAL_FORM_ID":1, 
	"LEGAL_FORM_ID_RISK_ID":1,

	"REGISTERED_ADDRESS":"Apple Park, Cupertino, California",
	"REGISTERED_COUNTRY_ID":235,
	"REGISTERED_COUNTRY_RISK_ID":4,

	"DATE_OF_INCORPORATION":"01.04.1976",
	"CONTRY_OF_INCORPORATION_ID":235,
	"CONTRY_OF_INCORPORATION_ID_RISK_ID":1,

	"REGISTERED_NUMBER":"APP001",
	"FISCAL_NUMBER":"FN-APP001",
	"COUNTRIES_OF_BUSINESS": [235],
	"COUNTRIES_OF_BUSINESS_RISK_ID":1,

	"REGULATOR_COUNTRY_ID":2,
	"REGULATOR_COUNTRY_ID_RISK_ID":2,

	"PUBLICLY_LISTED_COUNTRY_ID":2,
	"PUBLICLY_LISTED_COUNTRY_ID_RISK_ID":2,

	"MEMBER_OF_GROUP_ID":2,
	"AUDITORS":"Grant Thorton",
	"CREDIT_RATING":"AAA",
	"INTRODUCER":"ABC Corp Limited",

    "ACTIVITIES":[1,2,3],
    "ACTIVITIES_RISK_ID":3,

    "COMPLEX_SHAREHOLDING_ID":21,
    "COMPLEX_SHAREHOLDING_ID_RISK_ID":2,

    "MAIN_CONTROLLER_RESIDENCY_COUNTRIES": [1,2,3,4],
    "MAIN_CONTROLLER_RESIDENCY_COUNTRIES_RISK_ID":3,
    
    "SHAREHOLDERS":20,
    "SHAREHOLDERS_RISK_ID":4,

    "CEO_DIRECTOR_SIGNATORIES":20,
    "CEO_DIRECTOR_SIGNATORIES_RISK_ID":5,

	"PRODUCT_AND_SERVICES_ID":22,
	"PRODUCT_AND_SERVICES_ID_RISK_ID":1,

	"CONFLICT_OF_INTERESTS_ID":1,
	"CONFLICT_OF_INTERESTS_ID_RISK_ID":1,

	"FAILURE_TO_PROVIDE_KYC_ID":2,
	"FAILURE_TO_PROVIDE_KYC_ID_RISK_ID":3,

	"PROFESSIONAL_CLIENT_ID":2,
	"PROFESSIONAL_CLIENT_ID_RISK_ID":4

};

var CLIENT_RISK_ASSESSMENT = [
    {"ID":1,  "RISK_CATEGORY":"Country of incorporation",                 "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":2,  "RISK_CATEGORY":"Country of business",                      "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":3,  "RISK_CATEGORY":"Country of control",                       "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":4,  "RISK_CATEGORY":"1. Country Risk",                          "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":5,  "RISK_CATEGORY":"PEP",                                      "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":6,  "RISK_CATEGORY":"Adverse information",                      "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":7,  "RISK_CATEGORY":"Publicly listed (except for Zone 3)",      "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":8,  "RISK_CATEGORY":"Regulated (except for Zone 3)",            "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":9,  "RISK_CATEGORY":"Complex structure",                        "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":10, "RISK_CATEGORY":"2. Customer/Counterparty risk",            "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":11, "RISK_CATEGORY":"Client's failure to provide KYC details",  "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":12, "RISK_CATEGORY":"Potential conflict of interests",         "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":13, "RISK_CATEGORY":"Business Industry/Activity risk",          "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":14, "RISK_CATEGORY":"3. Customer Business Relationship/Reputational Risk",    "SCORE":0,    "LEVEL":"0: Low"},
    {"ID":15, "RISK_CATEGORY":"4. Sensitive Product/Service risk",        "SCORE":0,    "LEVEL":"0: Low"}
];
var CLIENT_RISK_CATEGORIES = {
	"COUNTRY_OF_INCORPORATION": 0, 
	"COUNTRY_OF_BUSINESS": 1,
	"COUNTRY_OF_CONTROL": 2,
	"SUM_COUNTRY_RISK": 3,
	"PEP": 4,
	"ADV": 5,
	"PUBLICLY_LISTED_NO_Z3": 6,
	"REGULATED_NO_Z3": 7,
	"COMPLEX_STRUCTURE": 8,
	"SUM_CUST_COUNTERPARTY_RISK": 9,
	"KYC_FAILURE": 10,
	"CONFLICT_OF_INTERESTS": 11,
	"BUSINESS_INDUSTRY_RISK": 12,
	"SUM_BUSINESS_REPUTATIONAL_RISK": 13,
	"SUM_SENSITIVE_PRODUCT_SERVICE_RISK": 14
}



var LIST_YES_NO = [{"ID":1,"NAME":"Yes"},{"ID":2,"NAME":"No"}];
var YES_NO_VALUE = 2;

var ACTIVITIES =  new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			//document.getElementById('search-status').setAttribute("style","width: 65%; display: inline-block;text-align: left;");
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=019&PAR=0';
			return $.getJSON(JSfile4Store/*,function() { document.getElementById('search-status').setAttribute("style","width: 65%; display: none;text-align: left;"); }*/);
	},
	byKey: function (key) {
		    //console.log(key);
            var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=019&PAR='+key;
            
            return $.getJSON(JSfile4Store);
     }
});

var Companies = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
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

var EntityTypes = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=027&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=027&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});

var LegalForms = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
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
	cacheRawData: true,
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
	cacheRawData: true,
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
	cacheRawData: true,
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
var OwnershipTypes = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=012&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=012&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});
var CountriesAndRisks = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=013&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=013&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});
var ProductServices = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=014&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=014&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});
var RiskLevels = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=015&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=015&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});
var AdvInfo = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=017&PAR=0';
			return $.getJSON(JSfile4Store);
	},
	byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=017&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});
var ComplexShareholding = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=020&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=020&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});

var ConflictOfInterest = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=021&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=021&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});

var FailureKYC  = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=022&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=022&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});
var ProClient  = new DevExpress.data.CustomStore({
	loadMode: "raw",
	cacheRawData: true,
	key: 'ID',
	load: function(loadOptions) {
			
			var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=023&PAR=0';
			return $.getJSON(JSfile4Store);
	},
		byKey: function (key) {
				
    		var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=023&PAR='+key;
    		return $.getJSON(JSfile4Store);
	}
});

var RiskLevelsDS = new DevExpress.data.DataSource({
    store: RiskLevels
});

var RiskLevelsArr=[];

function getMaxRiskCountry(value, out_field, launch_form){
			if(value!=null && value.length>0){
					var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=018&PAR='+value.toString().replace(/,/g, ';');
					$.getJSON(JSfile4Store,	
					function(result){
						QuestData[out_field] = result[0].RISK_ID;
						if(launch_form){
							QuestForm_001_load();
						}
					});
			}else{
				if(launch_form){
					QuestForm_001_load();
				}
			}

}
function getRiskScoreById(risk_id){
	try{
		return RiskLevelsArr.find(obj => {return obj.ID === risk_id}).SCORE;
	}catch(e){
		return null;
	}
}
function getRiskLevelByID(risk_id){
	try{
		return RiskLevelsArr.find(obj => {return obj.ID === risk_id}).NAME;
	}catch(e){
		return null;
	}
}
function QuestForm_001(){
	var JSfile4Store =  'php/json_data.php?URL=quest_form.php&SP=016&PAR='+QID;
	$.getJSON(JSfile4Store,	
		function(result){
			QuestData = result[0];

			getMaxRiskCountry(eval(QuestData.COUNTRIES_OF_BUSINESS),'COUNTRIES_OF_BUSINESS_RISK_ID',false);
			getMaxRiskCountry(eval(QuestData.MAIN_CONTROLLER_RESIDENCY_COUNTRIES),'MAIN_CONTROLLER_RESIDENCY_COUNTRIES_RISK_ID',false);



			RiskLevels.load().done(function (res){

				RiskLevelsArr = res;
				
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COUNTRY_OF_INCORPORATION].SCORE = getRiskScoreById(QuestData.CONTRY_OF_INCORPORATION_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COUNTRY_OF_BUSINESS].SCORE = getRiskScoreById(QuestData.COUNTRIES_OF_BUSINESS_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COUNTRY_OF_CONTROL].SCORE = getRiskScoreById(QuestData.MAIN_CONTROLLER_RESIDENCY_COUNTRIES_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COUNTRY_OF_INCORPORATION].LEVEL = getRiskLevelByID(QuestData.CONTRY_OF_INCORPORATION_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COUNTRY_OF_BUSINESS].LEVEL = getRiskLevelByID(QuestData.COUNTRIES_OF_BUSINESS_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COUNTRY_OF_CONTROL].LEVEL = getRiskLevelByID(QuestData.MAIN_CONTROLLER_RESIDENCY_COUNTRIES_RISK_ID);

				
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.ADV].SCORE = RiskLevelsArr[0].SCORE;
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.ADV].LEVEL = RiskLevelsArr[0].NAME;
				
				if(CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.ADV].SCORE<getRiskScoreById(QuestData.COMP_REG_NAME_ADV_INF_ID_RISK_ID)){
					CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.ADV].SCORE = getRiskScoreById(QuestData.COMP_REG_NAME_ADV_INF_ID_RISK_ID);
					CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.ADV].LEVEL = getRiskLevelByID(QuestData.COMP_REG_NAME_ADV_INF_ID_RISK_ID);
				}
				
				if(CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.ADV].SCORE<getRiskScoreById(QuestData.COMP_PREV_NAMES_AD_INF_ID_RISK_ID)){
					CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.ADV].SCORE = getRiskScoreById(QuestData.COMP_PREV_NAMES_AD_INF_ID_RISK_ID);
					CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.ADV].LEVEL = getRiskLevelByID(QuestData.COMP_PREV_NAMES_AD_INF_ID_RISK_ID);
				}

				//CLIENT_RISK_ASSESSMENT[5].SCORE = QuestData.;
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.PUBLICLY_LISTED_NO_Z3].SCORE = getRiskScoreById(QuestData.REGULATOR_COUNTRY_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.PUBLICLY_LISTED_NO_Z3].LEVEL = getRiskLevelByID(QuestData.REGULATOR_COUNTRY_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.REGULATED_NO_Z3].SCORE = getRiskScoreById(QuestData.PUBLICLY_LISTED_COUNTRY_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.REGULATED_NO_Z3].LEVEL = getRiskLevelByID(QuestData.PUBLICLY_LISTED_COUNTRY_ID_RISK_ID);
				//CLIENT_RISK_ASSESSMENT[8].SCORE = QuestData.;
				
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COMPLEX_STRUCTURE].SCORE = getRiskScoreById(QuestData.COMPLEX_SHAREHOLDING_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.COMPLEX_STRUCTURE].LEVEL = getRiskLevelByID(QuestData.COMPLEX_SHAREHOLDING_ID_RISK_ID);

				
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.KYC_FAILURE].SCORE = getRiskScoreById(QuestData.FAILURE_TO_PROVIDE_KYC_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].SCORE = getRiskScoreById(QuestData.CONFLICT_OF_INTEREST_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.BUSINESS_INDUSTRY_RISK].SCORE = getRiskScoreById(QuestData.ACTIVITIES_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.KYC_FAILURE].LEVEL = getRiskLevelByID(QuestData.FAILURE_TO_PROVIDE_KYC_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].LEVEL = getRiskLevelByID(QuestData.CONFLICT_OF_INTEREST_ID_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.BUSINESS_INDUSTRY_RISK].LEVEL = getRiskLevelByID(QuestData.ACTIVITIES_RISK_ID);

				//CLIENT_RISK_ASSESSMENT[14].SCORE = QuestData.;
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_SENSITIVE_PRODUCT_SERVICE_RISK].SCORE = getRiskScoreById(QuestData.PRODUCT_AND_SERVICES_RISK_ID);
				CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.SUM_SENSITIVE_PRODUCT_SERVICE_RISK].LEVEL = getRiskLevelByID(QuestData.PRODUCT_AND_SERVICES_RISK_ID);


				QuestForm_001_load();
			})

		
		});
}
var ORIG_ACT;
var qForm;
function QuestForm_001_load(){
	$(function(){

	qForm 	= $("#QuestForm_001").dxForm({
		        formData: QuestData,
		        colCount: 1,
		        onInitialized: function(e){tablesProxy.TBL=1;},
		        items: [
		        	{
		                itemType: "group",
		                caption: "1. General Information",
		                colCount: 6,
		                items: [
		                		{
		                			dataField: "CLIENT_NAME",
		                			label: {text: "Client"},
		                			colSpan: 5,
		                			value: QuestData.CLIENT_NAME,
		                			editorOptions: {
		                				readOnly: true
		                			}

		                		},
		                		{
		                			dataField: "CLIENT_ID",
		                			label: {text: "Client ID"},
		                			colSpan: 1,
		                			value: QuestData.CLIENT_ID,
		                			editorOptions: {
		                				readOnly: true
		                			}
		                		},

		                		{
		                			dataField: "COMP_REG_NAME", 
		                			label: {text: "Registered Name"}, 
		                			colSpan: 3,
		                			value: QuestData.COMP_REG_NAME
		                		},
		                		{
		                			dataField: "COMP_REG_NAME_ADV_INF_ID", 
		                			label: {text: "Adverse Information"}, 
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                        dataSource: AdvInfo,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.COMP_REG_NAME_ADV_INF_ID,
								        onValueChanged: function(data) {
								        		
						                    	AdvInfo.byKey(data.value).done(
						                    		function(dataItem){
						                    			if(dataItem.length>0){
						                    				qForm.getEditor("COMP_REG_NAME_ADV_INF_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
						                    			}
						                    		});
	        							}
				                    },
		                			colSpan: 2
		                		},
		                		{
		                			dataField: "COMP_REG_NAME_ADV_INF_ID_RISK_ID", 
		                			label: {text: "Risk Score"}, 
		                			colSpan: 1,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                    	readOnly: true,
				                        dataSource: RiskLevelsArr,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.COMP_REG_NAME_ADV_INF_ID_RISK_ID,
								        onValueChanged: function(data){
									        	var ra_index = 5;

									        	if(data.value!=null){

						        					if(data.value < RiskLevelsArr.length){
						        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
						        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
						        						recalc_risk_assessment();
						        					}else{
						        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
						        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
						        						recalc_risk_assessment();
						        					}		
									        			
									        	}else{
									        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
									        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
									        		recalc_risk_assessment();
									        	}
									        }
				                    }
		                		},

								{
									dataField: "COMP_PREV_NAMES",
									label: {text: "Previous Names"}, 
									colSpan: 3,
									value: QuestData.COMP_PREV_NAMES
								},
		                		{
		                			dataField: "COMP_PREV_NAMES_AD_INF_ID",
		                			label: {text: "Adverse Information"}, 
		                			colSpan: 2,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                        dataSource: AdvInfo,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.COMP_PREV_NAMES_AD_INF_ID,
								        onValueChanged: function(data) {
						                    	AdvInfo.byKey(data.value).done(
						                    		function(dataItem){
						                    			if(dataItem.length>0){
						                    				qForm.getEditor("COMP_PREV_NAMES_AD_INF_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
						                    			}
						                    		});
	        							}
				                    }
		                		},
		                		{
		                			dataField: "COMP_PREV_NAMES_AD_INF_ID_RISK_ID",
		                			label: {text: "Risk Score"}, 
		                			colSpan: 1,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                    	readOnly: true,
				                        dataSource: RiskLevelsArr,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.COMP_PREV_NAMES_AD_INF_ID_RISK_ID,
								        onValueChanged: function(data){
									        	var ra_index = 5;

									        	if(data.value!=null){

						        					if(data.value < RiskLevelsArr.length){
						        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
						        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
						        						recalc_risk_assessment();
						        					}else{
						        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
						        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
						        						recalc_risk_assessment();
						        					}		
									        			
									        	}else{
									        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
									        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
									        		recalc_risk_assessment();
									        	}
									        }
				                    }
				                },

		                		{
		                			dataField: "DATE_OF_INCORPORATION", 
		                			label: {text: "Incorporation Date"}, 
		                			colSpan: 3,
		                			editorType: "dxDateBox",
				                    editorOptions: {
				                        width: "100%",
				                        displayFormat: "dd.MM.yyyy",
				                        pickerType: "calendar",
								        value: QuestData.DATE_OF_INCORPORATION
				                    }
		                		},
		                		{
		                			dataField: "LEGAL_FORM_ID",
		                			label: {text: "Legal Form"},
		                			colSpan: 2,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                        dataSource: LegalForms,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.LEGAL_FORM_ID,
					                    onValueChanged: function(data) {
						                    	LegalForms.byKey(data.value).done(
						                    		function(dataItem){
						                    			if(dataItem.length>0){
						                    				qForm.getEditor("LEGAL_FORM_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
						                    			}
						                    		});
	        							}
				                    }
		                		}, 
		                		{
		                			dataField: "LEGAL_FORM_ID_RISK_ID", 
		                			label: {text: "Risk Score"},
		                			colSpan: 1,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                    	readOnly: true,
				                        dataSource: RiskLevelsArr,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.LEGAL_FORM_ID_RISK_ID
				                    }
		                		},

		                		{
		                			dataField: "CONTRY_OF_INCORPORATION_ID",
		                			label: {text: "Country of Incorporation"}, 
		                			colSpan: 3,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                        dataSource: CountriesAndRisks,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        searchEnabled: true,
								        value: QuestData.CONTRY_OF_INCORPORATION_ID,
								        onValueChanged: function(data) {
						                    	CountriesAndRisks.byKey(data.value).done(
						                    		function(dataItem){
						                    			if(dataItem.length>0){
						                    				qForm.getEditor("CONTRY_OF_INCORPORATION_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
						                    			}
						                    		});
	        							}
				                    }
		                		},
		                		{
		                			dataField: "REGISTERED_NUMBER",
		                			label: {text: "Reg. Num."},
		                			colSpan: 1,
		                			value: QuestData.REGISTERED_NUMBER
		                		},
		                		{
		                			dataField: "FISCAL_NUMBER",
		                			label: {text: "Fisc. Num."},
		                			colSpan: 1,
		                			value: QuestData.FISCAL_NUMBER
		                		},
		                		{
		                			dataField: "CONTRY_OF_INCORPORATION_ID_RISK_ID",
		                			label: {text: "Risk Score"},
		                			colSpan: 1,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                    	readOnly: true,
				                        dataSource: RiskLevelsArr,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.CONTRY_OF_INCORPORATION_ID_RISK_ID,
								        onValueChanged: function(data){
								        	var ra_index = 0;
								        	if(data.value!=null){

					        					if(data.value < RiskLevelsArr.length){
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
					        						recalc_risk_assessment();
					        					}else{
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
					        						recalc_risk_assessment();
					        					}		
								        			
								        	}else{
								        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
								        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
								        		recalc_risk_assessment();
								        	}
								        }

				                    }
		                		},

		                		{
		                			dataField: "REGISTERED_ADDRESS", 
		                			label: {text: "Reg. Address"}, 
		                			colSpan:3,
		                			value: QuestData.REGISTERED_ADDRESS
		                		},
		                		{
		                			dataField: "REGISTERED_COUNTRY_ID", 
		                			label: {text: "Reg. Country"}, 
		                			colSpan:2,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                        dataSource: CountriesAndRisks,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        searchEnabled: true,
								        value: QuestData.REGISTERED_COUNTRY_ID,
								        onValueChanged: function(data) {
						                    	CountriesAndRisks.byKey(data.value).done(
						                    		function(dataItem){
						                    			if(dataItem.length>0){
						                    				qForm.getEditor("REGISTERED_COUNTRY_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
						                    			}
						                    		});
	        							}
				                    }


		                		},
		                		{
		                			dataField: "REGISTERED_COUNTRY_ID_RISK_ID", 
		                			label: {text: "Risk Score"}, 
		                			colSpan: 1,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                    	readOnly: true,
				                        dataSource: RiskLevelsArr,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.REGISTERED_COUNTRY_ID_RISK_ID
				                    }

		                		},
		                		{
		                			dataField: "AUDITORS", 
		                			label: {text: "Auditors"}, 
				                    value: QuestData.AUDITORS,
		                			colSpan: 3
		                		},
		                		{
		                			dataField: "REGULATOR_COUNTRY_ID",
		                			label: {text: "Regulator"}, 
		                			colSpan: 2,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                        dataSource: CountriesAndRisks,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        searchEnabled: true,
								        value: QuestData.REGULATOR_COUNTRY_ID,
								        onValueChanged: function(data) {
						                    	CountriesAndRisks.byKey(data.value).done(
						                    		function(dataItem){
						                    			if(dataItem.length>0){
						                    				qForm.getEditor("REGULATOR_COUNTRY_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
						                    			}
						                    		});
	        							}
				                    }
		                		},
		                		{
		                			dataField: "REGULATOR_COUNTRY_ID_RISK_ID",
		                			label: {text: "Risk Score"},
		                			colSpan: 1,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                    	readOnly: true,
				                        dataSource: RiskLevelsArr,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.REGULATOR_COUNTRY_ID_RISK_ID,
								        onValueChanged: function(data){
								        	var ra_index = 6;
								        	if(data.value!=null){

					        					if(data.value < RiskLevelsArr.length){
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
					        						recalc_risk_assessment();
					        					}else{
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
					        						recalc_risk_assessment();
					        					}		
								        			
								        	}else{
								        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
								        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
								        		recalc_risk_assessment();
								        	}
								        }

				                    }
		                		},
		                		{
		                			dataField: "CREDIT_RATING", 
		                			label: {text: "Credit Rating"}, 
				                    value: QuestData.CREDIT_RATING,
		                			colSpan: 3
		                		},
		                		{
		                			dataField: "PUBLICLY_LISTED_COUNTRY_ID",
		                			label: {text: "Publicly Listed"}, 
		                			colSpan: 2,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                        dataSource: CountriesAndRisks,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        searchEnabled: true,
								        value: QuestData.PUBLICLY_LISTED_COUNTRY_ID,
								        onValueChanged: function(data) {
						                    	CountriesAndRisks.byKey(data.value).done(
						                    		function(dataItem){
						                    			if(dataItem.length>0){
						                    				qForm.getEditor("PUBLICLY_LISTED_COUNTRY_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
						                    			}
						                    		});
	        							}
				                    }
		                		},
		                		{
		                			dataField: "PUBLICLY_LISTED_COUNTRY_ID_RISK_ID",
		                			label: {text: "Risk Score"},
		                			colSpan: 1,
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                    	readOnly: true,
				                        dataSource: RiskLevelsArr,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.PUBLICLY_LISTED_COUNTRY_ID_RISK_ID,
								        onValueChanged: function(data){
								        	var ra_index = 7;
								        	if(data.value!=null){

					        					if(data.value < RiskLevelsArr.length){
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
					        						recalc_risk_assessment();
					        					}else{
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
					        						recalc_risk_assessment();
					        					}		
								        			
								        	}else{
								        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
								        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
								        		recalc_risk_assessment();
								        	}
								        }

				                    }
		                		},
		                		{
		                			dataField: "MEMBER_OF_GROUP_ID", 
		                			label: {text: "Member of Group"}, 
		                			editorType: "dxSelectBox",
				                    editorOptions: {
				                        dataSource: LIST_YES_NO,
				                        displayExpr: "NAME",
								        valueExpr: "ID",
								        value: QuestData.MEMBER_OF_GROUP_ID
				                    },
		                			colSpan: 3
		                		},
		                		{
		                			dataField: "INTRODUCER", 
		                			label: {text: "Introduced by"}, 
				                    value: QuestData.INTRODUCER,
		                			colSpan: 2
		                		}

		                		]
		            }, {
		                itemType: "group",
		                colCount: 6,
		                caption: "2. Business Activity",
		                items: [
		                	{
		                		dataField: "COUNTRIES_OF_BUSINESS", 
		                		label: {text: "Countries of Business"}, 
		                		colSpan:5,
		                		editorType:"dxDropDownBox",
		                		editorOptions:{
		                			value: eval(QuestData.COUNTRIES_OF_BUSINESS),
        							valueExpr: "ID",
        							displayExpr: "NAME",
        							placeholder: "Select a value...",
        							showClearButton: true,
        							dataSource: CountriesAndRisks,
        							contentTemplate: function(e){
            							return generateTreeView(e, "COUNTRIES_OF_BUSINESS_RISK_ID");
        							}

		                		}
		                	},
		                	{
		                		dataField: "COUNTRIES_OF_BUSINESS_RISK_ID", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.COUNTRIES_OF_BUSINESS_RISK_ID,
							        onValueChanged: function(data){
								        	var ra_index = 1;

								        	if(data.value!=null){

					        					if(data.value < RiskLevelsArr.length){
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
					        						recalc_risk_assessment();
					        					}else{
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
					        						recalc_risk_assessment();
					        					}		
								        			
								        	}else{
								        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
								        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
								        		recalc_risk_assessment();
								        	}
								        }
			                    }
		                	},
		                	{
			                	colSpan: 1,
			                    itemType: "empty"
			                },
		                	{
			                    itemType: "group",
			                    caption: "Activities",
			                    colSpan: 3,
			                    items: [
			                    	{
			                    		colSpan: 3,
			                    		template: 	function (data, itemElement) {
			                    			
			                    				add_business_activity(data, itemElement);
											}	
            						}
			                    ]
		                	},
		                	{
			                	colSpan: 1,
			                    itemType: "empty"
			                },
		                	{
		                		dataField: "RISK_SCORE_ACTIVITIES", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.ACTIVITIES_RISK_ID,
								        onValueChanged: function(data){
								        	var ra_index = 12;
								        	if(data.value!=null){

					        					if(data.value < RiskLevelsArr.length){
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
					        						recalc_risk_assessment();
					        					}else{
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
					        						recalc_risk_assessment();
					        					}		
								        			
								        	}else{
								        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
								        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
								        		recalc_risk_assessment();
								        	}
								        }

			                    }
		                	}
		                ]
		            }, {
		                itemType: "group",
		                caption: "3. Ownership",
		                colCount: 6,
		    			items: [
		    				{
		    					dataField: "COMPLEX_SHAREHOLDING_ID", 
		    					label: {text: "Complex Shareholders"}, 
		    					colSpan: 2,
		    					editorType: "dxSelectBox",
			                    editorOptions: {
			                        dataSource: ComplexShareholding,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.COMPLEX_SHAREHOLDING_ID,
							        onValueChanged: function(data) {
					                    	ComplexShareholding.byKey(data.value).done(
					                    		function(dataItem){
					                    			if(dataItem.length>0){
					                    				qForm.getEditor("COMPLEX_SHAREHOLDING_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
					                    			}
					                    		});
        							}
			                    }
		    				},
		    				{
			                	colSpan: 3,
			                    itemType: "empty"
			                },
		    				{
		    					dataField: "COMPLEX_SHAREHOLDING_ID_RISK_ID", 
		    					label: {text: "Risk Score"}, 
		    					colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.COMPLEX_SHAREHOLDING_ID_RISK_ID
			                    }

		    				},
		    				{
		                		dataField: "MAIN_CONTROLLER_RESIDENCY_COUNTRIES", 
		                		label: {text: "Residency of the Main Controller"}, 
		                		colSpan:5,
		                		editorType:"dxDropDownBox",
		                		editorOptions:{
		                			value: eval(QuestData.MAIN_CONTROLLER_RESIDENCY_COUNTRIES),
        							valueExpr: "ID",
        							displayExpr: "NAME",
        							placeholder: "Select a value...",
        							showClearButton: true,
        							dataSource: CountriesAndRisks,
        							contentTemplate: function(e){
            							return generateTreeView(e,"MAIN_CONTROLLER_RESIDENCY_COUNTRIES_RISK_ID");
        							}
		                		}
		                	},
		                	{
		                		dataField: "MAIN_CONTROLLER_RESIDENCY_COUNTRIES_RISK_ID", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.MAIN_CONTROLLER_RESIDENCY_COUNTRIES_RISK_ID,
							        onValueChanged: function(data){
								        	var ra_index = 2;
								        	if(data.value!=null){

					        					if(data.value < RiskLevelsArr.length){
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
					        						recalc_risk_assessment();
					        					}else{
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
					        						recalc_risk_assessment();
					        					}		
								        			
								        	}else{
								        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
								        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
								        		recalc_risk_assessment();
								        	}
								        }
			                    }

		                	},
		                	{
			                    itemType: "group",
			                    colSpan: 5,
			                    caption: "Shareholders",
			                    items: [{
			                    		colSpan: 5,
			                    		template: 	function (data, itemElement) {
			                    			var fldSet = document.createElement("div");
											fldSet.setAttribute("class", "dx-fieldset");
											fldSet.setAttribute("id", "business-shareholders-datagrid");
											itemElement.append(fldSet);
											add_shareholders_dataGrid();
										}
            						}

			                    ]
		                	},
		                	{
		                		dataField: "RISK_SCORE_SHAREHOLDERS", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.RISK_SCORE_SHAREHOLDERS
			                    }
		                	},

		                	{
			                    itemType: "group",
			                    colSpan: 5,
			                    caption: "Director, CEO and Signatories",
			                    items: [			                    	{
			                    		colSpan: 5,
			                    		template: 	function (data, itemElement) {
			                    			var fldSet = document.createElement("div");
											fldSet.setAttribute("class", "dx-fieldset");
											fldSet.setAttribute("id", "business-directors-ceo-signatories");
											itemElement.append(fldSet);
											add_directors_ceo_signatories_dataGrid();
										}
            						}

			                    ]
		                	},
		                	{
		                		dataField: "RISK_SCORE_CEO_DIRECTOR_SIGNATORIES", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.RISK_SCORE_CEO_DIRECTOR_SIGNATORIES
			                    }
		                	}
		                	
		                ]
		        	}, {
		                itemType: "group",
		                caption: "3. Know your Business",
		    			colCount: 6,
		                items: [
		                	{
		                		dataField: "PRODUCT_AND_SERVICES_ID", 
		                		label: {text: "Products and Services"}, 
		                		colSpan: 3,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                        dataSource: ProductServices,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.PRODUCT_AND_SERVICES_ID,
							        onValueChanged: function(data) {
					                    	ProductServices.byKey(data.value).done(
					                    		function(dataItem){
					                    			if(dataItem.length>0){
					                    				qForm.getEditor("PRODUCT_AND_SERVICES_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
					                    			}
					                    		});
        							}
			                    }
		                	},
		                	{itemType: "empty", colSpan: 2},
		                	{
		                		dataField: "PRODUCT_AND_SERVICES_ID_RISK_ID", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.PRODUCT_AND_SERVICES_RISK_ID
			                    }
		                	},

		                	{
		                		dataField: "CONFLICT_OF_INTERESTS_ID", 
		                		label: {text: "Conflict of Interests"}, 
		                		colSpan: 3,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                        dataSource: ConflictOfInterest,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.CONFLICT_OF_INTERESTS_ID,
							        onValueChanged: function(data) {
					                    	ConflictOfInterest.byKey(data.value).done(
					                    		function(dataItem){
					                    			if(dataItem.length>0){
					                    				qForm.getEditor("CONFLICT_OF_INTERESTS_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
					                    			}
					                    		});
        							}
			                    }
		                	},
		                	{itemType: "empty", colSpan: 2},
		                	{
		                		dataField: "CONFLICT_OF_INTERESTS_ID_RISK_ID", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.CONFLICT_OF_INTERESTS_ID_RISK_ID,
								        onValueChanged: function(data){
								        	console.log(data);
								        	var ra_index = 11;
								        	if(data.value!=null){

					        					if(data.value < RiskLevelsArr.length){
					        						CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].SCORE = getRiskScoreById(data.value);
					        						CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].LEVEL = getRiskLevelByID(data.value);
					        						recalc_risk_assessment();
					        					}else{
					        						CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].SCORE = null;
					        						CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].LEVEL = 'Not Defined';
					        						recalc_risk_assessment();
					        					}		
								        			
								        	}else{
								        		CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].SCORE = null;
								        		CLIENT_RISK_ASSESSMENT[CLIENT_RISK_CATEGORIES.CONFLICT_OF_INTERESTS].LEVEL = 'Not Defined';
								        		recalc_risk_assessment();
								        	}
								        }
			                    }
		                	},

		                	{
		                		dataField: "FAILURE_TO_PROVIDE_KYC_ID", 
		                		label: {text: "Failure to provide KYC"}, 
		                		colSpan: 3,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                        dataSource: FailureKYC,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.FAILURE_TO_PROVIDE_KYC_ID,
							        onValueChanged: function(data) {
					                    	FailureKYC.byKey(data.value).done(
					                    		
					                    		function(dataItem){
					                    			if(dataItem.length>0){
					                    				qForm.getEditor("FAILURE_TO_PROVIDE_KYC_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
					                    			}
					                    		});
        							}
			                    }

		                	},
		                	{itemType: "empty", colSpan: 2},
		                	{
		                		dataField: "FAILURE_TO_PROVIDE_KYC_ID_RISK_ID", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.FAILURE_TO_PROVIDE_KYC_ID_RISK_ID,
							        onValueChanged: function(data){
							        	var ra_index = 10;
							        	if(data.value!=null){

					        					if(data.value < RiskLevelsArr.length){
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = getRiskScoreById(data.value);
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = getRiskLevelByID(data.value);
					        						recalc_risk_assessment();
					        					}else{
					        						CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
					        						CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
					        						recalc_risk_assessment();
					        					}		
								        			
								        	}else{
								        		CLIENT_RISK_ASSESSMENT[ra_index].SCORE = null;
								        		CLIENT_RISK_ASSESSMENT[ra_index].LEVEL = 'Not Defined';
								        		recalc_risk_assessment();
								        	}
							        }
			                    }
		                	},

		                	{
		                		dataField: "PROFESSIONAL_CLIENT_ID", 
		                		label: {text: "Professional Client"},  
		                		colSpan: 3,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                        dataSource: ProClient,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.PROFESSIONAL_CLIENT_ID,
							        onValueChanged: function(data) {
					                    	ProClient.byKey(data.value).done(
					                    		function(dataItem){
					                    			if(dataItem.length>0){
					                    				qForm.getEditor("PROFESSIONAL_CLIENT_ID_RISK_ID").option("value",dataItem[0].RISK_ID);
					                    			}
					                    		});
        							}
			                    }

		                	},
		                	{itemType: "empty", colSpan: 2},
		                	{
		                		dataField: "PROFESSIONAL_CLIENT_ID_RISK_ID", 
		                		label: {text: "Risk Score"}, 
		                		colSpan: 1,
	                			editorType: "dxSelectBox",
			                    editorOptions: {
			                    	readOnly: true,
			                        dataSource: RiskLevelsArr,
			                        displayExpr: "NAME",
							        valueExpr: "ID",
							        value: QuestData.PROFESSIONAL_CLIENT_ID_RISK_ID
			                    }
		                	}
		                ]
		        	}, {
		                itemType: "group",
		                caption: "4. Client Risk Assessment",
		    			colCount: 6,
		                items: [
							{itemType: "empty", colSpan: 1},
							{
	                    		colSpan: 4,
	                    		template: 	function (data, itemElement) {
	                    			var fldSet = document.createElement("div");
									fldSet.setAttribute("class", "dx-fieldset");
									fldSet.setAttribute("id", "client-risk-assesment");
									itemElement.append(fldSet);
									client_risk_assessment_dataGrid();
								}
							},
							{itemType: "empty", colSpan: 1}
		                ]
		            },{
		            	itemType: "group",
		            	caption: "Questionnaire Actions",
		            	colCount: 6,
		            	items: [
		            			{itemType: "empty", colSpan: 3},
		            			{
		            				colSpan: 1,
						            itemType: "button",
						            horizontalAlignment: "left",
						            buttonOptions: {
						                text: "Save Draft",
						                type: "default",
						                useSubmitBehavior: false,
						                onClick: function(){

							            	var PARAMS='QUEST_ID,COMP_REG_NAME,COMP_REG_NAME_ADV_INF_ID,COMP_REG_NAME_ADV_INF_ID_RISK_ID,COMP_PREV_NAMES,COMP_PREV_NAMES_AD_INF_ID,COMP_PREV_NAMES_AD_INF_ID_RISK_ID,LEGAL_FORM_ID,LEGAL_FORM_ID_RISK_ID,REGISTERED_ADDRESS,REGISTERED_COUNTRY_ID,REGISTERED_COUNTRY_RISK_ID,DATE_OF_INCORPORATION,CONTRY_OF_INCORPORATION_ID,CONTRY_OF_INCORPORATION_ID_RISK_ID,REGISTERED_NUMBER,FISCAL_NUMBER,COUNTRIES_OF_BUSINESS,COUNTRIES_OF_BUSINESS_RISK_ID,REGULATOR_COUNTRY_ID,REGULATOR_COUNTRY_ID_RISK_ID,PUBLICLY_LISTED_COUNTRY_ID,PUBLICLY_LISTED_COUNTRY_ID_RISK_ID,MEMBER_OF_GROUP_ID,AUDITORS,CREDIT_RATING,INTRODUCER,ACTIVITIES,ACTIVITIES_RISK_ID,COMPLEX_SHAREHOLDING_ID,COMPLEX_SHAREHOLDING_ID_RISK_ID,MAIN_CONTROLLER_RESIDENCY_COUNTRIES,MAIN_CONTROLLER_RESIDENCY_COUNTRIES_RISK_ID,SHAREHOLDERS,SHAREHOLDERS_RISK_ID,CEO_DIRECTOR_SIGNATORIES,CEO_DIRECTOR_SIGNATORIES_RISK_ID,PRODUCT_AND_SERVICES_ID,PRODUCT_AND_SERVICES_ID_RISK_ID,CONFLICT_OF_INTERESTS_ID,CONFLICT_OF_INTERESTS_ID_RISK_ID,FAILURE_TO_PROVIDE_KYC_ID,FAILURE_TO_PROVIDE_KYC_ID_RISK_ID,PROFESSIONAL_CLIENT_ID,PROFESSIONAL_CLIENT_ID_RISK_ID';
							                var P_NAMES = PARAMS.split(',');
							                var JSFile4Update = 'php/json_data.php?URL=quest_form.php&SP=034&PAR=POST';
							                var data       = QuestData;
							                ORIG_ACT = QuestData.ACTIVITIES;
							                data.ACTIVITIES ="[";
							                c=0;
							                for(i=0;i<ORIG_ACT.length;i++){ 

							                	if(ORIG_ACT[i].Value==1){
							                		if(c==0){
							                			data.ACTIVITIES += ORIG_ACT[i].ID;
							                		}else{
							                			data.ACTIVITIES += ','+ORIG_ACT[i].ID;
							                		}
							                		c++;
							                	}
							                }
											data.ACTIVITIES += ']';
							                data.PARAMS    = PARAMS;
							                
							            	return $.post(JSFile4Update, data,
					                            function(data, status){
					                            	QuestData.ACTIVITIES = ORIG_ACT;
					                            	DevExpress.ui.notify(
							                            {message: "Draft is saved!",
							                                position: {
							                                    my: "center top",
							                                    at: "center top"
							                                }
							                            },"info",5000);
					                            });
							            }
						            },
						            
						        },
						        {
		            				colSpan: 1,
						            itemType: "button",
						            horizontalAlignment: "left",
						            buttonOptions: {
						                text: "Reject",
						                type: "danger",
						                useSubmitBehavior: false
						            }
						        },
						        {
		            				colSpan: 1,
						            itemType: "button",
						            horizontalAlignment: "left",
						            buttonOptions: {
						                text: "Approve",
						                type: "success",
						                useSubmitBehavior: false
						            }
						        }
		            	]
		            }
		        ]
		    }).dxForm("instance"); 
	});
}






