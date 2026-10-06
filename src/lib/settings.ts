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
        description: "Przełącznik trybu Zmieniamy się na lepsze (Cała strona)",
        updatedAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error("Error updating maintenance_mode setting:", error);
    return false;
  }
}

export async function getStoreEnabled(): Promise<boolean> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "store_enabled" },
    });
    // Domyślnie włączony, chyba że w bazie zapisano "false"
    return setting ? setting.value === "true" : true;
  } catch (error) {
    console.error("Error reading store_enabled setting:", error);
    return true;
  }
}

export async function setStoreEnabled(enabled: boolean): Promise<boolean> {
  try {
    await prisma.siteSetting.upsert({
      where: { key: "store_enabled" },
      update: {
        value: enabled ? "true" : "false",
        updatedAt: new Date(),
      },
      create: {
        key: "store_enabled",
        value: enabled ? "true" : "false",
        description: "Dostępność oficjalnego Sklepu WWW",
        updatedAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error("Error updating store_enabled setting:", error);
    return false;
  }
}

export async function getClientPortalEnabled(): Promise<boolean> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "client_portal_enabled" },
    });
    // Domyślnie włączony, chyba że w bazie zapisano "false"
    return setting ? setting.value === "true" : true;
  } catch (error) {
    console.error("Error reading client_portal_enabled setting:", error);
    return true;
  }
}

export async function setClientPortalEnabled(enabled: boolean): Promise<boolean> {
  try {
    await prisma.siteSetting.upsert({
      where: { key: "client_portal_enabled" },
      update: {
        value: enabled ? "true" : "false",
        updatedAt: new Date(),
      },
      create: {
        key: "client_portal_enabled",
        value: enabled ? "true" : "false",
        description: "Dostępność Panelu Klienta",
        updatedAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error("Error updating client_portal_enabled setting:", error);
    return false;
  }
}

export async function getAllSiteSettings() {
  const [maintenance, storeEnabled, clientPortalEnabled] = await Promise.all([
    getMaintenanceMode(),
    getStoreEnabled(),
    getClientPortalEnabled(),
  ]);

  return {
    maintenance,
    storeEnabled,
    clientPortalEnabled,
  };
}
