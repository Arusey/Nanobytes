"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal"
import { Card, CardContent } from "@/components/ui/card"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { createSale } from "@/utils/api"

interface ReceiptItem {
  name: string
  quantity: number
  price: number
}

export function ReceiptGenerator() {
  const [items, setItems] = useState<ReceiptItem[]>([])
  const [newItem, setNewItem] = useState<ReceiptItem>({ name: "", quantity: 0, price: 0 })
  const [customerName, setCustomerName] = useState("")
  const [customerPin, setCustomerPin] = useState("")

  const VAT_RATE = 0.16 // 16% VAT

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      setItems([...items, newItem])
      setNewItem({ name: "", quantity: 0, price: 0 })
    }
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  const calculateVAT = () => {
    return calculateSubtotal() * VAT_RATE
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT()
  }

  const generateReceipt = async () => {
    try {
      const receiptData = {
        customerName,
        customerPin,
        items,
        subtotal: calculateSubtotal(),
        vat: calculateVAT(),
        total: calculateTotal(),
      }

      const response = await createSale(receiptData)
      const receiptId = response.data.id

      const doc = new jsPDF()

      // Company Header
      doc.setFontSize(24)
      doc.text("QuickFix Plumbers", 14, 22)
      doc.setFontSize(12)
      doc.text("P.O Box 70271 - 00400", 14, 32)
      doc.text("Nairobi, Kenya", 14, 40)
      doc.text("PIN: P051318503X", 14, 48)

      // Invoice Details
      doc.text("Invoice", 170, 22)
      doc.rect(150, 25, 45, 25)
      doc.text(`Invoice #: ${receiptId}`, 155, 35)
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 155, 45)

      // Customer Details
      doc.rect(14, 55, 120, 35)
      doc.text("Invoice To:", 16, 65)
      doc.text(customerName, 16, 75)
      doc.text(`Customer PIN: ${customerPin}`, 16, 85)

      // Items Table
      doc.autoTable({
        head: [["Description", "Qty", "Price", "Total"]],
        body: items.map((item) => [
          item.name,
          item.quantity,
          `KES ${item.price.toFixed(2)}`,
          `KES ${(item.quantity * item.price).toFixed(2)}`,
        ]),
        startY: 100,
      })

      const finalY = (doc as any).lastAutoTable.finalY || 100

      // Totals
      doc.text(`Subtotal: KES ${calculateSubtotal().toFixed(2)}`, 140, finalY + 10)
      doc.text(`VAT (16%): KES ${calculateVAT().toFixed(2)}`, 140, finalY + 20)
      doc.text(`Total: KES ${calculateTotal().toFixed(2)}`, 140, finalY + 30)

      // Footer
      doc.setFontSize(10)
      doc.text("Warranty Void if Damage is by Power Surge", 14, finalY + 50)
      doc.text("Goods Once Sold are NOT Returnable or Refundable", 14, finalY + 60)

      // Contact Information
      doc.text("Phone: +254-770933024", 14, finalY + 80)
      doc.text("Email: quickfixplumbers@gmail.com", 90, finalY + 80)
      doc.text("Web: www.quickfixplumbers.co.ke", 170, finalY + 80)

      doc.save(`receipt-${receiptId}.pdf`)
      console.log(`Receipt ${receiptId} generated successfully`)
    } catch (error) {
      console.error("Error generating receipt:", error)
    }
  }

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Generate Receipt</Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-[600px]">
        <ModalHeader>
          <ModalTitle>Generate Receipt</ModalTitle>
        </ModalHeader>
        <div className="grid gap-6 p-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">QuickFix Plumbers</h2>
                  <p className="text-sm text-gray-500">P.O Box 70271 - 00400</p>
                  <p className="text-sm text-gray-500">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-500">PIN: P051318503X</p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl">Invoice</h3>
                  <p className="text-sm text-gray-500">Invoice #: {Math.floor(Math.random() * 10000)}</p>
                  <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPin">Customer PIN</Label>
                <Input id="customerPin" value={customerPin} onChange={(e) => setCustomerPin(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="itemName">Item Description</Label>
                  <Input
                    id="itemName"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={addItem}>Add Item</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Qty</TableHead>
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

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>KES {calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (16%):</span>
                <span>KES {calculateVAT().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>KES {calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>Warranty Void if Damage is by Power Surge</p>
              <p>Goods Once Sold are NOT Returnable or Refundable</p>
            </div>

            <div className="text-sm text-gray-500 grid grid-cols-3 gap-4">
              <div>Phone: +254-770933024</div>
              <div>Email: quickfixplumbers@gmail.com</div>
              <div>Web: www.quickfixplumbers.co.ke</div>
            </div>

            <div className="flex justify-end">
              <Button onClick={generateReceipt}>Generate PDF</Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

