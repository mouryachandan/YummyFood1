import { gql } from "@apollo/client";

// 🔹 Login User
export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    users(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      id
      name
      email
    }
  }
`;

// 🔹 Login Admin
export const LOGIN_ADMIN = gql`
  query LoginAdmin($email: String!, $password: String!) {
    users(where: { email: { _eq: $email }, password: { _eq: $password }, is_approved: { _eq: true } }) {
      id
      name
      email
    }
  }
`;

// 🔹 Register User
export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    insert_users(objects: { name: $name, email: $email, password: $password }) {
      returning {
        id
        name
        email
      }
    }
  }
`;

// 🔹 Register Admin
export const REGISTER_ADMIN = gql`
  mutation RegisterAdmin($name: String!, $email: String!, $password: String!, $restaurantName: String!) {
    insert_users(objects: { name: $name, email: $email, password: $password, restaurantName: $restaurantName, is_approved: false }) {
      returning {
        id
        name
        email
        restaurantName
        is_approved
      }
    }
  }
`;

// 🔹 Approve Admin
export const APPROVE_ADMIN = gql`
  mutation ApproveAdmin($id: uuid!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { is_approved: true }) {
      id
      name
      email
      is_approved
    }
  }
`;
