var Vesselavail = function(oController){
var aData = [
	{vesselName: "Jebel Ali", laycan: "4", dwt:"3"},
	{vesselName: "Manuela", laycan: "2"},
	{vesselName: "CMA Colomb", laycan: "1"},
	{vesselName: "Caspian Supplier", laycan: "4"},
	{vesselName: "Vespucci", laycan: "6"},
	{vesselName: "Myra", laycan: "3"},
	{vesselName: "Gemini", laycan: "2"},
];
console.log("calling vessel avail1");
//Create an instance of the table control
var oTableVess = window.helper.createTable({title:"Vessel Availability"});

var oDialogVessel = sap.ui.jsfragment("vesselMaster.fragments.JSFragmentDialog");
var oControl = new sap.ui.commons.Link({
	press: function() {oDialogVessel.open();}
});
oControl.bindProperty("text", "vesselName");
oTableVess.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Vessel Name"}), 
	template: oControl, sortProperty: "vesselName", 
	width: "120px",
	filterProperty: "vesselName"}));
oTableVess.addColumn(window.helper.createColumn("laycan", "Laycan", "80px", "TF"));
oTableVess.addColumn(window.helper.createColumn("dwt", "DWT", "60px", "TF"));
oTableVess.addColumn(window.helper.createColumn("draft", "Draft", "60px", "TF"));
oTableVess.addColumn(window.helper.createColumn("port", "Port", "60px", "TF"));


console.log("calling vessel avail3");
//Create a model and bind the table rows to this model
var oModel = new sap.ui.model.json.JSONModel();
oModel.setData({modelData: aData});
oTableVess.setModel(oModel);
sap.ui.getCore().setModel(oModel,"vesselMaster")
oTableVess.bindRows("/modelData");

oTableVess.setVisibleRowCount(oTableVess.getBinding("rows").getLength());
// MESSAGE AREA	
var oMsgBar = new sap.ui.commons.MessageBar("msgBar", {
	anchorID: "header",
	anchorSnapPoint: "end"
});
oTableVess.attachRowSelectionChange(function(oEvent) {
	var currentRowContext = oEvent.getParameter("rowContext"); 
	var strArr = currentRowContext['sPath'].split("/");
	var rowNo = strArr[strArr.length-1];
	var selVessName = oModel.getProperty("vesselName", currentRowContext);
	var selDesc = oModel.getProperty("Description", currentRowContext);
	var oMessage = new sap.ui.commons.Message({
		type: sap.ui.commons.MessageType.Success, 
		text: "Selected Row Index: " + oEvent.getParameter("rowIndex") + selVessName
	});
	oMsgBar.addMessages([oMessage]);
	oController.selectVessel(rowNo);
});

console.log("no. of rows ", oTableVess.getBinding("rows").getLength());
 return oTableVess;
 //oTableVess.placeAt("vesselavail");
};