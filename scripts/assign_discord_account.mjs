import pg from "pg";
import bcrypt from "bcryptjs";
const { Client } = pg;

const client = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_98pFGZIctwdb@ep-nameless-tooth-b7wdk40f-pooler.c-13.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

async function run() {
  await client.connect();
  console.log("Połączono z bazą danych Neon PostgreSQL.");

  const targetEmail = "xq7291vz@gmail.com";

  // 1. Sprawdź czy użytkownik xq7291vz@gmail.com istnieje
  let userRes = await client.query(
    'SELECT id, email, name, role FROM "User" WHERE email ILIKE $1',
    [targetEmail]
  );
  let user = userRes.rows[0];

  if (!user) {
    console.log(`Tworzę konto użytkownika ${targetEmail}...`);
    // Tworzymy bezpieczny hash domyślnego hasła (np. Discord2026! lub Klient2026!)
    const defaultPassword = "Discord2026!";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const userId = "usr_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

    const createRes = await client.query(
      `
      INSERT INTO "User" ("id", "email", "name", "password", "role", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, 'user', NOW(), NOW())
      RETURNING id, email, name, role;
    `,
      [userId, targetEmail, "xq7291vz", hashedPassword]
    );
    user = createRes.rows[0];
    console.log(`✅ Utworzono użytkownika ${targetEmail} (Domyślne hasło: ${defaultPassword})`);
  } else {
    console.log(`✅ Znaleziono istniejącego użytkownika ${targetEmail} (ID: ${user.id})`);
  }

  // 2. Przygotuj dane konta Discord
  const credentials = `Login / Email konta: accoutdiscord45@gmail.com
Hasło: discordhaslo1337
Rocznik konta: 2017 (Early Supporter / Vintage)
Weryfikacja: Wiek 18+ (Pełny dostęp do kanałów NSFW i społeczności)`;

  const prodId = "prod_discord_2017_18plus";
  const prodName = "🎮 Konto Discord (2017) + Weryfikacja 18+";

  // Utwórz / zaktualizuj produkt w bazie
  await client.query(
    `
    INSERT INTO "Product" (
      "id", "name", "description", "version", "category", "itemType", "price", "isPublic", "features", "badge", "accountCredentials", "userId", "updatedAt"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "name" = EXCLUDED."name",
      "accountCredentials" = EXCLUDED."accountCredentials",
      "itemType" = EXCLUDED."itemType",
      "updatedAt" = NOW();
  `,
    [
      prodId,
      prodName,
      "Rzadkie konto Discord z 2017 roku z odznaką oraz pełną weryfikacją wieku 18+.",
      "2017.1",
      "Konta",
      "konto",
      79.99,
      true,
      "Rocznik 2017;Weryfikacja 18+;Brak blokad;Możliwość zmiany e-maila i hasła",
      "LEGENDARNE",
      credentials,
      user.id,
    ]
  );
  console.log("✅ Produkt gotowy:", prodId);

  // 3. Utwórz zamówienie w statusie "do_odbioru"
  const orderNumber = "DC2017-" + Math.floor(1000 + Math.random() * 9000);
  const orderId = "ord_dc_" + Date.now().toString(36);

  await client.query(
    `
    INSERT INTO "Order" (
      "id", "orderNumber", "title", "description", "orderType", "status", "price", "accountCredentials", "isClaimed", "noRefundAccepted", "userId", "updatedAt"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()
    )
    RETURNING id, "orderNumber", status;
  `,
    [
      orderId,
      orderNumber,
      prodName,
      "Konto Discord z 2017 roku z weryfikacją 18+. Oczekuje na odbiór danych logowania przez klienta.",
      "konto",
      "do_odbioru",
      79.99,
      credentials,
      false,
      false,
      user.id,
    ]
  );
  console.log(`✅ Zamówienie #${orderNumber} utworzone (Status: DO ODBIORU)`);

  // 4. Utwórz powiązaną licencję w statusie "do_odbioru"
  const licKey = "lic_dc_2017_" + Math.random().toString(36).substring(2, 10).toUpperCase();
  const licId = "lic_dc_" + Date.now().toString(36);

  await client.query(
    `
    INSERT INTO "License" (
      "id", "licenseKey", "name", "status", "productId", "userId", "accountCredentials", "isClaimed", "noRefundAccepted", "updatedAt"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()
    )
    RETURNING id, "licenseKey";
  `,
    [
      licId,
      licKey,
      prodName,
      "active",
      prodId,
      user.id,
      credentials,
      false,
      false,
    ]
  );
  console.log(`✅ Licencja przypisana: ${licKey}`);

  console.log("\n=======================================================");
  console.log(`🎉 SUKCES! Przypisano konto Discord dla ${targetEmail}:`);
  console.log(`- Zamówienie: #${orderNumber} (Status: do_odbioru)`);
  console.log(`- Licencja: ${licKey}`);
  console.log(`- Email konta: accoutdiscord45@gmail.com`);
  console.log(`- Hasło: discordhaslo1337`);
  console.log(`- Dostęp w panelu: /panel-klienta/konta`);
  console.log("=======================================================");
}

run()
  .catch((err) => {
    console.error("Błąd podczas przypisywania konta:", err);
    process.exit(1);
  })
  .finally(() => client.end());
