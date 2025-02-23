"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal"
import { createSale, updateSale } from "@/utils/api"

interface SaleItem {
  name: string
  quantity: number
  price: number
}

interface Sale {
  id: number
  customerName: string
  items: SaleItem[]
  total: number
  date: string
}

interface NewSaleFormProps {
  sale?: Sale
}

export function NewSaleForm({ sale }: NewSaleFormProps) {
  const [customerName, setCustomerName] = useState(sale?.customerName || "")
  const [items, setItems] = useState<SaleItem[]>(sale?.items || [])
  const [newItem, setNewItem] = useState<SaleItem>({ name: "", quantity: 0, price: 0 })

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      setItems([...items, newItem])
      setNewItem({ name: "", quantity: 0, price: 0 })
    }
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const saleData = {
        customerName,
        items,
        total: calculateTotal(),
        date: new Date().toISOString(),
      }
      if (sale) {
        await updateSale(sale.id, saleData)
      } else {
        await createSale(saleData)
      }
      // Reset form and close modal (you might want to implement a way to close the modal)
      setCustomerName("")
      setItems([])
      // Optionally, you can add a success message or refresh the sales list
    } catch (error) {
      console.error("Error creating/updating sale:", error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant={sale ? "ghost" : "default"}>{sale ? "Edit" : "New Sale"}</Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[600px]">
        <ModalHeader>
          <ModalTitle>{sale ? "Edit Sale" : "Create New Sale"}</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">
              Customer Name
            </Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemName" className="text-right">
                Item Name
              </Label>
              <Input
                id="itemName"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <Button type="button" onClick={addItem}>
              Add Item
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>KES {item.price.toFixed(2)}</TableCell>
                  <TableCell>KES {(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-right font-bold">Total: KES {calculateTotal().toFixed(2)}</div>
          <div className="flex justify-end">
            <Button type="submit">{sale ? "Update Sale" : "Create Sale"}</Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

