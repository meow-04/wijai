import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  th: {
    translation: {
      hero: {
        titleLogin: "ยินดีต้อนรับ",
        titleRegister: "เริ่มต้นใหม่",
        subtitleLogin: "เข้าสู่ระบบเพื่อเข้าถึงเว็บแอปพลิเคชัน",
        subtitleRegister: "สร้างบัญชีใหม่เพื่อเริ่มใช้งาน",
      },
      tabs: { login: "เข้าสู่ระบบ", register: "สมัครสมาชิก" },
      form: {
        headingLogin: "เข้าสู่ระบบ",
        headingRegister: "สมัครสมาชิก",
        descLogin: "กรอกอีเมลและรหัสผ่านของคุณเพื่อเข้าเว็บแอปพลิเคชัน",
        descRegister: "สร้างบัญชีใหม่ด้วยอีเมล ชื่อ และรหัสผ่านที่คุณต้องการ",
        name: "ชื่อ - นามสกุล",
        email: "อีเมล",
        password: "รหัสผ่าน",
        confirm: "ยืนยันรหัสผ่าน",
      },
      placeholder: {
        name: "กรอกชื่อของคุณ",
        email: "example@email.com",
        password: "••••••••",
        confirm: "••••••••",
      },
      button: {
        submitLogin: "เข้าสู่ระบบ",
        submitRegister: "สมัครสมาชิก",
        googleLogin: "เข้าสู่ระบบด้วย Google",
        googleRegister: "สมัครด้วย Google",
        switchToRegister: "สมัครสมาชิก",
        switchToLogin: "เข้าสู่ระบบ",
        langTh: "ไทย",
        langMs: "มาเลย์",
      },
      link: {
        toRegister: "ยังไม่มีบัญชี? ",
        toLogin: "มีบัญชีอยู่แล้ว? ",
      },
      common: {
        loading: "กำลังโหลด...",
        noContent: "ยังไม่มีเนื้อหา",
        noImage: "ไม่มีรูปภาพ",
        hasMoreLink: "มีลิงก์เพิ่มเติม",
        openLink: "เปิดลิงก์",
        cancel: "ยกเลิก",
        save: "บันทึก",
        saving: "กำลังบันทึก...",
        close: "ปิด",
        language: "ภาษา",
      },
      user: {
        brand: "งานใครตอบผมหน่อย",
        menu: {
          explore360: "สำรวจสถานที่แบบ 360°",
          museum: "พิพิธภัณฑ์",
          herb: "องค์ความรู้สมุนไพรท้องถิ่น",
        },
        profile: {
          title: "แก้ไขโปรไฟล์",
          subtitle: "อัปเดตชื่อของคุณ",
          loadError: "โหลดข้อมูลโปรไฟล์ไม่สำเร็จ",
          email: "อีเมล",
          name: "ชื่อ",
          namePlaceholder: "กรอกชื่อของคุณ",
        },
        logout: {
          error: "เกิดข้อผิดพลาดในการออกจากระบบ",
        },
        layout: {
          openMainMenu: "เปิดเมนูหลัก",
          closeMainMenu: "ปิดเมนูหลัก",
          mainMenu: "เมนูหลัก",
          profile: "โปรไฟล์",
          settings: "การตั้งค่า",
          logout: "ออกจากระบบ",
        },
        explore: {
          title: "สำรวจสถานที่แบบ 360°",
          subtitle: "ตัวอย่างสถานที่ที่สามารถชมแบบรอบทิศทาง",
          badge: "สำรวจ 360°",
        },
        museum: {
          title: "พิพิธภัณฑ์",
          subtitle: "ตัวอย่างพิพิธภัณฑ์และแกลเลอรีที่น่าสนใจ",
          badge: "พิพิธภัณฑ์",
        },
        herb: {
          title: "องค์ความรู้สมุนไพรท้องถิ่น",
          subtitle: "ข้อมูลสรรพคุณสมุนไพรพร้อมภาพประกอบ",
          badge: "สมุนไพร",
        },
      },
      // ✅ เพิ่มส่วนนี้ — ข้อมูลสมุนไพรเพิ่มเติม
      herb: {
        usedInRecipes: "ส่วนของสมุนไพรที่ใช้ทำเมนูอาหาร",
        usedInMedicine: "ส่วนของสมุนไพรที่ใช้ทำยา",
        audioNarration: "เสียงบรรยาย",
        audioNotSupported: "เบราว์เซอร์ของคุณไม่รองรับการเล่นเสียง",
      },
    },
  },
  ms: {
    translation: {
      hero: {
        titleLogin: "Selamat datang",
        titleRegister: "Mulakan baharu",
        subtitleLogin: "Log masuk untuk akses aplikasi web",
        subtitleRegister: "Cipta akaun baharu untuk bermula",
      },
      tabs: { login: "Log masuk", register: "Daftar" },
      form: {
        headingLogin: "Log masuk",
        headingRegister: "Daftar",
        descLogin: "Masukkan emel dan kata laluan anda untuk akses",
        descRegister: "Cipta akaun baharu dengan emel, nama dan kata laluan",
        name: "Nama penuh",
        email: "Emel",
        password: "Kata laluan",
        confirm: "Sahkan kata laluan",
      },
      placeholder: {
        name: "Masukkan nama anda",
        email: "contoh@email.com",
        password: "••••••••",
        confirm: "••••••••",
      },
      button: {
        submitLogin: "Log masuk",
        submitRegister: "Daftar",
        googleLogin: "Log masuk dengan Google",
        googleRegister: "Daftar dengan Google",
        switchToRegister: "Daftar",
        switchToLogin: "Log masuk",
        langTh: "Thai",
        langMs: "Melayu",
      },
      link: {
        toRegister: "Belum ada akaun? ",
        toLogin: "Sudah ada akaun? ",
      },
      common: {
        loading: "Sedang dimuatkan...",
        noContent: "Tiada kandungan lagi",
        noImage: "Tiada imej",
        hasMoreLink: "Ada pautan tambahan",
        openLink: "Buka pautan",
        cancel: "Batal",
        save: "Simpan",
        saving: "Sedang menyimpan...",
        close: "Tutup",
        language: "Bahasa",
      },
      user: {
        brand: "Sila jawab tugasan saya",
        menu: {
          explore360: "Terokai tempat 360°",
          museum: "Muzium",
          herb: "Ilmu herba tempatan",
        },
        profile: {
          title: "Kemaskini profil",
          subtitle: "Kemas kini nama anda",
          loadError: "Gagal memuatkan profil",
          email: "Emel",
          name: "Nama",
          namePlaceholder: "Masukkan nama anda",
        },
        logout: {
          error: "Ralat semasa log keluar",
        },
        layout: {
          openMainMenu: "Buka menu utama",
          closeMainMenu: "Tutup menu utama",
          mainMenu: "Menu utama",
          profile: "Profil",
          settings: "Tetapan",
          logout: "Log keluar",
        },
        explore: {
          title: "Terokai tempat 360°",
          subtitle: "Contoh tempat yang boleh dilihat sekeliling",
          badge: "Terokai 360°",
        },
        museum: {
          title: "Muzium",
          subtitle: "Contoh muzium dan galeri menarik",
          badge: "Muzium",
        },
        herb: {
          title: "Ilmu herba tempatan",
          subtitle: "Maklumat khasiat herba beserta gambar",
          badge: "Herba",
        },
      },
      // ✅ เพิ่มส่วนนี้ — ข้อมูลสมุนไพรเพิ่มเติม (มาเลย์)
      herb: {
        usedInRecipes: "Bahagian herba yang digunakan untuk penyediaan hidangan makanan",
        usedInMedicine: "Bahagian herba yang digunakan untuk membuat ubat ",
        audioNarration: "Rakaman Audio",
        audioNotSupported: "Pelayar anda tidak menyokong mainan audio",
      },
    },
  },
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("userLanguage") || "th",
    fallbackLng: "th",
    supportedLngs: ["th", "ms"],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;