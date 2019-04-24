var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require('cli-table2');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",

  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Hello, welcome to Bamazon!");
  start();
 
});

function start() {
  var user = [{
    type: 'input',
    name: 'name',
    message: 'Please enter your name for identification'
  }];

inquirer.prompt(user).then(answers => {
  console.log(`Thank you ${answers.name}, please have a look at our inventory`);
  setTimeout(queryInventory, 500);
})
};

function queryInventory() {
  var row = [];
  connection.query("SELECT * FROM products", function(err, res) {
      var table = new Table({
        head: ["department id","product name","department name", "price","stock quantity"]
        });
    for (var i = 0; i < res.length; i++) {
        row.push(res[i].item_id);
        row.push(res[i].product_name);
        row.push(res[i].department_name);
        row.push(res[i].price);
        row.push(res[i].stock_quantity);
        table.push(row);
        row = [];
    }
    console.log(table.toString());
    setTimeout(promptUserQuestion, 1500);
  })
}

  const promptUserQuestion = function() {
    inquirer.prompt([

      { name: "item_id",
            type: "input",
            message: "Please enter the ID # of the product you would like to buy",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          },
            {
              name: "quantity",
            type: "input", 
            message: "Please enter the quantity",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
            }
    
    ]).then(function(answer) {
      const selectedItem = answer.item_id;
      
      const query = "SELECT * FROM products WHERE ?";
      connection.query(query, { item_id: selectedItem,}, function(err, res) {
        const itemCost = res[0].price;        
        if (res[0].stock_quantity < answer.quantity) {
          console.log(`I am sorry, we do not have enough ${res[0].product_name} in stock to fulfill your request 
          please check back later or take a look at our other products.`);
         setTimeout(queryInventory, 1500);
        } else {
          let answerQuantity = answer.quantity;
          let updateQuantity = res[0].stock_quantity - answerQuantity;
          let sqlUpdate = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?'
          connection.query(sqlUpdate, [updateQuantity, answer.item_id], (err, data) => {
            if(err) throw err;
            setTimeout(calculateTotal, 1000);
            
          });
          
        }
        function calculateTotal() {
            let totalCost = Math.round(answer.quantity * itemCost * 100) / 100; 
            console.log('Your total is ' + totalCost);
            console.log('Thank you for shopping!');
            inquirer.prompt(
              {
                type: "list",
                name: "shopOrStop",
                message: "Would you like to continue shopping?",
                choices: ["Yes", "No"]
              })
            .then(function(user) {
              console.log(user.shopOrStop);
              if (user.shopOrStop ===("No")){
                console.log('Have a good day!');
                process.exit();
              } else {
                queryInventory();
              }
               
              })
            }
        });
        
    })
  }
