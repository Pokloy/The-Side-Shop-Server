For all request/URL please refer to filename: capstone 2.postman_collection


------------------------------------

Admin Token Not Ordered= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGI0OWI4NDFjOWI1ZDg2MzM0ZWM1MiIsImVtYWlsIjoidGV0c3Uua2FsYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTk0OTE3NTF9.uTvPQUWMn9Su-xUkCHeTgVQvG8yYATPc4lNCShtPDds

email: tetsu.kala@gmail.com
password: admin




Admin Token Ordered= 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGI1Y2E5YTJiOWVhMGJhYWYwNTE4ZCIsImVtYWlsIjoiS2FrYXJvdEBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTk4NjQyNTB9.kphHxmSFTyK9SLC2T90_iY97AbDxxQVNS8zjpVDbR5c

email: Kakarot@gmail.com
password: user



User Token Ordered= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGM2YjRlZmM2NjUzYzNiNTRkZTI3MiIsImVtYWlsIjoiRXJlbl9ZZWFnZXJAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY5OTUwNzA1OX0.FIKeKUMKnrMD2A_5QFlVQUqXJAqO7BDyJUDO2ehVQ2g

email: Eren_Yeager@gmail.com
password: customer





To order go to link: http://localhost:4000/users/checkout. Then put to json the following syntax for create order:
{
    "products":[{
        "productId": "654b5f89d61bbac74304c366",
        "quantity":"100"
    }]
}


productId is the name of the product but only by Id. For multiple orders add a new object inside the "products" object array.

------------------------------------------

In going to this route http://localhost:4000/users/:userId/userDetails
To get the user details. The /:userId params must match the authenticated user Id.


-------------------------------------------


The extra goal is about producing a receipt with tax of 5 per subtotal. The route is : 
http://localhost:4000/orders/:orderId/produce-reciept



