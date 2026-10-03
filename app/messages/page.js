// ❌ HAPUS "use client"

import { messages } from "@/lib/db";
import DeleteButton from "./delete-button";  // ← Component terpisah

export default function MessagesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">Pesan Masuk</h1>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Belum ada pesan masuk.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border p-4 flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{msg.name} — {msg.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">{msg.message}</p>
              </div>

              <DeleteButton id={msg.id} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}