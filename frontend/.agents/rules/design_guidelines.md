# Agent Skills, Rules & Design Guidelines

Bu dosya, projedeki geliştirme süreçlerinde yapay zeka asistanının ve geliştiricilerin takip etmesi gereken **14 Temel Yetenek (Skill)** ve prensipleri içermektedir.

---

## 1. Fine Skills (İnce Yetenekler)
**"Fine Skills"**, detaylara gösterilen olağanüstü özeni ve piksel mükemmelliğini temsil eder.
- **Detay Odaklılık:** Tasarımdaki 1 piksel kaymayı bile fark edip düzeltmek. Doğru font ağırlığı ve renk tonunu şaşmadan uygulamak.
- **Doğru Araç Kullanımı:** Hangi durumda hangi CSS özelliğinin veya React hook'unun en verimli olacağını sezgisel olarak bilmek.
- **Kapsamlı Düşünme:** Sadece mutlu senaryoyu (happy path) değil, bağlantı yavaşken, veri yokken veya hata varken ne olacağını en ince ayrıntısına kadar planlamak.

## 2. Impeccable (Kusursuz Kodlama)
**"Impeccable"** prensibi, kodun ilk yazıldığında kusursuz çalışmasını hedefler.
- **Sıfır Hata:** Kod yazılırken syntax hataları, eksik import'lar, derleme veya tip (TypeScript) hataları bırakılamaz.
- **Edge Case Yönetimi:** Tüm olası uç durumlar önceden düşünülür ve kodda güvenli bir şekilde (null check, fallback UI) handle edilir.
- **Temiz ve Sürdürülebilir Kod:** Gereksiz tekrarlardan (WET) kaçınılır, DRY prensibi benimsenir. İsimlendirmeler açık ve nettir.
- **Performans:** Render optimizasyonları (useMemo, useCallback) ve bellek yönetimi doğru stratejiyle uygulanır.

## 3. Anti-slop (Temiz ve Net Yapı)
**"Anti-slop"**, dikkatsizce üretilen kalitesiz, gereksiz uzun veya şişirilmiş kod yığınlarını (slop) reddetmektir.
- **Yalınlık ve Sadeliği Koruma:** Aşırı mühendislikten (over-engineering) kaçınılır. En basit, en okunabilir ve en az bağımlılık gerektiren çözüm her zaman kazanır.
- **Gereksiz Sarmalayıcılar (Wrappers) Yok:** Sadece bir flex düzeni için iç içe geçmiş onlarca `<div>` yazılmaz; semantik HTML kullanılır.
- **Klişelerden Uzak Durma:** "Sadece çalışsın yeter" mantığı kabul edilemez. Üretilen her kod satırının bir amacı ve mimaride bir yeri olmalıdır.
- **Optimizasyon:** Tailwind veya CSS class'ları çelişmeyecek şekilde en saf haliyle tutulur.

## 4. Taste (İyi Tasarım Zevki)
**"Taste"**, arayüzün sadece çalışmasını değil, aynı zamanda modern, estetik ve "premium" hissettirmesini sağlar.
- **Tipografi:** Modern web fontları (Inter, Roboto, vb.), doğru satır yükseklikleri (line-height) ve kontrast ile kusursuz bir okuma deneyimi sunulur.
- **Boşluk (Whitespace) Yönetimi:** Elementler arası boşluklar (padding, margin) tasarıma nefes aldırır. Tasarım asla sıkışık veya kopuk hissettirmez.
- **Renk Paleti:** Göz yormayan, psikolojik olarak doğru hissettiren modern renk paletleri ve dark mode uyumlu sistemler kullanılır.
- **Modern UI Kalıpları:** Hafif ve şık gölgeler, cam efekti (glassmorphism), yuvarlatılmış köşeler gibi detaylarla arayüz zenginleştirilir.

## 5. Emil Kowalski (Akıcı Etkileşimler)
Ünlü UI mühendisi Emil Kowalski'nin tarzından ilham alan bu yetenek, arayüzü "canlı" hissettirmeye odaklanır.
- **Organik ve Akıcı Animasyonlar:** Tıklamalar, hover durumları, sayfa geçişleri kesintili değil, son derece pürüzsüz ve akıcıdır.
- **Spring (Yay) Fiziği:** Lineer veya klasik (ease-in-out) animasyonlar yerine, kullanıcının eylemine tepki veren doğal "spring" fizikli animasyonlar tercih edilir.
- **Mikro Etkileşimler:** Butonlara basıldığında hafif küçülme (scale), açılır menülerde yumuşak belirmeler gibi dokunsal his veren ince detaylar.
- **Performanslı Görsellik:** Animasyonlar, erişilebilirliği (a11y) bozmadan ve main thread'i kilitlemeden GPU destekli (transform/opacity) yapılır.

## 6. Anthropic Security Audit (Derinlemesine Güvenlik Denetimi)
Güvenliği proaktif bir şekilde geliştirme sürecinin merkezine koyar.
- **Zafiyet Avcılığı:** XSS, CSRF, SQL/NoSQL Injection gibi OWASP Top 10 zafiyetlerine karşı kod anlık olarak denetlenir.
- **Veri Mahremiyeti:** Kullanıcı verilerinin frontend ve backend arasında güvenli taşınması, hassas bilgilerin asla loglanmaması veya state'te açık bırakılmaması sağlanır.
- **Girdi Doğrulama (Input Validation):** Kullanıcıdan gelen her veri her zaman şüpheli kabul edilir ve Zod/Yup gibi araçlarla sıkı bir denetime tabi tutulur.

