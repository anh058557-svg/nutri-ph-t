// Dữ liệu mẫu món ăn
const data = {
  rice: { name: "Cơm trắng", cal: 200, protein: 4, fat: 1, carb: 45 },
  chicken: { name: "Ức gà", cal: 165, protein: 31, fat: 3.6, carb: 0 },
  salad: { name: "Salad rau", cal: 120, protein: 2, fat: 5, carb: 15 },
  pho: { name: "Phở bò", cal: 350, protein: 20, fat: 7, carb: 55 },
  egg: { name: "Trứng chiên", cal: 210, protein: 12, fat: 17, carb: 1 },
  salmon: { name: "Cá hồi", cal: 208, protein: 20, fat: 13, carb: 0 },
  banana: { name: "Chuối", cal: 89, protein: 1.1, fat: 0.3, carb: 23 },
  milk: { name: "Sữa tươi", cal: 150, protein: 8, fat: 7, carb: 12 },
  bread: { name: "Bánh mì", cal: 265, protein: 9, fat: 3.3, carb: 49 },
  pizza: { name: "Pizza lát nhỏ", cal: 285, protein: 12, fat: 10, carb: 33 },

};

// Thêm dữ liệu vào select
const foodSelect = document.getElementById("foodSelect");
Object.keys(data).forEach((k) => {
  const opt = document.createElement("option");
  opt.value = k;
  opt.textContent = data[k].name;
  foodSelect.appendChild(opt);
});

// Hàm hiển thị kết quả
function renderResult(info) {
  const el = document.getElementById("result");
  el.textContent = `Món: ${info.name}
Calories: ${info.cal} kcal
Protein: ${info.protein} g | Fat: ${info.fat} g | Carb: ${info.carb} g`;
}

// Nút tính dinh dưỡng
document.getElementById("btnCalc").onclick = () => {
  const key = foodSelect.value;
  renderResult(data[key]);
};

// Nút thêm món mới
document.getElementById("btnAdd").onclick = () => {
  const n = document.getElementById("newName").value.trim();
  const cal = parseFloat(document.getElementById("newCal").value);
  const p = parseFloat(document.getElementById("newProtein").value);
  const f = parseFloat(document.getElementById("newFat").value);
  const c = parseFloat(document.getElementById("newCarb").value);
  if (!n || isNaN(cal) || isNaN(p) || isNaN(f) || isNaN(c)) {
    alert("⚠️ Vui lòng nhập đủ và đúng số!");
    return;
  }
  const key = n.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  data[key] = { name: n, cal, protein: p, fat: f, carb: c };
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = n;
  foodSelect.appendChild(opt);
  alert(`✅ Đã thêm món: ${n}`);
};

// =========================
// GỢI Ý KHẨU PHẦN ĂN TRONG NGÀY
// =========================
const mealPlans = {
  breakfast: ["milk", "bread", "banana"],
  lunch: ["rice", "chicken", "salad"],
  dinner: ["pho", "salmon"],
};

// Tính tổng dinh dưỡng
function calcTotal(arr) {
  return arr.reduce(
    (t, k) => {
      const i = data[k];
      t.cal += i.cal;
      t.p += i.protein;
      t.f += i.fat;
      t.c += i.carb;
      return t;
    },
    { cal: 0, p: 0, f: 0, c: 0 }
  );
}

// Hiển thị khẩu phần
const mealDiv = document.getElementById("mealPlans");
let total = { cal: 0, p: 0, f: 0, c: 0 };

for (let [meal, foods] of Object.entries(mealPlans)) {
  const name =
    meal === "breakfast" ? "Bữa sáng" : meal === "lunch" ? "Bữa trưa" : "Bữa tối";
  const sum = calcTotal(foods);
  total.cal += sum.cal;
  total.p += sum.p;
  total.f += sum.f;
  total.c += sum.c;

  const section = document.createElement("div");
  section.innerHTML = `
    <h3>🍽️ ${name}</h3>
    <ul>${foods.map((f) => `<li>${data[f].name} (${data[f].cal} kcal)</li>`).join("")}</ul>
    <p><strong>Tổng:</strong> ${sum.cal} kcal | Protein: ${sum.p.toFixed(1)}g | Fat: ${sum.f.toFixed(1)}g | Carb: ${sum.c.toFixed(1)}g</p>
  `;
  mealDiv.appendChild(section);
}

