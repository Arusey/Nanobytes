"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/modal"
import { createUser, updateUser } from "@/utils/api"

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AddUserFormProps {
  user?: User
}

export function AddUserForm({ user }: AddUserFormProps) {
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [role, setRole] = useState(user?.role || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userData = { name, email, role }
      if (user) {
        await updateUser(user.id, userData)
      } else {
        await createUser(userData)
      }
      // Reset form and close modal (you might want to implement a way to close the modal)
      setName("")
      setEmail("")
      setRole("")
      // Optionally, you can add a success message or refresh the user list
    } catch (error) {
      console.error("Error adding/updating user:", error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant={user ? "ghost" : "default"}>{user ? "Edit" : "Add User"}</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{user ? "Edit User" : "Add New User"}</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userName" className="text-right">
              Name
            </Label>
            <Input
              id="userName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userEmail" className="text-right">
              Email
            </Label>
            <Input
              id="userEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userRole" className="text-right">
              Role
            </Label>
            <Select onValueChange={setRole} defaultValue={role} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button type="submit">{user ? "Update User" : "Add User"}</Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

