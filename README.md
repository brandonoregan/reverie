# Reverie Reading
An eccommerce application.

## Description
Reverie Reading is a simple yet elegant eccommerce application that contains all the necesssary features you would expect of an online shopping application.


## Preview
![home](https://github.com/brandonoregan/reverie/assets/100802480/d209aa1d-5c80-4e6e-a83c-8a8859639a15)

![cart](https://github.com/brandonoregan/reverie/assets/100802480/0dbdeb7f-a68f-4248-af98-e921b72a8b3b)

![products](https://github.com/brandonoregan/reverie/assets/100802480/feeb3ec4-07b6-47e1-9a01-63392608a8a3)

![admin](https://github.com/brandonoregan/reverie/assets/100802480/d36620ea-eb0a-449a-9da8-02b9722ba93b)

![stripe](https://github.com/brandonoregan/reverie/assets/100802480/d63a26cf-6f28-443f-a715-b61f3dffc536)

## Technologies Used

- HTML
- CSS
- React Bootstrap
- Python
- Django
- React
- Redux
- Postgres

The backend of our project is powered by Python and Django, leveraging Django REST Framework (DRF) for its robust API capabilities, which is seamlessly consumed by our React frontend for dynamic interactions. PostgreSQL was chosen for its smooth integration with Django, ensuring efficient data handling. On the frontend, we combined React's interactive UI capabilities with Redux for state management, and React Bootstrap for responsive design, creating a cohesive and engaging user experience. HTML and CSS were utilized for foundational web structure and styling, rounding out our comprehensive tech stack for modern web development.


## Access
For quick access simply head to https://reverie-reading.onrender.com

## How to interact with the Reverie Reading application features: 

<details>
  
  <summary>Admin functionality:</summary>
  
  The Admin user experience is different the customer user experience. To access and use the Admin functionality, use the following login credentials: 

Username: admin 

Password admin 
</details>
<details>
  
  <summary>Stripe API functionality: </summary>
  
  - To test and use the Stripe API you will need to be registered and logged in as a general user. Following login simply select an item from the Products page. You will then be redirected to the Product Detail page. 

  - From the Product Detail page, click the Add to Cart button, this will redirect you to the cart page. 

  - From the cart page, you can select to continue shopping and repeat steps one and two or continue to step 4. 

  - Now select the Proceed to Checkout button, you will be redirected to the Stripe API payment and address confirmation page. 

  - In the Stripe shipping and payment form, please use a fake email and shipping address. For the card information you can use the following details:
    
    Card Number: 4242 4242 4242 4242 
    
    DD/MM: 02/24 
    
    CVC: 123 

  - If the payment is successful, you will be redirected to the home page. 
  
</details>


## Contributing
Concept warmly welcome contributions. 

<details>
  
  <summary>Contributing to This Project</summary>
  
  - Fork the Repository:
    - Start by forking the original repository on GitHub. This creates a copy of the project under your GitHub account.
  
  - Clone the Forked Repository:
    - Clone the forked repository to your local machine using git clone [URL of your forked repo].
  
  - Create a Virtual Environment:
    - Set up a virtual environment (if needed) to manage dependencies. Use tools like virtualenv or venv and activate it.
  
  - Install Dependencies:
    - Install project dependencies listed in the requirements.txt file using pip install -r requirements.txt.
  
  - Make Changes:
    - Make the desired changes or additions to the project's codebase or documentation.
  
  - Test Changes:
    - Ensure your changes work as intended and haven't introduced errors. Run tests or perform manual checks, if applicable.
  
  - Commit Changes:
    - Stage and commit your changes using Git (git add . and git commit -m "Your commit message").
  
  - Push Changes:
    - Push your changes to your forked repository on GitHub (git push origin master or your branch name).
  
  - Create a Pull Request (PR):
    - Go to your forked repository on GitHub, and from there, create a pull request. Explain your changes, their purpose, and any relevant details.
  
  - Reference Issues (if applicable):
    - If your changes address specific issues or feature requests, reference them in the pull request description using #issue-number.
  
  - Engage in Discussion:
    - Be responsive to comments or feedback on your pull request. Engage in discussions, make necessary changes based on feedback, and ensure your code meets the project's guidelines.

  
  - Review and Merge:
    - Project maintainers will review your pull request. If your changes are accepted, they'll be merged into the original repository.
  
</details>
