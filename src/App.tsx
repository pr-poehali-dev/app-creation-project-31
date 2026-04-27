import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HERO_IMG = "https://cdn.poehali.dev/projects/1e7ee551-9c22-4e2d-91f5-66c6f5df255e/files/8cf70ad8-48bd-449c-8d0b-54d7311a2e5d.jpg";
const FOOD_IMG = "https://cdn.poehali.dev/projects/1e7ee551-9c22-4e2d-91f5-66c6f5df255e/files/8c7064b5-50d8-484b-9545-1b9ab19be716.jpg";
const FARMER_IMG = "https://cdn.poehali.dev/projects/1e7ee551-9c22-4e2d-91f5-66c6f5df255e/files/96c39638-ae8a-4d22-89b9-5bd4846d9202.jpg";

type Page = "home" | "catalog" | "cart" | "delivery" | "contacts" | "reviews" | "blog";

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "cart", label: "Корзина" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
  { id: "reviews", label: "Отзывы" },
  { id: "blog", label: "Блог" },
];

const PRODUCTS = [
  { id: 1, name: "Томаты черри", farmer: "Иван Петров", price: 320, unit: "кг", rating: 4.9, reviews: 128, category: "Овощи", certified: true, img: FOOD_IMG, badge: "Эко" },
  { id: 2, name: "Мёд цветочный", farmer: "Пасека Зориных", price: 850, unit: "кг", rating: 5.0, reviews: 94, category: "Мёд", certified: true, img: FOOD_IMG, badge: "Органик" },
  { id: 3, name: "Огурцы свежие", farmer: "Марина Сидорова", price: 180, unit: "кг", rating: 4.7, reviews: 67, category: "Овощи", certified: false, img: FOOD_IMG, badge: "Свежее" },
  { id: 4, name: "Клубника садовая", farmer: "Фермер Кузнецов", price: 420, unit: "кг", rating: 4.8, reviews: 213, category: "Ягоды", certified: true, img: FOOD_IMG, badge: "Сезон" },
  { id: 5, name: "Молоко фермерское", farmer: "Семья Лесных", price: 95, unit: "л", rating: 4.9, reviews: 156, category: "Молочное", certified: true, img: FOOD_IMG, badge: "Эко" },
  { id: 6, name: "Картофель синеглазка", farmer: "Агро Волга", price: 65, unit: "кг", rating: 4.6, reviews: 88, category: "Овощи", certified: false, img: FOOD_IMG, badge: null },
];

const FARMERS = [
  { id: 1, name: "Иван Петров", farm: "Фермерское хозяйство «Петровское»", region: "Подмосковье", rating: 4.9, reviews: 340, certified: true, years: 12, img: FARMER_IMG, speciality: "Овощи и зелень" },
  { id: 2, name: "Семья Зориных", farm: "Пасека «Зоринская»", region: "Алтайский край", rating: 5.0, reviews: 218, certified: true, years: 20, img: FARMER_IMG, speciality: "Мёд и продукты пчеловодства" },
  { id: 3, name: "Марина Сидорова", farm: "Хозяйство «Рассвет»", region: "Краснодарский край", rating: 4.8, reviews: 195, certified: true, years: 8, img: FARMER_IMG, speciality: "Ягоды и фрукты" },
];

const REVIEWS = [
  { id: 1, author: "Анастасия К.", text: "Заказываю уже третий раз! Томаты от Ивана — просто чудо, такого вкуса в магазине не найдёшь. Доставка вовремя, упаковка аккуратная.", rating: 5, product: "Томаты черри", date: "14 апреля 2026" },
  { id: 2, author: "Дмитрий В.", text: "Мёд алтайский — потрясающий. Натуральный, густой, очень ароматный. Взял сразу несколько банок про запас.", rating: 5, product: "Мёд цветочный", date: "10 апреля 2026" },
  { id: 3, author: "Светлана М.", text: "Отличный сервис, всё пришло свежим. Единственное — хотелось бы больший выбор молочной продукции. Буду заказывать ещё!", rating: 4, product: "Молоко фермерское", date: "7 апреля 2026" },
];

