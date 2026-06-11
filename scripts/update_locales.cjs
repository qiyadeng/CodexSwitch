
const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');

// Full translations including settings.general keys
const translations = {
  ar: {
    nav_instances: "مثيلات متعددة",
    wakeup_subtitle: "إدارة مهام الإيقاظ مع تحكم فردي ومفتاح عام.",
    codex_subtitle: "مراقبة حالة حصص النماذج لجميع حسابات Codex في الوقت الفعلي.",
    codex_instances_subtitle: "تكوين مستقل لكل مثيل، تشغيل متوازٍ بحسابات متعددة.",
    codex_instances_comingSoon: "ميزة المثيلات المتعددة قادمة قريبًا",
    codex_instances_comingSoonDesc: "تشغيل عدة مثيلات Codex.app بحسابات مختلفة في وقت واحد، ترقبوا.",
    codex_instances_unsupported_title: "غير مدعوم على هذا النظام",
    codex_instances_unsupported_desc: "مثيلات Codex المتعددة متاحة حاليًا على macOS فقط.",
    codex_instances_quota_hourly: "5 ساعات",
    codex_instances_quota_weekly: "أسبوعي",
    error_fileCorrupted_title: "فشل قراءة الملف",
    error_fileCorrupted_description: "الملف {{fileName}} تالف ولا يمكن تحليله.",
    error_fileCorrupted_errorInfo: "تفاصيل الخطأ",
    error_fileCorrupted_filePath: "موقع الملف",
    error_fileCorrupted_helpText: "يرجى فتح المجلد لإصلاح الملف يدويًا أو حذفه، ثم إعادة تشغيل التطبيق.",
    error_fileCorrupted_openFolder: "فتح المجلد"
  },
  cs: {
    nav_instances: "Více instancí",
    wakeup_subtitle: "Správa úloh buzení s individuálním ovládáním a globálním přepínačem.",
    codex_subtitle: "Sledování stavu kvót modelů všech účtů Codex v reálném čase.",
    codex_instances_subtitle: "Nezávislá konfigurace pro každou instanci, paralelní provoz s více účty.",
    codex_instances_comingSoon: "Funkce více instancí již brzy",
    codex_instances_comingSoonDesc: "Spusťte více instancí Codex.app s různými účty současně, zůstaňte naladěni.",
    codex_instances_unsupported_title: "Na tomto systému nepodporováno",
    codex_instances_unsupported_desc: "Více instancí Codex je aktuálně dostupné pouze na macOS.",
    codex_instances_quota_hourly: "5 hodin",
    codex_instances_quota_weekly: "Týdně",
    error_fileCorrupted_title: "Čtení souboru se nezdařilo",
    error_fileCorrupted_description: "Soubor {{fileName}} je poškozen a nelze jej analyzovat.",
    error_fileCorrupted_errorInfo: "Podrobnosti chyby",
    error_fileCorrupted_filePath: "Umístění souboru",
    error_fileCorrupted_helpText: "Otevřete složku a soubor ručně opravte nebo odstraňte, poté restartujte aplikaci.",
    error_fileCorrupted_openFolder: "Otevřít složku"
  },
  de: {
    nav_instances: "Multi-Instanz",
    wakeup_subtitle: "Weckaufgaben verwalten mit Einzelsteuerung und globalem Schalter.",
    codex_subtitle: "Echtzeit-Überwachung aller Codex-Kontenkontingente.",
    codex_instances_subtitle: "Unabhängige Konfiguration pro Instanz, paralleler Betrieb mit mehreren Konten.",
    codex_instances_comingSoon: "Multi-Instanz kommt bald",
    codex_instances_comingSoonDesc: "Führen Sie mehrere Codex.app-Instanzen mit verschiedenen Konten gleichzeitig aus.",
    codex_instances_unsupported_title: "Auf diesem System nicht unterstützt",
    codex_instances_unsupported_desc: "Codex Multi-Instanz ist derzeit nur auf macOS verfügbar.",
    codex_instances_quota_hourly: "5 Std.",
    codex_instances_quota_weekly: "Wöchentlich",
    error_fileCorrupted_title: "Datei konnte nicht gelesen werden",
    error_fileCorrupted_description: "Die Datei {{fileName}} ist beschädigt und kann nicht analysiert werden.",
    error_fileCorrupted_errorInfo: "Fehlerdetails",
    error_fileCorrupted_filePath: "Dateipfad",
    error_fileCorrupted_helpText: "Bitte öffnen Sie den Ordner, um die Datei manuell zu reparieren oder zu löschen, und starten Sie dann die Anwendung neu.",
    error_fileCorrupted_openFolder: "Ordner öffnen"
  },
  "en-US": {
    nav_instances: "Multi-Instance",
    wakeup_subtitle: "Manage wakeup tasks with per-task control and a global switch.",
    codex_subtitle: "Real-time monitoring of all Codex account model quotas.",
    codex_instances_subtitle: "Independent configuration per instance, parallel operation with multiple accounts.",
    codex_instances_comingSoon: "Multi-Instance Coming Soon",
    codex_instances_comingSoonDesc: "Run multiple Codex.app instances with different accounts simultaneously, stay tuned.",
    codex_instances_unsupported_title: "Unsupported on this system",
    codex_instances_unsupported_desc: "Codex multi-instance is currently available only on macOS.",
    codex_instances_quota_hourly: "5h",
    codex_instances_quota_weekly: "Weekly",
    error_fileCorrupted_title: "File Read Failed",
    error_fileCorrupted_description: "File {{fileName}} is corrupted and cannot be parsed.",
    error_fileCorrupted_errorInfo: "Error Details",
    error_fileCorrupted_filePath: "File Location",
    error_fileCorrupted_helpText: "Please open the folder to repair manually or delete the file, then restart the application.",
    error_fileCorrupted_openFolder: "Open Folder",
    settings_webdav_retentionTitle: "Remote Retention Days",
    settings_webdav_retentionDesc: "Backups older than this on the cloud will be removed during the next sync.",
    settings_webdav_retentionUnit: "days",
    settings_webdav_collapseAll: "Collapse remote backups",
    settings_webdav_expandAll: "Expand all remote backups ({{count}} more)"
  },
  es: {
    nav_instances: "Multi-Instancia",
    wakeup_subtitle: "Administrar tareas de activación con control individual e interruptor global.",
    codex_subtitle: "Monitoreo en tiempo real de las cuotas de modelos de todas las cuentas Codex.",
    codex_instances_subtitle: "Configuración independiente por instancia, operación paralela con múltiples cuentas.",
    codex_instances_comingSoon: "Multi-Instancia Próximamente",
    codex_instances_comingSoonDesc: "Ejecute múltiples instancias de Codex.app con diferentes cuentas simultáneamente.",
    codex_instances_unsupported_title: "No soportado en este sistema",
    codex_instances_unsupported_desc: "La multi-instancia de Codex solo está disponible en macOS actualmente.",
    codex_instances_quota_hourly: "5h",
    codex_instances_quota_weekly: "Semanal",
    error_fileCorrupted_title: "Error al leer el archivo",
    error_fileCorrupted_description: "El archivo {{fileName}} está dañado y no se puede analizar.",
    error_fileCorrupted_errorInfo: "Detalles del error",
    error_fileCorrupted_filePath: "Ubicación del archivo",
    error_fileCorrupted_helpText: "Por favor, abra la carpeta para reparar manualmente o eliminar el archivo, luego reinicie la aplicación.",
    error_fileCorrupted_openFolder: "Abrir carpeta"
  },
  fr: {
    nav_instances: "Multi-Instance",
    wakeup_subtitle: "Gérer les tâches de réveil avec un contrôle individuel et un interrupteur global.",
    codex_subtitle: "Surveillance en temps réel des quotas de modèles de tous les comptes Codex.",
    codex_instances_subtitle: "Configuration indépendante par instance, fonctionnement parallèle avec plusieurs comptes.",
    codex_instances_comingSoon: "Multi-Instance Bientôt Disponible",
    codex_instances_comingSoonDesc: "Exécutez plusieurs instances Codex.app avec différents comptes simultanément.",
    codex_instances_unsupported_title: "Non pris en charge sur ce système",
    codex_instances_unsupported_desc: "Le multi-instance Codex n'est actuellement disponible que sur macOS.",
    codex_instances_quota_hourly: "5h",
    codex_instances_quota_weekly: "Hebdomadaire",
    error_fileCorrupted_title: "Échec de la lecture du fichier",
    error_fileCorrupted_description: "Le fichier {{fileName}} est corrompu et ne peut pas être analysé.",
    error_fileCorrupted_errorInfo: "Détails de l'erreur",
    error_fileCorrupted_filePath: "Emplacement du fichier",
    error_fileCorrupted_helpText: "Veuillez ouvrir le dossier pour réparer manuellement ou supprimer le fichier, puis redémarrez l'application.",
    error_fileCorrupted_openFolder: "Ouvrir le dossier"
  },
  it: {
    nav_instances: "Multi-Istanza",
    wakeup_subtitle: "Gestisci le attività di risveglio con controllo individuale e interruttore globale.",
    codex_subtitle: "Monitoraggio in tempo reale delle quote modello di tutti gli account Codex.",
    codex_instances_subtitle: "Configurazione indipendente per istanza, operazione parallela con più account.",
    codex_instances_comingSoon: "Multi-Istanza In Arrivo",
    codex_instances_comingSoonDesc: "Esegui più istanze Codex.app con account diversi contemporaneamente.",
    codex_instances_unsupported_title: "Non supportato su questo sistema",
    codex_instances_unsupported_desc: "La multi-istanza Codex è attualmente disponibile solo su macOS.",
    codex_instances_quota_hourly: "5h",
    codex_instances_quota_weekly: "Settimanale",
    error_fileCorrupted_title: "Lettura file fallita",
    error_fileCorrupted_description: "Il file {{fileName}} è corrotto e non può essere analizzato.",
    error_fileCorrupted_errorInfo: "Dettagli errore",
    error_fileCorrupted_filePath: "Posizione file",
    error_fileCorrupted_helpText: "Aprire la cartella per riparare manualmente o eliminare il file, quindi riavviare l'applicazione.",
    error_fileCorrupted_openFolder: "Apri cartella"
  },
  ja: {
    nav_instances: "マルチインスタンス",
    wakeup_subtitle: "個別制御とグローバルスイッチでウェイクアップタスクを管理します。",
    codex_subtitle: "すべてのCodexアカウントのモデルクォータをリアルタイムで監視します。",
    codex_instances_subtitle: "インスタンスごとの独立設定、複数アカウントでの並列運用。",
    codex_instances_comingSoon: "マルチインスタンス機能は近日公開",
    codex_instances_comingSoonDesc: "異なるアカウントで複数のCodex.appインスタンスを同時に実行できます。お楽しみに。",
    codex_instances_unsupported_title: "このシステムでは非対応",
    codex_instances_unsupported_desc: "Codexマルチインスタンスは現在macOSでのみ利用可能です。",
    codex_instances_quota_hourly: "5時間",
    codex_instances_quota_weekly: "週間",
    error_fileCorrupted_title: "ファイルの読み込みに失敗しました",
    error_fileCorrupted_description: "ファイル {{fileName}} が破損しており、解析できません。",
    error_fileCorrupted_errorInfo: "エラー詳細",
    error_fileCorrupted_filePath: "ファイルの場所",
    error_fileCorrupted_helpText: "フォルダを開いて手動で修復するか、ファイルを削除してからアプリケーションを再起動してください。",
    error_fileCorrupted_openFolder: "フォルダを開く"
  },
  ko: {
    nav_instances: "멀티 인스턴스",
    wakeup_subtitle: "개별 제어 및 글로벌 스위치로 깨우기 작업을 관리합니다.",
    codex_subtitle: "모든 Codex 계정의 모델 할당량을 실시간으로 모니터링합니다.",
    codex_instances_subtitle: "인스턴스별 독립 구성, 여러 계정으로 병렬 운영.",
    codex_instances_comingSoon: "멀티 인스턴스 곧 출시",
    codex_instances_comingSoonDesc: "다른 계정으로 여러 Codex.app 인스턴스를 동시에 실행할 수 있습니다.",
    codex_instances_unsupported_title: "이 시스템에서 지원되지 않음",
    codex_instances_unsupported_desc: "Codex 멀티 인스턴스는 현재 macOS에서만 사용 가능합니다.",
    codex_instances_quota_hourly: "5시간",
    codex_instances_quota_weekly: "주간",
    error_fileCorrupted_title: "파일 읽기 실패",
    error_fileCorrupted_description: "{{fileName}} 파일이 손상되어 분석할 수 없습니다.",
    error_fileCorrupted_errorInfo: "오류 상세",
    error_fileCorrupted_filePath: "파일 위치",
    error_fileCorrupted_helpText: "폴더를 열어 수동으로 복구하거나 파일을 삭제한 후 애플리케이션을 다시 시작하십시오.",
    error_fileCorrupted_openFolder: "폴더 열기"
  },
  pl: {
    nav_instances: "Multi-Instancja",
    wakeup_subtitle: "Zarządzaj zadaniami budzenia z indywidualną kontrolą i globalnym przełącznikiem.",
    codex_subtitle: "Monitorowanie w czasie rzeczywistym limitów modeli wszystkich kont Codex.",
    codex_instances_subtitle: "Niezależna konfiguracja dla każdej instancji, równoległa praca z wieloma kontami.",
    codex_instances_comingSoon: "Multi-Instancja Wkrótce",
    codex_instances_comingSoonDesc: "Uruchamiaj wiele instancji Codex.app z różnymi kontami jednocześnie.",
    codex_instances_unsupported_title: "Nieobsługiwane na tym systemie",
    codex_instances_unsupported_desc: "Multi-instancja Codex jest obecnie dostępna tylko na macOS.",
    codex_instances_quota_hourly: "5h",
    codex_instances_quota_weekly: "Tygodniowo",
    error_fileCorrupted_title: "Nie udało się odczytać pliku",
    error_fileCorrupted_description: "Plik {{fileName}} jest uszkodzony i nie można go przeanalizować.",
    error_fileCorrupted_errorInfo: "Szczegóły błędu",
    error_fileCorrupted_filePath: "Lokalizacja pliku",
    error_fileCorrupted_helpText: "Otwórz folder, aby naprawić ręcznie lub usunąć plik, a następnie uruchom ponownie aplikację.",
    error_fileCorrupted_openFolder: "Otwórz folder"
  },
  "pt-br": {
    nav_instances: "Multi-Instância",
    wakeup_subtitle: "Gerencie tarefas de despertar com controle individual e interruptor global.",
    codex_subtitle: "Monitoramento em tempo real das cotas de modelo de todas as contas Codex.",
    codex_instances_subtitle: "Configuração independente por instância, operação paralela com múltiplas contas.",
    codex_instances_comingSoon: "Multi-Instância Em Breve",
    codex_instances_comingSoonDesc: "Execute várias instâncias do Codex.app com diferentes contas simultaneamente.",
    codex_instances_unsupported_title: "Não suportado neste sistema",
    codex_instances_unsupported_desc: "Multi-instância Codex está disponível atualmente apenas no macOS.",
    codex_instances_quota_hourly: "5h",
    codex_instances_quota_weekly: "Semanal",
    error_fileCorrupted_title: "Falha ao ler o arquivo",
    error_fileCorrupted_description: "O arquivo {{fileName}} está corrompido e não pode ser analisado.",
    error_fileCorrupted_errorInfo: "Detalhes do erro",
    error_fileCorrupted_filePath: "Localização do arquivo",
    error_fileCorrupted_helpText: "Abra a pasta para reparar manualmente ou excluir o arquivo, depois reinicie o aplicativo.",
    error_fileCorrupted_openFolder: "Abrir pasta"
  },
  ru: {
    nav_instances: "Мульти-инстанс",
    wakeup_subtitle: "Управление задачами пробуждения с индивидуальным контролем и глобальным переключателем.",
    codex_subtitle: "Мониторинг квот моделей всех аккаунтов Codex в реальном времени.",
    codex_instances_subtitle: "Независимая конфигурация для каждого экземпляра, параллельная работа с несколькими аккаунтами.",
    codex_instances_comingSoon: "Мульти-инстанс скоро",
    codex_instances_comingSoonDesc: "Запускайте несколько экземпляров Codex.app с разными аккаунтами одновременно.",
    codex_instances_unsupported_title: "Не поддерживается на этой системе",
    codex_instances_unsupported_desc: "Мульти-инстанс Codex в настоящее время доступен только на macOS.",
    codex_instances_quota_hourly: "5ч",
    codex_instances_quota_weekly: "Неделя",
    error_fileCorrupted_title: "Не удалось прочитать файл",
    error_fileCorrupted_description: "Файл {{fileName}} повреждён и не может быть проанализирован.",
    error_fileCorrupted_errorInfo: "Подробности ошибки",
    error_fileCorrupted_filePath: "Расположение файла",
    error_fileCorrupted_helpText: "Откройте папку для ручного исправления или удалите файл, затем перезапустите приложение.",
    error_fileCorrupted_openFolder: "Открыть папку"
  },
  tr: {
    nav_instances: "Çoklu Örnek",
    wakeup_subtitle: "Bireysel kontrol ve genel anahtar ile uyandırma görevlerini yönetin.",
    codex_subtitle: "Tüm Codex hesaplarının model kotalarını gerçek zamanlı izleyin.",
    codex_instances_subtitle: "Örnek başına bağımsız yapılandırma, birden fazla hesapla paralel çalışma.",
    codex_instances_comingSoon: "Çoklu Örnek Yakında",
    codex_instances_comingSoonDesc: "Farklı hesaplarla birden fazla Codex.app örneğini aynı anda çalıştırın.",
    codex_instances_unsupported_title: "Bu sistemde desteklenmiyor",
    codex_instances_unsupported_desc: "Codex çoklu örnek şu anda yalnızca macOS'ta kullanılabilir.",
    codex_instances_quota_hourly: "5sa",
    codex_instances_quota_weekly: "Haftalık",
    error_fileCorrupted_title: "Dosya okunamadı",
    error_fileCorrupted_description: "{{fileName}} dosyası bozuk ve ayrıştırılamıyor.",
    error_fileCorrupted_errorInfo: "Hata ayrıntıları",
    error_fileCorrupted_filePath: "Dosya konumu",
    error_fileCorrupted_helpText: "Lütfen dosyayı manuel olarak onarmak veya silmek için klasörü açın, ardından uygulamayı yeniden başlatın.",
    error_fileCorrupted_openFolder: "Klasörü aç"
  },
  vi: {
    nav_instances: "Đa Phiên Bản",
    wakeup_subtitle: "Quản lý tác vụ đánh thức với điều khiển riêng và công tắc tổng.",
    codex_subtitle: "Theo dõi thời gian thực hạn ngạch mô hình của tất cả tài khoản Codex.",
    codex_instances_subtitle: "Cấu hình độc lập cho mỗi phiên bản, vận hành song song với nhiều tài khoản.",
    codex_instances_comingSoon: "Đa Phiên Bản Sắp Ra Mắt",
    codex_instances_comingSoonDesc: "Chạy nhiều phiên bản Codex.app với các tài khoản khác nhau cùng lúc.",
    codex_instances_unsupported_title: "Không hỗ trợ trên hệ thống này",
    codex_instances_unsupported_desc: "Đa phiên bản Codex hiện chỉ khả dụng trên macOS.",
    codex_instances_quota_hourly: "5 giờ",
    codex_instances_quota_weekly: "Tuần",
    error_fileCorrupted_title: "Đọc tệp thất bại",
    error_fileCorrupted_description: "Tệp {{fileName}} bị hỏng và không thể phân tích.",
    error_fileCorrupted_errorInfo: "Chi tiết lỗi",
    error_fileCorrupted_filePath: "Vị trí tệp",
    error_fileCorrupted_helpText: "Vui lòng mở thư mục để sửa thủ công hoặc xóa tệp, sau đó khởi động lại ứng dụng.",
    error_fileCorrupted_openFolder: "Mở thư mục"
  },
  "zh-tw": {
    nav_instances: "多開實例",
    wakeup_subtitle: "管理喚醒任務，支援獨立啟停與統一開關。",
    codex_subtitle: "即時監控所有Codex帳號的模型配額狀態。",
    codex_instances_subtitle: "多實例獨立配置，多帳號並行運行。",
    codex_instances_comingSoon: "多開實例功能即將上線",
    codex_instances_comingSoonDesc: "支援以不同帳號同時運行多個 Codex.app 實例，敬請期待。",
    codex_instances_unsupported_title: "暫不支援目前系統",
    codex_instances_unsupported_desc: "Codex 多開實例僅支援 macOS，請在 macOS 上使用。",
    codex_instances_quota_hourly: "5小時",
    codex_instances_quota_weekly: "週",
    error_fileCorrupted_title: "檔案讀取失敗",
    error_fileCorrupted_description: "檔案 {{fileName}} 已損壞，無法解析。",
    error_fileCorrupted_errorInfo: "錯誤資訊",
    error_fileCorrupted_filePath: "檔案位置",
    error_fileCorrupted_helpText: "請開啟資料夾手動修復或刪除該檔案，然後重新啟動應用程式。",
    error_fileCorrupted_openFolder: "開啟資料夾",
    settings_webdav_retentionTitle: "雲端保留天數",
    settings_webdav_retentionDesc: "雲端超過天數的備份會在下次同步時自動清理。",
    settings_webdav_retentionUnit: "天",
    settings_webdav_collapseAll: "收起遠端備份",
    settings_webdav_expandAll: "展開全部遠端備份 (還有 {{count}} 個)"
  }
};

