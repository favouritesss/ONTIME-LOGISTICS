"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* Types matching admin page */
export type ShipmentUpdate = {
  id: string;
  timestamp: string;
  status: string;
  location?: string;
  description?: string;
  updatedBy?: string;
};

export type Shipment = {
  id: string;
  sender: string;
  senderAddress?: string;
  senderPhone?: string;
  recipient: string;
  recipientAddress?: string;
  recipientPhone?: string;
  origin?: string;
  destination?: string;
  status: string;
  created?: string;
  estimatedDelivery?: string;
  weight?: number | string;
  declaredValue?: number;
  serviceLevel?: string;
  updates?: ShipmentUpdate[];
};

type Props = {
  shipments?: Shipment[];
  onUpdateShipment?: (id: string, updates: Partial<Shipment>) => void;
  onAddUpdate?: (id: string, update: ShipmentUpdate) => void;
};

export default function ShipmentManagement({ shipments = [], onUpdateShipment, onAddUpdate }: Props) {
  const [form, setForm] = useState({
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientAddress: "",
    origin: "",
    destination: "",
    weight: "",
    declaredValue: "",
    serviceLevel: "STANDARD",
  });
  const [created, setCreated] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [localShipments, setLocalShipments] = useState<Shipment[]>(shipments);

  useEffect(() => {
    // If parent updates shipments, reflect that
    setLocalShipments(shipments);
  }, [shipments]);

  async function createShipment(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true);

    // Example: call your server endpoint /api/admin/shipments
    try {
      const payload = {
        senderName: form.senderName,
        senderAddress: form.senderAddress,
        recipientName: form.recipientName,
        recipientAddress: form.recipientAddress,
        origin: form.origin,
        destination: form.destination,
        weight: parseFloat(form.weight || "0"),
        declaredValue: parseFloat(form.declaredValue || "0"),
        serviceLevel: form.serviceLevel,
      };

      // If you have an API, call it. If not, we simulate:
      // const res = await fetch("/api/admin/shipments", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
      // const data = await res.json();

      // Simulate creation locally:
      const trackingNumber = `TRK${Date.now().toString().slice(-8)}`;
      const today = new Date().toISOString().split("T")[0];
      const newShipment: Shipment = {
        id: trackingNumber,
        sender: payload.senderName || "Unknown sender",
        senderAddress: payload.senderAddress,
        recipient: payload.recipientName || "Unknown recipient",
        recipientAddress: payload.recipientAddress,
        origin: payload.origin,
        destination: payload.destination,
        status: "Pending",
        created: today,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        weight: payload.weight,
        declaredValue: payload.declaredValue,
        serviceLevel: payload.serviceLevel,
        updates: [
          {
            id: `U${Date.now()}`,
            timestamp: new Date().toISOString(),
            status: "Created",
            description: "Shipment created",
            updatedBy: "Admin UI",
          },
        ],
      };

      // update local list
      setLocalShipments((prev) => [newShipment, ...prev]);
      setCreated(newShipment);

      // notify parent if provided
      if (typeof onAddUpdate === "function") {
        // add the creation update to parent (optional)
        onAddUpdate(newShipment.id, newShipment.updates![0]);
      }
      if (typeof onUpdateShipment === "function") {
        onUpdateShipment(newShipment.id, newShipment);
      }
    } catch (err) {
      console.error("Shipment creation failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Create Shipment</h3>

      <form onSubmit={createShipment} className="grid grid-cols-1 gap-3">
        <Input placeholder="Sender name" value={form.senderName} onChange={(e) => setForm({ ...form, senderName: e.target.value })} />
        <Input placeholder="Sender address" value={form.senderAddress} onChange={(e) => setForm({ ...form, senderAddress: e.target.value })} />
        <Input placeholder="Recipient name" value={form.recipientName} onChange={(e) => setForm({ ...form, recipientName: e.target.value })} />
        <Input placeholder="Recipient address" value={form.recipientAddress} onChange={(e) => setForm({ ...form, recipientAddress: e.target.value })} />
        <Input placeholder="Origin" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
        <Input placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
        <Input placeholder="Weight" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
        <Input placeholder="Declared value" value={form.declaredValue} onChange={(e) => setForm({ ...form, declaredValue: e.target.value })} />
        <select value={form.serviceLevel} onChange={(e) => setForm({ ...form, serviceLevel: e.target.value })} className="input">
          <option value="STANDARD">Standard</option>
          <option value="EXPRESS">Express</option>
        </select>

        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Shipment"}
          </Button>
        </div>
      </form>

      {created && (
        <div className="mt-4 p-3 border rounded">
          <h4 className="font-semibold">Shipment Created</h4>
          <p>Tracking: {created.id}</p>
          <p>
            Origin: {created.origin} → Destination: {created.destination}
          </p>
        </div>
      )}

      {/* Simple list of local shipments (read-only) */}
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Recent Shipments</h4>
        <ul className="space-y-2">
          {localShipments.map((s) => (
            <li key={s.id} className="p-3 bg-gray-50 rounded border">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-mono">{s.id}</div>
                  <div className="text-sm text-gray-600">{s.sender} → {s.recipient}</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-700">{s.status}</div>
                  <div className="text-xs text-gray-500">{s.created}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
