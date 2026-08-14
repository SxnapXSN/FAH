export const categories = [
  { id: 'milk-tea', label: 'ชานม', emoji: '🥤' },
  { id: 'bakery', label: 'เบเกอรี่', emoji: '🎂' },
  { id: 'coffee', label: 'กาแฟ', emoji: '☕' },
  { id: 'snack', label: 'ของว่าง', emoji: '🥐' },
  { id: 'set', label: 'เซ็ทสุดคุ้ม', emoji: '🎁' },
];

export const products = [
  // ชานม
  { id: 1, name: 'ชานมไข่มุก', detail: '(หวาน 75%)', price: 45, emoji: '🧋', category: 'milk-tea' },
  { id: 2, name: 'ชาไทยไข่มุก', detail: '(หวาน 50%)', price: 45, emoji: '🍵', category: 'milk-tea' },
  { id: 3, name: 'ชาเขียวมัทฉะนมสด', detail: '(หวาน 50%)', price: 55, emoji: '🍵', category: 'milk-tea' },
  { id: 4, name: 'ชาไต้หวันนมสด', detail: '(หวาน 50%)', price: 50, emoji: '🥛', category: 'milk-tea' },
  { id: 5, name: 'ชาดอกไม้ผลไม้รวม', detail: '(หวาน 25%)', price: 55, emoji: '🌸', category: 'milk-tea' },
  { id: 6, name: 'ชานมทอฟฟี่คาราเมล', detail: '(หวาน 75%)', price: 55, emoji: '🍮', category: 'milk-tea' },
  { id: 7, name: 'ชามะนาวโซดา', detail: '(หวาน 25%)', price: 45, emoji: '🍋', category: 'milk-tea' },

  // เบเกอรี่
  { id: 8, name: 'เค้กช็อกโกแลต', detail: 'เนื้อนุ่มเข้มข้น', price: 65, emoji: '🍫', category: 'bakery' },
  { id: 9, name: 'ชีสเค้กสตรอเบอร์รี่', detail: 'ท็อปสตรอเบอร์รี่สด', price: 75, emoji: '🍰', category: 'bakery' },
  { id: 10, name: 'บราวนี่ช็อกโกแลต', detail: 'เนื้อฟัดจี้', price: 55, emoji: '🍪', category: 'bakery' },
  { id: 11, name: 'มัฟฟินบลูเบอร์รี่', detail: 'อบสดใหม่ทุกเช้า', price: 45, emoji: '🧁', category: 'bakery' },
  { id: 12, name: 'ทาร์ตไข่', detail: 'สไตล์ฮ่องกง', price: 35, emoji: '🥧', category: 'bakery' },
  { id: 13, name: 'โดนัทน้ำตาล', detail: 'นุ่มหอมเนย', price: 30, emoji: '🍩', category: 'bakery' },

  // กาแฟ
  { id: 14, name: 'โกโก้เย็น', detail: '(หวาน 50%)', price: 50, emoji: '🍫', category: 'coffee' },
  { id: 15, name: 'ลาเต้เย็น', detail: '(หวาน 50%)', price: 55, emoji: '☕', category: 'coffee' },
  { id: 16, name: 'อเมริกาโน่เย็น', detail: 'เข้มข้น หอมกาแฟ', price: 45, emoji: '🖤', category: 'coffee' },
  { id: 17, name: 'คาปูชิโน่ร้อน', detail: 'ฟองนมเนียนนุ่ม', price: 55, emoji: '☕', category: 'coffee' },
  { id: 18, name: 'มอคค่าเย็น', detail: '(หวาน 50%)', price: 60, emoji: '🍩', category: 'coffee' },
  { id: 19, name: 'ดาร์กช็อกโกแลตร้อน', detail: 'เข้มข้น หวานน้อย', price: 55, emoji: '🍫', category: 'coffee' },

  // ของว่าง
  { id: 20, name: 'ครัวซองต์เนยสด', detail: 'อบใหม่ทุกเช้า', price: 40, emoji: '🥐', category: 'snack' },
  { id: 21, name: 'แซนด์วิชแฮมชีส', detail: 'ขนมปังโฮลวีท', price: 55, emoji: '🥪', category: 'snack' },
  { id: 22, name: 'เฟรนช์ฟรายส์', detail: 'กรอบนอก นุ่มใน', price: 45, emoji: '🍟', category: 'snack' },
  { id: 23, name: 'พายไก่', detail: 'ไส้แน่น หอมเนย', price: 40, emoji: '🥟', category: 'snack' },
  { id: 24, name: 'คุกกี้ช็อกชิพ', detail: 'กรอบนอก นุ่มใน', price: 25, emoji: '🍪', category: 'snack' },

  // เซ็ทสุดคุ้ม
  { id: 25, name: 'เซ็ทชานม + เบเกอรี่', detail: 'คุ้มสุดๆ', price: 89, emoji: '🎁', category: 'set' },
  { id: 26, name: 'เซ็ทกาแฟ + ครัวซองต์', detail: 'มื้อเช้าสุดคุ้ม', price: 79, emoji: '🎁', category: 'set' },
  { id: 27, name: 'เซ็ทคู่รัก ชานม 2 แก้ว', detail: 'แบ่งกันดื่มได้', price: 79, emoji: '🎁', category: 'set' },
];

export const sizes = ['S', 'M', 'L'];
export const sweetness = ['25%', '50%', '75%', '100%'];

// Drink style — only shown for beverage items (milk tea / coffee / sets)
export const drinkStyles = ['เย็น (ปกติ)', 'ปั่น', 'ร้อน'];

// Toppings & add-ons, grouped so the picker doesn't turn into one giant list
export const toppingGroups = [
  {
    group: 'มุกและวุ้น',
    items: ['ไข่มุก', 'ไข่มุกไหมทอง', 'วุ้นมะพร้าว', 'เยลลี่กาแฟ', 'พุดดิ้งคัสตาร์ด'],
  },
  {
    group: 'ครีมและชีส',
    items: ['ชีสโฟมเค็ม', 'วิปครีม', 'ครีมชีสเค้ก'],
  },
  {
    group: 'ผงโรยหน้า',
    items: ['ผงมัทฉะ', 'ผงโกโก้', 'ผงชาไทย', 'ผงคาราเมล', 'ผงอบเชย'],
  },
  {
    group: 'อื่นๆ',
    items: ['ช็อกโกแลตชิพ', 'ลูกเกด', 'อัลมอนด์อบ'],
  },
];

// Flattened list kept for backward compatibility with anything importing `toppings`
export const toppings = toppingGroups.flatMap((g) => g.items);

// Categories that behave like drinks (get sweetness / drink style / toppings)
export const beverageCategories = ['milk-tea', 'coffee', 'set'];
