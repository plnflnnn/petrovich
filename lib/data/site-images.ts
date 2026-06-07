import type { Category, CategoryDefinition } from "@/lib/data/category";

export type SiteImage = {
  src: string;
  alt: string;
};

/** Build a public URL for files under `public/images/`. */
export function imagePath(relativePath: string): string {
  return `/images/${relativePath}`;
}

export const processSketchImage: SiteImage = {
  src: imagePath("home/process-sketch.png"),
  alt: "Ручной эскиз проекта дома с расчётом материалов для кровли, сайдинга и забора",
};

export const deliveryHeroImage: SiteImage = {
  src: imagePath("delivery/hero-country-house.png"),
  alt: "Доставка строительных материалов на загородный дом с садом",
};

export const homeHeroSlides: SiteImage[] = [
  {
    src: imagePath("home/hero-blue-wooden-house.png"),
    alt: "Голубой деревянный дом с белым забором и золотистым ретривером на закате",
  },
  {
    src: imagePath("home/hero-green-cottage-picket.png"),
    alt: "Зелёный деревянный коттедж с белым штакетником и цветущими розами на закате",
  },
  {
    src: imagePath("home/hero-carved-wood-forged-fence.png"),
    alt: "Деревянный дом с резными наличниками и кованым забором в лучах заката",
  },
  {
    src: imagePath("roofing/hero-red-metal-tile-yard.png"),
    alt: "Крыша из красной металлочерепицы с видом на благоустроенный двор",
  },
  {
    src: imagePath("home/hero-living-room-window.png"),
    alt: "Современная гостиная с большим пластиковым окном в тёплых лучах заката",
  },
  {
    src: imagePath("home/hero-dark-fence-sunset.png"),
    alt: "Современный дом с забором из тёмного профнастила и подсветкой столбов на закате",
  },
  {
    src: imagePath("home/hero-brown-roof-picket.png"),
    alt: "Дом с коричневой металлочерепицей и деревянным штакетником в саду на закате",
  },
];

type CategoryImageSet = {
  heroSlides: SiteImage[];
  goods: Record<string, SiteImage>;
};

