import { getTranslations } from "next-intl/server";

export default async function BookingsPage() {
  const t = await getTranslations("bookings");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="text-gray-500">{t("noBookings")}</p>
    </div>
  );
}
