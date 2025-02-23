import { QuotationForm } from "@/components/QuotationForm"

export default function QuotationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quotations</h1>
      <QuotationForm />
      {/* Add a list of existing quotations here */}
    </div>
  )
}