export const categoryImages: Record<string, CategoryImageSet> = {
  roofing: {
    heroSlides: [
      {
        src: imagePath("roofing/hero-complex-metal-tile.png"),
        alt: "Сложная крыша частного дома из тёмно-коричневой металлочерепицы",
      },
      {
        src: imagePath("roofing/hero-red-metal-tile-yard.png"),
        alt: "Красная металлочерепица на крыше с видом на благоустроенный участок",
      },
      {
        src: imagePath("roofing/hero-gutter-sky.png"),
        alt: "Металлочерепица и водосточная система на фоне голубого неба",
      },
      {
        src: imagePath("roofing/hero-brown-roof-siding.png"),
        alt: "Дом с коричневой металлочерепицей и светлым сайдингом в золотом свете",
      },
    ],
    goods: {
      Профнастил: {
        src: imagePath("roofing/goods-profnastil-stacks.png"),
        alt: "Стопки листов профнастила разных цветов для кровли и ограждений",
      },
      "Металл для кровли": {
        src: imagePath("roofing/hero-complex-metal-tile.png"),
        alt: "Крыша из тёмно-коричневой металлочерепицы со сложной геометрией скатов",
      },
      "Водосточные системы": {
        src: imagePath("roofing/hero-gutter-sky.png"),
        alt: "Коричневая металлочерепица с желобом и водосточной трубой",
      },
      "Доборные элементы": {
        src: imagePath("roofing/hero-red-metal-tile-yard.png"),
        alt: "Коньки и доборные элементы на крыше из красной металлочерепицы",
      },
    },
  },
  fences: {
    heroSlides: [
      {
        src: imagePath("fences/hero-mixed-fences.png"),
        alt: "Заборы из профнастила и металлического штакетника с каменными столбами",
      },
      {
        src: imagePath("home/hero-dark-fence-sunset.png"),
        alt: "Забор из тёмного профнастила с подсветкой столбов на закате",
      },
      {
        src: imagePath("fences/goods-metal-sheets-dark.png"),
        alt: "Профнастил и евроштакетник на фоне готового ограждения участка",
      },
      {
        src: imagePath("fences/goods-picket-fence-dark.png"),
        alt: "Современный забор из тёмного металлического штакетника на участке",
      },
      {
        src: imagePath("fences/hero-brown-picket-house.png"),
        alt: "Коричневый металлический штакетник с загородным домом на зелёном участке",
      },
    ],
    goods: {
      "Металлический штакетник": {
        src: imagePath("fences/goods-picket-fence-dark.png"),
        alt: "Забор из тёмного металлического штакетника с закруглёнными планками",
      },
      "Профнастил для ограждений": {
        src: imagePath("home/hero-dark-fence-sunset.png"),
        alt: "Сплошной забор из тёмно-серого профнастила с кирпичными столбами",
      },
      "Чёрный металл": {
        src: imagePath("fences/goods-metal-sheets-dark.png"),
        alt: "Листы профнастила и штакетник в тёмных и антрацитовых оттенках",
      },
      "Ворота и калитки": {
        src: imagePath("fences/goods-gate-profnastil.png"),
        alt: "Калитка в заборе из коричневого профнастила у загородного дома",
      },
    },
  },
  windows: {
    heroSlides: [
      {
        src: imagePath("windows/hero-pvc-samples.png"),
        alt: "Пластиковые окна белого, чёрного и под дерево с разрезом профиля",
      },
      {
        src: imagePath("windows/hero-triple-window-living.png"),
        alt: "Гостиная с большим трёхстворчатым пластиковым окном",
      },
      {
        src: imagePath("home/hero-living-room-window.png"),
        alt: "Интерьер с пластиковым окном и радиатором в тёплом вечернем свете",
      },
      {
        src: imagePath("windows/hero-white-windows-siding.png"),
        alt: "Дом со светлым сайдингом и белыми пластиковыми окнами",
      },
    ],
    goods: {
      "Пластиковые окна": {
        src: imagePath("windows/goods-pvc-window-garden.png"),
        alt: "Белое пластиковое окно с видом на летний сад",
      },
      "Комплектующие и фурнитура": {
        src: imagePath("windows/goods-profile-cutaway.png"),
        alt: "Разрез профиля окна с тройным стеклопакетом и фурнитурой",
      },
    },
  },
  doors: {
    heroSlides: [
      {
        src: imagePath("doors/goods-entry-doors-showroom.png"),
        alt: "Входные и межкомнатные двери разных цветов в шоуруме",
      },
      {
        src: imagePath("doors/hero-modern-glass-door.png"),
        alt: "Современная межкомнатная дверь с матовым стеклом и деревянными панелями",
      },
      {
        src: imagePath("doors/hero-living-room-door.png"),
        alt: "Гостиная с белой межкомнатной дверью и декоративными стенами",
      },
      {
        src: imagePath("doors/hero-slatted-walls.png"),
        alt: "Интерьер с белой межкомнатной дверью и реечными стеновыми панелями",
      },
    ],
    goods: {
      "Входные двери": {
        src: imagePath("doors/goods-entry-doors-showroom.png"),
        alt: "Тёмная входная металлическая дверь с декоративными рельефами",
      },
      "Межкомнатные двери": {
        src: imagePath("doors/goods-interior-door-white.png"),
        alt: "Белая межкомнатная дверь с филёнками в современной гостиной",
      },
      "Комплектующие и фурнитура": {
        src: imagePath("doors/goods-entry-doors-showroom.png"),
        alt: "Ручки и фурнитура на входных и межкомнатных дверях",
      },
    },
  },
  facade: {
    heroSlides: [
      {
        src: imagePath("facade/hero-light-siding-forge-fence.png"),
        alt: "Дом со светлым сайдингом и кованым забором на закате",
      },
      {
        src: imagePath("facade/hero-grey-siding-forest.png"),
        alt: "Серый дом с горизонтальным сайдингом и деревянным забором в лесу",
      },
      {
        src: imagePath("facade/goods-siding-trim-house.png"),
        alt: "Дом с бежевым сайдингом, доборными планками и металлочерепицей",
      },
      {
        src: imagePath("facade/goods-siding-samples.png"),
        alt: "Образцы сайдинга разных цветов для отделки фасада",
      },
    ],
    goods: {
      Сайдинг: {
        src: imagePath("facade/goods-siding-samples.png"),
        alt: "Каталог образцов винилового сайдинга различных оттенков",
      },
      "Фасадные панели": {
        src: imagePath("roofing/hero-brown-roof-siding.png"),
        alt: "Цокольные фасадные панели под камень у дома со светлым сайдингом",
      },
      "Доборные элементы": {
        src: imagePath("facade/goods-siding-trim-house.png"),
        alt: "Дом с сайдингом, угловыми и оконными доборными планками",
      },
    },
  },
  insulation: {
    heroSlides: [
      {
        src: imagePath("insulation/goods-insulation-materials.png"),
        alt: "Разные виды утеплителей и схема укладки в каркас стены",
      },
      {
        src: imagePath("insulation/goods-mineral-wool.png"),
        alt: "Плиты минеральной ваты и рулонный утеплитель для стен и кровли",
      },
      {
        src: imagePath("insulation/goods-foam-plastic.png"),
        alt: "Плиты пенополистирола для утепления фасада, цоколя и полов",
      },
      {
        src: imagePath("insulation/goods-penoplex.png"),
        alt: "Экструдированный пенополистирол для фундамента и влажных зон",
      },
    ],
    goods: {
      Утеплители: {
        src: imagePath("insulation/goods-insulation-materials.png"),
        alt: "Набор утеплителей разных типов и схема укладки в каркас стены",
      },
      "Минеральная вата": {
        src: imagePath("insulation/goods-mineral-wool.png"),
        alt: "Плиты минеральной ваты и рулонный утеплитель на стройплощадке",
      },
      Пенопласт: {
        src: imagePath("insulation/goods-foam-plastic.png"),
        alt: "Плиты пенополистирола для утепления фасада и полов",
      },
      Пеноплекс: {
        src: imagePath("insulation/goods-penoplex.png"),
        alt: "Экструдированный пенополистирол для фундамента и отмостки",
      },
    },
  },
  drywall: {
    heroSlides: [
      {
        src: imagePath("drywall/goods-gypsum-board.png"),
        alt: "Стопка листов гипсокартона на стройплощадке",
      },
      {
        src: imagePath("drywall/goods-gkl-profiles.png"),
        alt: "Оцинкованные профили для каркаса гипсокартонных конструкций",
      },
    ],
    goods: {
      Гипсокартон: {
        src: imagePath("drywall/goods-gypsum-board.png"),
        alt: "Стопка листов гипсокартона обычного и влагостойкого",
      },
      "Профили для ГКЛ": {
        src: imagePath("drywall/goods-gkl-profiles.png"),
        alt: "Оцинкованные направляющие и стоечные профили для гипсокартона",
      },
      Перегородки: {
        src: imagePath("drywall/goods-partition-living.png"),
        alt: "Готовая перегородка и отделка из гипсокартона в гостиной",
      },
    },
  },
  "wall-panels": {
    heroSlides: [
      {
        src: imagePath("wall-panels/hero-mixed-interiors.png"),
        alt: "Интерьеры с деревянными и глянцевыми настенными панелями",
      },
      {
        src: imagePath("wall-panels/hero-gloss-white-panels.png"),
        alt: "Гостиная с глянцевыми белыми горизонтальными стеновыми панелями",
      },
      {
        src: imagePath("wall-panels/goods-wood-walls.png"),
        alt: "Гостиная с отделкой стен светлыми деревянными панелями",
      },
      {
        src: imagePath("drywall/hero-gypsum-ceiling-led.png"),
        alt: "Гостиная с декоративными панелями и подсветкой на стенах",
      },
      {
        src: imagePath("wall-panels/hero-wood-panel-living.png"),
        alt: "Гостиная с деревянными настенными панелями, мягким освещением и уютной мебелью",
      },
    ],
    goods: {
      "Панели для стен": {
        src: imagePath("wall-panels/goods-panel-samples.png"),
        alt: "Образцы вертикальных настенных панелей под дерево и в цветах",
      },
      "Внутренняя отделка": {
        src: imagePath("wall-panels/goods-wood-walls.png"),
        alt: "Готовая внутренняя отделка стен деревянными панелями в гостиной",
      },
      "Под заказ": {
        src: imagePath("wall-panels/goods-panels-variety.png"),
        alt: "Широкий выбор настенных панелей разных фактур и цветов под заказ",
      },
    },
  },
  lumber: {
    heroSlides: [
      {
        src: imagePath("lumber/goods-board.png"),
        alt: "Стопки обрезной доски разного сечения на верстаке",
      },
      {
        src: imagePath("lumber/goods-timber.png"),
        alt: "Строительный брус разного сечения, сложенный в штабель",
      },
      {
        src: imagePath("lumber/goods-floor-wood.png"),
        alt: "Доска и брус для устройства деревянных полов",
      },
      {
        src: imagePath("lumber/goods-custom-lumber.png"),
        alt: "Разнообразные пиломатериалы под заказ — доска, брус и рейки",
      },
    ],
    goods: {
      Доска: {
        src: imagePath("lumber/goods-board.png"),
        alt: "Обрезная доска разного сечения, сложенная в штабель",
      },
      Брус: {
        src: imagePath("lumber/goods-timber.png"),
        alt: "Строительный и строганный брус для каркаса и стен",
      },
      "Дерево для пола": {
        src: imagePath("lumber/goods-floor-wood.png"),
        alt: "Доска и брус для устройства полов в доме и бане",
      },
      "Пиломатериалы под заказ": {
        src: imagePath("lumber/goods-custom-lumber.png"),
        alt: "Нестандартные пиломатериалы разных пород и сечений под заказ",
      },
    },
  },
};

