import type { Payload } from 'payload'

import { ABOUT_PAGE_SEED } from './about-page-data'
import { CONTACT_PAGE_SEED } from './contact-page-data'
import { BAC_AU_DETAIL } from './tour-bac-au-detail'

const TOURS = [
  {
    title: 'BẮC ÂU: ĐAN MẠCH – NA UY – THUỴ ĐIỂN – PHẦN LAN',
    slug: 'bac-au',
    category: 'europe',
    region: 'Bắc Âu',
    destination: 'Bắc Âu',
    duration: '12N/11Đ',
    departureDate: '21/04/2024',
    price: 99900000,
    badge: 'hot',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2023/04/bac-au-1024x614.jpg',
    fallbackEmoji: '🇩🇰',
    featured: true,
    order: 0,
    overview:
      'Khám phá 4 quốc gia Bắc Âu với hành trình đẳng cấp: Copenhagen, Oslo, Stockholm, Helsinki.',
  },
  {
    title: 'XUÂN 2026: ANH QUỐC – XỨ WALES – SCOTLAND',
    slug: 'anh-quoc-2026',
    category: 'europe',
    region: 'Châu Âu',
    destination: 'London, Anh Quốc',
    duration: '10N/9Đ',
    departureDate: '16/02/2026',
    price: 95400000,
    badge: 'spring-2026',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/11/anh-quoc-top-viet-travel.jpg',
    fallbackEmoji: '🇬🇧',
    order: 1,
    externalUrl: 'https://topviettravel.com/tour/xuan-2026-anh-quoc-xu-wales-scotland/',
  },
  {
    title: 'BÍ ẨN TRUNG ĐÔNG: OMAN – JORDAN',
    slug: 'oman-jordan',
    category: 'middle-east',
    region: 'Trung Đông',
    destination: 'Oman',
    duration: '11N/10Đ',
    departureDate: '22/05/2026',
    price: 92900000,
    badge: 'new',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/05/oman-jordan-top-viet-travel-1.jpg',
    fallbackEmoji: '🌙',
    order: 2,
    externalUrl: 'https://topviettravel.com/tour/bi-an-trung-dong-oman-jordan/',
  },
  {
    title: 'XUÂN 2026: BẢN TÌNH CA MA RỐC',
    slug: 'ma-roc-2026',
    category: 'africa',
    region: 'Châu Phi',
    destination: 'Ma Rốc',
    duration: '11N/10Đ',
    departureDate: 'Xuân 2026',
    priceLabel: 'Liên hệ',
    badge: 'hot',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/09/maroc-top-viet-travel.jpg',
    fallbackEmoji: '🇲🇦',
    order: 3,
    externalUrl: 'https://topviettravel.com/tour/xuan-2026-ban-tinh-ca-ma-roc/',
  },
  {
    title: 'AI CẬP HUYỀN BÍ',
    slug: 'ai-cap',
    category: 'africa',
    region: 'Châu Phi',
    destination: 'Ai Cập',
    duration: '10N/9Đ',
    departureDate: '2026',
    price: 89900000,
    badge: 'hot',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/06/ai-cap-top-viet-travel.jpg',
    fallbackEmoji: '🏛️',
    order: 4,
  },
  {
    title: 'CANADA ĐÔNG – TÂY',
    slug: 'canada',
    category: 'americas',
    region: 'Châu Mỹ',
    destination: 'Canada',
    duration: '14N/13Đ',
    departureDate: '2026',
    price: 125000000,
    badge: 'new',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/04/canada-top-viet-travel.jpg',
    fallbackEmoji: '🇨🇦',
    order: 5,
  },
  {
    title: 'KHÁM PHÁ ÚC',
    slug: 'uc',
    category: 'oceania',
    region: 'Châu Úc',
    destination: 'Úc',
    duration: '10N/9Đ',
    departureDate: '2026',
    price: 98500000,
    badge: 'new',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/03/uc-top-viet-travel.jpg',
    fallbackEmoji: '🦘',
    order: 6,
  },
  {
    title: 'THUỴ SĨ – MONACO – Ý – VATICAN',
    slug: 'thuy-si-monaco-y',
    category: 'europe',
    region: 'Châu Âu',
    destination: 'Châu Âu',
    duration: '12N/11Đ',
    departureDate: '2026',
    price: 105000000,
    badge: 'hot',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2024/12/thuy-si-monaco-y-vatican.jpg',
    fallbackEmoji: '🇮🇹',
    order: 7,
  },
] as const

