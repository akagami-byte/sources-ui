
## RINGKASAN DESAIN
Desain aplikasi mobile ERP untuk HR Management dengan fokus **kecepatan & efisiensi**, **modern & minimalis**, **blue gradient color scheme**, dan **bottom navigation**.



## 1. DESIGN SYSTEM

### 1.1 Color Palette (Blue Gradient Theme)
```
PRIMARY COLORS:
- Primary Blue: #0052CC (main action)
- Light Blue: #E3F2FD (backgrounds, hover states)
- Sky Blue: #87CEEB (secondary actions)
- Deep Blue: #003D99 (darker accents)
- Navy Blue: #001A4D (text, headers)

SEMANTIC COLORS:
- Success (Approved/Hadir): #4CAF50 (Green accent for contrast)
- Warning (Pending/Terlambat): #FFA726 (Orange accent for contrast)
- Danger (Rejected/Alpha): #EF5350 (Red accent for contrast)
- Neutral: #9E9E9E (disabled, secondary text)

BACKGROUNDS:
- White: #FFFFFF (main background)
- Light Gray: #F5F5F5 (secondary backgrounds, cards)
- Very Light Blue: #F0F7FF (blue-tinted backgrounds)

TEXT:
- Primary Text: #001A4D (Navy Blue)
- Secondary Text: #616161 (Gray)
- Tertiary Text: #9E9E9E (Light Gray)
```

### 1.2 Typography
```
HEADINGS:
- H1: 28px, Bold (600), Navy Blue, line-height 1.2
- H2: 22px, Bold (600), Navy Blue, line-height 1.3
- H3: 18px, Semi-bold (500), Navy Blue, line-height 1.4

BODY:
- Body Large: 16px, Regular (400), Primary Text
- Body Medium: 14px, Regular (400), Primary Text
- Body Small: 12px, Regular (400), Secondary Text

BUTTON TEXT:
- 14px, Semi-bold (500), White on Blue backgrounds

CAPTION:
- 12px, Regular (400), Secondary Text
```

### 1.3 Spacing & Layout
```
SPACING SCALE:
- 4px, 8px, 12px, 16px, 24px, 32px

MOBILE SAFE AREA:
- Horizontal padding: 16px (both sides)
- Vertical padding: 16px (top/bottom)

CARD SPACING:
- Margin between cards: 12px
- Padding inside cards: 16px

COMPONENT SPACING:
- Space between form fields: 16px
- Space between button and field: 12px
```

### 1.4 Corner Radius
```
BORDER RADIUS:
- Large Cards/Modals: 16px
- Small Cards/Buttons: 12px
- Input Fields: 12px
- Badges/Chips: 20px (full round)
- Bottom Sheet: 16px (top corners only)
```

### 1.5 Typography Font Family
```
FONT STACK:
- Primary: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Fallback: Arial, sans-serif
(Modern, clean, highly readable)
```

---

## 2. NAVIGATION STRUCTURE

### Bottom Tab Navigation (5 Tabs - Karyawan)
```
├─ Absensi (home icon)
├─ Izin (document icon)
├─ Cuti (calendar icon)
├─ Penggajian (wallet icon)
└─ Profile (user icon)

DESIGN:
- Fixed bottom bar with 5 equal-width tabs
- Height: 64px (including safe area)
- Active tab: Blue text + light blue background
- Inactive tab: Gray text, no background
- Label always visible below icon
- Tab height: 24px icon + 12px text = 36px content
- Smooth transition color changes
```

### Bottom Tab Navigation (6 Tabs - HR)
```
├─ Dashboard (home icon)
├─ Approval Izin (checkmark icon)
├─ Approval Cuti (calendar-check icon)
├─ Penggajian (wallet icon)
├─ Monitoring (bar-chart icon)
└─ Profile (user icon)

DESIGN:
- Same as Karyawan structure
- All tabs icon + label
- Scrollable if needed (max 6 tabs)
```

---

## 3. SCREEN DESIGN SPECIFICATIONS

### 3.1 KARYAWAN - Dashboard Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Header (16px top padding)       │ ← Status Bar (transparent)
├─────────────────────────────────┤
│ Greeting + Quick Info Card      │ ← "Halo, [Nama]" + NIP, Dept
├─────────────────────────────────┤
│ Quick Stats (Horizontal Scroll) │ ← Attendance Today + Salary Status
├─────────────────────────────────┤
│ Quick Action Cards (3 columns)  │ ← Absensi | Izin | Cuti (large buttons)
├─────────────────────────────────┤
│ Recent Activity List            │ ← Last 3 submissions
└─────────────────────────────────┘

