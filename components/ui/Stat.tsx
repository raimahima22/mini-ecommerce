import * as React from "react";

export function Stat({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-1">{children}</div>;
}

export function StatLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

export function StatNumber({ children }: { children: React.ReactNode }) {
  return <p className="text-2xl font-semibold">{children}</p>;
}
