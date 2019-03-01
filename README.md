# bamazon
By Mike Smith

###Synopsis
***
An interactive node application that functions similar to Amazon.  It will use MySQL database to update the quantity of different items with key values.

#### Bamazon Customer Portal
***
When the app is opened the user will see the image below.  Note on the image they are prompted to enter the item number key value to chose what to purchase.

![Customer Portal](Images/customer-view.png)

****

The user then will be prompted to pick a quantity to purchase.

![Customer Portal](Images/customer-view.png)

***
On a successful purchase (ordering equal to or less then the total in stock quantity) the user will be given the total purchase cost and the database will be updated on the MySQL side.

![Customer Portal](Images/customer-view.png)

***
Note the quantity of the ordered item has been reduced by the quantity purchased when the user opens the app again.

![Customer Portal](Images/customer-view.png)

If the amount ordered exceeds the amount in stock the error shown will appear and the stock will not be updated.                           
