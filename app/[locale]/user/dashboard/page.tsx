import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-gray-600">{t("welcome")}</p>
    </div>
  );
}
