"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Helper to check admin status (simplistic for demo)
async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  // In a real app, verify against a list of admin IDs or Clerk metadata/roles
  return true; 
}

export async function createSignal(formData: FormData) {
  await checkAdmin();

  const symbol = formData.get("symbol") as string;
  const type = formData.get("type") as string;
  const entryPrice = parseFloat(formData.get("entryPrice") as string);
  const targetPrice = parseFloat(formData.get("targetPrice") as string);
  const stopLoss = parseFloat(formData.get("stopLoss") as string);
  const description = formData.get("description") as string;

  await prisma.signal.create({
    data: {
      symbol: symbol.toUpperCase(),
      type,
      entryPrice: isNaN(entryPrice) ? null : entryPrice,
      targetPrice: isNaN(targetPrice) ? null : targetPrice,
      stopLoss: isNaN(stopLoss) ? null : stopLoss,
      description,
      status: "OPEN",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function closeSignal(id: number) {
  await checkAdmin();

  await prisma.signal.update({
    where: { id },
    data: { status: "CLOSED" },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteSignal(id: number) {
  await checkAdmin();

  await prisma.signal.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function getSignals() {
  const signals = await prisma.signal.findMany({
    orderBy: { createdAt: "desc" },
  });
  return signals;
}
