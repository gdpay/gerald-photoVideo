// Services
export const servicesQuery = `*[_type == "service"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
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
export const blogPostsQuery = `*[_type == "blog"] | order(publishedAt desc) {
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
export const settingsQuery = `*[_type == "settings"][0] {
  title,
  tagline,
  description,
  phone,
  email,
  socialLinks,
  logo,
  favicon
}`;

// Pages
export const pageBySlugQuery = (slug: string) =>
  `*[_type == "page" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    seo,
    sections
  }`;

export const pageHeroBySlugQuery = (slug: string) =>
  `*[_type == "page" && slug.current == "${slug}"][0] {
    title,
    sections[_type == "hero"][0] {
      tagline,
      heading,
      subheading,
      backgroundImage,
      ctaText,
      ctaLink,
      locationLabel
    }
  }`;

// Home page hero
export const homeHeroQuery = `*[_type == "page" && slug.current == "home"][0] {
  sections[_type == "hero"][0] {
    tagline,
    heading,
    subheading,
    backgroundImage,
    ctaText,
    ctaLink,
    locationLabel
  }
}`;

// Featured services for homepage
export const featuredServicesQuery = `*[_type == "service"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  heroImage,
  features
}`;

// Home page CTA section
export const homeCtaQuery = `*[_type == "page" && slug.current == "home"][0] {
  sections[_type == "cta"][0] {
    heading,
    subheading,
    backgroundImage,
    buttonText,
    buttonLink
  }
}`;

// Hero Slides
export const heroSlidesQuery = `*[_type == "heroSlide"] | order(order asc) {
  _id,
  image,
  category,
  alt
}`;

// About Page
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  heroHeading,
  heroSubheading,
  heroImage,
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
  ctaSubheading
}`;

// Investment Page
export const investmentPageQuery = `*[_type == "investmentPage"][0] {
  heroHeading,
  heroSubheading,
  heroImage,
  philosophyText,
  philosophyNote,
  collections,
  addOnsHeading,
  addOns,
  paymentHeading,
  paymentText
}`;

// FAQ Page
export const faqPageQuery = `*[_type == "faqPage"][0] {
  heroHeading,
  heroSubheading,
  heroImage,
  categories
}`;

// Engagements Page
export const engagementsPageQuery = `*[_type == "engagementsPage"][0] {
  heroHeading,
  heroSubheading,
  heroImage,
  introText,
  locationsHeading,
  locationsSubheading,
  locations,
  bundleHeading,
  bundleText,
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
  heroHeading,
  heroSubheading,
  heroImage,
  introText,
  featuresHeading,
  features,
  comboHeading,
  comboText
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
