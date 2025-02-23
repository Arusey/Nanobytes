import { ReceiptGenerator } from "@/components/ReceiptGenerator"

export default function ReceiptPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Receipts</h1>
      <ReceiptGenerator />
      {/* Add a list of existing receipts here */}
    </div>
  )
}