GREETING CARD:
- Background: Light blue (#E3F2FD)
- Border radius: 12px
- Padding: 16px
- Text: "Halo, [Nama Karyawan]" (H3, Navy)
- Subtext: "NIP: [NIP] • [Departemen] • [Divisi]" (Body Small, Gray)

STATS CARDS (2 cards side by side):
- Card 1: "Status Hari Ini" → Hadir/Terlambat/Alpha (large status badge)
- Card 2: "Status Gaji Bulan Ini" → Belum Diproses/Diproses/Dibayar
- Background: White
- Border: 1px light gray
- Padding: 12px
- Icon + Value format

QUICK ACTION BUTTONS:
- 3 buttons in row: Absensi | Izin | Cuti
- Background: Primary Blue (#0052CC)
- Text: White
- Height: 48px
- Border radius: 12px
- Icon above text (stacked layout)
- Touch target: 48x48px minimum
- Active state: darker blue on press

RECENT ACTIVITY:
- Title: "Aktivitas Terakhir" (H3)
- Show max 3 items
- If empty: "Belum ada aktivitas" (centered gray text)
```

### 3.2 KARYAWAN - Absensi QR Scan Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Header: "Absensi"               │ ← Simple title
├─────────────────────────────────┤
│ Status Card                     │ ← Check-in: HH:MM / Not yet
├─────────────────────────────────┤
│ QR Scanner View                 │ ← Full screen camera
├─────────────────────────────────┤
│ Action Buttons                  │ ← Scan or Manual (if allowed)
├─────────────────────────────────┤
│ Today's History                 │ ← Check-in time + Check-out time
└─────────────────────────────────┘

STATUS CARD:
- Background: Light blue
- 2 columns: Check-in (left) | Check-out (right)
- Check-in: "✓ HH:MM" (green text if done) or "Belum" (gray)
- Check-out: Same format
- Font: Body Large (16px, bold)

QR SCANNER:
- Full width/height (minus header & buttons)
- Green scanning line animation
- Corners highlight when scanning
- Focus rectangle: 200x200px center screen
- Feedback: Success animation + sound when scanned

ACTION BUTTONS:
- "Scan QR" (Primary, large) - always visible
- "Input Manual" (Secondary) - if HR allows
- Height: 48px
- Full width: -32px margin

CONFIRMATION MODAL:
- Title: "Konfirmasi Absensi"
- Content: "Check-in pada [HH:MM]?" or "Check-out pada [HH:MM]?"
- Buttons: Cancel | Konfirmasi
- Auto-close after 2 seconds if confirmed
- Show checkmark animation

TODAY'S HISTORY:
- Timeline format vertical
- Check-in entry: "Check-in • HH:MM • [Departemen]"
- Check-out entry: "Check-out • HH:MM"
- If pending: "Waiting..." (gray, subtle animation)
```

### 3.3 KARYAWAN - Pengajuan Izin Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Header: "Ajukan Izin"           │
├─────────────────────────────────┤
│ TAB: Buat Pengajuan | Riwayat  │ ← 2 tabs
├─────────────────────────────────┤
│ [TAB 1] FORM                    │
│ ├─ Jenis Izin (Dropdown)        │
│ ├─ Tanggal Izin (Date Picker)   │
│ ├─ Keperluan (Text Area)        │
│ └─ Button: Ajukan               │
├─────────────────────────────────┤
│ [TAB 2] RIWAYAT                 │
│ ├─ Status Filter Chips          │ ← Semua | Pending | Approved | Rejected
│ └─ List Pengajuan               │
└─────────────────────────────────┘

FORM FIELDS:
- Field label: 12px, semi-bold, Navy Blue
- Input background: Very light blue (#F0F7FF)
- Input border: 1px light gray
- Input padding: 12px
- Input height: 44px
- Placeholder: Gray text, italic

DROPDOWN (Jenis Izin):
- Options: Sakit | Keperluan Pribadi | Telat | Izin Beberapa Jam
- Selected: Show value + chevron icon
- Opened: Show options in modal/dropdown

DATE PICKER:
- Show calendar modal
- Current date highlighted (blue background)
- Selected date: Blue circle
- Show "DD/MM/YYYY" format in field

TEXT AREA (Keperluan):
- Min height: 80px
- Expandable if more text
- Placeholder: "Masukkan keperluan izin..."

SUBMIT BUTTON:
- "Ajukan Izin" (Primary blue, full width)
- Height: 48px
- Disabled state: if form incomplete
- Success feedback: modal "Izin berhasil diajukan"

HISTORY LIST:
- Filter chips: Semua | Pending | Approved | Rejected
- List items (each):
  • Background: Light blue
  • Left: Date + Izin Type
  • Right: Status badge
  • Padding: 12px
  • Border radius: 12px
  • Bottom margin: 8px
  • Tap to see detail modal

STATUS BADGES:
- Pending: Orange background, orange text, rounded
- Approved: Green background, white text
- Rejected: Red background, white text
- Size: 24px height, padding 4px 8px
- Font: 12px, bold

DETAIL MODAL (on tap):
- Full screen modal / Bottom sheet
- Close button (X) top right
- Content: All field values (read-only)
- If Rejected: Show red box with alasan reject
- Action: Back button
```

### 3.4 KARYAWAN - Pengajuan Cuti Screen
```
SAME LAYOUT AS IZIN, BUT:
- Form fields differ:
  ├─ Jenis Cuti (Dropdown) ← Cuti Tahunan | Cuti Menikah | Cuti Sakit | Cuti Lainnya
  ├─ Tanggal Mulai (Date Picker)
  ├─ Tanggal Selesai (Date Picker)
  ├─ Jumlah Hari (Auto-calculate, read-only)
  └─ Catatan Tambahan (Text Area, optional)

JUMLAH HARI:
- Auto-calculated from date range
- Display: "[N] hari" (bold, blue text)
- Read-only field
```

### 3.5 KARYAWAN - Status Penggajian Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Header: "Status Penggajian"     │
├─────────────────────────────────┤
│ Main Salary Card (large)        │
├─────────────────────────────────┤
│ Details List                    │
└─────────────────────────────────┘

MAIN SALARY CARD:
- Background: Blue gradient (top #0052CC → bottom #E3F2FD)
- Padding: 20px
- Border radius: 16px
- Text color: White (for top part)
- Content:
  • Title: "Gaji Bulan [Periode]" (H2, white)
  • Amount: "Rp [NOMINAL]" (H1, bold, white)
  • Status: "Belum Diproses" / "Diproses" / "Sudah Dibayar" (badge, white outline)

DETAILS LIST:
- Grid 2 columns:
  • NIP: [value]
  • Departemen: [value]
  • Nomor Rekening: [value]
  • Bank: [value]
  • Periode: [value]
  • Status: [value with color]
- Each row: 12px vertical padding
- Separator: light gray line between rows
- Label: 12px gray, Value: 14px navy bold

IF MULTIPLE PERIODS:
- Add tabs above details: "Bulan Ini | Riwayat"
- Riwayat: Show list of past salary cards (smaller version)
- Tap to view detail
```

### 3.6 KARYAWAN - Profile Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Profile Header Card             │ ← Avatar + Name + NIP
├─────────────────────────────────┤
│ Personal Info                   │ ← Department, Divisi, Email, Phone
├─────────────────────────────────┤
│ Quick Stats                     │ ← Cuti Tersisa, Izin Tersisa, etc
├─────────────────────────────────┤
│ App Settings                    │ ← Notifikasi, Bahasa, Theme
├─────────────────────────────────┤
│ Logout Button                   │ ← Red/Danger color
└─────────────────────────────────┘

PROFILE HEADER:
- Background: Light blue
- Avatar: 80px circle, Navy Blue background
- Name: H2, Navy Blue
- NIP: Body small, Gray
- Padding: 20px

PERSONAL INFO SECTION:
- Title: "Informasi Pribadi" (H3)
- Rows: Department | Divisi | Email | Phone
- Same format as penggajian details

QUICK STATS:
- 3 columns: Cuti Tersisa | Izin Tersisa | Absensi Bulan Ini
- Background: Light blue, border radius 12px
- Value: Bold blue, Label: small gray
- Padding: 12px

SETTINGS:
- Toggle items:
  • Notifikasi: ON/OFF toggle
  • Dark Mode: ON/OFF toggle
- Selection items:
  • Bahasa: Indonesian | English
  • Display: Same as toggle style

LOGOUT BUTTON:
- Full width: -32px margin
- Background: Red (#EF5350)
- Text: White
- Height: 48px
- Border radius: 12px
```

---

## 4. HR DASHBOARD SCREENS

### 4.1 HR - Dashboard Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Header Greeting                 │ ← "Selamat Datang, [Nama]"
├─────────────────────────────────┤
│ KPI Cards (2x2 grid)            │
│ ├─ Total Karyawan              │
│ ├─ Izin Pending                │
│ ├─ Cuti Pending                │
│ └─ Absensi Hari Ini            │
├─────────────────────────────────┤
│ Status Penggajian Terbaru       │ ← Recent salary updates
└─────────────────────────────────┘

KPI CARDS DESIGN:
- 2 cards per row (width each: 50% - 12px margin)
- Height: 100px
- Background: Gradient (light blue)
- Border radius: 12px
- Padding: 12px
- Content:
  • Icon top-left (24x24px, blue)
  • Label: Body small, gray
  • Value: H2, navy bold
  • Trend (if applicable): small green/red text + icon

SALARY STATUS:
- Title: "Status Penggajian Terbaru"
- List (max 5):
  • [Nama Karyawan] • Rp [amount] • [Status Badge]
  • Background: Light gray card
  • Padding: 12px
  • Separator: 8px
  • Tap: Go to payroll management
```

### 4.2 HR - Approval Izin Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Header: "Approval Izin"         │
├─────────────────────────────────┤
│ Filter Chips: Semua | Pending   │ ← Add/Remove filters
│              Approved | Rejected │
├─────────────────────────────────┤
│ Search Bar (optional)           │
├─────────────────────────────────┤
│ List of Pengajuan Izin          │
│ ├─ Item (Pending)               │
│ ├─ Item (Approved)              │
│ └─ Item (Rejected)              │
└─────────────────────────────────┘

FILTER CHIPS:
- Horizontal scroll
- Selected: Blue background + white text
- Unselected: Light gray background + gray text
- Height: 32px, padding: 8px 12px
- Border radius: 20px

LIST ITEM DESIGN:
- Background: White, border: 1px light gray
- Padding: 12px
- Border radius: 12px
- Margin bottom: 8px
- Content layout:
  ┌─────────────────────────────┐
  │ Left: Name + Request Info   │ Right: Status Badge
  │ [Nama Karyawan]             │ [Pending/Approved/Rejected]
  │ Jenis: Sakit | Tgl: 12/05   │
  └─────────────────────────────┘

STATUS BADGE STYLING:
- Same as karyawan screens
- Pending: Orange, Approved: Green, Rejected: Red
- 32px height, bold text

TAP BEHAVIOR:
- Open detail modal/screen
- Show full form (read-only)
- Show buttons: Approve | Reject
- If already approved/rejected: Show status info + date

APPROVE/REJECT BUTTONS:
- 2 buttons side by side (each 50% width - 6px margin)
- Approve: Green background, white text
- Reject: Red background, white text
- Height: 44px
```

### 4.3 HR - Approval Cuti Screen
```
SAME AS APPROVAL IZIN, BUT:
- Title: "Approval Cuti"
- Fields displayed: Nama | Jenis Cuti | Tanggal Mulai-Selesai | Durasi
- Same approve/reject workflow
```

### 4.4 HR - Approval Reject Modal
```
MODAL DESIGN:
┌─────────────────────────────────┐
│ ✕ Title: "Alasan Penolakan"    │ ← Close button top right
├─────────────────────────────────┤
│ Subtitle: "Wajib isi alasan"    │ ← Gray text, required indicator
├─────────────────────────────────┤
│ Text Area (large)               │ ← Min 100px height
│ "Masukkan alasan penolakan..."  │
├─────────────────────────────────┤
│ Buttons                         │
│ ├─ Cancel (Secondary)           │
│ └─ Konfirmasi Penolakan (Red)  │
└─────────────────────────────────┘

TEXT AREA:
- Same styling as karyawan forms
- Placeholder: "Jelaskan alasan penolakan..."
- Min characters validation (optional)
- Character count: "0/500" (bottom right, optional)

BUTTONS:
- 2 buttons side by side
- Cancel: Light gray background, navy text
- Konfirmasi: Red background (#EF5350), white text
- Height: 44px
- Disabled if textarea empty
```

### 4.5 HR - Management Penggajian Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Header: "Management Penggajian" │
├─────────────────────────────────┤
│ Action Button: "+ Tambah Data"  │ ← Add new employee salary
├─────────────────────────────────┤
│ Search + Filter                 │ ← By name, department
├─────────────────────────────────┤
│ Data Table / List               │
│ ├─ [Nama] | Rp [amount] | Btn  │
│ ├─ [Nama] | Rp [amount] | Btn  │
│ └─ [Nama] | Rp [amount] | Btn  │
└─────────────────────────────────┘

ACTION BUTTON:
- Full width: -32px margin
- Primary blue, 44px height
- "+ Tambah Data Penggajian"

SEARCH/FILTER:
- Search bar: "Cari karyawan..."
- Filter chips: Semua | Belum Diproses | Diproses | Dibayar

LIST ITEM:
- Background: White, border 1px light gray
- Layout:
  ┌──────────────────────────────┐
  │ [Nama Karyawan]              │
  │ NIP: [nip] | Nominal: Rp... │
  │ Status: [badge] | [Edit Btn] │
  └──────────────────────────────┘
- Padding: 12px, border radius: 12px
- Edit button: Small blue button "Edit"

EDIT BUTTON ON ITEM:
- Secondary style: Blue outline, blue text
- Height: 32px, font: 12px
- Tap: Open edit modal or full screen form

EDIT MODAL / SCREEN:
- Title: "Edit Data Penggajian"
- Form fields:
  • Nama Karyawan (read-only)
  • NIP (read-only)
  • Nomor Rekening (editable)
  • Bank (editable)
  • Nominal Gaji (editable, currency format)
  • Status Penggajian (dropdown: Belum Diproses | Diproses | Dibayar)
- Buttons: Cancel | Simpan
```

### 4.6 HR - Monitoring Absensi Screen
```
LAYOUT:
┌─────────────────────────────────┐
│ Header: "Monitoring Absensi"    │
├─────────────────────────────────┤
│ Date Picker                     │ ← "Pilih Tanggal"
├─────────────────────────────────┤
│ Filter Section                  │
│ ├─ Departemen (Dropdown)        │
│ ├─ Divisi (Dropdown)            │
│ └─ Status (Chips: Semua, Hadir, Terlambat, Alpha, Pulang Cepat)
├─────────────────────────────────┤
│ Data Table                      │
│ ├─ Header: Nama | Jam Masuk | Status | ...
│ ├─ Row: [Data]                  │
│ └─ Row: [Data]                  │
└─────────────────────────────────┘

DATE PICKER:
- Input field with calendar icon
- Format: "DD MMM YYYY" (e.g., "12 Mei 2024")
- Tap: Open calendar modal
- Default: Today

DROPDOWNS:
- Same styling as karyawan forms
- Departemen: Show all departments
- Divisi: Show all divisions
- Allow multiple select (optional: checkboxes)

STATUS FILTER CHIPS:
- Semua | Hadir | Terlambat | Alpha | Pulang Cepat
- Same chip styling

DATA TABLE:
- Scrollable horizontally if needed
- Columns: No. | Nama | Jam Masuk | Jam Pulang | Status | Durasi Kerja
- Column width: Nama (40%) | Jam Masuk (15%) | Jam Pulang (15%) | Status (15%) | Durasi (15%)
- Row height: 44px
- Row background: alternate white/light gray
- Row border-bottom: 1px light gray

TABLE HEADER:
- Background: Very light blue (#F0F7FF)
- Text: 12px bold navy
- Sticky (stays at top when scrolling)
- Padding: 12px vertical

TABLE CELLS:
- Padding: 12px
- Text: 14px body
- Status cell: Show badge (same color coding)
- Durasi: calculated (jam_pulang - jam_masuk)

EMPTY STATE:
- Show centered message: "Tidak ada data absensi untuk tanggal/filter ini"
- Smaller gray text
```

---

## 5. MODAL & DIALOG DESIGN

### Generic Modal Pattern
```
┌─────────────────────────────────┐
│ ✕ [Title]                       │ ← X close button top-right
├─────────────────────────────────┤
│ [Content Area]                  │
│                                 │
├─────────────────────────────────┤
│ [Action Buttons]                │
└─────────────────────────────────┘

MODAL STYLING:
- Background: White
- Border radius: 16px (top corners)
- Box shadow: 0px 5px 40px rgba(0, 0, 0, 0.16)
- Max width: 90vw (mobile)
- Min width: 280px
- Z-index: Modal overlay 100, modal content 101

OVERLAY:
- Background: rgba(0, 0, 0, 0.5) (semi-transparent)
- Click outside to close (if dismissible)

CLOSE BUTTON:
- Top right, 16px from edge
- 32x32px touch target
- Icon: X or close icon
- Color: Gray

TITLE:
- 20px bold navy blue
- 16px padding (top, left, right)
- Bottom border: 1px light gray

CONTENT:
- 16px padding (all sides)
- Scrollable if height > viewport height
- Max height: 80vh

ACTION BUTTONS:
- Sticky at bottom (don't scroll)
- Full width with 16px padding
- Border top: 1px light gray
- Buttons: Usually 2 (Cancel | Action)
- Height: 48px each
- Gap between: 8px
```

---

## 6. INTERACTIVE ELEMENTS

### 6.1 Button States
```
PRIMARY BUTTON (#0052CC Blue)
- Default: Blue background, white text
- Hover: Slightly darker blue (#003D99)
- Active/Press: Even darker (#001A4D)
- Disabled: Light gray background (#E0E0E0), gray text
- Transition: 200ms ease-in-out

SECONDARY BUTTON (Outline)
- Default: Transparent, blue border 2px, blue text
- Hover: Light blue background
- Active: Blue background, white text
- Disabled: Light gray border, gray text

DANGER BUTTON (Red #EF5350)
- Default: Red background, white text
- Hover: Darker red (#E53935)
- Active: Even darker red
- Disabled: Light gray

SUCCESS BUTTON (Green #4CAF50)
- Default: Green background, white text
- Hover: Darker green
- Active: Even darker
- Disabled: Light gray
```

### 6.2 Form Input States
```
FOCUSED:
- Border color: Blue (#0052CC)
- Background: Very light blue
- Box shadow: 0 0 0 3px rgba(0, 82, 204, 0.1)

FILLED:
- Border: 1px light gray
- Background: Very light blue
- Text: Navy blue

ERROR:
- Border: 2px red (#EF5350)
- Background: Light red (rgba(239, 83, 80, 0.05))
- Error message: 12px red text below field

DISABLED:
- Border: 1px light gray
- Background: #F5F5F5
- Text: #BDBDBD
- Cursor: not-allowed
```

### 6.3 Loading States
```
LOADING BUTTON:
- Show spinner (animated circle)
- Text fade to gray
- Disable click

LOADING SCREEN:
- Center spinner animation
- Text: "Memproses..." or "Memuat..."
- Semi-transparent overlay (optional)

LOADING SPINNER:
- Circular, 32px diameter
- Color: Primary blue
- Rotation: continuous 360° (1s duration)
```

### 6.4 Empty States
```
EMPTY STATE CARD:
- Centered vertically & horizontally
- Icon: 64px, light gray color
- Title: 16px bold, navy blue
- Subtitle: 14px gray
- Optional button: Create/Add action
- Example: "Belum ada pengajuan izin" + icon
```

---

## 7. ANIMATIONS & TRANSITIONS

```
GENERAL TRANSITIONS:
- Property changes: 200ms ease-in-out (colors, opacity)
- Navigation: 300ms slide-in from right
- Modal open: 300ms fade-in + scale up from center
- Micro interactions: 150ms for instant feedback

SPECIFIC ANIMATIONS:
- QR Scanner line: 1.5s loop, color blue
- Loading spinner: 1s continuous rotation
- Badge appearance: 300ms fade-in + scale 0.8→1
- Button press: 150ms scale down to 0.95

NO JANK:
- Use GPU acceleration (transform, opacity)
- Avoid animating: width, height, left/right (layout shifts)
- 60fps target (16.67ms per frame)
```

---

## 8. ACCESSIBILITY

```
MINIMUM REQUIREMENTS:
- Font size minimum: 12px
- Touch target minimum: 44x44px
- Color contrast ratio: 4.5:1 minimum (text on background)
- Form labels: Always visible (not placeholder-only)
- Error messages: Color + icon (not just color)
- Focus indicators: Visible outline/highlight
- Semantic HTML: Use proper heading hierarchy
- Alt text: For all images/icons (if screen reader compatible)
```

---

## 9. RESPONSIVE BEHAVIOR

```
MOBILE FIRST (375px - 425px width):
- Single column layouts
- Full-width buttons
- Large touch targets
- Simplified data tables

TABLET SUPPORT (768px+, if needed):
- Two column layouts (dashboard cards)
- Smaller margins, optimized spacing
- Landscape support
```

---

