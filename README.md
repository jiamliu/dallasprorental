# Overview

Dallas Pro Rental is an car rental company that is owned by my family, and as one of the few all-star Turo hosts in DFW (Dallas/Fort Worth) , as well as Atlanta, GA area, I believe a professionally sounded website is necessary to help the business grow. And as a full-stack software developer, this is a great opportunity to demonstrate my skillset. So here we are!

Our full-stack application leverages the power of Django REST framework for robust backend functionality and React.JS for a dynamic and responsive frontend. Experience seamless booking, managing rentals, and exploring our diverse fleet of vehicles with ease, all through our cutting-edge technology stack.

# Tech Stack Used

<div align="center">
  <a href="https://dallasprorental.com">
    <img src="https://github-readme-tech-stack.vercel.app/api/cards?title=Technologies+Used&align=center&titleAlign=center&fontSize=20&lineHeight=10&lineCount=2&theme=ayu&width=450&bg=%25230B0E14&titleColor=%231c9eff&line1=react%2Creact%2Cauto%3Bhtml5%2Chtml5%2Cauto%3Btailwindcss%2Ctailwind%2Cauto%3Bjavascript%2Cjavascript%2Cauto%3B&line2=python%2Cpython%2Cauto%3Bdjango%2Cdjango%2Cauto%3Bsqlite%2Csqlite%2Cauto%3B" alt="Technologies Used" />
  </a>
</div>

<div align="center">
  Our project utilizes a diverse tech stack to deliver a seamless car rental experience.
</div>

<hr>

#ERD (Entity Relationship Diagram)

title Dallas Pro Rental
CustomUser [icon: user, color: yellow]{
  id string pk
  username string
  email string
  age integer
}
Car [icon: car, color: blue]{
  id string pk
  year integer
  make string
  model string
  vin string
  license_plate string
  owner_name string
  owner_contact string
  description string
  price decimal
  type string
  seats integer
  cylinder integer
  drivetrain string
  pet_friendly boolean
  child_seat boolean
  zero_to_sixty string
  fuel_consumption string
  option_camera string
  option_navigation string
  option_carplay string
  option_blindspot string
  option_parkingassist string
  option_sunroof string
  option_heatcoolseat string
  option_keyless string
}
CarPhoto [icon: image, color: green]{
  id string pk
  photo string
}
RentalInfo [icon: clipboard, color: red]{
  id string pk
  user_id string fk
  car_id string fk
  first_name string
  last_name string
  driver_license string
  driver_state string
  driver_address string
  phone_number string
  email string
  pick_up_date date
  pick_up_time time
  drop_off_date date
  drop_off_time time
  location string
  rental_days integer
  daily_rate decimal
  insurance_rate decimal
  credit_card_number integer
  billing_address string
  expire_date date
  security_number integer
}
// End of tables
RentalInfo.user > CustomUser.id
CarPhoto.car > Car.id
RentalInfo.car > Car.id
