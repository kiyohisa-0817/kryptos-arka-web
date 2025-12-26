// ============================================
//   PRODUCT CONFIGURATION
//   ここにBASEやShopifyの商品情報を入力してください
// ============================================

const products = [
    { 
        id: 1, 
        title: "Tech Bomber", 
        category: "Outerwear", 
        price: 42000, 
        desc: "撥水加工ナイロンと立体裁断。都市生活に最適化されたMA-1再構築モデル。", 
        // ↓↓ ここにBASEの商品ページURLを貼る ↓↓
        link: "https://your-shop-name.base.shop/items/12345678", 
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800", "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=800"] 
    },
    { 
        id: 2, 
        title: "Wide Cargo", 
        category: "Pants", 
        price: 26000, 
        desc: "ワイドシルエットのカーゴパンツ。裾のドローコードでシルエット調整可能。", 
        // ↓↓ ここにBASEの商品ページURLを貼る ↓↓
        link: "https://your-shop-name.base.shop/items/87654321",
        images: ["https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800", "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800"] 
    },
    { 
        id: 3, 
        title: "Leather Rider", 
        category: "Outerwear", 
        price: 85000, 
        desc: "最高級ラムレザーを使用したダブルライダース。経年変化を楽しめる一着。", 
        link: "https://your-shop-name.base.shop/items/xxxxxxxx",
        images: ["https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800", "https://images.unsplash.com/photo-1520975661595-64536ef8f6e8?q=80&w=800"] 
    },
    { 
        id: 4, 
        title: "Hoodie", 
        category: "Tops", 
        price: 18000, 
        desc: "ヘビーウェイトコットンを使用したプルオーバーパーカー。フードの立ち上がりが美しい。", 
        link: "https://your-shop-name.base.shop/items/yyyyyyyy",
        images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"] 
    }
];

// ============================================
//   SYSTEM LOGIC (DO NOT TOUCH BELOW)
// ============================================

let currentSlide = 0;
let currentImages = [];
let currentViewingProduct = null;

function renderGrid() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = products.map((p) => `
        <div class="group cursor-pointer flex flex-col gap-3" onclick="handleProductClick(${p.id}, this)">
            <div class="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
                <img src="${p.images[0]}" class="grid-item-img w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </div>
            <div>
                <div class="flex flex-col items-center md:items-start mb-0.5">
                    <h3 class="text-sm md:text-base font-bold uppercase group-hover:text-gray-500 transition-colors text-center md:text-left text-black">${p.title}</h3>
                    <span class="text-xs text-gray-500 font-mono">¥${p.price.toLocaleString()}</span>
                </div>
                <p class="text-[10px] text-gray-400 uppercase tracking-wider text-center md:text-left">${p.category}</p>
            </div>
        </div>
    `).join('');
}

function handleProductClick(id, element) {
    const img = element.querySelector('.grid-item-img');
    img.classList.add('clicked');
    setTimeout(() => { openModal(id); setTimeout(() => img.classList.remove('clicked'), 800); }, 350);
}

function openModal(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;
    currentViewingProduct = p;

    document.getElementById('modal-title').innerText = p.title;
    document.getElementById('modal-category').innerText = p.category;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-desc').innerText = p.desc;
    
    // Set Link
    const linkBtn = document.getElementById('modal-link');
    if (p.link) {
        linkBtn.href = p.link;
        linkBtn.style.display = 'flex';
    } else {
        linkBtn.style.display = 'none';
    }

    currentImages = p.images;
    currentSlide = 0;
    renderSlider();
    document.getElementById('product-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function renderSlider() {
    const track = document.getElementById('slider-track');
    const dots = document.getElementById('slider-dots');
    track.innerHTML = currentImages.map(img => `<div class="w-full h-full flex-shrink-0 bg-gray-100 flex items-center justify-center"><img src="${img}" class="w-full h-full object-cover"></div>`).join('');
    dots.innerHTML = currentImages.map((_, i) => `<div class="w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${i===0 ? 'bg-black scale-125' : 'bg-gray-300'}" onclick="goToSlide(${i})"></div>`).join('');
    updateSlide();
}
function updateSlide() {
    document.getElementById('slider-track').style.transform = `translateX(-${currentSlide * 100}%)`;
    const dotElements = document.getElementById('slider-dots').children;
    Array.from(dotElements).forEach((d, i) => { d.classList.toggle('bg-black', i === currentSlide); d.classList.toggle('scale-125', i === currentSlide); d.classList.toggle('bg-gray-300', i !== currentSlide); });
}
function nextSlide() { currentSlide = (currentSlide + 1) % currentImages.length; updateSlide(); }
function prevSlide() { currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length; updateSlide(); }
function goToSlide(i) { currentSlide = i; updateSlide(); }

window.addEventListener('load', () => {
    renderGrid();
    setTimeout(() => { document.body.classList.add('loaded'); }, 2000);
    
    const track = document.getElementById('slider-track');
    if(track) {
        let startX = 0;
        track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive: true});
        track.addEventListener('touchend', e => { if (Math.abs(startX - e.changedTouches[0].clientX) > 50) (startX - e.changedTouches[0].clientX > 0) ? nextSlide() : prevSlide(); }, {passive: true});
    }
});
