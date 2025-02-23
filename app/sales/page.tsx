"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewSaleForm } from "@/components/NewSaleForm"
import { api } from "@/utils/api"

interface Sale {
  id: number
  customerName: string
  date: string
  total: number
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [totalSales, setTotalSales] = useState(0)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await api.get("/sales")
        setSales(data)
        setTotalSales(data.reduce((sum: number, sale: Sale) => sum + sale.total, 0))
      } catch (error) {
        console.error("Error fetching sales:", error)
      }
    }

    fetchSales()
  }, [])

  const filteredSales = sales.filter(
    (sale) => sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || sale.date.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sales</h1>
        <NewSaleForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">KES {totalSales.toFixed(2)}</p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search sales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.customerName}</TableCell>
              <TableCell>{sale.date}</TableCell>
              <TableCell>KES {sale.total.toFixed(2)}</TableCell>
              <TableCell>
                <NewSaleForm sale={sale} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

