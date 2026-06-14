import { getTranslations } from "next-intl/server";

export default async function ProfilePage() {
  const t = await getTranslations("profile");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <button className="px-4 py-2 bg-black text-white rounded-lg">
        {t("editProfile")}
      </button>
    </div>
  );
}