const BLOG_POSTS = [
  { id: 1, title: "Почему фермерские продукты полезнее магазинных?", excerpt: "Разбираемся в разнице между промышленным и фермерским производством и почему это важно для вашего здоровья.", date: "22 апреля 2026", readTime: "5 мин", category: "Здоровье", img: HERO_IMG },
  { id: 2, title: "Сезонный календарь: что покупать в мае", excerpt: "Составили для вас полный гид по сезонным продуктам — что сейчас в самом соку и как это правильно выбрать.", date: "18 апреля 2026", readTime: "4 мин", category: "Советы", img: FOOD_IMG },
  { id: 3, title: "История: как Иван Петров стал лучшим фермером Подмосковья", excerpt: "Рассказываем о пути от городского программиста до владельца экологической фермы с сотнями довольных покупателей.", date: "12 апреля 2026", readTime: "7 мин", category: "Истории", img: FARMER_IMG },
];

const CATEGORIES = ["Все", "Овощи", "Ягоды", "Мёд", "Молочное", "Зелень", "Фрукты"];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 20 20" fill={s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Header({ activePage, setPage, cartCount }: { activePage: Page; setPage: (p: Page) => void; cartCount: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setPage("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-sm font-bold">А</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">АгроМаркет</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  activePage === item.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
                {item.id === "cart" && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setPage("cart")} className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Icon name="ShoppingCart" size={20} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <Button size="sm" className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90">
              Войти
            </Button>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden py-3 border-t border-border animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setMobileOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === item.id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Ферма" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-2xl">
            <div className="opacity-0 animate-fade-in-up" style={{animationFillMode:'forwards'}}>
              <Badge className="mb-6 bg-accent/90 text-white border-0 text-sm px-4 py-1.5">
                🌿 Свежее напрямую с ферм
              </Badge>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6 opacity-0 animate-fade-in-up delay-100" style={{animationFillMode:'forwards'}}>
              Настоящий<br />вкус земли
            </h1>
            <p className="text-white/80 text-lg sm:text-xl mb-10 leading-relaxed opacity-0 animate-fade-in-up delay-200" style={{animationFillMode:'forwards'}}>
              Фермерские продукты с сертификатом качества.<br />От проверенных хозяйств прямо к вашему столу.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-300" style={{animationFillMode:'forwards'}}>
              <Button size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-8" onClick={() => setPage("catalog")}>
                Перейти в каталог
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base px-8 bg-transparent" onClick={() => setPage("delivery")}>
                Условия доставки
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-3 gap-4">
            {[
              { value: "180+", label: "Фермеров" },
              { value: "2 400+", label: "Продуктов" },
              { value: "50 000+", label: "Покупателей" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-white font-display text-3xl font-semibold">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-semibold text-foreground mb-3">Популярные категории</h2>
          <p className="text-muted-foreground text-lg">Выбирайте свежее по сезону</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { emoji: "🍅", name: "Овощи", count: "340 товаров" },
            { emoji: "🍓", name: "Ягоды", count: "128 товаров" },
            { emoji: "🍯", name: "Мёд", count: "56 товаров" },
            { emoji: "🥛", name: "Молочное", count: "93 товара" },
            { emoji: "🌿", name: "Зелень", count: "74 товара" },
            { emoji: "🍎", name: "Фрукты", count: "210 товаров" },
          ].map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setPage("catalog")}
              className="group p-5 rounded-2xl bg-white border border-border hover-lift text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{cat.name}</div>
              <div className="text-muted-foreground text-xs mt-1">{cat.count}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl font-semibold text-foreground mb-2">Хиты продаж</h2>
              <p className="text-muted-foreground">Самые популярные товары этой недели</p>
            </div>
            <Button variant="outline" onClick={() => setPage("catalog")} className="hidden sm:flex">
              Смотреть все <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 3).map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-semibold text-foreground mb-3">Наши фермеры</h2>
          <p className="text-muted-foreground text-lg">Знаем каждого производителя лично</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FARMERS.map((farmer, i) => (
            <FarmerCard key={farmer.id} farmer={farmer} delay={i * 0.12} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-4">
            Первый заказ — со скидкой 15%
          </h2>
          <p className="text-white/80 text-lg mb-8">Введите email и получите промокод на первую покупку</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Ваш email" className="bg-white/10 border-white/30 text-white placeholder:text-white/50 flex-1" />
            <Button className="bg-accent text-white hover:bg-accent/90 whitespace-nowrap px-6">
              Получить скидку
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl font-semibold text-foreground mb-2">Отзывы покупателей</h2>
            <p className="text-muted-foreground">Более 12 000 довольных клиентов</p>
          </div>
          <Button variant="outline" onClick={() => setPage("reviews")} className="hidden sm:flex">
            Все отзывы <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} delay={i * 0.1} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, delay = 0 }: { product: typeof PRODUCTS[0]; delay?: number }) {
  const [added, setAdded] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl border border-border overflow-hidden hover-lift opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-accent text-white border-0 text-xs">{product.badge}</Badge>
        )}
        {product.certified && (
          <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
            <Icon name="Award" size={12} className="text-white" />
            <span>Сертификат</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
        <h3 className="font-semibold text-foreground text-lg mb-1">{product.name}</h3>
        <div className="text-sm text-muted-foreground mb-3">от: {product.farmer}</div>
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">{product.price} ₽</span>
            <span className="text-sm text-muted-foreground ml-1">/ {product.unit}</span>
          </div>
          <Button
            size="sm"
            className={`transition-all ${added ? "bg-primary text-primary-foreground" : "bg-accent text-white hover:bg-accent/90"}`}
            onClick={() => setAdded(!added)}
          >
            <Icon name={added ? "Check" : "Plus"} size={16} />
            <span className="ml-1">{added ? "Добавлено" : "В корзину"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function FarmerCard({ farmer, delay = 0 }: { farmer: typeof FARMERS[0]; delay?: number }) {
  return (
    <div
      className="bg-white rounded-2xl border border-border overflow-hidden hover-lift opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={farmer.img} alt={farmer.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-semibold text-lg">{farmer.name}</h3>
          <p className="text-white/80 text-sm">{farmer.farm}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <StarRating rating={farmer.rating} />
            <span className="font-semibold text-sm">{farmer.rating}</span>
            <span className="text-xs text-muted-foreground">({farmer.reviews} отз.)</span>
          </div>
          {farmer.certified && (
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs flex items-center gap-1">
              <Icon name="ShieldCheck" size={12} />
              Сертификат
            </Badge>
          )}
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={14} className="text-accent" />
            <span>{farmer.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Sprout" size={14} className="text-primary" />
            <span>{farmer.speciality}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span>Опыт: {farmer.years} лет</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review, delay = 0 }: { review: typeof REVIEWS[0]; delay?: number }) {
  return (
    <div
      className="bg-white rounded-2xl border border-border p-6 hover-lift opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">{review.author[0]}</span>
          </div>
          <div>
            <div className="font-semibold text-sm">{review.author}</div>
            <div className="text-xs text-muted-foreground">{review.date}</div>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-foreground/80 text-sm leading-relaxed mb-3">"{review.text}"</p>
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <Icon name="Tag" size={12} />
        {review.product}
      </div>
    </div>
  );
}

function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "Все" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.farmer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold text-foreground mb-2">Каталог продуктов</h1>
        <p className="text-muted-foreground">Свежее от {FARMERS.length} проверенных фермеров</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по названию или фермеру..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 rounded-lg border border-border bg-white text-sm text-foreground">
          <option>По популярности</option>
          <option>Цена: по возрастанию</option>
          <option>Цена: по убыванию</option>
          <option>По рейтингу</option>
        </select>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i * 0.08} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">Ничего не найдено</p>
          <p className="text-sm mt-2">Попробуйте другой запрос или категорию</p>
        </div>
      )}
    </div>
  );
}

