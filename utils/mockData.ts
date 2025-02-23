export const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Main St, City, Country" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", address: "456 Elm St, Town, Country" },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "555-555-5555",
    address: "789 Oak St, Village, Country",
  },
]

export const mockQuotations = [
  {
    id: 1,
    customerName: "John Doe",
    customerNumber: "123-456-7890",
    items: [
      { name: "Item 1", quantity: 2, price: 100 },
      { name: "Item 2", quantity: 1, price: 200 },
    ],
    discount: 10,
    total: 360,
    date: "2023-05-01",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    customerNumber: "098-765-4321",
    items: [
      { name: "Item 3", quantity: 3, price: 150 },
      { name: "Item 4", quantity: 2, price: 75 },
    ],
    discount: 5,
    total: 517.5,
    date: "2023-05-02",
  },
]

export const mockReceipts = [
  {
    id: 1,
    customerName: "John Doe",
    items: [
      { name: "Item 1", quantity: 2, price: 100 },
      { name: "Item 2", quantity: 1, price: 200 },
    ],
    total: 400,
    date: "2023-05-03",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    items: [
      { name: "Item 3", quantity: 3, price: 150 },
      { name: "Item 4", quantity: 2, price: 75 },
    ],
    total: 600,
    date: "2023-05-04",
  },
]

export const mockDashboardData = {
  totalCustomers: 3,
  totalSales: 1000,
  openQuotes: 2,
  lowStockItems: 5,
}

export const mockProducts = [
  { id: 1, name: "Product 1", price: 100, stock: 50 },
  { id: 2, name: "Product 2", price: 200, stock: 30 },
  { id: 3, name: "Product 3", price: 150, stock: 10 },
  { id: 4, name: "Product 4", price: 75, stock: 5 },
]

export const mockSales = [
  {
    id: 1,
    customerName: "John Doe",
    date: "2023-05-01",
    total: 400,
  },
  {
    id: 2,
    customerName: "Jane Smith",
    date: "2023-05-02",
    total: 600,
  },
  {
    id: 3,
    customerName: "Bob Johnson",
    date: "2023-05-03",
    total: 350,
  },
]

export const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Sales User",
    email: "sales@example.com",
    role: "Sales",
  },
  {
    id: 3,
    name: "Inventory User",
    email: "inventory@example.com",
    role: "Inventory",
  },
]

