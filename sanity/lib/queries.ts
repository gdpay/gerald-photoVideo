// Shared SEO projection. Every page has an "SEO" section in the Studio; this is what
// makes those fields reach the page's <title>, description and social share image.
export const seoFields = `
  "seo": seo {
    metaTitle,
    metaDescription,
    keywords,
    noIndex,
    ogImage { asset-> { url } }
  }
`;

// Services
export const servicesQuery = `*[_type == "service"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  tagline,
  heroImage,
  features,
  seo
}`;

export const serviceBySlugQuery = (slug: string) =>
  `*[_type == "service" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    heroImage,
    gallery[] {
      asset->,
      alt,
      caption
    },
    features,
    seo
  }`;

// Testimonials
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  quote,
  author,
  serviceType,
  location,
  rating,
  photo,
  featured
}`;

export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] | order(order asc) {
  _id,
  quote,
  author,
  serviceType,
  location,
  rating,
  photo
}`;

// Gallery
export const galleriesQuery = `*[_type == "gallery"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  serviceType,
  featured,
  coverImage,
  images[] {
    asset->,
    alt,
    caption
  }
}`;

export const featuredGalleriesQuery = `*[_type == "gallery" && featured == true] {
  _id,
  title,
  "slug": slug.current,
  serviceType,
  coverImage,
}`;

export const galleryByServiceTypeQuery = (serviceType: string) =>
  `*[_type == "gallery" && serviceType == "${serviceType}"][0] {
    _id,
    title,
    "slug": slug.current,
    serviceType,
    images[] {
      asset->,
      alt,
      caption
    }
  }`;

// Blog
export const blogPostsQuery = `*[_type == "blog" && defined(coverImage.asset)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  author,
  publishedAt,
  category,
  coverImage,
  excerpt,
}`;

export const blogPostBySlugQuery = (slug: string) =>
  `*[_type == "blog" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    category,
    coverImage,
    excerpt,
    content,
    ${seoFields}
  }`;

// Settings / Site Config
// Targets the Studio's "Site Settings" singleton (documentId in sanity.config.ts) so an
// older stray "settings" document can never be picked instead.
export const settingsQuery = `*[_id == "siteSettings"][0] {
  title,
  tagline,
  description,
  phone,
  email,
  socialLinks,
  addressRegion,
  footerTagline,
  footerServingLabel,
  footerCities,
  footerNote,
  contactFormId,
  footerConnectHeading,
  footerContactHeading,
  footerEmailIcon,
  footerPhoneIcon,
  availabilityButtonLabel,
  availabilityButtonLink,
  copyrightText,
  navItems,
  headerButtonLabel,
  headerButtonLink,
  mobileCallLabel,
  stickyCallIcon,
  stickyCallLabel,
  stickyButtonIcon,
  stickyButtonLabel,
  stickyButtonLink,
  cookieIcon,
  cookieTitle,
  cookieText,
  cookieAcceptLabel,
  cookieRejectLabel,
  cookiePolicyLabel,
  cookiePolicyLink,
  notFoundHeading,
  notFoundText,
  notFoundButtonLabel,
  notFoundButtonLink,
  notFoundSecondButtonLabel,
  notFoundSecondButtonLink,
  notFoundLinksHeading,
  logo,
  favicon
}`;


// Featured services for homepage
export const featuredServicesQuery = `*[_type == "service"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  tagline,
  heroImage,
  features
}`;

// Hero Slides
export const heroSlidesQuery = `*[_type == "heroSlide"] | order(order asc) {
  _id,
  image,
  category,
  alt
}`;

// Home Page (editable homepage sections)
export const homePageQuery = `*[_id == "homePage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  heroButtonLabel,
  heroButtonLink,
  heroLocationLabel,
  trustStats,
  servicesEyebrow,
  servicesHeading,
  servicesLinkLabel,
  serviceCards[] {
    image,
    title,
    tagline,
    link,
    showPlayIcon
  },
  featuredFilm {
    eyebrow,
    heading,
    text,
    buttonLabel,
    buttonLink,
    videoTitle,
    videoUrl,
    videoPoster
  },
  meetGerald {
    eyebrow,
    heading,
    image,
    text1,
    text2,
    name,
    buttonLabel,
    buttonLink
  },
  experience {
    eyebrow,
    heading,
    features,
    buttonLabel,
    buttonLink
  },
  testimonialsEyebrow,
  testimonialsHeading,
  testimonialsButtonLabel,
  testimonialsButtonLink,
  ${seoFields}
}`;

// Stats bar (edited on the Home Page, also shown on the city pages)
export const trustStatsQuery = `*[_id == "homePage"][0].trustStats`;

// Weddings and Quinceañeras pages share the same sections
const servicePageFields = `
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  introEyebrow,
  introText,
  galleryImages[] {
    asset->,
    alt,
    caption
  },
  galleryButtonLabel,
  galleryButtonLink,
  stepsEyebrow,
  stepsHeading,
  stepsSubheading,
  steps,
  highlightsEyebrow,
  highlightsHeading,
  highlightsSubheading,
  highlights,
  highlightsButtonLabel,
  highlightsButtonLink,
  filmEyebrow,
  filmHeading,
  filmText,
  filmButtonLabel,
  filmButtonLink,
  filmVideoUrl,
  filmVideoTitle,
  filmVideoPoster,
  testimonialsEyebrow,
  testimonialsHeading,
  testimonialsButtonLabel,
  testimonialsButtonLink,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink,
  ctaSecondaryButtonLabel,
  ctaSecondaryButtonLink,
  ctaImage,
  ${seoFields}
`;