## 7. Superpowers (Gelişmiş Verimlilik ve Ölçeklenebilirlik)
Yapay zekanın ve geliştirme araçlarının limitlerini zorlayarak 10x mühendislik yaklaşımı sunar.
- **Mimari Vizyon:** Yazılan bir komponentin veya fonksiyonun 6 ay sonra projeye eklenecek yeni özelliklere nasıl uyum sağlayacağı önceden hesaplanır.
- **Otomasyon ve Hız:** Tekrarlayan işler doğru abstraksiyonlarla (custom hook'lar, HOC'ler, utility fonksiyonları) otomatikleştirilir.
- **Kapsamlı Analiz:** Hata ayıklarken sadece semptom değil, kök neden (root cause) saniyeler içinde tespit edilir ve kalıcı olarak çözülür.

## 8. Claude-mem (Gelişmiş Bağlam Hafızası)
Projenin bütününe dair derin ve kopmayan bir farkındalık durumudur.
- **Mimari Bütünlük:** Kodun bir yerinde yapılan değişikliğin, projenin tamamen alakasız görünen diğer kısımlarını nasıl etkileyeceği akılda tutulur.
- **Karar Geçmişi:** Daha önce alınmış mimari kararlar, nedenleriyle birlikte hatırlanır ve yeni kodlar bu kararlara sadık kalarak yazılır.
- **Değişken ve State Takibi:** Karmaşık global state yönetimlerinde verinin yaşam döngüsü adım adım takip edilir.

## 9. Task Observer (Görev Gözlemcisi)
Makro düzeyde amaca odaklanarak gereksiz iş yapmayı engeller.
- **Kuş Bakışı Perspektif:** "Şu an yazdığımız bu kod, projenin ana hedefine veya iş mantığına (business logic) hizmet ediyor mu?" sorusu sürekli sorulur.
- **Rotadan Çıkmama:** Eğer bir refactor işlemi ana görevden sapmaya ve zaman kaybettirmeye başladıysa, görevi asıl amaca geri çeker.
- **Sürekli Doğrulama:** Tamamlanan her alt görevin (sub-task) gereksinimleri karşılayıp karşılamadığı anında doğrulanır.

## 10. Frontend Design (İleri Düzey Önyüz Tasarımı)
Sadece kod yazmayı değil, görsel bir fikri teknik bir şahesere dönüştürmeyi kapsar.
- **Kusursuz Layout Yönetimi:** CSS Grid, Flexbox, Container Queries gibi modern CSS özellikleri en verimli şekilde kullanılır. Layout Shift (CLS) problemleri asla yaşanmaz.
- **Responsive & Adaptive:** Arayüz, en büyük 4K ekrandan en küçük mobil cihaza kadar her çözünürlükte kırılmadan, içerik akışını bozmadan kusursuz görünür.
- **Bileşen Mimarisi:** UI elementleri, Storybook yaklaşımına uygun, izole, tekrar kullanılabilir ve varyantları olan (varyant pattern) bileşenler şeklinde tasarlanır.

## 11. Code Review (Profesyonel Kod İnceleme)
Sürekli bir kalite kontrol mekanizmasıdır.
- **Kritik Gözlem:** Her satır kod biriktirilmeden önce maintainability (bakım yapılabilirlik), okunabilirlik ve SOLID/DRY prensipleri süzgecinden geçirilir.
- **Güvenli Refactoring:** Çalışan ama hantal olan bir kod görüldüğünde, test edilebilirliği artıracak şekilde güvenle refactor edilir.
- **Takım Standartları:** Ekibin belirlediği linting ve mimari standartlardan zerre taviz verilmez.

## 12. Security Guidance (Güvenlik Rehberliği)
Sadece denetim değil, aktif olarak güvenli kod yazma rehberliğidir.
- **Güvenli Kimlik Doğrulama:** JWT, OAuth veya session yönetimlerinin best practice'lere uygun, token hırsızlığına kapalı şekilde implemente edilmesi.
- **Çevre Değişkenleri:** API key'ler ve secret'ların asla frontend bundle'ına sızmaması için sıkı bir rehberlik.
- **Güvenli Başlıklar (Headers):** CORS, CSP (Content Security Policy) gibi HTTP güvenlik politikalarının doğru kurgulanması.

## 13. Framer Motion (İleri Seviye Animasyon Ustalığı)
React ekosisteminde animasyon sanatının zirvesini temsil eder.
- **Kompleks Koreografiler:** Sayfa yüklenirken veya elementler arası geçişte (layout transition) orkestre edilmiş (stagger, delay) karmaşık animasyonlar.
- **Varyant Yönetimi:** Component state'lerine (hover, tap, visible, hidden) bağlı varyantların kod kalabalığı yaratmadan Framer Motion ile yönetilmesi.
- **Performans:** Scroll bazlı animasyonlarda veya çok sayıda elementin animasyonunda frame rate'in (fps) düşmesini engelleyen optimizasyonlar (will-change kullanımı vs).

## 14. UI/UX Pro Max (Üst Düzey Kullanıcı Deneyimi)
Kullanıcıyı yormayan, sezgisel ve erişilebilir üst düzey deneyim inşası.
- **Erişilebilirlik (a11y):** Ekran okuyucular (screen readers), klavye navigasyonu (focus trap, tab index) ve WAI-ARIA standartlarının eksiksiz uygulanması.
- **Sezgisel Akışlar:** Kullanıcının uygulamayı kullanırken öğrenmesine gerek kalmadan, "olması gerektiği gibi" hissettiği doğal kullanım senaryoları.
- **Karmaşıklığı Gizleme:** Çok yoğun veya karmaşık verilerin (örneğin dashboard'lar), kullanıcıyı boğmadan en anlaşılır ve sindirilebilir şekilde (progressive disclosure) sunulması.
