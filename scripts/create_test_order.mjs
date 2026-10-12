import pg from "pg";
const { Client } = pg;

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_98pFGZIctwdb@ep-nameless-tooth-b7wdk40f-pooler.c-13.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

async function run() {
  await client.connect();
  console.log("Połączono z bazą danych.");

  // 1. Sprawdź / pobierz użytkownika deloskiyt@gmail.com
  let userRes = await client.query('SELECT id, email, name, role FROM "User" WHERE email ILIKE $1', ["deloskiyt@gmail.com"]);
  let user = userRes.rows[0];

  if (!user) {
    console.log("Tworzę konto deloskiyt@gmail.com...");
    const createRes = await client.query(`
      INSERT INTO "User" ("id", "email", "name", "password", "role", "createdAt", "updatedAt")
      VALUES ('cmuvwj9jo000004jt6t0gcqdl', 'deloskiyt@gmail.com', 'deloskiyt', '$2a$10$wT0E8Yf9tWbA1jJmKkLzXe7Y1jJmKkLzXe7Y1jJmKkLzXe7Y1jJmK', 'admin', NOW(), NOW())
      RETURNING id, email, name, role;
    `);
    user = createRes.rows[0];
  }

  console.log("Użytkownik docelowy:", user);

  // 2. Utwórz / zaktualizuj testowy produkt
  const prodId = "prod_konto_mc_vip_2026";
  const prodName = "🎮 Konto Minecraft Full Access + Płaszcz Migratora";
  const credentials = "Login: deloskiyt_test@gmail.com\nHasło: Minecraft2026!Test\nEmail pomocniczy: https://mail.deloskiyt.pl (PIN do odzyskiwania: 7392)";

  await client.query(`
    INSERT INTO "Product" (
      "id", "name", "description", "version", "category", "itemType", "price", "isPublic", "features", "badge", "accountCredentials", "userId", "updatedAt"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()
    )
    ON CONFLICT ("id") DO UPDATE SET
      "accountCredentials" = EXCLUDED."accountCredentials",
      "itemType" = EXCLUDED."itemType",
      "updatedAt" = NOW();
  `, [
    prodId,
    prodName,
    "Pełny dostęp do konta (Full Access) z możliwością zmiany e-maila, hasła i nicku. Zawiera unikalny płaszcz oraz status VIP.",
    "1.0.0",
    "Konta do gry",
    "konto",
    39.99,
    true,
    "Pełny dostęp Full Access;Zmiana maila i hasła;Brak blokad serwerowych;Gwarancja 30 dni",
    "NOWOŚĆ",
    credentials,
    user.id
  ]);
  console.log("✅ Produkt gotowy:", prodId);

  // 3. Utwórz testowe zamówienie w statusie "do_odbioru"
  const orderNumber = "TEST-KONTO-2026";
  const orderId = "ord_test_konto_2026";

  await client.query(`
    INSERT INTO "Order" (
      "id", "orderNumber", "title", "description", "orderType", "status", "price", "accountCredentials", "isClaimed", "noRefundAccepted", "userId", "updatedAt"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()
    )
    ON CONFLICT ("orderNumber") DO UPDATE SET
      "status" = 'do_odbioru',
      "isClaimed" = false,
      "noRefundAccepted" = false,
      "claimedAt" = null,
      "accountCredentials" = EXCLUDED."accountCredentials",
      "userId" = EXCLUDED."userId",
      "updatedAt" = NOW();
  `, [
    orderId,
    orderNumber,
    prodName,
    "Testowe zamówienie konta do gry do weryfikacji procedury 'Odbierz konto' z klauzulą braku zwrotu.",
    "konto",
    "do_odbioru",
    39.99,
    credentials,
    false,
    false,
    user.id
  ]);
  console.log("✅ Zamówienie gotowe: #" + orderNumber + " ze statusem 'do_odbioru'");

  // 4. Utwórz przypisaną licencję konta w statusie "do odbioru"
  const licKey = "lic_deloski_konto_mc_test_77";
  const licId = "lic_test_konto_mc_77";

  await client.query(`
    INSERT INTO "License" (
      "id", "licenseKey", "name", "status", "productId", "userId", "accountCredentials", "isClaimed", "noRefundAccepted", "updatedAt"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()
    )
    ON CONFLICT ("licenseKey") DO UPDATE SET
      "isClaimed" = false,
      "noRefundAccepted" = false,
      "claimedAt" = null,
      "accountCredentials" = EXCLUDED."accountCredentials",
      "userId" = EXCLUDED."userId",
      "productId" = EXCLUDED."productId",
      "updatedAt" = NOW();
  `, [
    licId,
    licKey,
    prodName,
    "active",
    prodId,
    user.id,
    credentials,
    false,
    false
  ]);
  console.log("✅ Licencja gotowa: " + licKey + " (isClaimed: false)");

  console.log("\n🎉 GOTOWE! Użytkownik " + user.email + " ma przypisane testowe konto:");
  console.log("1. Zamówienie #" + orderNumber + " (status: DO ODBIORU)");
  console.log("2. Licencja / Dostęp w panelu: /panel-klienta/licencje/" + licId);
  console.log("3. W panelu i na podstronie licencji jest przycisk 'Odbierz konto' z akceptacją braku zwrotu.");
}

run()
  .catch(console.error)
  .finally(() => client.end());