export const serviceImages = {
  equipment: {
    heroSlides: [
      {
        src: imagePath("services/equipment/hero-tractor-plowing.png"),
        alt: "Трактор вспахивает поле на фоне сельских домов",
      },
      {
        src: imagePath("services/equipment/offering-tractor-snowplow.png"),
        alt: "Трактор с отвалом расчищает снег на улице",
      },
      {
        src: imagePath("services/equipment/offering-tractor-potato-red.png"),
        alt: "Трактор с картофелекопалкой собирает урожай на поле",
      },
      {
        src: imagePath("services/equipment/offering-mini-tractor.png"),
        alt: "Компактный красный мини-трактор на газоне",
      },
    ],
    gallery: {
      kicker: "Что делаем",
      title: "Техника под ваши задачи",
      lead: "",
      items: {
        "Тракторы и техника для хозяйственных работ": {
          src: imagePath("services/equipment/offering-tractor-potato-yellow.png"),
          alt: "Жёлтый трактор с картофелекопалкой на участке",
        },
        "Оборудование для уборки снега": {
          src: imagePath("services/equipment/offering-tractor-snowplow.png"),
          alt: "Трактор с отвалом расчищает снег на улице",
        },
        "Техника для обработки земли": {
          src: imagePath("services/equipment/offering-tractor-potato-red.png"),
          alt: "Трактор с картофелекопалкой собирает урожай на поле",
        },
        "Решения под индивидуальные задачи": {
          src: imagePath("services/equipment/offering-mini-tractor.png"),
          alt: "Компактный красный мини-трактор на газоне",
        },
      },
    },
  },
  forging: {
    heroSlides: [
      {
        src: imagePath("services/forging/hero-gate-estate.png"),
        alt: "Кованые ворота и забор у загородного дома на закате",
      },
      {
        src: imagePath("services/forging/hero-gate-lanterns.png"),
        alt: "Кованые ворота со столбами и фонарями у частного дома",
      },
      {
        src: imagePath("services/forging/hero-garden-arch.png"),
        alt: "Кованая арка для сада с декоративной ковкой",
      },
      {
        src: imagePath("services/forging/offering-fence-scrollwork.png"),
        alt: "Кованый забор с ажурным орнаментом",
      },
      {
        src: imagePath("services/forging/hero-wrought-fence-cottage.png"),
        alt: "Кованый забор с ажурным орнаментом у деревянного коттеджа на закате",
      },
    ],
    gallery: {
      kicker: "Изготавливаем под заказ",
      title: "Кованые изделия для дома и участка",
      lead: "",
      items: {
        Заборы: {
          src: imagePath("services/forging/offering-fence-scrollwork.png"),
          alt: "Кованый забор с завитками и декоративными элементами",
        },
        Ворота: {
          src: imagePath("services/forging/hero-gate-estate.png"),
          alt: "Распашные кованые ворота с орнаментом",
        },
        Калитки: {
          src: imagePath("services/forging/offering-wicket.png"),
          alt: "Кованая калитка с декоративным узором",
        },
        "Декоративные элементы": {
          src: imagePath("services/forging/offering-candle-holder.png"),
          alt: "Кованый подсвечник с листьями для интерьера",
        },
        "Подставки для цветов": {
          src: imagePath("services/forging/offering-flower-stand.png"),
          alt: "Кованая подставка для цветов на три яруса",
        },
        Арки: {
          src: imagePath("services/forging/hero-garden-arch.png"),
          alt: "Кованая арка для сада с декоративной ковкой",
        },
      },
    },
  },
  delivery: {
    heroSlides: [deliveryHeroImage],
    gallery: {
      kicker: "Грузоперевозки",
      title: "Что перевозим",
      lead: "",
      items: {
        "Доставка строительных материалов": {
          src: imagePath("delivery/hero-country-house.png"),
          alt: "Доставка строительных материалов на загородный дом",
        },
        "Перевозка мебели": {
          src: imagePath("doors/hero-living-room-door.png"),
          alt: "Перевозка мебели и отделочных материалов для дома",
        },
        "Перевозка оборудования": {
          src: imagePath("services/equipment/offering-tractor-plowing.png"),
          alt: "Перевозка сельхозтехники и оборудования",
        },
        "Перевозка различных грузов по договорённости": {
          src: imagePath("fences/hero-mixed-fences.png"),
          alt: "Перевозка различных грузов на загородный участок",
        },
      },
    },
  },
} as const;

