[![readme_header](https://github.com/muhammad-avicena/profile/assets/49929404/b7b89034-8e25-4f25-a1a2-5665aa66448c)](https://avicena.dev/)

<h1 align="center">Fancy to see you here <img src="https://raw.githubusercontent.com/muhammad-avicena/profile/master/wave.gif" width="30px" height="30px" /> </h1>

hi, I'm Muhammad Avicena. In this repo, I build The Financial Tracker app, it's a web-app tool designed to help users manage and track their financial transactions and expenses.

I am committed to staying up-to-date with industry trends and using the latest tools to develop innovative solutions that surpass expectations.
Interested to have collaboration ? Find me on:

[![Linkedin Badge](https://img.shields.io/badge/-Muhammad_Avicena-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/muhammad-avicena/)
[![Youtube Badge](https://img.shields.io/badge/-Muhammad_Avicena-darkred?style=flat-square&logo=youtube&logoColor=white)](https://www.youtube.com/@MuhammadAvicena)
[![Instagram Badge](https://img.shields.io/badge/-ryuhideaki.dev-purple?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/ryuhideaki.dev/)
[![Gmail Badge](https://img.shields.io/badge/-cenarahmant.dev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white)](mailto:cenarahmant.dev@gmail.com)

## INGREDIENTS I USE 📜
- HTML, CSS, JavaScript/Typescript
- Node.js & Express.js
- External/Internal Source: 
  - Icon
  - Image
  - TailwindCSS
## KEY FEATURES 🌟

- Login (Basic Authentication)
- Create a transaction
- Update a transaction
- View a transaction
- Delete a transaction
- Update balance 
- Update username 
- Logout

**Available Account** :
```
{
  "email": "admin@dev.com",
  "password": "admin"
}
```
```
{
  "email": "user@dev.com",
  "password": "user"
}
```

## AVAILABLE API 📰

**Back-end endpoint:** [https://financial-api.avicena.dev](https://financial-api.avicena.dev) 
 
| Name  | HTTP Method | Endpoint | Requirements
| ----------- | ----------- | ----------- | ----------- |
| **Auth Login** | `POST` | [/api/auth/login](https://financial-api.avicena.dev/api/auth/login) | Request Body: `email: string, password: string`
| **List All User** | `GET` | [/api/user](https://financial-api.avicena.dev/api/user)
| **List All Transaction** | `GET` | [/api/transaction](https://financial-api.avicena.dev/api/transaction)
| **List User by ID** | `GET` | [/api/user/:userId](https://financial-api.avicena.dev/api/user/1) | Request Params: `userId: number`
| **Create Transaction** | `POST` | [/api/transaction](https://financial-api.avicena.dev/api/transaction) | Request Body: `userId: number, productName: string, productQuantity: number, productPrice: number`
| **List Transaction by ID** | `GET` | [/api/transaction/:transactionId](https://financial-api.avicena.dev/api/transaction/1) | Request Params: `transactionId: number`
| **Update Transaction by ID** | `PUT` | [/api/transaction/:transactionId](https://financial-api.avicena.dev/api/transaction/1) | Request Params: `transactionId: number` <br> <br>Request Body: `userId: number, productName: string, productQuantity: number, productPrice: number`
| **Delete Transaction by ID** | `DELETE` | [/api/transaction/:transactionId](https://financial-api.avicena.dev/api/transaction/1) | Request Params: `transactionId: number`
| **Update Balance User by ID** | `PATCH` | [/api/user/:userId](https://financial-api.avicena.dev/api/user/1) | Request Params: `userId: number` <br> <br>Request Body: `balance: number`
| **Update Password User by ID** | `PATCH` | [/api/user/:userId](https://financial-api.avicena.dev/api/user/1) | Request Params: `userId: number` <br><br> Request Body: `password: string`
| **Update Price Transaction by ID** | `PATCH` | [/api/transaction/:transactionId](https://financial-api.avicena.dev/api/transaction/1) | Request Params: `transactionId: number` <br><br> Request Body: `productPrice: number`


## DEPLOYMENT ⚙️

The project has been successfully deployed using Netlify. You can access the production version of the website by following this link: [https://financial-app.avicena.dev](https://financial-app.avicena.dev).

Feel free to explore the website and try out the different features. I appreciate any feedback and suggestions to further improve the user experience.
