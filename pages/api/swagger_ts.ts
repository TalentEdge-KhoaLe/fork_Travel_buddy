/**
 * @swagger
* paths:  
*   /api/auth/business/login:  
*     post:  
*       tags:  
*         - auth/business  
*       summary: Business login  
*       description: Authenticate a business user.  
*       requestBody:  
*         required: true  
*         content:  
*           application/json:  
*             schema:  
*               type: object  
*               properties:  
*                 email:  
*                   type: string  
*                 password:  
*                   type: string  
*                   description: The password for the business user account  
*       responses:  
*         200:  
*           description: Successfully authenticated  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   access_token:  
*                     type: string  
*                   userId:  
*                     type: string  
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
*   /api/auth/business/sign-up:  
*     post:  
*       tags:  
*         - auth/business  
*       summary: Sign up a new business user  
*       description: Create a new business user account.  
*       requestBody:  
*         required: true  
*         content:  
*           application/json:  
*             schema:  
*               type: object  
*               properties:  
*                 businessName:  
*                   type: string  
*                   description: The name of the business  
*                 email:  
*                   type: string  
*                   description: The email of the business user  
*                 phone:  
*                   type: string  
*                   description: The phone number of the business user  
*                 password:  
*                   type: string  
*                   description: The password for the business user account  
*       responses:  
*         200:  
*           description: User created successfully  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   message:  
*                     type: string  
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
*   /api/auth/callback:  
*     get:  
*       tags:  
*         - auth  
*       summary: OAuth callback  
*       description: Handle the OAuth callback and set the Supabase session.  
*       parameters:  
*         - in: query  
*           name: access_token  
*           schema:  
*             type: string  
*           required: true  
*           description: The access token from the OAuth provider  
*         - in: query  
*           name: refresh_token  
*           schema:  
*             type: string  
*           required: true  
*           description: The refresh token from the OAuth provider  
*         - in: query  
*           name: error  
*           schema:  
*             type: string  
*           required: false  
*           description: Error message from the OAuth provider  
*       responses:  
*         200:  
*           description: Successfully authenticated  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   access_token:  
*                     type: string  
*                   user_id:  
*                     type: string  
*                   user:  
*                     type: object  
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
*   /api/auth/login:  
*     post:  
*       tags:  
*         - auth  
*       summary: User Login  
*       description: Authenticate user with email and password  
*       requestBody:  
*         required: true  
*         content:  
*           application/json:  
*             schema:  
*               type: object  
*               properties:  
*                 email:  
*                   type: string  
*                 password:  
*                   type: string  
*       responses:  
*         200:  
*           description: Successful login  
*         400:  
*           description: Invalid credentials  
*         500:  
*           description: Server error  
*   /api/auth/logout:  
*     post:  
*       tags:  
*         - auth  
*       summary: User Logout  
*       description: Log out the current user  
*       responses:  
*         200:  
*           description: Successfully logged out  
*         400:  
*           description: Bad request  
*         500:  
*           description: Internal server error  
*   /api/auth/oauth:  
*     post:  
*       tags:  
*         - auth  
*       summary: Sign in with OAuth  
*       description: Sign in a user using OAuth provider.  
*       requestBody:  
*         required: true  
*         content:  
*           application/json:  
*             schema:  
*               type: object  
*               properties:  
*                 provider:  
*                   type: string  
*                   description: The OAuth provider  
*       responses:  
*         200:  
*           description: Successfully signed in  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   data:  
*                     type: object  
*                     properties:  
*                       provider:   
*                         type: string  
*                         description: The OAuth provider  
*                       url:  
*                         type: string  
*                         description: The URL to redirect to  
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
*   /api/auth/sign-up:  
*     post:  
*       tags:  
*         - auth  
*       summary: Sign up a new user  
*       description: Create a new user account.  
*       requestBody:  
*         required: true  
*         content:  
*           application/json:  
*             schema:  
*               type: object  
*               properties:  
*                 firstName:  
*                   type: string  
*                   description: The first name of the user  
*                 lastName:  
*                   type: string  
*                   description: The last name of the user  
*                 email:  
*                   type: string  
*                   description: The email of the user  
*                 phone:  
*                   type: string  
*                   description: The phone number of the user  
*                 password:  
*                   type: string  
*                   description: The password for the user account  
*       responses:  
*         200:  
*           description: User created successfully  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   message:  
*                     type: string  
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
*   /api/location/create-location:  
*     post:  
*       tags:  
*         - location  
*       summary: Create location  
*       description: Create a new location for a challenge.  
*       security:  
*         - bearerAuth: []  
*       parameters:  
*         - in: query  
*           name: challengeId  
*           schema:  
*             type: string  
*           required: true  
*           description: The ID of the challenge  
*       requestBody:  
*         required: true  
*         content:  
*           application/json:  
*             schema:  
*               type: object  
*               properties:  
*                 title:  
*                   type: string  
*                   description: The name of the location  
*                 backgroundImages:  
*                   type: array  
*                   items:  
*                     type: string  
*                   description: The background image of the location  
*                 sections:  
*                   type: array  
*                   items:  
*                     type: object  
*                     properties:  
*                       title:  
*                         type: string  
*                         description: The title of the section  
*                       instruction:  
*                         type: string  
*                         description: The instruction of the section  
*                       media:  
*                         type: array  
*                         items:  
*                           type: string  
*                         description: The media of the section  
*       responses:  
*         200:  
*           description: Location created successfully  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   data:  
*                     type: object  
*                     properties:  
*                       id:  
*                         type: string  
*                       challengeId:  
*                         type: string  
*                       title:  
*                         type: string  
*                       location_info:  
*                         type: array  
*                         items:  
*                           type: object  
*                           properties:  
*                             title:  
*                               type: string  
*                             instruction:  
*                               type: string  
*                             media:  
*                               type: array  
*                               items:  
*                                 type: string  
*                       imageUrls:  
*                         type: array  
*                         items:  
*                           type: string  
*                       created:  
*                         type: string   
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
*   /api/location/get-all-locations:  
*     get:  
*       tags:  
*         - location  
*       summary: Get all locations  
*       description: Retrieve all locations.  
*       security:  
*         - bearerAuth: []  
*       responses:  
*         200:  
*           description: A list of locations  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   data:  
*                     type: array  
*                     items:  
*                       type: object  
*                       properties:  
*                         id:  
*                           type: string  
*                         challengeId:  
*                           type: string  
*                         title:  
*                           type: string  
*                         location_info:  
*                           type: array  
*                           items:  
*                             type: object  
*                             properties:  
*                               title:  
*                                 type: string  
*                               instruction:  
*                                 type: string  
*                               media:  
*                                 type: array  
*                                 items:  
*                                   type: string  
*                         imageUrls:  
*                           type: array  
*                           items:  
*                             type: string  
*                         created:  
*                           type: string   
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
*   /api/location/update-location:  
*     post:  
*       tags:  
*         - location  
*       summary: Update location  
*       description: Update the details of a location.  
*       security:  
*         - bearerAuth: []  
*       parameters:  
*         - in: query  
*           name: locationId  
*           schema:  
*             type: string  
*           required: true  
*           description: The ID of the location to update  
*       requestBody:  
*         required: true  
*         content:  
*           application/json:  
*             schema:  
*               type: object  
*               properties:  
*                 name:  
*                   type: string  
*                   description: The name of the location  
*                 description:  
*                   type: string  
*                   description: The description of the location  
*       responses:  
*         200:  
*           description: Location updated successfully  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   data:  
*                     type: object  
*                     properties:  
*                       id:  
*                         type: string  
*                       challengeId:  
*                         type: string  
*                       title:  
*                         type: string  
*                       location_info:  
*                         type: array  
*                         items:  
*                           type: object  
*                           properties:  
*                             title:  
*                               type: string  
*                             instruction:  
*                               type: string  
*                             media:  
*                               type: array  
*                               items:  
*                                 type: string  
*                       imageUrls:  
*                         type: array  
*                         items:  
*                           type: string  
*                       created:  
*                         type: string   
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
*   /api/storage/upload_image:  
*     post:  
*       tags:  
*         - storage  
*       summary: Upload an image to storage  
*       description: Upload an image to the specified storage bucket.  
*       security:  
*         - bearerAuth: []  
*       requestBody:  
*         required: true  
*         content:  
*           application/json:  
*             schema:  
*               type: object  
*               properties:  
*                 imageBase64:  
*                   type: string  
*                   description: The base64 encoded image data  
*                 bucket:  
*                   type: string  
*                   description: The storage bucket name  
*                 title:  
*                   type: string  
*                   description: The title for the image  
*       responses:  
*         200:  
*           description: File uploaded successfully  
*           content:  
*             application/json:  
*               schema:  
*                 type: object  
*                 properties:  
*                   success:  
*                     type: boolean  
*                     example: true  
*                   signedUrl:  
*                     type: string  
*                     description: The signed URL of the uploaded image  
*                   message:  
*                     type: string  
*                     example: "File uploaded successfully!"  
*         400:  
*           description: Bad request  
*         405:  
*           description: Method not allowed  
*         500:  
*           description: Internal server error  
  */