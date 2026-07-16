import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

function getGenerationClient() {
  return null;
}

// Fallback high-fidelity templates in case API key is missing or calls fail
function getFallbackTemplates(userPrompt: string): any[] {
  const prompt = (userPrompt || '').toLowerCase();
  
  // Detect theme keywords
  let category = 'general';
  if (prompt.includes('spa') || prompt.includes('wellness') || prompt.includes('skin') || prompt.includes('beauty') || prompt.includes('cosmetic')) {
    category = 'wellness';
  } else if (prompt.includes('jewelry') || prompt.includes('watch') || prompt.includes('gold') || prompt.includes('luxury') || prompt.includes('premium') || prompt.includes('fashion')) {
    category = 'luxury_goods';
  } else if (prompt.includes('tech') || prompt.includes('saas') || prompt.includes('software') || prompt.includes('ai') || prompt.includes('app')) {
    category = 'tech';
  } else if (prompt.includes('architecture') || prompt.includes('interior') || prompt.includes('design') || prompt.includes('home') || prompt.includes('estate')) {
    category = 'architecture';
  }

  const templates: Record<string, any[]> = {
    wellness: [
      {
        id: 'mockup-1',
        name: 'Aura Minimalist',
        brandName: 'AURA SPA',
        logoText: 'AURA',
        theme: {
          primaryColor: '#2d3a3a',
          secondaryColor: '#4a5d5d',
          bgColor: '#faf8f5',
          textColor: '#2d3a3a',
          accentColor: '#c29b7a',
          cardBg: '#ffffff'
        },
        fontFamily: 'Inter, sans-serif',
        headerLinks: ['Services', 'About', 'Rituals', 'Contact'],
        hero: {
          headline: 'Quiet your mind. Restore your light.',
          subheadline: 'A premium sanctuary designed for bespoke skincare rituals, warm basalt therapy, and sensory restoration in the heart of the city.',
          ctaText: 'Reserve Ritual'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'Sacred Restorations',
            subtitle: 'Curated wellness practices for physical alignment and energetic balance.',
            layout: 'grid',
            items: [
              { title: 'Dermal Alchemy', description: 'Advanced botanically active facials focused on structural skin fitness and cell-level illumination.', icon: 'Sparkles' },
              { title: 'Basalt Deep Release', description: 'Heated volcanic minerals coupled with rhythmic aromatherapy strokes to dissolve persistent muscle stress.', icon: 'Flame' },
              { title: 'Sound Bath & Breath', description: 'Vibrational acoustic chambers to align neural frequencies and induce deep parasympathetic restorative rest.', icon: 'Compass' }
            ]
          },
          {
            id: 'sect-2',
            type: 'gallery',
            title: 'The Sanctuary Grounds',
            subtitle: 'Designed in natural clay plaster, raw white oak, and flowing river stone elements.',
            layout: 'split',
            items: [
              { title: 'Acoustic Salt Lounge', description: 'Halotherapy microclimates designed to purify the respiratory pathways and restore absolute stillness.' },
              { title: 'Thermal Mineral Pools', description: 'Alternating hot and chilled therapeutic springs utilizing locally sourced mineral salts.' }
            ]
          },
          {
            id: 'sect-3',
            type: 'cta',
            title: 'Begin Your Restorative Journey',
            subtitle: 'Unlock a members-only pathway to quarterly wellness packages and custom skin coaching.',
            layout: 'list',
            items: [
              { title: 'Join Aura Circle', description: 'Unlock priority reservations, private therapist consultations, and monthly bespoke products.' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Aura Wellness Co. All rights reserved.',
          links: ['Privacy', 'Terms', 'Sustainability']
        }
      },
      {
        id: 'mockup-2',
        name: 'Solis Editorial',
        brandName: 'SOLIS CLINIC',
        logoText: 'SOLIS',
        theme: {
          primaryColor: '#3c2f2f',
          secondaryColor: '#6e5a5a',
          bgColor: '#fdf9f4',
          textColor: '#3c2f2f',
          accentColor: '#d48c6a',
          cardBg: '#ffffff'
        },
        fontFamily: 'Playfair Display, serif',
        headerLinks: ['The Science', 'Treatments', 'Clinical Range', 'Inquire'],
        hero: {
          headline: 'Intelligent skin solutions, rooted in cellular science.',
          subheadline: 'A highly sophisticated medical-aesthetic clinical lounge focusing on custom dermatological restoration, bio-hacking therapies, and precise longevity treatment.',
          ctaText: 'Schedule Consultation'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'The Longevity Method',
            subtitle: 'Merging botanical therapeutics with next-generation medical skin interventions.',
            layout: 'list',
            items: [
              { title: 'Bio-Identical Facial Infusions', description: 'Micro-channeling custom peptide complexes to trigger organic collagen generation.', icon: 'Activity' },
              { title: 'Photothermal Light Shielding', description: 'Broadband light therapy targeting pigment correction and vascular health.', icon: 'Eye' },
              { title: 'Hyperbaric Oxygen Drenching', description: 'Saturating skin tissues with 98% pure medical grade oxygen to maximize cellular regeneration.', icon: 'Wind' }
            ]
          },
          {
            id: 'sect-2',
            type: 'gallery',
            title: 'Our Premium Clinical Suites',
            subtitle: 'Pristine, state-of-the-art treatment environments.',
            layout: 'grid',
            items: [
              { title: 'The Solis Lounge', description: 'Bespoke sensory deprivation capsule rooms for immediate stress reduction.' },
              { title: 'The Consultation Chamber', description: 'Advanced multi-spectral skin analysis capturing sub-dermal cellular health.' },
              { title: 'The Apothecary Bar', description: 'Interactive mixing station for personalized botanical serum compositions.' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Solis Aesthetics Group. Licensed medical practices.',
          links: ['Scientific Board', 'Safety Protocol', 'FAQ']
        }
      }
    ],
    luxury_goods: [
      {
        id: 'mockup-1',
        name: 'Atelier Noir',
        brandName: 'ATELIER ORO',
        logoText: 'ORO',
        theme: {
          primaryColor: '#0a0a0a',
          secondaryColor: '#262626',
          bgColor: '#171717',
          textColor: '#f5f5f5',
          accentColor: '#d4af37',
          cardBg: '#262626'
        },
        fontFamily: 'Space Grotesk, sans-serif',
        headerLinks: ['Chronograph', 'Craftsmanship', 'Heritage', 'Concierge'],
        hero: {
          headline: 'Sculpted from shadow, illuminated by gold.',
          subheadline: 'Introducing the Series V Chronograph. An unyielding titanium construction housing a meticulously crafted Swiss manual movement with a 72-hour reserve.',
          ctaText: 'Acquire Series V'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'Anatomy of Precision',
            subtitle: 'Designed in Geneve, engineered for absolute endurance.',
            layout: 'grid',
            items: [
              { title: 'Forged Titanium Core', description: 'Grade 5 tactical aerospace titanium casing boasting superior scratch resistance and structural integrity.', icon: 'Shield' },
              { title: 'Caliber-72 Calibrated', description: 'An in-house micro-rotor movement executing 28,800 vibrations per hour with exceptional accuracy.', icon: 'Layers' },
              { title: 'Super-LumiNova Dark Accent', description: 'Integrated deep gold luminescent detailing for clear readability in absolute zero-light environments.', icon: 'Sun' }
            ]
          },
          {
            id: 'sect-2',
            type: 'gallery',
            title: 'Visual Masterpieces',
            subtitle: 'Limited series of 150 individually serialized custom builds.',
            layout: 'split',
            items: [
              { title: 'Satin Dark Horizon Finish', description: 'A sleek diamond-like carbon layer applied over hand-polished casing.' },
              { title: 'Sartorial Leather Strap', description: 'Full-grain Italian calfskin hand-stitched with 18-karat precious gold wire.' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Atelier Oro AG. Geneve, Switzerland.',
          links: ['Heritage Archive', 'Chronograph Care', 'Secured Delivery']
        }
      },
      {
        id: 'mockup-2',
        name: 'Maison Gilded',
        brandName: 'MAISON D’OR',
        logoText: 'M_DOR',
        theme: {
          primaryColor: '#1c1917',
          secondaryColor: '#44403c',
          bgColor: '#fafaf9',
          textColor: '#1c1917',
          accentColor: '#b45309',
          cardBg: '#ffffff'
        },
        fontFamily: 'Playfair Display, serif',
        headerLinks: ['Collections', 'The Atelier', 'Bespoke Order', 'Visit Us'],
        hero: {
          headline: 'Timeless objects of pure aesthetic devotion.',
          subheadline: 'Bespoke fine jewelry hand-carved in recycled 18k solid gold, set with traceably sourced natural diamonds of pristine scintillation.',
          ctaText: 'Explore Collection'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'Primal Alchemy',
            subtitle: 'Our ancient sand-casting and hand-finishing jewelry techniques.',
            layout: 'list',
            items: [
              { title: 'Traceable Sourcing', description: 'Every single raw diamond is trackable back to ethical, conflict-free small artisanal mines.', icon: 'Globe' },
              { title: 'Hand-Carved Wax Casts', description: 'No digital printing. We individually carve wax molds by hand to ensure structural warmth and variance.', icon: 'PenTool' },
              { title: 'The Gilded Satin Finish', description: 'Our signature matte gold brushed texture that wears uniquely and gathers patina over decades.', icon: 'Award' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Maison D\'Or. Crafted with human care.',
          links: ['Sourcing Transparency', 'Diamond Standards', 'Sizing Care']
        }
      }
    ],
    tech: [
      {
        id: 'mockup-1',
        name: 'Linear Modern',
        brandName: 'NEXUS FLOW',
        logoText: 'NEXUS',
        theme: {
          primaryColor: '#090d16',
          secondaryColor: '#1e293b',
          bgColor: '#030712',
          textColor: '#f9fafb',
          accentColor: '#6366f1',
          cardBg: '#111827'
        },
        fontFamily: 'JetBrains Mono, monospace',
        headerLinks: ['Engine', 'Console', 'Documentation', 'Access'],
        hero: {
          headline: 'The intelligent neural database.',
          subheadline: 'Deploy a highly scalable vector index in 200 milliseconds. Compute structural similarity maps natively, without complex cluster configuration.',
          ctaText: 'Initialize Node'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'Autonomous Scalability',
            subtitle: 'Engineered for millisecond search latency on multi-billion scale datasets.',
            layout: 'grid',
            items: [
              { title: 'Adaptive HNSW Indices', description: 'A dynamic graph traversal engine that recalculates connectivity in real-time as elements are streamed.', icon: 'Cpu' },
              { title: 'Serverless Compute Shards', description: 'Scale query operations down to zero. Keep hot indices cached inside low-latency RAM arrays.', icon: 'Server' },
              { title: 'Integrated Embedding SDK', description: 'Direct support for high-dimension language vector models.', icon: 'Brain' }
            ]
          },
          {
            id: 'sect-2',
            type: 'gallery',
            title: 'Real-Time Telemetry Monitor',
            subtitle: 'Direct browser access to active node clustering visualizers.',
            layout: 'split',
            items: [
              { title: 'Multi-Region Sync Speed', description: 'Global multi-active replica state synced over isolated fiber arrays.' },
              { title: 'Anomaly Vector Alerting', description: 'Detect semantic outliers immediately through isolated neural clustering analysis.' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Nexus Flow Systems Inc.',
          links: ['Docs', 'Status', 'Security Security']
        }
      },
      {
        id: 'mockup-2',
        name: 'Abstract Clean',
        brandName: 'SYNAPSE AI',
        logoText: 'SYNAPSE',
        theme: {
          primaryColor: '#0f172a',
          secondaryColor: '#334155',
          bgColor: '#ffffff',
          textColor: '#0f172a',
          accentColor: '#0ea5e9',
          cardBg: '#f8fafc'
        },
        fontFamily: 'Inter, sans-serif',
        headerLinks: ['Platform', 'AI Agents', 'Enterprise', 'pricing'],
        hero: {
          headline: 'Automate high-context document workflows.',
          subheadline: 'Synapse structures messy contracts, financial statements, and email queues into pristine database schemas with 99.8% precision.',
          ctaText: 'Start Free Trial'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'The Synapse Edge',
            subtitle: 'An enterprise-grade document extraction architecture.',
            layout: 'list',
            items: [
              { title: 'Semantic Form Parsing', description: 'Convert handwritten, tables, and nested legal elements cleanly into structured JSON.', icon: 'CheckSquare' },
              { title: 'Audit Trail Integration', description: 'Each extracted cell maps back to the origin image pixels, with confidence scoring.', icon: 'FileText' },
              { title: 'SOC-2 Bank Grade Vaulting', description: 'All document streams are dynamically encrypted with isolated customer-managed KMS keys.', icon: 'Lock' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Synapse Technologies. SOC-2 Certified.',
          links: ['Compliance', 'Developer Portal', 'SLA Contract']
        }
      }
    ],
    architecture: [
      {
        id: 'mockup-1',
        name: 'Nordic Habitation',
        brandName: 'KILN STUDIO',
        logoText: 'KILN',
        theme: {
          primaryColor: '#343a30',
          secondaryColor: '#5a6254',
          bgColor: '#f4f3f0',
          textColor: '#343a30',
          accentColor: '#8a6240',
          cardBg: '#ffffff'
        },
        fontFamily: 'Inter, sans-serif',
        headerLinks: ['Residential', 'Philosophy', 'Atelier', 'Contact'],
        hero: {
          headline: 'Spaces that breathe. Objects that endure.',
          subheadline: 'An architectural design firm centered on Scandinavian minimalism, passive solar heat capture, and natural rammed earth foundations.',
          ctaText: 'Inquire About Project'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'Material Integrity',
            subtitle: 'Creating modern architectural forms with negative environmental impact.',
            layout: 'grid',
            items: [
              { title: 'Rammed Earth Walls', description: '100% natural, high thermal-mass structure made with local sands and gravels, left raw.', icon: 'Box' },
              { title: 'Passive Light Chimneys', description: 'Strategic skylight apertures designed to project daylight deeply into basement areas year-round.', icon: 'Sun' },
              { title: 'Reclaimed Larch Siding', description: 'Sourced from heritage barns, charred via traditional techniques to resist pests naturally.', icon: 'Home' }
            ]
          },
          {
            id: 'sect-2',
            type: 'gallery',
            title: 'Completed Dwellings',
            subtitle: 'A review of residential builds constructed in direct communication with context.',
            layout: 'split',
            items: [
              { title: 'The Solitude Cabin', description: 'A 90-sqm off-grid mountain residence in Norway, using solar arrays and spring aquifers.' },
              { title: 'Lakeside Pavilion', description: 'A transparent cedar pavilion focusing fully on expansive water horizons and light play.' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Kiln Architecture Studio. Oslo - London.',
          links: ['Press', 'Monograph', 'Careers']
        }
      },
      {
        id: 'mockup-2',
        name: 'Mesa Brutalist',
        brandName: 'FORMA ATELIER',
        logoText: 'FORMA',
        theme: {
          primaryColor: '#2b2927',
          secondaryColor: '#524e4a',
          bgColor: '#eaddcf',
          textColor: '#2b2927',
          accentColor: '#965a38',
          cardBg: '#f2e8dc'
        },
        fontFamily: 'Space Grotesk, sans-serif',
        headerLinks: ['The Studio', 'Works', 'Monograph', 'Contact'],
        hero: {
          headline: 'Form defined by gravity and natural stone.',
          subheadline: 'Bold concrete architecture that integrates deep shadows and native flora, resulting in powerful spatial stillness.',
          ctaText: 'Acquire Monograph'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'Spatial Weight',
            subtitle: 'Honoring raw textures and unpolished volumetric presence.',
            layout: 'list',
            items: [
              { title: 'Raw Cast Concrete', description: 'Exposing board-formed wood grain textures directly inside interior walls.', icon: 'Grid' },
              { title: 'Native Landscaping', description: 'Integrating natural stone monoliths and adaptive cacti gardens into the home structure.', icon: 'Mountain' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Forma Atelier. Built for timeless stillness.',
          links: ['Works Archive', 'Design Journal', 'Office']
        }
      }
    ],
    general: [
      {
        id: 'mockup-1',
        name: 'The Luxe Classic',
        brandName: 'LUXE CO',
        logoText: 'LUXE',
        theme: {
          primaryColor: '#1e1b4b',
          secondaryColor: '#312e81',
          bgColor: '#fafafa',
          textColor: '#1e1b4b',
          accentColor: '#ca8a04',
          cardBg: '#ffffff'
        },
        fontFamily: 'Inter, sans-serif',
        headerLinks: ['Overview', 'Pricing', 'Documentation', 'Get Started'],
        hero: {
          headline: 'Elevating digital presence with timeless style.',
          subheadline: 'Create custom, gorgeous landing pages, dashboards, and online storefronts in seconds using our integrated AI platform.',
          ctaText: 'Start Free Trial'
        },
        sections: [
          {
            id: 'sect-1',
            type: 'features',
            title: 'Exquisite Execution',
            subtitle: 'We craft features that maximize conversions and brand loyalty.',
            layout: 'grid',
            items: [
              { title: 'Slick Performance', description: 'Lightweight static file outputs loading in under 100ms with premium performance ratings.', icon: 'Activity' },
              { title: 'Brand Kit Integrations', description: 'Centralized typography, color mapping, spacing rules, and auto-generated variants.', icon: 'CheckCircle' },
              { title: 'Global CDN Delivery', description: 'Assets deployed across hundreds of low-latency edge servers globally for immediate access.', icon: 'Globe' }
            ]
          }
        ],
        footer: {
          text: '© 2026 Luxe Co. Premium digital experiences.',
          links: ['Privacy', 'Standard License', 'Sitemap']
        }
      }
    ]
  };

  const selectedCategoryList = templates[category] || templates.general;
  
  // Let's create an exact clone and customize brandName / titles if user enters a brand name in prompt!
  // Find potential brand name
  let extractedBrandName = '';
  const wordTokens = userPrompt.split(/\s+/);
  for (let i = 0; i < wordTokens.length; i++) {
    const word = wordTokens[i];
    if (word.length > 3 && word[0] === word[0].toUpperCase() && !['I', 'The', 'A', 'An', 'My', 'Our', 'With', 'Make', 'Create', 'Design', 'Luxury', 'Earthy', 'Minimalist', 'Premium', 'Modern', 'Organic'].includes(word)) {
      extractedBrandName = word.toUpperCase();
      break;
    }
  }

  // Map over selected and create 4-6 beautiful variations by tweaking colors & copywriting slightly
  const outputVariations = [];
  
  // Generate 4 variations
  for (let idx = 0; idx < 4; idx++) {
    const base = selectedCategoryList[idx % selectedCategoryList.length];
    
    // Create subtle tweaks per variant
    const tBrandName = extractedBrandName || base.brandName;
    const variantNames = [
      `${base.name} (Premium)`,
      `${base.name} (Zen Slate)`,
      `${base.name} (Warm Ochre)`,
      `${base.name} (Cosmic Dark)`
    ];
    
    // Tweak colors
    const themeModifications = [
      { primaryColor: base.theme.primaryColor, bgColor: base.theme.bgColor, cardBg: base.theme.cardBg, accentColor: base.theme.accentColor },
      { primaryColor: '#27272a', bgColor: '#fafafa', cardBg: '#ffffff', accentColor: '#059669' }, // Emerald / Zinc
      { primaryColor: '#451a03', bgColor: '#fdf8f6', cardBg: '#ffffff', accentColor: '#d97706' }, // Warm Ochre
      { primaryColor: '#09090b', bgColor: '#09090b', cardBg: '#18181b', accentColor: '#f43f5e', textColor: '#fafafa' }  // Cosmic dark
    ];

    const chosenThemeMod = themeModifications[idx];

    outputVariations.push({
      ...base,
      id: `mockup-${idx + 1}`,
      name: variantNames[idx],
      brandName: tBrandName,
      logoText: tBrandName.slice(0, 5),
      theme: {
        ...base.theme,
        ...chosenThemeMod
      },
      hero: {
        ...base.hero,
        headline: idx === 1 ? `Cultivated for pure sensory alignment.` : idx === 2 ? `Crafted meticulously with rare organic materials.` : idx === 3 ? `The future of design. In dark mode.` : base.hero.headline
      }
    });
  }

  return outputVariations;
}

// 1. AI Design Generator endpoint
app.post('/api/generate-design', async (req, res) => {
  const { prompt, brandKit } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  console.log(`[Generate Design] Received prompt: "${prompt}"`);

  const generationEngine = getGenerationClient();
  const fallbackData = getFallbackTemplates(prompt);

  if (brandKit) {
    fallbackData.forEach(mock => {
      mock.brandName = brandKit.name || mock.brandName;
      mock.logoText = brandKit.logoText || mock.logoText;
      mock.theme.primaryColor = brandKit.primaryColor || mock.theme.primaryColor;
      mock.theme.secondaryColor = brandKit.secondaryColor || mock.theme.secondaryColor;
      mock.theme.accentColor = brandKit.accentColor || mock.theme.accentColor;
      mock.fontFamily = brandKit.fontFamily || mock.fontFamily;
    });
  }

  return res.json({
    success: true,
    source: generationEngine ? 'local_template_engine' : 'local_template_engine',
    mockups: fallbackData
  });
});

// 2. Intelligent asset visual tagging endpoint
app.post('/api/tag-asset', async (req, res) => {
  const { assetName, assetType, base64Data } = req.body;
  
  const generationEngine = getGenerationClient();
  const baseTags = ['creative', 'design_element', 'brand_kit', 'asset'];

  // Safe fallback tags
  const fallbackTags: Record<string, string[]> = {
    minimalist: ['minimalist', 'interior', 'clean', 'scandinavian', 'clay_tones'],
    gold: ['gilded', 'jewelry', 'precious', 'metallic', 'luxurious'],
    tech: ['isometric', 'diagram', 'cyber', 'terminal', 'dark_theme', 'neural'],
    illustration: ['vector', 'flat_design', 'editorial', 'pastel_tones'],
    spa: ['floral', 'stone', 'basalt', 'therapy', 'wellness', 'organic']
  };

  let chosenTags = [...baseTags];
  const nameLower = (assetName || '').toLowerCase();
  
  if (nameLower.includes('spa') || nameLower.includes('stone') || nameLower.includes('wellness') || nameLower.includes('face')) {
    chosenTags.push(...fallbackTags.spa);
  } else if (nameLower.includes('gold') || nameLower.includes('jewelry') || nameLower.includes('ring') || nameLower.includes('metal')) {
    chosenTags.push(...fallbackTags.gold);
  } else if (nameLower.includes('wireframe') || nameLower.includes('code') || nameLower.includes('tech') || nameLower.includes('diagram')) {
    chosenTags.push(...fallbackTags.tech);
  } else if (nameLower.includes('vector') || nameLower.includes('icon') || nameLower.includes('shape')) {
    chosenTags.push(...fallbackTags.illustration);
  } else {
    chosenTags.push(...fallbackTags.minimalist);
  }

  if (!generationEngine || !base64Data) {
    return res.json({
      success: true,
      source: 'local_asset_scanner',
      tags: Array.from(new Set(chosenTags))
    });
  }

  return res.json({
    success: true,
    source: 'local_asset_scanner',
    tags: Array.from(new Set(chosenTags.map(t => String(t).toLowerCase().replace(/\s+/g, '_'))))
  });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Luxe Studio Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

startServer();