const DESTINATIONS = [
  {
    name: 'Châu Âu',
    slug: 'chau-au',
    country: 'Châu Âu',
    tourCount: 18,
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/11/anh-quoc-top-viet-travel.jpg',
    fallbackEmoji: '🇪🇺',
    order: 0,
  },
  {
    name: 'Trung Đông',
    slug: 'trung-dong',
    country: 'Trung Đông',
    tourCount: 5,
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/05/oman-jordan-top-viet-travel-1.jpg',
    fallbackEmoji: '🌙',
    order: 1,
  },
  {
    name: 'Châu Phi',
    slug: 'chau-phi',
    country: 'Châu Phi',
    tourCount: 6,
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/09/maroc-top-viet-travel.jpg',
    fallbackEmoji: '🌍',
    order: 2,
  },
  {
    name: 'Châu Mỹ',
    slug: 'chau-my',
    country: 'Châu Mỹ',
    tourCount: 4,
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2024/04/CANADA-TOPVIET-TRAVEL-1024x614.jpg',
    fallbackEmoji: '🌎',
    order: 3,
  },
  {
    name: 'Châu Úc',
    slug: 'chau-uc',
    country: 'Châu Úc',
    tourCount: 1,
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2022/03/sydney-Melbourn-1.jpg',
    fallbackEmoji: '🦘',
    order: 4,
  },
  {
    name: 'Châu Á',
    slug: 'chau-a',
    country: 'Châu Á',
    tourCount: 7,
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/11/10N-ai-cap-top-viet-travel.jpg',
    fallbackEmoji: '🌏',
    order: 5,
  },
] as const

const PROMO_BANNERS = [
  {
    title: 'BẮC ÂU: 4 QUỐC GIA HUYỀN DIỆU',
    tag: 'Đang mở bán',
    overlayStyle: 'dark',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2023/04/bac-au-1024x614.jpg',
    ctaLabel: 'Xem ngay',
    ctaLink: '/tour/bac-au',
    order: 0,
  },
  {
    title: 'BẢN TÌNH CA MA RỐC – 11 NGÀY',
    tag: 'Hot 2026',
    overlayStyle: 'green',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/09/maroc-top-viet-travel.jpg',
    ctaLabel: 'Đặt ngay',
    ctaLink: '/tour/maroc-2026',
    order: 1,
  },
  {
    title: 'CANADA ĐÔNG – TÂY 9 NGÀY',
    tag: 'Ưu đãi đặc biệt',
    overlayStyle: 'blue',
    imageUrl: 'https://topviettravel.com/wp-content/uploads/2024/04/CANADA-TOPVIET-TRAVEL-1024x614.jpg',
    ctaLabel: 'Tìm hiểu',
    ctaLink: '/tour/canada',
    order: 2,
  },
] as const

async function upsertLienHePage(payload: Payload) {
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'lien-he' } },
    limit: 1,
  })
  const page = result.docs[0]
  if (!page) return
  if (page.contact?.stats && page.contact.stats.length > 0) return

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: CONTACT_PAGE_SEED as never,
  })
  payload.logger.info('✓ Updated page lien-he with full contact content')
}

async function upsertGioiThieuPage(payload: Payload) {
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'gioi-thieu' } },
    limit: 1,
  })
  const page = result.docs[0]
  if (!page) return
  if (page.about?.stats && page.about.stats.length > 0) return

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: ABOUT_PAGE_SEED as never,
  })
  payload.logger.info('✓ Updated page gioi-thieu with full about content')
}