import type { Service, ServiceDefinition } from "@/lib/data/service";

export function enrichService(service: ServiceDefinition): Service {
  const imgs = serviceImages[service.slug as keyof typeof serviceImages];
  if (!imgs) {
    return {
      ...service,
      heroImage: "",
      heroImageAlt: service.title,
      heroSlides: [],
    };
  }
  const firstSlide = imgs.heroSlides[0];
  return {
    ...service,
    heroImage: firstSlide?.src ?? "",
    heroImageAlt: firstSlide?.alt ?? service.title,
    heroSlides: [...imgs.heroSlides],
  };
}

export function enrichCategory(category: CategoryDefinition): Category {
  const images = categoryImages[category.slug];
  if (!images) {
    return { ...category, heroSlides: [] };
  }

  return {
    ...category,
    heroSlides: images.heroSlides,
    goods: category.goods.map((good) => {
      const mapped = images.goods[good.title];
      if (!mapped) return good;
      return { ...good, image: mapped.src, imageAlt: mapped.alt };
    }),
  };
}

export function getServiceGalleryCards(
  slug: keyof typeof serviceImages,
  offeringTitles: string[],
) {
  const items = serviceImages[slug].gallery.items as Record<string, SiteImage>;
  const emoji =
    slug === "forging" ? "⚒️" : slug === "delivery" ? "🚚" : "🚜";

  return offeringTitles.map((title) => {
    const mapped = items[title];
    return {
      title,
      image: mapped?.src,
      imageAlt: mapped?.alt ?? title,
      placeholderEmoji: emoji,
    };
  });
}
