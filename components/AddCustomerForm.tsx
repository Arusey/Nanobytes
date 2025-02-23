"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal"
import { createCustomer, updateCustomer } from "@/utils/api"
import { useToast } from "@/hooks/use-toast"


interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

interface AddCustomerFormProps {
  customer?: Customer
  onClose: () => void
}
const { toast } = useToast()


export function AddCustomerForm({ customer }: AddCustomerFormProps) {
  const [name, setName] = useState(customer?.name || "")
  const [email, setEmail] = useState(customer?.email || "")
  const [phone, setPhone] = useState(customer?.phone || "")
  const [address, setAddress] = useState(customer?.address || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const customerData = { name, email, phone, address }
      if (customer) {
        await updateCustomer(customer.id, customerData)
        toast({
          title: "Customer updated successfully!",
        })
      } else {
        await createCustomer(customerData)
        toast({
          title: "Customer added successfully!",
        })
      }
      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setAddress("")
      // Close modal
      onClose?.() // Call the onClose prop

      // Optionally, you can add a success message or refresh the customer list
    } catch (error) {
      console.error("Error adding/updating customer:", error)
      toast({
        title: "Error!",
        description: "Failed to add/update customer. Please try again.",
        variant: "destructive",
      })
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant={customer ? "ghost" : "default"}>{customer ? "Edit" : "Add Customer"}</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{customer ? "Edit Customer" : "Add New Customer"}</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">
              Name
            </Label>
            <Input
              id="customerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right">
              Email
            </Label>
            <Input
              id="customerEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerPhone" className="text-right">
              Phone
            </Label>
            <Input
              id="customerPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerAddress" className="text-right">
              Address
            </Label>
            <Input
              id="customerAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">{customer ? "Update Customer" : "Add Customer"}</Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