const ignoredFiles = ['en.json', 'zh-CN.json'];

function updateFile(fileName) {
  if (ignoredFiles.includes(fileName)) return;

  const code = fileName.replace('.json', '');
  const trans = translations[code];
  
  // Use en-US fallback if language not found
  const actualTrans = trans || translations['en-US'];
  const enTrans = translations['en-US'];

  const filePath = path.join(localesDir, fileName);
  if (!fs.existsSync(filePath)) return;

  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;

    // Helper to safely set nested keys (guard prototype pollution)
    const BLOCKED_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
    const isSafeKey = (key) => !BLOCKED_KEYS.has(key);
    const setKey = (obj, path, value) => {
      const keys = path.split('.');
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!isSafeKey(key)) return false;
        if (!Object.prototype.hasOwnProperty.call(current, key) || !current[key]) {
          Object.defineProperty(current, key, {
            value: Object.create(null),
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
        current = current[key];
      }
      const lastKey = keys[keys.length - 1];
      if (!isSafeKey(lastKey)) return false;
      if (!Object.prototype.hasOwnProperty.call(current, lastKey)) {
        Object.defineProperty(current, lastKey, {
          value: value,
          writable: true,
          enumerable: true,
          configurable: true
        });
        return true;
      }
      return false;
    };
    const setKeyIfEnglish = (obj, path, value, englishValue) => {
      const keys = path.split('.');
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!isSafeKey(key)) return false;
        if (!Object.prototype.hasOwnProperty.call(current, key) || !current[key]) {
          Object.defineProperty(current, key, {
            value: Object.create(null),
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
        current = current[key];
      }
      const lastKey = keys[keys.length - 1];
      if (!isSafeKey(lastKey)) return false;
      const existing = Object.prototype.hasOwnProperty.call(current, lastKey) ? current[lastKey] : undefined;
      if (!Object.prototype.hasOwnProperty.call(current, lastKey) || existing === englishValue) {
        Object.defineProperty(current, lastKey, {
          value: value,
          writable: true,
          enumerable: true,
          configurable: true
        });
        return true;
      }
      return false;
    };

    if(setKey(content, 'codex.oauth.openBrowser', actualTrans.codex_oauth_openBrowser)) modified = true;
    if(setKey(content, 'codex.oauth.hint', actualTrans.codex_oauth_hint)) modified = true;
    if(setKey(content, 'codex.token.import', actualTrans.codex_token_import)) modified = true;
    if(setKey(content, 'codex.local.import', actualTrans.codex_local_import)) modified = true;
    if(setKey(content, 'codex.oauth.portInUseAction', actualTrans.codex_oauth_portInUseAction)) modified = true;
    if(setKey(content, 'codex.opencodeSwitch', actualTrans.codex_opencode_switch)) modified = true;
    if(setKey(content, 'codex.opencodeSwitchDesc', actualTrans.codex_opencode_switch_desc)) modified = true;
    if(setKey(content, 'codex.opencodeSwitchFailed', actualTrans.codex_opencode_switch_failed)) modified = true;
    if(setKey(content, 'codex.import.localDesc', actualTrans.codex_import_localDesc)) modified = true;
    if(setKey(content, 'accounts.filterTags', actualTrans.accounts_filterTags)) modified = true;
    if(setKey(content, 'accounts.filterTagsCount', actualTrans.accounts_filterTagsCount)) modified = true;
    if(setKey(content, 'accounts.noAvailableTags', actualTrans.accounts_noAvailableTags)) modified = true;
    if(setKey(content, 'accounts.clearFilter', actualTrans.accounts_clearFilter)) modified = true;
    if(setKey(content, 'accounts.editTags', actualTrans.accounts_editTags)) modified = true;
    if(setKey(content, 'accounts.groupByTag', actualTrans.accounts_groupByTag)) modified = true;
    if(setKey(content, 'accounts.untagged', actualTrans.accounts_untagged)) modified = true;
    if(setKey(content, 'codex.filterTags', actualTrans.codex_filterTags)) modified = true;
    if(setKey(content, 'codex.filterTagsCount', actualTrans.codex_filterTagsCount)) modified = true;
    if(setKey(content, 'codex.noAvailableTags', actualTrans.codex_noAvailableTags)) modified = true;
    if(setKey(content, 'codex.clearFilter', actualTrans.codex_clearFilter)) modified = true;
    if(setKey(content, 'codex.editTags', actualTrans.codex_editTags)) modified = true;
    if(setKey(content, 'update_notification.whatsNew', actualTrans.update_notification_whatsNew)) modified = true;
    if(setKey(content, 'accounts.confirmDeleteTag', actualTrans.accounts_confirmDeleteTag)) modified = true;
    if(setKey(content, 'accounts.defaultGroup', actualTrans.accounts_defaultGroup)) modified = true;
    
    // New Settings keys
    if(setKey(content, 'settings.general.closeBehavior', actualTrans.settings_general_closeBehavior)) modified = true;
    if(setKey(content, 'settings.general.closeBehaviorDesc', actualTrans.settings_general_closeBehaviorDesc)) modified = true;
    if(setKey(content, 'settings.general.closeBehaviorAsk', actualTrans.settings_general_closeBehaviorAsk)) modified = true;
    if(setKey(content, 'settings.general.closeBehaviorMinimize', actualTrans.settings_general_closeBehaviorMinimize)) modified = true;
    if(setKey(content, 'settings.general.closeBehaviorQuit', actualTrans.settings_general_closeBehaviorQuit)) modified = true;
    if(setKey(content, 'settings.general.opencodeAppPathDesc', actualTrans.settings_general_opencodeAppPathDesc)) modified = true;
    if(setKey(content, 'settings.general.opencodeTitle', actualTrans.settings_general_opencodeTitle)) modified = true;
    if(setKey(content, 'settings.general.opencodeRestart', actualTrans.settings_general_opencodeRestart)) modified = true;
    if(setKey(content, 'settings.general.opencodeRestartDesc', actualTrans.settings_general_opencodeRestartDesc)) modified = true;
    if(setKey(content, 'settings.general.opencodeAppPath', actualTrans.settings_general_opencodeAppPath)) modified = true;
    if(setKey(content, 'settings.general.opencodeAppPathPlaceholder', actualTrans.settings_general_opencodeAppPathPlaceholder)) modified = true;
    if(setKey(content, 'settings.general.opencodePathReset', actualTrans.settings_general_opencodePathReset)) modified = true;
    if(setKeyIfEnglish(content, 'settings.general.dataDir', actualTrans.settings_general_dataDir, enTrans.settings_general_dataDir)) modified = true;
    if(setKeyIfEnglish(content, 'settings.general.dataDirDesc', actualTrans.settings_general_dataDirDesc, enTrans.settings_general_dataDirDesc)) modified = true;

    // New keys from zh-CN.json sync
    if(setKey(content, 'nav.instances', actualTrans.nav_instances)) modified = true;
    if(setKeyIfEnglish(content, 'wakeup.subtitle', actualTrans.wakeup_subtitle, enTrans.wakeup_subtitle)) modified = true;
    if(setKeyIfEnglish(content, 'codex.subtitle', actualTrans.codex_subtitle, enTrans.codex_subtitle)) modified = true;
    if(setKey(content, 'codex.instances.subtitle', actualTrans.codex_instances_subtitle)) modified = true;
    if(setKey(content, 'codex.instances.comingSoon', actualTrans.codex_instances_comingSoon)) modified = true;
    if(setKey(content, 'codex.instances.comingSoonDesc', actualTrans.codex_instances_comingSoonDesc)) modified = true;
    if(setKey(content, 'codex.instances.unsupported.title', actualTrans.codex_instances_unsupported_title)) modified = true;
    if(setKey(content, 'codex.instances.unsupported.desc', actualTrans.codex_instances_unsupported_desc)) modified = true;
    if(setKey(content, 'codex.instances.quota.hourly', actualTrans.codex_instances_quota_hourly)) modified = true;
    if(setKey(content, 'codex.instances.quota.weekly', actualTrans.codex_instances_quota_weekly)) modified = true;
    if(setKey(content, 'error.fileCorrupted.title', actualTrans.error_fileCorrupted_title)) modified = true;
    if(setKey(content, 'error.fileCorrupted.description', actualTrans.error_fileCorrupted_description)) modified = true;
    if(setKey(content, 'error.fileCorrupted.errorInfo', actualTrans.error_fileCorrupted_errorInfo)) modified = true;
    if(setKey(content, 'error.fileCorrupted.filePath', actualTrans.error_fileCorrupted_filePath)) modified = true;
    if(setKey(content, 'error.fileCorrupted.helpText', actualTrans.error_fileCorrupted_helpText)) modified = true;
    if(setKey(content, 'error.fileCorrupted.openFolder', actualTrans.error_fileCorrupted_openFolder)) modified = true;

    // WebDAV sync keys
    if(setKey(content, 'settings.webdav.retentionTitle', actualTrans.settings_webdav_retentionTitle || enTrans.settings_webdav_retentionTitle)) modified = true;
    if(setKey(content, 'settings.webdav.retentionDesc', actualTrans.settings_webdav_retentionDesc || enTrans.settings_webdav_retentionDesc)) modified = true;
    if(setKey(content, 'settings.webdav.retentionUnit', actualTrans.settings_webdav_retentionUnit || enTrans.settings_webdav_retentionUnit)) modified = true;
    if(setKey(content, 'settings.webdav.collapseAll', actualTrans.settings_webdav_collapseAll || enTrans.settings_webdav_collapseAll)) modified = true;
    if(setKey(content, 'settings.webdav.expandAll', actualTrans.settings_webdav_expandAll || enTrans.settings_webdav_expandAll)) modified = true;

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`Updated ${fileName}`);
    } else {
      console.log(`No changes needed for ${fileName}`);
    }

  } catch (e) {
    console.error(`Error updating ${fileName}:`, e);
  }
}

const files = fs.readdirSync(localesDir);
files.forEach(file => {
  if (file.endsWith('.json')) {
    updateFile(file);
  }
});
