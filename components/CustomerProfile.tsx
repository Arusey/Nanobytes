"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/utils/api"

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

export function CustomerProfile({ customerId }: { customerId: number }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await api.get(`/customers/${customerId}`)
        setCustomer(data)
      } catch (error) {
        console.error("Error fetching customer:", error)
        // Handle error (e.g., show an error message to the user)
      }
    }

    fetchCustomer()
  }, [customerId])

  const handleSave = async () => {
    if (!customer) return

    try {
      await api.put(`/customers/${customerId}`, customer)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating customer:", error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  if (!customer) return <div>Loading...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

