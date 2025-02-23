import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000"
const CSRF_TOKEN = 'UsccYfmKB4jEwjWglnKaukmuFq4bZQISTxjqrKEEUY4QMw52NJcDSJIpsp1nq5pf';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Products
export const getProducts = () => api.get("/products")
export const getProduct = (id: number) => api.get(`/products/${id}`)
export const createProduct = (product: any) => api.post("/products", product)
export const updateProduct = (id: number, product: any) => api.put(`/products/${id}`, product)
export const deleteProduct = (id: number) => api.delete(`/products/${id}`)

// Customers
export const getCustomers = async () => {
  const response = await fetch(`${BASE_URL}/api/customers/`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-CSRFTOKEN': CSRF_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getCustomer = (id: number) => api.get(`/customers/${id}`)
export const createCustomer = async (customer: any) => {
  const response = await fetch(`${BASE_URL}/api/customers/`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': CSRF_TOKEN,
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateCustomer = (id: number, customer: any) => api.put(`/customers/${id}`, customer)
export const deleteCustomer = (id: number) => api.delete(`/customers/${id}`)

// Sales
export const getSales = () => api.get("/sales")
export const getSale = (id: number) => api.get(`/sales/${id}`)
export const createSale = (sale: any) => api.post("/sales", sale)
export const updateSale = (id: number, sale: any) => api.put(`/sales/${id}`, sale)
export const deleteSale = (id: number) => api.delete(`/sales/${id}`)

// Quotations
export const getQuotations = () => api.get("/quotations")
export const getQuotation = (id: number) => api.get(`/quotations/${id}`)
export const createQuotation = (quotation: any) => api.post("/quotations", quotation)
export const updateQuotation = (id: number, quotation: any) => api.put(`/quotations/${id}`, quotation)
export const deleteQuotation = (id: number) => api.delete(`/quotations/${id}`)

// Users
export const getUsers = () => api.get("/users")
export const getUser = (id: number) => api.get(`/users/${id}`)
export const createUser = (user: any) => api.post("/users", user)
export const updateUser = (id: number, user: any) => api.put(`/users/${id}`, user)
export const deleteUser = (id: number) => api.delete(`/users/${id}`)

// Dashboard

export async function getDashboardData() {
  const response = await fetch(`${BASE_URL}/api/dashboard/`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default api

