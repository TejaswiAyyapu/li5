sap.ui.jsview("newmenu.menu", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf newmenu.menu
	*/ 
	getControllerName : function() {
		return "newmenu.menu";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf newmenu.menu
	*/ 
	createContent : function(oController) {
		
	
		 var oModel = new sap.ui.model.json.JSONModel({
		      menuset : [
			    {
		         menuitem : "Item1" ,
		         submenu : [{menuitem : "item12"},
		                    {menuitem : "item13"},
		                    {menuitem : "item14"},]
		        },
		        {
		        	menuitem : "Item2",
		        	submenu : [{menuitem : "item22"},
			                    {menuitem : "item23"},
			                    {menuitem : "item24"},]
		        },
		        {
		        	menuitem : "Item3",
		        	submenu : [{menuitem : "item32"},
			                    {menuitem : "item33"},
			                    {menuitem : "item34"},]
		        }
		      ]
		    });
		 sap.ui.getCore().setModel(oModel);
		 

		// Create a new Menu bar Instance and set the model for the menu bar
		var oMenuBar = new sap.ui.commons.MenuBar();
		oMenuBar.setModel(oModel);
		
		// Create Main Menu Template
		var mainMenuTemplate = new sap.ui.commons.MenuItem({
			text : "{menuitem}",
		});
		
		// Create a new sub Menu
		var oSubMenu = new sap.ui.commons.Menu("menu");
		// Create Sub Menu Template
		var subMenuTemplate = new sap.ui.unified.MenuItem({
			text : "{menuitem}",
			select : function (oevt){
				
				console.log(oevt.getSource().getText());
				
			}
		});	
		
		oMenuBar.bindAggregation("items", {
			path: "/menuset", 
			factory:function(sId,oCtx){
				var oCloneItem = mainMenuTemplate.clone(sId);
				if ( oCtx.getProperty('submenu').length > 0 ) {
			    	var oCurrentSubMenu = oSubMenu.clone(sId);
			        oCurrentSubMenu.bindAggregation("items",{
			        	path: oCtx.sPath +"/submenu",
			        	template :  subMenuTemplate
			        });
			        oCloneItem.setSubmenu(oCurrentSubMenu);          
			     }
			    
			     return oCloneItem;
			} 
		});
 		return new sap.m.Page({
			title: "MenuBar Test",
			content: [oMenuBar
			
			]
		});
	}

});
