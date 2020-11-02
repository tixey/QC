
var ActivitiesAndRisks=[];

function add_business_activity(data, itemElement){
	
	var fldSet = document.createElement("div");
	fldSet.setAttribute("class", "dx-fieldset");
	fldSet.setAttribute("id", "business-activity-group");
	/*var fHeader = document.createElement("div");
	fHeader.setAttribute("class", "dx-fieldset-header");
	fHeader.innerText ='Business Activities';
	fldSet.appendChild(fHeader);*/
	itemElement.append(fldSet);

	ACTIVITIES.load().done(
		function(data){

			ActivitiesAndRisks = data;


			if(QuestData.ACTIVITIES==''){
				QuestData.ACTIVITIES = [];
			}
			var ActFromDataBase = eval(QuestData.ACTIVITIES);
			QuestData.ACTIVITIES = [];
			for(i=0;i<ActivitiesAndRisks.length;i++){
				var Act = {'ID':ActivitiesAndRisks[i].ID, 'Value':2};

				for(k=0;k<ActFromDataBase.length;k++){
					if(ActFromDataBase[k]==ActivitiesAndRisks[i].ID){
						Act.Value = 1; //yes
						break;
					}
				}	
				QuestData.ACTIVITIES[i] = Act;
			}

			QuestData.ACTIVITIES_RISK_ID = recalculateActivitiesRisk();
			qForm.getEditor("RISK_SCORE_ACTIVITIES").option("value", QuestData.ACTIVITIES_RISK_ID);

			var group = document.getElementById('business-activity-group');

			for(i=0; i<data.length; i++){
				
				var fld = document.createElement("div");
				fld.setAttribute("class", "dx-field");
				
				var fld_lbl = document.createElement("div");
				fld_lbl.setAttribute("class", "dx-field-label business-act-label");
				fld_lbl.innerText = data[i].NAME;
				fld.appendChild(fld_lbl);

				var fld_val = document.createElement("div");
				fld_val.setAttribute("class", "dx-field-value business-act-value");
				fld_val.setAttribute("style", "width:");
				
				var rgroup = document.createElement("div");
				rgroup.setAttribute("id", 'radio-group-'+i);
				fld_val.appendChild(rgroup);
				
				fld.appendChild(fld_val);
				group.appendChild(fld);
				

				$('#radio-group-'+i).dxRadioGroup({
			        dataSource: LIST_YES_NO,
			        displayExpr: "NAME",
			        valueExpr: "ID",
			        index: i,
			        value: QuestData.ACTIVITIES[i].Value,
			        layout: "horizontal",
			        onValueChanged: function(data) {
			      						QuestData.ACTIVITIES[data.component._options.index].Value=data.value;
						            	qForm.getEditor("RISK_SCORE_ACTIVITIES").option("value", recalculateActivitiesRisk());
	        						}

				});
			}
			tablesProxy.TBL=1;
		});

}

function recalculateActivitiesRisk(){
	maxRiskScore=0;
	maxRiskId=1;
	if(ActivitiesAndRisks==null || ActivitiesAndRisks.Length==0 || QuestData.ACTIVITIES==null || QuestData.ACTIVITIES.Length==0)
	{
		return maxRiskId;
	}
	for(i=0; i<QuestData.ACTIVITIES.length; i++){
		for(j=0;j<ActivitiesAndRisks.length;j++){
			if(QuestData.ACTIVITIES[i].Value == 1 && QuestData.ACTIVITIES[i].ID==ActivitiesAndRisks[j].ID && maxRiskScore<ActivitiesAndRisks[j].SCORE){
				maxRiskScore = ActivitiesAndRisks[j].SCORE;
				maxRiskId = ActivitiesAndRisks[j].RISK_ID;
				break;
			}
		}

	}
	return maxRiskId;
}

function isActivity(id, Activities){
	if(Activities == null || Activities.length==0){return 2;}
	for(i=0;i<Activities.length;i++){
		if(id==Activities[i]){
			return 1;
		}
	}
	return 2;
}

