import prisma from "./prisma";

export async function getMaintenanceMode(): Promise<boolean> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "maintenance_mode" },
    });
    return setting?.value === "true";
  } catch (error) {
    console.error("Error reading maintenance_mode setting:", error);
    return false;
  }
}

export async function setMaintenanceMode(enabled: boolean): Promise<boolean> {
  try {
    await prisma.siteSetting.upsert({
      where: { key: "maintenance_mode" },
      update: {
        value: enabled ? "true" : "false",
        updatedAt: new Date(),
      },
      create: {
        key: "maintenance_mode",
        value: enabled ? "true" : "false",
        description: "Przełącznik trybu Zmieniamy się na lepsze",
        updatedAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error("Error updating maintenance_mode setting:", error);
    return false;
  }
}