export const weddingsPageQuery = `*[_id == "weddingsPage"][0] {${servicePageFields}}`;

export const quinceanerasPageQuery = `*[_id == "quinceanerasPage"][0] {${servicePageFields}}`;

// About Page
export const aboutPageQuery = `*[_id == "aboutPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  storyEyebrow,
  storyHeading,
  storyParagraphs,
  storyImage {
    asset->,
    alt,
    caption
  },
  values,
  communityHeading,
  communityText,
  ctaHeading,
  ctaSubheading,
  ctaButtonLabel,
  ctaButtonLink,
  ctaImage,
  ${seoFields}
}`;

// Investment Page
export const investmentPageQuery = `*[_id == "investmentPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  philosophyText,
  philosophyNote,
  galleryImages[] {
    asset->,
    alt,
    caption
  },
  galleryButtonLabel,
  galleryButtonLink,
  collections,
  featureIcon,
  popularBadgeLabel,
  priceIntroLabel,
  collectionButtonLabel,
  collectionButtonLink,
  addOnsHeading,
  addOns,
  paymentIcon,
  paymentHeading,
  paymentText,
  paymentButtonLabel,
  paymentButtonLink,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink,
  ctaImage,
  ${seoFields}
}`;

// FAQ Page
export const faqPageQuery = `*[_id == "faqPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  categories,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink,
  ctaImage,
  ${seoFields}
}`;

// Engagements Page
export const engagementsPageQuery = `*[_id == "engagementsPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  introText,
  highlightsHeading,
  highlights,
  stepsHeading,
  steps,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink,
  ctaImage,
  locationsHeading,
  locationsSubheading,
  locationsIcon,
  locations,
  bundleIcon,
  bundleHeading,
  bundleText,
  bundleButtonLabel,
  bundleButtonLink,
  portfolioFeature {
    images[] {
      asset->,
      alt,
      caption
    },
    buttonLabel,
    buttonLink
  },
  ${seoFields}
}`;

// Portraits Page
export const portraitsPageQuery = `*[_id == "portraitsPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  introText,
  highlightsHeading,
  highlights,
  stepsHeading,
  steps,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink,
  ctaImage,
  portfolioFeature {
    images[] {
      asset->,
      alt,
      caption
    },
    buttonLabel,
    buttonLink
  },
  ${seoFields}
}`;

// Videography Page
export const videographyPageQuery = `*[_id == "videographyPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  introText,
  filmsEyebrow,
  filmsHeading,
  featuredVideo {
    title,
    url,
    description,
    poster {
      asset-> {
        url
      },
      alt
    }
  },
  galleryImages[] {
    asset->,
    alt,
    caption
  },
  galleryButtonLabel,
  galleryButtonLink,
  featuresHeading,
  features,
  videos[] {
    title,
    url,
    description,
    poster {
      asset-> {
        url
      },
      alt
    }
  },
  comboHeading,
  comboText,
  comboButtonLabel,
  comboButtonLink,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink,
  ctaImage,
  ${seoFields}
}`;

// Portfolio Page
export const portfolioPageQuery = `*[_id == "portfolioPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  tabLabels,
  videographyEyebrow,
  ctaHeading,
  ctaSubheading,
  ctaButtonLabel,
  ctaButtonLink,
  ctaImage,
  ${seoFields}
}`;

// Reviews Page
export const reviewsPageQuery = `*[_id == "reviewsPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  ratingValue,
  ratingCount,
  ratingLabel,
  ratingCountText,
  serviceLabels[] {
    value,
    label
  },
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink,
  ctaImage,
  ${seoFields}
}`;

// Average rating (edited on the Reviews Page, also used for Google's structured data)
export const reviewsRatingQuery = `*[_id == "reviewsPage"][0] {
  ratingValue,
  ratingCount
}`;

// Blog Page (list page, plus the call to action at the bottom of every post)
export const blogPageQuery = `*[_id == "blogPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  readMoreLabel,
  postBackLabel,
  postCtaTitle,
  postCtaSubtitle,
  postCtaButtonLabel,
  postCtaButtonLink,
  ${seoFields}
}`;

// Contact Page (also holds the thank-you page shown after the form is sent)
export const contactPageQuery = `*[_id == "contactPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  detailsHeading,
  phoneIcon,
  phoneTitle,
  phoneNote,
  emailIcon,
  emailTitle,
  emailNote,
  instagramIcon,
  instagramTitle,
  instagramHandle,
  instagramNote,
  serviceAreaIcon,
  serviceAreaTitle,
  serviceAreaNote,
  bookingNote,
  thankYouIcon,
  thankYouHeading,
  thankYouText,
  thankYouNote,
  thankYouButtonLabel,
  thankYouButtonLink,
  thankYouSecondButtonLabel,
  thankYouSecondButtonLink,
  ${seoFields}
}`;

// City landing pages (/<slug>-wedding-photographer)
export const cityPageQuery = (slug: string) =>
  `*[_id == "cityPage-${slug}"][0] {
    heroTagline,
    heroHeading,
    heroSubheading,
    heroImage,
    introIcon,
    introHeading,
    introText,
    servicesIcon,
    servicesHeading,
    servicesList,
    testimonialsEyebrow,
    testimonialsHeading,
    testimonialsButtonLabel,
    testimonialsButtonLink,
    ctaTitle,
    ctaSubtitle,
    ctaButtonLabel,
    ctaButtonLink,
    ctaImage,
    ${seoFields}
  }`;

// Reviews Page (testimonials with ordering)
export const allTestimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  quote,
  author,
  serviceType,
  location,
  rating,
  photo,
  featured
}`;
