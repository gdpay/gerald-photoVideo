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
    seo
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
  footerNote,
  availabilityButtonLabel,
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
export const homePageQuery = `*[_type == "homePage"][0] {
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
  testimonialsButtonLink
}`;

// Stats bar (edited on the Home Page, also shown on the city pages)
export const trustStatsQuery = `*[_type == "homePage"][0].trustStats`;

// Weddings and Quinceañeras pages share the same sections
const servicePageFields = `
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  introEyebrow,
  introText,
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
  ctaSecondaryButtonLink
`;

export const weddingsPageQuery = `*[_id == "weddingsPage"][0] {${servicePageFields}}`;

export const quinceanerasPageQuery = `*[_id == "quinceanerasPage"][0] {${servicePageFields}}`;

// About Page
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
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
  ctaButtonLink
}`;

// Investment Page
export const investmentPageQuery = `*[_type == "investmentPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  philosophyText,
  philosophyNote,
  galleryButtonLabel,
  galleryButtonLink,
  collections,
  popularBadgeLabel,
  priceIntroLabel,
  collectionButtonLabel,
  collectionButtonLink,
  addOnsHeading,
  addOns,
  paymentHeading,
  paymentText,
  paymentButtonLabel,
  paymentButtonLink,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink
}`;

// FAQ Page
export const faqPageQuery = `*[_type == "faqPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  categories,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink
}`;

// Engagements Page
export const engagementsPageQuery = `*[_type == "engagementsPage"][0] {
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
  locationsHeading,
  locationsSubheading,
  locations,
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
  }
}`;

// Portraits Page
export const portraitsPageQuery = `*[_type == "portraitsPage"][0] {
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
  portfolioFeature {
    images[] {
      asset->,
      alt,
      caption
    },
    buttonLabel,
    buttonLink
  }
}`;

// Videography Page
export const videographyPageQuery = `*[_type == "videographyPage"][0] {
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
  ctaButtonLink
}`;

// Portfolio Page
export const portfolioPageQuery = `*[_type == "portfolioPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  videographyEyebrow,
  ctaHeading,
  ctaSubheading,
  ctaButtonLabel,
  ctaButtonLink
}`;

// Reviews Page
export const reviewsPageQuery = `*[_type == "reviewsPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  ratingValue,
  ratingCount,
  ratingLabel,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonLink
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
  postCtaTitle,
  postCtaSubtitle,
  postCtaButtonLabel,
  postCtaButtonLink
}`;

// Contact Page (also holds the thank-you page shown after the form is sent)
export const contactPageQuery = `*[_id == "contactPage"][0] {
  heroTagline,
  heroHeading,
  heroSubheading,
  heroImage,
  detailsHeading,
  phoneTitle,
  phoneNote,
  emailTitle,
  emailNote,
  instagramTitle,
  instagramHandle,
  instagramNote,
  serviceAreaTitle,
  serviceAreaNote,
  bookingNote,
  thankYouHeading,
  thankYouText,
  thankYouNote,
  thankYouButtonLabel,
  thankYouButtonLink,
  thankYouSecondButtonLabel,
  thankYouSecondButtonLink
}`;

// City landing pages (/<slug>-wedding-photographer)
export const cityPageQuery = (slug: string) =>
  `*[_id == "cityPage-${slug}"][0] {
    heroTagline,
    heroHeading,
    heroSubheading,
    heroImage,
    introHeading,
    introText,
    servicesHeading,
    servicesList,
    testimonialsEyebrow,
    testimonialsHeading,
    testimonialsButtonLabel,
    testimonialsButtonLink,
    ctaTitle,
    ctaSubtitle,
    ctaButtonLabel,
    ctaButtonLink
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
