(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "conversion",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
		getDefaultConfig: function(){ 
			return { 
				Height: 150,
				Width: 150 
			} 
		}
	}
	
	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		
		function dataUpdate(newdata){
			if(!newdata) return;
			
			scope.Time = newdata.Time;
			scope.Value = newdata.Value;
			
			if(newdata.Label){
				scope.Label = newdata.Label;
				scope.Units = newdata.Units;

				if(newdata.Units ==="deg F"){
					scope.metric_unit = "deg C"
					scope.metric_value = (scope.Value-32)*5/9;
				}
				if(newdata.Units ==="MCFH"){
					scope.metric_unit = "E3M3"
					scope.metric_value = scope.Value*0.028327839;
				}
				if(newdata.Units ==="psig"){
					scope.metric_unit = "KPA"
					scope.metric_value = scope.Value*6.89476;
				}
				else{
					scope.metric_unit = ""
				}
					
			}
		
		}
    
        
		
	};
	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
