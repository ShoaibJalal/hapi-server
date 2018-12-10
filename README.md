# hapi-server

Creating basic Node.js server with Hapi framework

This is an app where client can perform CRUD operations on backend.

## Routes exist on API...:

GET
http://localhost:8000/

--
GET
http://localhost:8000/task

## ![ALT GET Image](readmeImages/GET.PNG)

GET a specific task
http://localhost:8000/task/1/item id: should be an integer number.

## ![ALT GETbyId Image](readmeImages/GETwithID.PNG)

POST
http://localhost:8000/task

## ![ALT POST Image](readmeImages/POST.PNG)

POST
http://localhost:8000/task/id/item

## ![ALT POST Image](readmeImages/POSTwithId.PNG)

PATCH
http://localhost:8000/task/id id: should be an integer number.
![ALT PatchbyId Image](readmeImages/PATCHwithId.PNG)
--
PATCH
http://localhost:8000/task/id/item/id id: should be an integer number.
--

DELETE
http://localhost:8000/task/id id: should be an integer number.

## ![ALT DeletebyId Image](readmeImages/DELETINGaTask.PNG)

DELETE
http://localhost:8000/task/id/item/id id: should be an integer number.
