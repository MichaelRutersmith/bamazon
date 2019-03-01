var mysql = require('mysql');
var prompt = require('prompt');
// var formatText = require('./format.js')

function formatText(titleText, entryText){
  
    var padLeft;
    var padRight;
  
    var splitLength = (titleText.length - entryText.length)/2;
  
    var pad = '';
    for(var i=0; i < splitLength; i++){
      pad += ' ';
    }

    if(Number.isInteger(splitLength)){
      padLeft = pad;
      padRight = pad;
    }
    else{
      padLeft = pad;
      padRight = pad.substring(0, pad.length-1); // remove last space
    }
  
    return padLeft + entryText + padRight;
  }
  


// Link to mySQL Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root", //Your username
    password: "root", //Your password
    database: "bamazon"
});

// Connect to Database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});



// Display All Items inside Database and sell an item to customer
connection.query('SELECT * FROM Products', function(err, res){
  
  // Error Handler
  if(err) throw err;


  // Show User message
  console.log('Check out our selection...\n');

  // Set up table header
  console.log('  ID  |      Product Name      |  Department Name  |   price  | In Stock');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
  
  // Loop through database and show all items
  for(var i = 0; i < res.length; i++){

    // ---------- Add in padding for table ----------
    var item_id = res[i].item_id + ''; // convert to string
    item_id = formatText("  ID  ", item_id);

    var product_name = res[i].product_name + ''; // convert to string
    product_name = formatText("      Product Name      ", product_name);

    var department_name = res[i].department_name + ''; // convert to string
    department_name = formatText("  Department Name  ", department_name);

    var price = '$' + res[i].price + ''; // convert to string
    price = formatText("   price  ", price);

    var quantity = res[i].stock_quantity + ''; // convert to string (no need to pad)
    // ----------------------------------------------

    // Log table entry
    console.log(item_id + '|' + product_name + '|' + department_name + '|' + price + '|    ' + quantity);
  }

  // =================================================================================================

  // After the table is shown, ask the user to buy something
  prompt.start();

  // Ask for Item ID
  console.log('\nWhich item do you want to buy?');
  prompt.get(['buyitem_id'], function (err, result) {
    
    // Show Item ID selected
    var buyitem_id = result.buyitem_id;
    console.log('You selected Item # ' + buyitem_id + '.');

    // Then ask for Quanity (once user completed first entry)
    console.log('\nHow many do you wish to buy?')
    prompt.get(['buyItemQuantity'], function (err, result) {

      // Show quantity selected
      var buyItemQuantity = result.buyItemQuantity;
      console.log('You selected to buy ' + buyItemQuantity + ' of these.');

      // Once the customer has placed the order, check if store has enough of the product to meet the request
      connection.query('SELECT stock_quantity FROM Products WHERE ?', [{item_id: buyitem_id}], function(err, res){
        if(err) throw err; // Error Handler
        // Check if the item Id was valid (i.e. something was returned from mySQL)
        if(res[0] == undefined){
          console.log('Sorry... We found no items with Item ID "' +  buyitem_id + '"');
          connection.end(); // end the script/connection
        }
        // Valid Item ID, so compare Bamazon Inventory with user quantity 
        else{
          var bamazonQuantity = res[0].stock_quantity;
          // Sufficient inventory
          if(bamazonQuantity >= buyItemQuantity){

            // Update mySQL database with reduced inventory
            var newInventory = parseInt(bamazonQuantity) - parseInt(buyItemQuantity); // ensure we have integers for subtraction & database
            connection.query('UPDATE Products SET ? WHERE ?', [{stock_quantity: newInventory}, {item_id: buyitem_id}], function(err, res){
              if(err) throw err; // Error Handler
            }); // end inventory update query


            // Show customer their purchase total (need to query the price info from database)
            var customerTotal;
            connection.query('SELECT price FROM Products WHERE ?', [{item_id: buyitem_id}], function(err, res){
              
              var buyItemprice = res[0].price;
              customerTotal = buyItemQuantity*buyItemprice;

              console.log('\nYour total is $' + customerTotal + '.');

              connection.end();
            }); // end customer purchase update query 
          }
          // Insufficient inventory
          else{
            console.log('Sorry... We only have ' +  bamazonQuantity + ' of those items. Order cancelled.');
            connection.end(); // end the script/connection
          }
        }

      }); // end item quantity query

    }); // end of prompt 2

  }); // end of prompt 1

}); // end of main query
