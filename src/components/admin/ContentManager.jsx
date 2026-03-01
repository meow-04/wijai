import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { FiTrash2, FiImage, FiBookOpen, FiCompass, FiVolume2 } from "react-icons/fi";

const TAB_CONFIG = {
  explore: { label: "สำรวจสถานที่แบบ 360°", collection: "content_explore", icon: FiCompass },
  museum: { label: "พิพิธภัณฑ์", collection: "content_museum", icon: FiBookOpen },
  herb: { label: "องค์ความรู้สมุนไพรท้องถิ่น", collection: "content_herb", icon: FiBookOpen },
};

export default function ContentManager({ showToast }) {
  const [activeTab, setActiveTab] = useState("explore");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    titleMs: "",
    description: "",
    descriptionMs: "",
    image: "",
    link: "",
    audioUrlTh: "",
    audioUrlMs: "",
    usedInRecipesTh: "",
    usedInRecipesMs: "",
    usedInMedicineTh: "",
    usedInMedicineMs: "",
  });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const config = TAB_CONFIG[activeTab];
      const q = query(collection(db, config.collection), orderBy("title"));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setItems(list);
    } catch (error) {
      console.error("fetch content error", error);
      const message =
        error?.code === "permission-denied"
          ? "ไม่มีสิทธิ์เข้าถึงข้อมูล กรุณาตรวจสอบ Firestore rules"
          : "เกิดข้อผิดพลาดในการโหลดข้อมูล";
      setErrorMsg(message);
      showToast?.(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      showToast?.("กรุณากรอกหัวข้อและคำอธิบาย (ไทย)", "error");
      return;
    }

    if (activeTab !== "herb" && !form.image.trim()) {
      showToast?.("กรุณาใส่ลิงก์รูปภาพ", "error");
      return;
    }

    try {
      setSaving(true);
      setErrorMsg("");
      const config = TAB_CONFIG[activeTab];
      const data = {
        title: form.title.trim(),
        title_ms: form.titleMs.trim(),
        description: form.description.trim(),
        description_ms: form.descriptionMs.trim(),
        image: form.image.trim(),
        link: form.link.trim(),
        audioUrlTh: form.audioUrlTh.trim(),
        audioUrlMs: form.audioUrlMs.trim(),
        usedInRecipesTh: form.usedInRecipesTh.trim(),
        usedInRecipesMs: form.usedInRecipesMs.trim(),
        usedInMedicineTh: form.usedInMedicineTh.trim(),
        usedInMedicineMs: form.usedInMedicineMs.trim(),
      };

      if (editingId) {
        await updateDoc(doc(db, config.collection, editingId), {
          ...data,
          updatedAt: new Date().toISOString(),
        });
        showToast?.("อัปเดตเนื้อหาสำเร็จ", "success");
      } else {
        await addDoc(collection(db, config.collection), {
          ...data,
          createdAt: new Date().toISOString(),
        });
        showToast?.("เพิ่มเนื้อหาสำเร็จ", "success");
      }

      resetForm();
      fetchItems();
    } catch (error) {
      console.error("add content error", error);
      const message =
        error?.code === "permission-denied"
          ? "ไม่มีสิทธิ์เพิ่มข้อมูล กรุณาตรวจสอบ Firestore rules"
          : "เกิดข้อผิดพลาดในการบันทึก";
      setErrorMsg(message);
      showToast?.(message, "error");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      titleMs: "",
      description: "",
      descriptionMs: "",
      image: "",
      link: "",
      audioUrlTh: "",
      audioUrlMs: "",
      usedInRecipesTh: "",
      usedInRecipesMs: "",
      usedInMedicineTh: "",
      usedInMedicineMs: "",
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      const config = TAB_CONFIG[activeTab];
      await deleteDoc(doc(db, config.collection, id));
      showToast?.("ลบข้อมูลสำเร็จ", "success");
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (error) {
      console.error("delete content error", error);
      showToast?.("เกิดข้อผิดพลาดในการลบ", "error");
    }
  };

  const isHerbTab = activeTab === "herb";

  return (
    <div className="space-y-6">
      {errorMsg && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 text-amber-800 px-4 py-3 text-sm">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(TAB_CONFIG).map(([key, cfg]) => {
          const Icon = cfg.icon;
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                active ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="text-base" />
                {cfg.label}
              </span>
            </button>
          );
        })}
      </div>

      <form
        onSubmit={handleAdd}
        className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid gap-3 md:grid-cols-2"
      >
        {/* หัวข้อ (ไทย + มาเลย์) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">หัวข้อ (ไทย)</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
            placeholder="เช่น ขมิ้นชัน"
          />
          <input
            value={form.titleMs}
            onChange={(e) => setForm({ ...form, titleMs: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none mt-1"
            placeholder="Tajuk (มาเลย์)"
          />
        </div>

        {/* ลิงก์รูปภาพ */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            ลิงก์รูปภาพ{isHerbTab ? " (ไม่จำเป็น)" : ""}
          </label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
            placeholder="https://example.com/herb.jpg"
          />
        </div>

        {/* ลิงก์ทั่วไป */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm font-medium text-slate-700">ลิงก์ (ถ้ามี)</label>
          <input
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
            placeholder="https://example.com"
          />
        </div>

        {/* คำอธิบาย (ไทย + มาเลย์) */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm font-medium text-slate-700">คำอธิบาย (ไทย)</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
            rows={3}
            placeholder="รายละเอียดสมุนไพร..."
          />
          <label className="text-sm font-medium text-slate-700 mt-2">คำอธิบาย (มาเลย์)</label>
          <textarea
            value={form.descriptionMs}
            onChange={(e) => setForm({ ...form, descriptionMs: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none mt-1"
            rows={3}
            placeholder="Huraian herba tempatan..."
          />
        </div>

        {/* === ส่วนเพิ่ม (เฉพาะ herb tab) - อยู่ด้านล่างสุด === */}
        {isHerbTab && (
          <>
            {/* เสียงบรรยาย (ไทย + มาเลย์) */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-medium text-slate-700 inline-flex items-center gap-1">
                <FiVolume2 className="text-base" />
                เสียงบรรยาย (ไทย)
              </label>
              <input
                value={form.audioUrlTh}
                onChange={(e) => setForm({ ...form, audioUrlTh: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
                placeholder="https://example.com/thai-audio.mp3"
              />
              <label className="text-sm font-medium text-slate-700 mt-2 inline-flex items-center gap-1">
                <FiVolume2 className="text-base" />
                เสียงบรรยาย (มาเลย์)
              </label>
              <input
                value={form.audioUrlMs}
                onChange={(e) => setForm({ ...form, audioUrlMs: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none mt-1"
                placeholder="https://example.com/malay-audio.mp3"
              />
            </div>

            {/* ใช้ในเมนูอาหาร */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-medium text-slate-700">ส่วนของสมุนไพรที่ใช้ทำเมนูอาหาร (ไทย)</label>
              <input
                value={form.usedInRecipesTh}
                onChange={(e) => setForm({ ...form, usedInRecipesTh: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
                placeholder="เช่น ต้มยำ, แกงส้ม"
              />
              <label className="text-sm font-medium text-slate-700 mt-2">ส่วนของสมุนไพรที่ใช้ทำเมนูอาหาร (มาเลย์)</label>
              <input
                value={form.usedInRecipesMs}
                onChange={(e) => setForm({ ...form, usedInRecipesMs: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none mt-1"
                placeholder="Contoh: Tom yam, Gulai asam"
              />
            </div>

            {/* ใช้ในยาสมุนไพร */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-medium text-slate-700">ส่วนของสมุนไพรที่ใช้ทำยา (ไทย)</label>
              <input
                value={form.usedInMedicineTh}
                onChange={(e) => setForm({ ...form, usedInMedicineTh: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
                placeholder="เช่น ยาขมิ้นแคปซูล, ยาน้ำ"
              />
              <label className="text-sm font-medium text-slate-700 mt-2">ส่วนของสมุนไพรที่ใช้ทำยา (มาเลย์)</label>
              <input
                value={form.usedInMedicineMs}
                onChange={(e) => setForm({ ...form, usedInMedicineMs: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none mt-1"
                placeholder="Contoh: Kapsul kunyit, Ubat herba"
              />
            </div>
          </>
        )}

        {/* ปุ่ม */}
        <div className="md:col-span-2 flex justify-between items-center gap-3">
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-slate-100"
            >
              ยกเลิกการแก้ไข
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition disabled:opacity-60"
          >
            {saving ? "กำลังบันทึก..." : editingId ? "บันทึกการแก้ไข" : "เพิ่มเนื้อหา"}
          </button>
        </div>
      </form>

      {/* แสดงรายการ */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center text-slate-500">กำลังโหลด...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-center text-slate-500">ยังไม่มีเนื้อหา</div>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden bg-slate-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400">
                    <FiImage className="text-2xl" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h4 className="text-base font-semibold text-slate-800">{item.title}</h4>
                <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>

                {/* แสดงข้อมูลสมุนไพรเฉพาะใน herb tab */}
                {isHerbTab && (
                  <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                    {/* เมนูอาหาร */}
                    {(item.usedInRecipesTh || item.usedInRecipesMs) && (
                      <div>
                        <p className="font-medium">ส่วนของสมุนไพรที่ใช้ทำเมนูอาหาร:</p>
                        {item.usedInRecipesTh && <p>ไทย: {item.usedInRecipesTh}</p>}
                        {item.usedInRecipesMs && <p>มาเลย์: {item.usedInRecipesMs}</p>}
                      </div>
                    )}
                    {/* ยาสมุนไพร */}
                    {(item.usedInMedicineTh || item.usedInMedicineMs) && (
                      <div>
                        <p className="font-medium">ส่วนของสมุนไพรที่ใช้ทำยา:</p>
                        {item.usedInMedicineTh && <p>ไทย: {item.usedInMedicineTh}</p>}
                        {item.usedInMedicineMs && <p>มาเลย์: {item.usedInMedicineMs}</p>}
                      </div>
                    )}
                    {/* เสียงบรรยาย */}
                    {item.audioUrlTh && (
                      <p className="flex items-center gap-1">
                        <FiVolume2 className="text-emerald-600" />
                        <a
                          href={item.audioUrlTh}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 underline"
                        >
                          เสียงบรรยาย (ไทย)
                        </a>
                      </p>
                    )}
                    {item.audioUrlMs && (
                      <p className="flex items-center gap-1">
                        <FiVolume2 className="text-emerald-600" />
                        <a
                          href={item.audioUrlMs}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 underline"
                        >
                          เสียงบรรยาย (มาเลย์)
                        </a>
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center gap-2 pt-2">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-600 hover:text-emerald-700 underline truncate"
                    >
                      เปิดลิงก์
                    </a>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setForm({
                          title: item.title || "",
                          titleMs: item.title_ms || "",
                          description: item.description || "",
                          descriptionMs: item.description_ms || "",
                          image: item.image || "",
                          link: item.link || "",
                          audioUrlTh: item.audioUrlTh || "",
                          audioUrlMs: item.audioUrlMs || "",
                          usedInRecipesTh: item.usedInRecipesTh || "",
                          usedInRecipesMs: item.usedInRecipesMs || "",
                          usedInMedicineTh: item.usedInMedicineTh || "",
                          usedInMedicineMs: item.usedInMedicineMs || "",
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm"
                    >
                      <FiTrash2 className="text-sm" />
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}