function CartPage() {
  const cartItems = [
    { ...PRODUCTS[0], qty: 2 },
    { ...PRODUCTS[1], qty: 1 },
  ];
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-semibold text-foreground mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-border p-5 flex gap-4 items-center animate-fade-in">
              <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.farmer}</p>
                <p className="text-sm font-medium text-foreground mt-1">{item.price} ₽ / {item.unit}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Icon name="Minus" size={14} />
                </button>
                <span className="font-semibold w-6 text-center">{item.qty}</span>
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Icon name="Plus" size={14} />
                </button>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{item.price * item.qty} ₽</div>
                <button className="text-xs text-muted-foreground hover:text-destructive transition-colors mt-1">Удалить</button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Итого</h3>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-muted-foreground">
                <span>Товары ({cartItems.length})</span>
                <span>{total} ₽</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Доставка</span>
                <span className="text-primary font-medium">Бесплатно</span>
              </div>
              <div className="section-divider my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Итого</span>
                <span>{total} ₽</span>
              </div>
            </div>
            <Button className="w-full bg-accent text-white hover:bg-accent/90 text-base py-6">
              Оформить заказ
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Оплата при получении или картой онлайн
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-semibold text-foreground mb-3">Доставка</h1>
      <p className="text-muted-foreground text-lg mb-12">Свежие продукты прямо к вашей двери</p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: "Truck", title: "Бесплатно от 2 000 ₽", desc: "При заказе от 2 000 ₽ доставка бесплатна по всей Москве и Подмосковью", color: "text-primary" },
          { icon: "Clock", title: "Доставка 1–2 дня", desc: "Заказ сегодня до 14:00 — получите завтра. Гарантируем свежесть продуктов", color: "text-accent" },
          { icon: "ThermometerSun", title: "Термобоксы", desc: "Используем изотермические контейнеры для сохранения температуры и свежести", color: "text-foreground" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border p-6 text-center hover-lift animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
            <Icon name={item.icon} fallback="Info" size={36} className={`mx-auto mb-4 ${item.color}`} />
            <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-display text-2xl font-semibold">Тарифы доставки</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { zone: "Москва (в пределах МКАД)", time: "1–2 дня", price: "299 ₽ (бесплатно от 2 000 ₽)" },
            { zone: "Подмосковье (до 30 км)", time: "2–3 дня", price: "399 ₽ (бесплатно от 3 000 ₽)" },
            { zone: "Подмосковье (30–60 км)", time: "2–4 дня", price: "499 ₽ (бесплатно от 4 000 ₽)" },
            { zone: "Другие регионы", time: "3–7 дней", price: "По тарифу СДЭК" },
          ].map((row, i) => (
            <div key={i} className="px-6 py-4 grid grid-cols-3 gap-4 text-sm">
              <div className="font-medium text-foreground">{row.zone}</div>
              <div className="text-muted-foreground">{row.time}</div>
              <div className="text-foreground">{row.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-semibold text-foreground mb-3">Контакты</h1>
      <p className="text-muted-foreground text-lg mb-12">Всегда готовы помочь вам</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {[
            { icon: "Phone", label: "Телефон", value: "+7 (800) 555-12-34", sub: "Бесплатно, пн–вс 8:00–22:00" },
            { icon: "Mail", label: "Email", value: "hello@agromarket.ru", sub: "Ответим в течение 2 часов" },
            { icon: "MapPin", label: "Адрес", value: "Москва, ул. Садовая, 12", sub: "Офис и пункт самовывоза" },
            { icon: "MessageCircle", label: "Мессенджеры", value: "Telegram, WhatsApp", sub: "@agromarket_support" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-border p-5 hover-lift animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards' }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} fallback="Info" size={22} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <div className="font-semibold text-foreground">{item.value}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 animate-fade-in-up opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
          <h3 className="font-display text-2xl font-semibold mb-6">Написать нам</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Ваше имя</label>
              <Input placeholder="Введите имя" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <Input placeholder="email@example.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Сообщение</label>
              <textarea
                placeholder="Опишите ваш вопрос..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Отправить сообщение
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-semibold text-foreground mb-2">Отзывы</h1>
          <div className="flex items-center gap-3">
            <StarRating rating={4.9} size={18} />
            <span className="text-xl font-bold">4.9</span>
            <span className="text-muted-foreground">· 12 453 отзыва</span>
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Icon name="PenLine" size={16} className="mr-2" />
          Оставить отзыв
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[5, 4, 3].map((stars) => (
          <div key={stars} className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={stars} />
              <span className="font-medium">{stars} звёзд</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: stars === 5 ? "75%" : stars === 4 ? "18%" : "7%" }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-10">
                {stars === 5 ? "75%" : stars === 4 ? "18%" : "7%"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[...REVIEWS, ...REVIEWS].map((review, i) => (
          <ReviewCard key={i} review={review} delay={i * 0.06} />
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-semibold text-foreground mb-3">Блог</h1>
      <p className="text-muted-foreground text-lg mb-10">О фермерстве, здоровом питании и наших производителях</p>

      <div className="grid gap-8">
        {BLOG_POSTS.map((post, i) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl border border-border overflow-hidden hover-lift opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.12}s`, animationFillMode: "forwards" }}
          >
            <div className={`grid ${i === 0 ? "md:grid-cols-2" : "md:grid-cols-3"} gap-0`}>
              <div className="h-56 md:h-auto overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className={`${i === 0 ? "" : "md:col-span-2"} p-7 flex flex-col justify-center`}>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Clock" size={11} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-3 leading-tight">{post.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">{post.excerpt}</p>
                <Button variant="outline" className="self-start">
                  Читать статью <Icon name="ArrowRight" size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-foreground text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">А</span>
              </div>
              <span className="font-display text-xl font-semibold text-white">АгроМаркет</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">Свежие фермерские продукты с гарантией качества и сертификатами</p>
            <div className="flex gap-3">
              {["Instagram", "Youtube", "MessageCircle"].map((icon) => (
                <button key={icon} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Icon name={icon} fallback="Share2" size={16} className="text-white" />
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Покупателям", links: [{ label: "Каталог", page: "catalog" as Page }, { label: "Корзина", page: "cart" as Page }, { label: "Доставка", page: "delivery" as Page }] },
            { title: "Компания", links: [{ label: "О нас", page: "home" as Page }, { label: "Фермеры", page: "home" as Page }, { label: "Блог", page: "blog" as Page }] },
            { title: "Поддержка", links: [{ label: "Контакты", page: "contacts" as Page }, { label: "Отзывы", page: "reviews" as Page }, { label: "FAQ", page: "home" as Page }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => setPage(link.page)} className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="section-divider opacity-20 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span>© 2026 АгроМаркет. Все права защищены.</span>
          <span>Политика конфиденциальности · Пользовательское соглашение</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  const cartCount = 2;

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage setPage={setActivePage} />;
      case "catalog": return <CatalogPage />;
      case "cart": return <CartPage />;
      case "delivery": return <DeliveryPage />;
      case "contacts": return <ContactsPage />;
      case "reviews": return <ReviewsPage />;
      case "blog": return <BlogPage />;
      default: return <HomePage setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activePage={activePage} setPage={setActivePage} cartCount={cartCount} />
      <main>{renderPage()}</main>
      <Footer setPage={setActivePage} />
    </div>
  );
}