async function upsertBacAuDetail(payload: Payload) {
  const result = await payload.find({
    collection: 'tours',
    where: { slug: { equals: 'bac-au' } },
    limit: 1,
  })
  const tour = result.docs[0]
  if (!tour) return
  if (tour.itinerary && tour.itinerary.length > 0) return

  await payload.update({
    collection: 'tours',
    id: tour.id,
    data: BAC_AU_DETAIL as never,
  })
  payload.logger.info('✓ Updated tour bac-au with full detail content')
}

export async function seedTouriza(payload: Payload): Promise<void> {
  const existing = await payload.find({ collection: 'tours', limit: 1 })
  if (existing.totalDocs > 0) {
    // Chỉ upsert khi dev — tránh query thừa mỗi lần khởi tạo Payload (dashboard nav)
    if (process.env.NODE_ENV === 'development') {
      await Promise.all([
        upsertBacAuDetail(payload),
        upsertGioiThieuPage(payload),
        upsertLienHePage(payload),
      ])
    }
    return
  }

  const users = await payload.find({ collection: 'users', limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@touriza.local',
        password: 'admin123',
        role: 'super_admin',
        name: 'Admin Touriza',
      },
    })
  }

  await payload.updateGlobal({
    slug: 'touriza-settings',
    data: {
      siteName: 'Top Viet Travel',
      logoUrl: 'https://topviettravel.com/wp-content/uploads/2019/02/logo-1.png',
      topbar: {
        hotline: '0906 371 538',
        email: 'info@topviettravel.com',
        address: '37/4 Nguyễn Cảnh Chân, P. Cầu Ông Lãnh, TP.HCM',
      },
      hero: {
        badge: 'TOP VIET TRAVEL',
        title: 'TOUR NƯỚC NGOÀI\nKHÁM PHÁ THẾ GIỚI',
        description:
          'Top Viet Travel tổ chức tour du lịch đến hơn 500 điểm đến trên khắp thế giới. Khám phá những điều kỳ diệu, thưởng ngoạn vẻ đẹp hùng vĩ khắp các châu lục cùng những di sản UNESCO danh tiếng.',
        primaryCta: 'Xem tất cả tour',
        secondaryCta: 'Tư vấn ngay',
        imageUrl: 'https://topviettravel.com/wp-content/uploads/2023/04/bac-au-1024x614.jpg',
        stats: [
          { value: '500+', label: 'Điểm đến' },
          { value: '78', label: 'Tour quốc tế' },
          { value: '15+', label: 'Năm kinh nghiệm' },
          { value: '50K+', label: 'Khách hài lòng' },
        ],
      },
      social: {
        facebook: 'https://www.facebook.com/TopVietTravel0538/',
        zalo: 'https://zalo.me/0906371538',
        youtube: '#',
        instagram: '#',
      },
      megaMenuDomestic: [
        {
          title: 'Miền Bắc',
          icon: '🏔️',
          iconBg: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
          links: [
            { label: 'Hà Nội – Hạ Long', href: '/#tours' },
            { label: 'Sapa – Mù Cang Chải', href: '/#tours' },
            { label: 'Ninh Bình – Tràng An', href: '/#tours' },
            { label: 'Hà Giang – Đồng Văn', href: '/lien-he' },
          ],
        },
        {
          title: 'Miền Trung',
          icon: '🏖️',
          iconBg: 'linear-gradient(135deg,#f97316,#dc2626)',
          links: [
            { label: 'Đà Nẵng – Hội An', href: '/#tours' },
            { label: 'Nha Trang – Đảo Bình Ba', href: '/#tours' },
            { label: 'Huế – Lăng Cô', href: '/#tours' },
            { label: 'Phan Thiết – Mũi Né', href: '/lien-he' },
          ],
        },
        {
          title: 'Miền Nam & Tây Nguyên',
          icon: '🌿',
          iconBg: 'linear-gradient(135deg,#22c55e,#16a34a)',
          links: [
            { label: 'TP.HCM – Cần Thơ', href: '/#tours' },
            { label: 'Phú Quốc – Nam Du', href: '/#tours' },
            { label: 'Đà Lạt – Bảo Lộc', href: '/#tours' },
            { label: 'Côn Đảo – Vũng Tàu', href: '/lien-he' },
          ],
        },
      ],
      megaMenuInternational: [
        {
          title: 'Châu Á',
          icon: '🌏',
          iconBg: 'linear-gradient(135deg,#ef4444,#dc2626)',
          links: [
            { label: 'Nhật Bản', href: '/lien-he' },
            { label: 'Hàn Quốc', href: '/lien-he' },
            { label: 'Thái Lan', href: '/lien-he' },
            { label: 'Singapore – Malaysia', href: '/lien-he' },
          ],
        },
        {
          title: 'Châu Âu',
          icon: '🇪🇺',
          iconBg: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
          links: [
            { label: 'Bắc Âu 4 Quốc Gia', href: '/tour/bac-au' },
            { label: 'Anh – Scotland', href: '/tour/anh-quoc-2026' },
            { label: 'Thuỵ Sĩ – Ý', href: '/tour/thuy-si-monaco-y' },
          ],
        },
        {
          title: 'Châu Mỹ · Phi · Úc',
          icon: '🌍',
          iconBg: 'linear-gradient(135deg,#a855f7,#7c3aed)',
          links: [
            { label: 'Canada Đông – Tây', href: '/tour/canada' },
            { label: 'Ai Cập huyền bí', href: '/tour/ai-cap' },
            { label: 'Ma Rốc', href: '/tour/ma-roc-2026' },
            { label: 'Oman – Jordan', href: '/tour/oman-jordan' },
          ],
        },
      ],
      whyChoose: [
        {
          icon: 'award',
          title: '15+ Năm Kinh Nghiệm',
          description:
            'Đã được Tổng Cục Du Lịch cấp phép, bề dày kinh nghiệm tổ chức tour quốc tế chuyên nghiệp.',
        },
        {
          icon: 'globe',
          title: '500+ Điểm Đến',
          description: 'Phủ rộng khắp các châu lục với hơn 78 tour nước ngoài đa dạng, phù hợp mọi ngân sách.',
        },
        {
          icon: 'shield',
          title: 'Cam Kết Chất Lượng',
          description:
            'Dịch vụ khách sạn, vé máy bay, visa được đảm bảo. Hoàn tiền 100% nếu chương trình không diễn ra.',
        },
        {
          icon: 'headset',
          title: 'Hỗ Trợ 24/7',
          description: 'Đội ngũ tư vấn viên nhiệt tình, hỗ trợ khách hàng mọi lúc trong suốt hành trình du lịch.',
        },
      ],
      footerAbout:
        'Công ty du lịch TOP VIET TRAVEL là đơn vị kinh doanh du lịch lữ hành trong nước và quốc tế có uy tín và bề dày kinh nghiệm, đã được Tổng Cục Du Lịch cấp phép hoạt động.',
      copyright: '© 2025 Top Viet Travel. All rights reserved.',
    },
  })

  for (const d of DESTINATIONS) {
    await payload.create({ collection: 'destinations', data: { ...d } })
  }

  for (const t of TOURS) {
    const data = t.slug === 'bac-au' ? { ...t, ...BAC_AU_DETAIL } : t
    await payload.create({ collection: 'tours', data: { ...data } as never })
  }

  for (const p of PROMO_BANNERS) {
    await payload.create({ collection: 'promo-banners', data: { ...p } })
  }

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Giới thiệu',
      slug: 'gioi-thieu',
      ...ABOUT_PAGE_SEED,
    } as never,
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Liên hệ',
      slug: 'lien-he',
      ...CONTACT_PAGE_SEED,
    } as never,
  })

  const TESTIMONIALS = [
    {
      quote:
        'Chuyến đi Bắc Âu cùng Top Viet Travel thực sự là trải nghiệm đáng nhớ nhất trong đời tôi. Hướng dẫn viên nhiệt tình, chuyên nghiệp, lịch trình hợp lý.',
      authorName: 'Nguyễn Thị Hoa',
      authorLocation: 'TP. Hồ Chí Minh',
      tourName: 'Bắc Âu 12N/11Đ',
      avatarVariant: 'av1',
      order: 0,
    },
    {
      quote:
        'Vợ chồng tôi chọn Top Viet Travel cho chuyến trăng mật tại Thuỵ Sĩ – Ý – Monaco. Dịch vụ tuyệt vời từ A đến Z, khách sạn 5 sao sang trọng.',
      authorName: 'Trần Minh Tuấn',
      authorLocation: 'Hà Nội',
      tourName: 'Thuỵ Sĩ – Monaco – Ý 8N/7Đ',
      avatarVariant: 'av2',
      order: 1,
    },
    {
      quote:
        'Tour Canada 9 ngày vượt xa mọi kỳ vọng! Từ việc hỗ trợ xin visa cho đến từng bữa ăn, khâu nào cũng chu đáo.',
      authorName: 'Lê Thị Thanh Thảo',
      authorLocation: 'Đà Nẵng',
      tourName: 'Liên tuyến Đông – Tây Canada',
      avatarVariant: 'av3',
      order: 2,
    },
    {
      quote:
        'Lần đầu đi tour nước ngoài nhưng tôi không hề lo lắng vì có đội ngũ Top Viet Travel hỗ trợ xuyên suốt.',
      authorName: 'Phạm Văn Hùng',
      authorLocation: 'Cần Thơ',
      tourName: 'Ai Cập Huyền Bí 10N/9Đ',
      avatarVariant: 'av4',
      order: 3,
    },
  ]

  for (const t of TESTIMONIALS) {
    await payload.create({ collection: 'testimonials', data: t as never })
  }

  const GALLERY = [
    {
      location: 'Bắc Âu – Na Uy',
      guestName: 'Gia đình chị Hoa',
      imageUrl: 'https://topviettravel.com/wp-content/uploads/2023/04/bac-au.jpg',
      size: 'wide',
      likeCount: 248,
      order: 0,
    },
    {
      location: 'Anh Quốc – Scotland',
      guestName: 'Nhóm bạn anh Tuấn',
      imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/11/anh-quoc-top-viet-travel.jpg',
      size: 'normal',
      likeCount: 183,
      order: 1,
    },
    {
      location: 'Ma Rốc – Sahara',
      guestName: 'Cặp đôi chị Lan & anh Hùng',
      imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/09/maroc-top-viet-travel.jpg',
      size: 'tall',
      likeCount: 321,
      order: 2,
    },
    {
      location: 'Canada – Niagara Falls',
      guestName: 'Gia đình anh Minh',
      imageUrl: 'https://topviettravel.com/wp-content/uploads/2024/04/CANADA-TOPVIET-TRAVEL-1024x614.jpg',
      size: 'normal',
      likeCount: 197,
      order: 3,
    },
    {
      location: 'Oman – Muscat',
      guestName: 'Nhóm du lịch Sài Gòn',
      imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/05/oman-jordan-top-viet-travel-1.jpg',
      size: 'normal',
      likeCount: 156,
      order: 4,
    },
    {
      location: 'Ai Cập – Kim tự tháp Giza',
      guestName: 'Công ty XNK Thành Phát',
      imageUrl: 'https://topviettravel.com/wp-content/uploads/2025/11/10N-ai-cap-top-viet-travel.jpg',
      size: 'wide',
      likeCount: 412,
      order: 5,
    },
    {
      location: 'Úc – Sydney Opera House',
      guestName: 'Chị Ngọc Linh & bạn bè',
      imageUrl: 'https://topviettravel.com/wp-content/uploads/2022/03/sydney-Melbourn-1.jpg',
      size: 'normal',
      likeCount: 274,
      order: 6,
    },
    {
      location: 'Bắc Âu – Phần Lan',
      guestName: 'Anh Khánh & gia đình',
      imageUrl: 'https://topviettravel.com/wp-content/uploads/2023/04/bac-au-1024x614.jpg',
      size: 'tall',
      likeCount: 389,
      order: 7,
    },
  ]

  for (const g of GALLERY) {
    await payload.create({ collection: 'gallery-items', data: g as never })
  }

  payload.logger.info('✓ Seeded Touriza / Top Viet Travel content')
}
