"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal"
import { createProduct, updateProduct } from "@/utils/api"

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

interface AddProductFormProps {
  product?: Product
}

export function AddProductForm({ product }: AddProductFormProps) {
  const [name, setName] = useState(product?.name || "")
  const [price, setPrice] = useState(product?.price.toString() || "")
  const [stock, setStock] = useState(product?.stock.toString() || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        name,
        price: Number.parseFloat(price),
        stock: Number.parseInt(stock, 10),
      }
      if (product) {
        await updateProduct(product.id, productData)
      } else {
        await createProduct(productData)
      }
      // Reset form and close modal (you might want to implement a way to close the modal)
      setName("")
      setPrice("")
      setStock("")
      // Optionally, you can add a success message or refresh the product list
    } catch (error) {
      console.error("Error adding/updating product:", error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant={product ? "ghost" : "default"}>{product ? "Edit" : "Add Product"}</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{product ? "Edit Product" : "Add New Product"}</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">
              Name
            </Label>
            <Input
              id="productName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productPrice" className="text-right">
              Price
            </Label>
            <Input
              id="productPrice"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productStock" className="text-right">
              Stock
            </Label>
            <Input
              id="productStock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">{product ? "Update Product" : "Add Product"}</Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

