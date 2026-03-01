import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import Toast from "../components/common/Toast";
import { FiCompass, FiAperture, FiBookOpen, FiUser, FiLogOut } from "react-icons/fi";
import Explore360 from "../components/user/Explore360";
import Museum from "../components/user/Museum";
import HerbKnowledge from "../components/user/HerbKnowledge";
import UserLayout from "../components/user/UserLayout";

export default function UserDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [activeSection, setActiveSection] = useState("explore");
  const [profileModal, setProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const loadProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setProfileLoading(true);
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.exists() ? snap.data() : {};
      setProfileForm({
        name: data.name || user.displayName || "",
        email: user.email || "",
      });
    } catch (error) {
      console.error("Load profile error", error);
      setToast({ message: t("user.profile.loadError"), type: "error" });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleOpenProfile = () => {
    loadProfile();
    setProfileModal(true);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setToast({ message: t("user.logout.error"), type: "error" });
    }
  };

  const menuItems = [
    { id: "explore", label: t("user.menu.explore360"), icon: FiCompass },
    { id: "museum", label: t("user.menu.museum"), icon: FiAperture },
    { id: "herb", label: t("user.menu.herb"), icon: FiBookOpen },
  ];

  return (
    <>
      <UserLayout
        brand="SERI GADENG"
        menuItems={menuItems}
        activeSection={activeSection}
        onChangeSection={setActiveSection}
        onLogout={handleLogout}
        onProfileClick={handleOpenProfile}
        userName={profileForm.name}
      >
        {activeSection === "explore" && <Explore360 />}
        {activeSection === "museum" && <Museum />}
        {activeSection === "herb" && <HerbKnowledge />}
      </UserLayout>

      {profileModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={() => setProfileModal(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{t("user.profile.title")}</h3>
                <p className="text-sm text-slate-600">{t("user.profile.subtitle")}</p>
              </div>
              <button
                onClick={() => setProfileModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
                aria-label="ปิด"
              >
                ✕
              </button>
            </div>
            {profileLoading ? (
              <p className="text-sm text-slate-500">{t("common.loading")}</p>
            ) : (
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const user = auth.currentUser;
                  if (!user) return;
                  try {
                    setProfileSaving(true);
                    await updateDoc(doc(db, "users", user.uid), {
                      name: profileForm.name.trim(),
                    });
                    setToast({ message: "บันทึกโปรไฟล์สำเร็จ", type: "success" });
                    setProfileModal(false);
                  } catch (error) {
                    console.error("Save profile error", error);
                    setToast({ message: "บันทึกโปรไฟล์ไม่สำเร็จ", type: "error" });
                  } finally {
                    setProfileSaving(false);
                  }
                }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t("user.profile.email")}</label>
                  <input
                    value={profileForm.email}
                    readOnly
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{t("user.profile.name")}</label>
                  <input
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
                    placeholder={t("user.profile.namePlaceholder")}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setProfileModal(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition disabled:opacity-60"
                  >
                    {profileSaving ? t("common.saving") : t("common.save")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

