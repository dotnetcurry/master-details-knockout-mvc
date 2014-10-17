/// <reference path="../jquery-2.1.1.min.js" />
/// <reference path="../jquery-ui.min-1.11.1.js" />
/// <reference path="../knockout-3.2.0.js" />
(function () {

    var currentWin = $(window); //The Windows Object
    var divDialog = $("#detailcontainer");
    var top = (currentWin.height() - divDialog.height()) / 2; //Get the Top
    var left = (currentWin.width() - divDialog.width()) / 2; //and the left

    //The Dialog object
    $("#detailcontainer").dialog({
        autoOpen: false,
        width: 400,
        minHeight: 250,
        maxHeight: 350,
        resizable: true
    });

    //Set the Position for the dialog
    divDialog.css({
        position: "center",
        top: top,
        left: left
    });



    var MSViewModel = function () {

        var self = this;

        self.Customers = ko.observableArray([]); //Array for Customers
        self.Orders = ko.observableArray([]); //Array for Orders
        self.ErrorMessage = ko.observable(); //The Error Message
        self.CustomerId = ko.observable(); //The Customer Id
        self.CustomerName = ko.observable(); //The Customer NAme


        //The Customer Object
        var Customer = {
            CustomerId: self.CustomerId,
            CustomerName:self.CustomerName
        }

        loadCustomers();

        //The Fucntion to make call to WEB API
        //and returns the Customer Object 
        function loadCustomers() {
            $.ajax({
                url: "/Customers",
                type:"GET"
            }).done(function (resp) {
                self.Customers(resp);
            }).error(function (err) {
                self.ErrorMessage("Error!!!!" + err.status);
            });
        };

        //The Function to Open and Show the Dialog box 
        self.openDetailsDialog = function (cust) {
            self.CustomerName(cust.CustomerName); //USed to Display Customer Name
            getOrdersByCustomers(cust)
            $("#detailcontainer").dialog("open");
        }

        //Function call WEB API to Get Orders for the Customer 
        function getOrdersByCustomers(cust) {
            $.ajax({
                url: "/Customer/Orders/" + cust.CustomerId,
                type:"GET"
            }).done(function (resp) {
                self.Orders(resp);
            }).error(function (err) {
                self.ErrorMessage("Error! " + err.status);
            });
        }

    };

    ko.applyBindings(new MSViewModel());

})();