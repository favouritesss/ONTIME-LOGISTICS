"use client";

import { useState } from "react";


interface InvoiceGeneratorProps {
  shipmentId: string;
  onInvoiceGenerated?: (invoice: any) => void;
}


export default function InvoiceGenerator({ shipmentId, onInvoiceGenerated }: InvoiceGeneratorProps) {
  const [loading, setLoading] = useState(false);

  async function downloadInvoice() {
    if (!shipmentId) return alert("No shipment selected");
    setLoading(true);
    const res = await fetch(`/api/admin/shipments/${shipmentId}/invoice`);
    if (!res.ok) {
      setLoading(false);
      return alert("Failed to generate invoice");
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${shipmentId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setLoading(false);
    if (onInvoiceGenerated) {
      onInvoiceGenerated(blob);
    }
  }

  return (
    <div>
      <button onClick={downloadInvoice} className="btn btn-secondary" disabled={loading}>
        {loading ? "Generating..." : "Download Invoice PDF"}
      </button>
    </div>
  );
}
