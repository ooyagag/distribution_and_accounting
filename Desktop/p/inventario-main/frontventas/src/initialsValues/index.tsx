import { initialFValuesTypes } from "../types/typesForms";

export const initialValuesLogin : initialFValuesTypes = {
    email: "",
    password: "",
}

export const initialValuesRegister : initialFValuesTypes = {
  name : "",
  email : "",
  password : "",
  confirmpassword : "",
  storename : ""
}

export const initialValuesWorkers : initialFValuesTypes = {
  name : "",
  email : ""
}

export const initialValuesBrachOffice : initialFValuesTypes = {
  name : ""
}

export const initialValuesProducts : initialFValuesTypes = {
  name : "",
  descriptions: "",
  price: "",
}

export const initialValuesStock : initialFValuesTypes = {
  quantityOfProduct : "",
  productId : ""
}

export const initialValuesOrderItems : initialFValuesTypes = {
  quantityOfProducts: "",
  productsId: "",
  brachOfficesId: ""
}

export const initialValuesSale : initialFValuesTypes = {
  returnedProduct: "",
  userId: ""
}