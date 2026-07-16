import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Users, 
  Database, 
  Code, 
  Layers, 
  CheckCircle, 
  ArrowLeft, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Maximize2, 
  ChevronRight, 
  FileText, 
  History, 
  Check, 
  Copy, 
  Lock, 
  Sliders, 
  MessageSquare,
  Search,
  Eye,
  Settings,
  HelpCircle,
  FolderOpen,
  RefreshCw,
  Palette,
  Bold,
  Italic,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DesignMockup, BrandKit, CanvasComment, VersionSnapshot, Asset, Collaborator, Section } from '../types';

interface DesignWorkspaceProps {
  onBackToLanding: () => void;
}

export default function DesignWorkspace({ onBackToLanding }: DesignWorkspaceProps) {
  // --- Core State ---
  const [activeTab, setActiveTab] = useState<'ai' | 'brand' | 'assets' | 'history' | 'approvals'>('ai');
  const [prompt, setPrompt] = useState('minimalist spa landing page in gold and cream, soft natural typography');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mockups, setMockups] = useState<DesignMockup[]>([]);
  const [activeMockupId, setActiveMockupId] = useState<string | null>(null);
  const [activeMockup, setActiveMockup] = useState<DesignMockup | null>(null);
  
  // Brand Kit State
  const [brandKit, setBrandKit] = useState<BrandKit>({
    name: 'AURA SPA',
    primaryColor: '#2d3a3a',
    secondaryColor: '#4a5d5d',
    accentColor: '#c29b7a',
    fontFamily: 'Inter, sans-serif',
    logoText: 'AURA'
  });
  const [respectBrandKit, setRespectBrandKit] = useState(false);

  // Comments State
  const [comments, setComments] = useState<CanvasComment[]>([
    {
      id: 'comment-1',
      author: 'Elena (Lead Designer)',
      authorInitials: 'EL',
      avatarColor: 'bg-emerald-500',
      text: 'We should probably make this primary heading slightly larger for mobile readability.',
      timestamp: '10:14 AM',
      x: 35,
      y: 22,
      resolved: false,
      replies: []
    },
    {
      id: 'comment-2',
      author: 'Marcus (Art Director)',
      authorInitials: 'MV',
      avatarColor: 'bg-amber-600',
      text: 'This color palette is outstanding. Feels incredibly premium.',
      timestamp: '11:02 AM',
      x: 75,
      y: 65,
      resolved: false,
      replies: []
    }
  ]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  // Asset Library State
  const [assets, setAssets] = useState<Asset[]>([
    { id: 'asset-1', name: 'basalt_stones_rest.jpg', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&fit=crop&q=80', tags: ['spa', 'wellness', 'basalt', 'therapy', 'stones'], type: 'image', size: '1.4 MB' },
    { id: 'asset-2', name: 'minimalist_interior.jpg', url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&fit=crop&q=80', tags: ['minimalist', 'interior', 'clay', 'scandinavian'], type: 'image', size: '1.8 MB' },
    { id: 'asset-3', name: 'gold_gilded_texture.jpg', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&fit=crop&q=80', tags: ['gold', 'texture', 'gilded', 'precious'], type: 'image', size: '2.1 MB' },
    { id: 'asset-4', name: 'botanical_spa_serum.jpg', url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&fit=crop&q=80', tags: ['botanical', 'serum', 'packaging', 'glass_bottle'], type: 'image', size: '1.2 MB' }
  ]);
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [isUploadingAsset, setIsUploadingAsset] = useState(false);
  const [assetUploadProgress, setAssetUploadProgress] = useState(0);

  // Version Control History State
  const [snapshots, setSnapshots] = useState<VersionSnapshot[]>([]);

  // Approvals & Signoffs State
  const [approvals, setApprovals] = useState([
    { id: 'app-1', role: 'Art Director Approval', name: 'Marcus Vance', checked: true, date: 'Jul 16, 2026' },
    { id: 'app-2', role: 'UX Lead Signature', name: 'Elena Rostova', checked: false, date: '' },
    { id: 'app-3', role: 'Client Stakeholder Sign-off', name: 'Aura Corp Inc.', checked: false, date: '' },
    { id: 'app-4', role: 'Compliance & Accessibility Review', name: 'Luxe Audits', checked: false, date: '' }
  ]);

  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCopied, setExportCopied] = useState(false);

  // In-place Text Editing State
  const [editingTextNode, setEditingTextNode] = useState<{
    type: 'headline' | 'subheadline' | 'ctaText' | 'sectionTitle' | 'sectionSubtitle' | 'sectionItemTitle' | 'sectionItemDesc';
    sectionId?: string;
    itemId?: number;
    text: string;
  } | null>(null);

  // --- Simulated Collaborators Trackers ---
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { id: 'collab-1', name: 'Elena Rostova', initials: 'ER', avatarColor: 'bg-emerald-500', cursorX: 20, cursorY: 30 },
    { id: 'collab-2', name: 'Marcus Vance', initials: 'MV', avatarColor: 'bg-amber-600', cursorX: 80, cursorY: 45 }
  ]);

  const canvasRef = useRef<HTMLDivElement>(null);

  // --- Side Effects & Simulations ---
  // Simulate collaborators moving their cursors slowly across the viewport
  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborators(prev => prev.map(collab => {
        const deltaX = (Math.random() - 0.5) * 8;
        const deltaY = (Math.random() - 0.5) * 8;
        let nextX = Math.max(5, Math.min(95, collab.cursorX + deltaX));
        let nextY = Math.max(5, Math.min(95, collab.cursorY + deltaY));
        return {
          ...collab,
          cursorX: nextX,
          cursorY: nextY
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Set default mockup if none selected
  useEffect(() => {
    if (mockups.length > 0 && !activeMockupId) {
      setActiveMockupId(mockups[0].id);
      setActiveMockup(mockups[0]);
    }
  }, [mockups, activeMockupId]);

  // Trigger initial dummy generation on load so workspace is not empty
  useEffect(() => {
    triggerGeneration(true);
  }, []);

  // --- Handlers ---
  const triggerGeneration = async (isInitial = false) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: isInitial ? 'luxury wellness spa minimalist design' : prompt,
          brandKit: respectBrandKit ? brandKit : undefined
        })
      });
      const data = await response.json();
      if (data.success && data.mockups && data.mockups.length > 0) {
        setMockups(data.mockups);
        setActiveMockupId(data.mockups[0].id);
        setActiveMockup(data.mockups[0]);
        
        // Add a Version Snapshot for this new generation
        const newSnapshot: VersionSnapshot = {
          id: `snap-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          description: isInitial ? 'Initial Layout Spawn' : `AI Spun: "${prompt}"`,
          mockupState: data.mockups[0],
          author: 'Luxe Studio AI'
        };
        setSnapshots(prev => [newSnapshot, ...prev]);
      }
    } catch (e) {
      console.error('Failed to generate mockups:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectMockup = (id: string) => {
    const found = mockups.find(m => m.id === id);
    if (found) {
      setActiveMockupId(id);
      setActiveMockup(found);
      
      // Save snapshot of transition
      const newSnapshot: VersionSnapshot = {
        id: `snap-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: `Switched view to: "${found.name}"`,
        mockupState: found,
        author: 'You'
      };
      setSnapshots(prev => [newSnapshot, ...prev]);
    }
  };

  const applyBrandKitToCanvas = () => {
    if (!activeMockup) return;
    const updated = {
      ...activeMockup,
      brandName: brandKit.name,
      logoText: brandKit.logoText,
      fontFamily: brandKit.fontFamily,
      theme: {
        ...activeMockup.theme,
        primaryColor: brandKit.primaryColor,
        secondaryColor: brandKit.secondaryColor,
        accentColor: brandKit.accentColor
      }
    };
    setActiveMockup(updated);
    // Update mockups array
    setMockups(prev => prev.map(m => m.id === updated.id ? updated : m));

    // Save snapshot
    const newSnapshot: VersionSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `Injected Brand Guidelines (${brandKit.name})`,
      mockupState: updated,
      author: 'You'
    };
    setSnapshots(prev => [newSnapshot, ...prev]);
  };

  const handleManualSaveSnapshot = () => {
    if (!activeMockup) return;
    const newSnapshot: VersionSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: 'Manual Workspace Checkpoint',
      mockupState: { ...activeMockup },
      author: 'You'
    };
    setSnapshots(prev => [newSnapshot, ...prev]);
    alert('Checkpoint snapshot saved successfully in your project history timeline!');
  };

  const restoreSnapshot = (snap: VersionSnapshot) => {
    setActiveMockup(snap.mockupState);
    setActiveMockupId(snap.mockupState.id);
    // Add to history that we rolled back
    const rollbackNotice: VersionSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `Rolled back to: "${snap.description}"`,
      mockupState: snap.mockupState,
      author: 'System'
    };
    setSnapshots(prev => [rollbackNotice, ...prev]);
  };

  const handleAssetUploadClick = () => {
    setIsUploadingAsset(true);
    setAssetUploadProgress(10);
    
    // Simulate progression
    const int = setInterval(() => {
      setAssetUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(int);
          return 90;
        }
        return prev + 25;
      });
    }, 300);

    // Call tagging endpoint with simulated asset properties after brief delay
    setTimeout(async () => {
      try {
        const res = await fetch('/api/tag-asset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assetName: 'gilded_spa_receptacle.jpg',
            assetType: 'image'
          })
        });
        const data = await res.json();
        const newAsset: Asset = {
          id: `asset-${Date.now()}`,
          name: 'gilded_spa_receptacle.jpg',
          url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&fit=crop&q=80',
          tags: data.tags || ['sculpted', 'gilded', 'premium'],
          type: 'image',
          size: '1.6 MB'
        };
        setAssets(prev => [newAsset, ...prev]);
      } catch (e) {
        console.error('Scanning failed:', e);
      } finally {
        setIsUploadingAsset(false);
        setAssetUploadProgress(0);
      }
    }, 1500);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingComment || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newComment: CanvasComment = {
      id: `comment-${Date.now()}`,
      author: 'You (Creator)',
      authorInitials: 'YO',
      avatarColor: 'bg-[#ca8a04]',
      text: newCommentText || 'Placeholder feedback annotation.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      x,
      y,
      resolved: false,
      replies: []
    };

    setComments(prev => [...prev, newComment]);
    setIsAddingComment(false);
    setNewCommentText('');
  };

  const toggleApprovalCheckbox = (id: string) => {
    setApprovals(prev => prev.map(app => {
      if (app.id === id) {
        const nextChecked = !app.checked;
        return {
          ...app,
          checked: nextChecked,
          date: nextChecked ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
        };
      }
      return app;
    }));
  };

  // Text nodes live update handler
  const saveNodeTextChange = () => {
    if (!editingTextNode || !activeMockup) return;
    
    let updated = { ...activeMockup };
    const { type, sectionId, itemId, text } = editingTextNode;
    
    if (type === 'headline') {
      updated.hero.headline = text;
    } else if (type === 'subheadline') {
      updated.hero.subheadline = text;
    } else if (type === 'ctaText') {
      updated.hero.ctaText = text;
    } else if (sectionId) {
      updated.sections = updated.sections.map(sect => {
        if (sect.id === sectionId) {
          if (type === 'sectionTitle') {
            return { ...sect, title: text };
          } else if (type === 'sectionSubtitle') {
            return { ...sect, subtitle: text };
          } else if (itemId !== undefined && sect.items) {
            const updatedItems = [...sect.items];
            if (type === 'sectionItemTitle') {
              updatedItems[itemId] = { ...updatedItems[itemId], title: text };
            } else if (type === 'sectionItemDesc') {
              updatedItems[itemId] = { ...updatedItems[itemId], description: text };
            }
            return { ...sect, items: updatedItems };
          }
        }
        return sect;
      });
    }

    setActiveMockup(updated);
    setMockups(prev => prev.map(m => m.id === updated.id ? updated : m));
    setEditingTextNode(null);

    // Save snapshot
    const newSnapshot: VersionSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `Edited node: "${text.slice(0, 24)}..."`,
      mockupState: updated,
      author: 'You'
    };
    setSnapshots(prev => [newSnapshot, ...prev]);
  };

  // Drag and drop asset handler to replace hero image
  const handleDropAssetOnHero = (imageUrl: string) => {
    if (!activeMockup) return;
    const updated = {
      ...activeMockup,
      hero: {
        ...activeMockup.hero,
        imageUrl: imageUrl
      }
    };
    setActiveMockup(updated);
    setMockups(prev => prev.map(m => m.id === updated.id ? updated : m));
    
    // Save snapshot
    const newSnapshot: VersionSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: 'Dropped library asset onto hero wallpaper',
      mockupState: updated,
      author: 'You'
    };
    setSnapshots(prev => [newSnapshot, ...prev]);
  };

  // --- Code generation output string ---
  const generateExportHTMLAndCSS = (): { html: string; css: string } => {
    if (!activeMockup) return { html: '', css: '' };

    const mockup = activeMockup;
    const prim = mockup.theme.primaryColor;
    const sec = mockup.theme.secondaryColor;
    const acc = mockup.theme.accentColor;
    const bg = mockup.theme.bgColor;
    const textCol = mockup.theme.textColor;
    const cardBg = mockup.theme.cardBg;

    // Build sections
    let sectionsHtml = '';
    mockup.sections.forEach(sect => {
      let itemsHtml = '';
      if (sect.items) {
        sect.items.forEach(item => {
          itemsHtml += `
          <div class="card" style="background-color: ${cardBg}; border: 1px solid rgba(0,0,0,0.06); padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            <div style="color: ${acc}; margin-bottom: 12px; font-weight: bold;">✦</div>
            <h4 style="font-size: 18px; margin: 0 0 8px 0; color: ${prim};">${item.title}</h4>
            <p style="font-size: 14px; margin: 0; color: ${textCol}; opacity: 0.8; line-height: 1.5;">${item.description}</p>
          </div>`;
        });
      }

      sectionsHtml += `
      <!-- SECTION: ${sect.title} -->
      <section style="padding: 80px 24px; text-align: center; max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 32px; font-weight: 500; margin: 0 0 8px 0; color: ${prim}; font-family: ${mockup.fontFamily};">${sect.title}</h2>
        ${sect.subtitle ? `<p style="font-size: 16px; margin: 0 0 40px 0; color: ${textCol}; opacity: 0.7;">${sect.subtitle}</p>` : ''}
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          ${itemsHtml}
        </div>
      </section>
      `;
    });

    const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mockup.brandName} | Luxe Spun Space</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;1,500&family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
  <style>
    :root {
      --luxe-primary: ${prim};
      --luxe-secondary: ${sec};
      --luxe-accent: ${acc};
      --luxe-bg: ${bg};
      --luxe-text: ${textCol};
      --luxe-card: ${cardBg};
    }
    body {
      margin: 0;
      padding: 0;
      background-color: var(--luxe-bg);
      color: var(--luxe-text);
      font-family: ${mockup.fontFamily};
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 40px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    .logo {
      font-weight: 600;
      letter-spacing: 2px;
      color: var(--luxe-primary);
    }
    nav a {
      margin-left: 24px;
      text-decoration: none;
      color: var(--luxe-text);
      opacity: 0.8;
      font-size: 14px;
    }
    nav a:hover {
      opacity: 1;
      color: var(--luxe-accent);
    }
    .hero {
      padding: 100px 40px;
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
    }
    .hero h1 {
      font-size: 48px;
      font-weight: 500;
      margin: 0 0 24px 0;
      line-height: 1.15;
    }
    .hero p {
      font-size: 18px;
      opacity: 0.85;
      line-height: 1.6;
      margin: 0 0 32px 0;
    }
    .btn-cta {
      display: inline-block;
      padding: 14px 32px;
      background-color: var(--luxe-primary);
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .btn-cta:hover {
      background-color: var(--luxe-accent);
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="logo">${mockup.logoText}</div>
    <nav>
      ${mockup.headerLinks.map(link => `<a href="#">${link}</a>`).join('\n      ')}
    </nav>
  </header>

  <!-- HERO -->
  <div class="hero">
    <h1>${mockup.hero.headline}</h1>
    <p>${mockup.hero.subheadline}</p>
    <a href="#" class="btn-cta">${mockup.hero.ctaText}</a>
  </div>

  ${sectionsHtml}

  <!-- FOOTER -->
  <footer style="padding: 60px 40px; border-top: 1px solid rgba(0,0,0,0.05); text-align: center; font-size: 13px; opacity: 0.7;">
    <p>${mockup.footer.text}</p>
  </footer>

</body>
</html>`;

    const tokenJson = `{
  "global": {
    "brandName": "${mockup.brandName}",
    "fontFamily": "${mockup.fontFamily}"
  },
  "colorTokens": {
    "primary": { "value": "${prim}" },
    "secondary": { "value": "${sec}" },
    "accent": { "value": "${acc}" },
    "background": { "value": "${bg}" },
    "text": { "value": "${textCol}" },
    "cardBg": { "value": "${cardBg}" }
  }
}`;

    return { html: htmlString, css: tokenJson };
  };

  const handleCopyCode = () => {
    const codes = generateExportHTMLAndCSS();
    navigator.clipboard.writeText(codes.html);
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E4E4E4] font-sans flex flex-col h-screen overflow-hidden selection:bg-[#C5A059] selection:text-[#0A0A0A]">
      
      {/* Header Bar */}
      <header className="h-16 border-b border-[#2A2A2A] bg-[#0A0A0A] px-6 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            id="btn-workspace-back"
            onClick={onBackToLanding}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-[#161616] border border-transparent hover:border-[#2A2A2A] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-semibold hidden sm:inline">Landing Page</span>
          </button>
          <div className="h-4 w-px bg-[#2A2A2A]"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#C5A059]/10 text-[#C5A059] px-2.5 py-0.5 rounded font-bold font-mono">WORKSPACE</span>
            <span className="text-xs text-zinc-400 font-medium truncate max-w-[180px]">
              {activeMockup ? activeMockup.brandName : 'Resolving Layout...'}
            </span>
          </div>
        </div>

        {/* Collaborators and Main CTAs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center -space-x-2">
            {collaborators.map(collab => (
              <div 
                key={collab.id} 
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${collab.avatarColor} ring-2 ring-[#0A0A0A]`}
                title={`${collab.name} (Active)`}
              >
                {collab.initials}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full bg-[#161616] text-[#A0A0A0] text-[9px] flex items-center justify-center ring-2 ring-[#0A0A0A] font-bold border border-[#2A2A2A]">+3</div>
          </div>
          
          <button 
            id="btn-manual-snapshot"
            onClick={handleManualSaveSnapshot}
            className="p-2 bg-[#161616] hover:bg-[#202020] text-zinc-300 rounded border border-[#2A2A2A] hover:text-white transition-all text-xs flex items-center gap-1.5"
            title="Commit Snapshot Checkpoint"
          >
            <Save className="w-4 h-4" />
            <span className="hidden md:inline font-semibold">Save Snapshot</span>
          </button>

          <button 
            id="btn-open-export"
            onClick={() => setShowExportModal(true)}
            className="px-5 py-2 bg-[#C5A059] hover:bg-[#D4B372] text-[#0A0A0A] rounded-full text-xs tracking-wider uppercase font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <Code className="w-4 h-4" />
            <span>Export Code</span>
          </button>
        </div>
      </header>

      {/* Main Dock Split */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        
        {/* Left Control Sidebar */}
        <aside className="w-[380px] border-r border-[#2A2A2A] bg-[#0F0F0F] flex flex-col shrink-0 min-h-0 z-10">
          
          {/* Tabs header bar */}
          <div className="grid grid-cols-5 h-12 border-b border-[#2A2A2A] bg-[#0A0A0A] text-[10px] font-bold tracking-widest text-center uppercase">
            <button 
              id="tab-btn-ai"
              onClick={() => setActiveTab('ai')}
              className={`flex flex-col items-center justify-center border-r border-[#2A2A2A] transition-colors ${activeTab === 'ai' ? 'text-[#C5A059] bg-[#0F0F0F] border-b-2 border-b-[#C5A059]' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="AI Generator"
            >
              <Sparkles className="w-4 h-4 mb-0.5" />
              <span>AI</span>
            </button>
            <button 
              id="tab-btn-brand"
              onClick={() => setActiveTab('brand')}
              className={`flex flex-col items-center justify-center border-r border-[#2A2A2A] transition-colors ${activeTab === 'brand' ? 'text-[#C5A059] bg-[#0F0F0F] border-b-2 border-b-[#C5A059]' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Brand Kits"
            >
              <Palette className="w-4 h-4 mb-0.5" />
              <span>Brand</span>
            </button>
            <button 
              id="tab-btn-assets"
              onClick={() => setActiveTab('assets')}
              className={`flex flex-col items-center justify-center border-r border-[#2A2A2A] transition-colors ${activeTab === 'assets' ? 'text-[#C5A059] bg-[#0F0F0F] border-b-2 border-b-[#C5A059]' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Asset Vault"
            >
              <Database className="w-4 h-4 mb-0.5" />
              <span>Library</span>
            </button>
            <button 
              id="tab-btn-history"
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center justify-center border-r border-[#2A2A2A] transition-colors ${activeTab === 'history' ? 'text-[#C5A059] bg-[#0F0F0F] border-b-2 border-b-[#C5A059]' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="History snaps"
            >
              <History className="w-4 h-4 mb-0.5" />
              <span>History</span>
            </button>
            <button 
              id="tab-btn-approvals"
              onClick={() => setActiveTab('approvals')}
              className={`flex flex-col items-center justify-center transition-colors ${activeTab === 'approvals' ? 'text-[#C5A059] bg-[#0F0F0F] border-b-2 border-b-[#C5A059]' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Approvals"
            >
              <CheckCircle className="w-4 h-4 mb-0.5" />
              <span>Sign</span>
            </button>
          </div>

          {/* Tab Contents View */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* AI Generator Tab */}
            {activeTab === 'ai' && (
              <div className="space-y-5 text-left">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>AI Layout generator</span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Write plain language design constraints. Our local generation engine compiles fully structural styled vector cards and templates.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-[#A0A0A0] font-bold uppercase block">Design brief description</label>
                  <textarea 
                    id="inp-design-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., high-end Swiss chronograph product landing page, dark sleek carbon casing, neon luxury details"
                    className="w-full h-24 bg-[#161616] border border-[#2A2A2A] rounded p-3 text-xs text-[#E4E4E4] focus:outline-none focus:border-[#C5A059] resize-none"
                  />
                  
                  {/* Brand Kit enforcement */}
                  <div className="flex items-center justify-between p-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded">
                    <div className="flex items-center gap-2">
                      <Palette className="w-3.5 h-3.5 text-zinc-400" />
                      <div>
                        <p className="text-[10px] text-zinc-300 font-bold">Enforce brand kit guidelines</p>
                        <p className="text-[9px] text-zinc-500 font-medium">Injects current Brand Kit rules to generation</p>
                      </div>
                    </div>
                    <input 
                      id="chk-respect-brand"
                      type="checkbox" 
                      checked={respectBrandKit}
                      onChange={(e) => setRespectBrandKit(e.target.checked)}
                      className="w-4 h-4 text-[#C5A059] bg-[#161616] border-[#2A2A2A] rounded focus:ring-0"
                    />
                  </div>

                  <button 
                    id="btn-execute-generation"
                    onClick={() => triggerGeneration(false)}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full py-3 bg-[#C5A059] hover:bg-[#D4B372] disabled:bg-[#161616] text-[#0A0A0A] font-bold rounded-full text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating layouts...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Spawn Variations</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Variants List */}
                <div className="border-t border-[#2A2A2A] pt-5">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3">AI Spawned Variations</h4>
                  {mockups.length === 0 ? (
                    <p className="text-[11px] text-zinc-500 italic">No layouts spawned yet. Submit a brief above.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {mockups.map((mock) => (
                        <button
                          key={mock.id}
                          id={`btn-select-mockup-${mock.id}`}
                          onClick={() => selectMockup(mock.id)}
                          className={`w-full p-3 border rounded text-left flex items-center justify-between transition-all ${activeMockupId === mock.id ? 'bg-[#C5A059]/10 border-[#C5A059]' : 'bg-[#161616] border-[#2A2A2A] hover:border-[#C5A059]/40'}`}
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#E4E4E4]">{mock.name}</p>
                            <p className="text-[9px] text-zinc-500 font-mono">Font: {mock.fontFamily.split(',')[0]}</p>
                          </div>
                          
                          {/* Colored dots indicators of theme */}
                          <div className="flex gap-1">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mock.theme.primaryColor }}></span>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mock.theme.accentColor }}></span>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mock.theme.bgColor }}></span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Brand Kit Manager */}
            {activeTab === 'brand' && (
              <div className="space-y-5 text-left">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Brand kit guidelines</span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Set central corporate rules. Overwrite active layouts instantly, keeping perfect typography and compliance across linked deliverables.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-mono uppercase text-[#A0A0A0] block mb-1.5">Brand Name</label>
                    <input 
                      id="inp-brand-name"
                      type="text" 
                      value={brandKit.name}
                      onChange={(e) => setBrandKit({ ...brandKit, name: e.target.value })}
                      className="w-full bg-[#161616] border border-[#2A2A2A] rounded px-3 py-2 text-xs text-[#E4E4E4] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase text-[#A0A0A0] block mb-1.5">Logo Text</label>
                    <input 
                      id="inp-brand-logo"
                      type="text" 
                      value={brandKit.logoText}
                      onChange={(e) => setBrandKit({ ...brandKit, logoText: e.target.value })}
                      className="w-full bg-[#161616] border border-[#2A2A2A] rounded px-3 py-2 text-xs text-[#E4E4E4] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase text-[#A0A0A0] block mb-1.5">Typography Pairing</label>
                    <select 
                      id="inp-brand-font"
                      value={brandKit.fontFamily}
                      onChange={(e) => setBrandKit({ ...brandKit, fontFamily: e.target.value })}
                      className="w-full bg-[#161616] border border-[#2A2A2A] rounded px-3 py-2 text-xs text-[#E4E4E4] focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Inter, sans-serif">Inter (Modern Sans)</option>
                      <option value="Space Grotesk, sans-serif">Space Grotesk (Tech Editorial)</option>
                      <option value="Playfair Display, serif">Playfair Display (Luxury Serif)</option>
                      <option value="JetBrains Mono, monospace">JetBrains Mono (Technical Minimalist)</option>
                    </select>
                  </div>

                  {/* Colors */}
                  <div className="space-y-2 pt-2">
                    <label className="text-[9px] font-mono uppercase text-[#A0A0A0] block">Colors Config</label>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col gap-1 text-center bg-[#161616] p-2 rounded border border-[#2A2A2A]">
                        <span className="text-[8px] text-[#808080] font-mono">Primary</span>
                        <input 
                          id="inp-brand-color-primary"
                          type="color" 
                          value={brandKit.primaryColor} 
                          onChange={(e) => setBrandKit({ ...brandKit, primaryColor: e.target.value })}
                          className="w-full h-8 bg-transparent border-0 cursor-pointer rounded overflow-hidden" 
                        />
                        <span className="text-[9px] text-[#A0A0A0] font-mono font-medium">{brandKit.primaryColor}</span>
                      </div>

                      <div className="flex flex-col gap-1 text-center bg-[#161616] p-2 rounded border border-[#2A2A2A]">
                        <span className="text-[8px] text-[#808080] font-mono">Secondary</span>
                        <input 
                          id="inp-brand-color-secondary"
                          type="color" 
                          value={brandKit.secondaryColor} 
                          onChange={(e) => setBrandKit({ ...brandKit, secondaryColor: e.target.value })}
                          className="w-full h-8 bg-transparent border-0 cursor-pointer rounded overflow-hidden" 
                        />
                        <span className="text-[9px] text-[#A0A0A0] font-mono font-medium">{brandKit.secondaryColor}</span>
                      </div>

                      <div className="flex flex-col gap-1 text-center bg-[#161616] p-2 rounded border border-[#2A2A2A]">
                        <span className="text-[8px] text-[#808080] font-mono">Accent</span>
                        <input 
                          id="inp-brand-color-accent"
                          type="color" 
                          value={brandKit.accentColor} 
                          onChange={(e) => setBrandKit({ ...brandKit, accentColor: e.target.value })}
                          className="w-full h-8 bg-transparent border-0 cursor-pointer rounded overflow-hidden" 
                        />
                        <span className="text-[9px] text-zinc-400 font-mono font-medium">{brandKit.accentColor}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    id="btn-apply-brand-kit"
                    onClick={applyBrandKitToCanvas}
                    className="w-full py-3 mt-4 bg-[#161616] hover:bg-[#202020] hover:text-white border border-[#2A2A2A] text-zinc-200 font-bold rounded-full text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Apply Brand Guidelines</span>
                  </button>
                </div>
              </div>
            )}

            {/* Smart Asset Library Tab */}
            {activeTab === 'assets' && (
              <div className="space-y-5 text-left">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Smart asset library</span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Upload visual elements. Our server-side computer vision system identifies styling keywords to tag components and extract exact hex palettes.
                  </p>
                </div>

                {/* Drag-and-drop zone */}
                <div 
                  id="dropzone-media"
                  onClick={handleAssetUploadClick}
                  className="border-2 border-dashed border-[#2A2A2A] hover:border-[#C5A059] bg-[#0A0A0A] hover:bg-[#161616]/40 p-6 rounded-xl text-center cursor-pointer transition-all space-y-2"
                >
                  <Upload className="w-6 h-6 text-zinc-500 mx-auto" />
                  <div>
                    <p className="text-xs font-semibold text-zinc-300">Drag files here or click to browse</p>
                    <p className="text-[9px] text-zinc-500">Supports JPG, PNG up to 10 MB. Live auto-tagging will trigger.</p>
                  </div>

                  {isUploadingAsset && (
                    <div className="space-y-1.5 pt-2">
                      <div className="w-full bg-[#2A2A2A] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#C5A059] h-full" style={{ width: `${assetUploadProgress}%` }}></div>
                      </div>
                      <span className="text-[8px] font-mono text-[#C5A059] uppercase">AI Scanner Scanning for styling tags...</span>
                    </div>
                  )}
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                  <input 
                    id="inp-search-assets"
                    type="text" 
                    placeholder="Search by name, category or style tag..." 
                    value={assetSearchQuery}
                    onChange={(e) => setAssetSearchQuery(e.target.value)}
                    className="w-full bg-[#161616] border border-[#2A2A2A] rounded pl-9 pr-3 py-2 text-xs text-[#E4E4E4] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Grid */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">Smart indexed assets</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {assets.filter(a => {
                      const q = assetSearchQuery.toLowerCase();
                      return a.name.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
                    }).map(asset => (
                      <div 
                        key={asset.id} 
                        className="bg-[#161616] border border-[#2A2A2A] rounded overflow-hidden group relative flex flex-col justify-between hover:border-[#C5A059]/40 transition-all cursor-pointer"
                        onClick={() => handleDropAssetOnHero(asset.url)}
                        title="Click to apply to Hero Image"
                      >
                        <div className="aspect-square relative overflow-hidden bg-zinc-950">
                          <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-[9px] bg-[#C5A059] text-[#0A0A0A] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Apply to Hero</span>
                          </div>
                        </div>

                        <div className="p-2 space-y-1">
                          <p className="text-[9px] font-semibold text-zinc-300 truncate">{asset.name}</p>
                          <div className="flex flex-wrap gap-1">
                            {asset.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-[8px] bg-[#2A2A2A] text-zinc-400 px-1 rounded-full">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Version History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-5 text-left">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Version control history</span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Automatic snapshots record changes during visual sessions. Roll back or compare different edits instantly with zero loss of state.
                  </p>
                </div>

                <div className="relative border-l border-[#2A2A2A] pl-4 ml-2 py-2 space-y-5">
                  {snapshots.length === 0 ? (
                    <p className="text-[11px] text-zinc-500 italic">No snapshots logged yet.</p>
                  ) : (
                    snapshots.map((snap) => (
                      <div key={snap.id} className="relative space-y-1 group">
                        {/* Dot indicator */}
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2A2A2A] group-hover:bg-[#C5A059] border border-zinc-900 transition-colors"></div>
                        
                        <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono">
                          <span>{snap.timestamp}</span>
                          <span>by {snap.author}</span>
                        </div>
                        <p className="text-xs font-medium text-zinc-300">{snap.description}</p>
                        
                        <button
                          id={`btn-rollback-snap-${snap.id}`}
                          onClick={() => restoreSnapshot(snap)}
                          className="text-[9px] text-[#C5A059] hover:text-[#D4B372] font-bold uppercase tracking-wider block pt-1"
                        >
                          Restore State ↩
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Approvals Tab */}
            {activeTab === 'approvals' && (
              <div className="space-y-5 text-left">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Real-time signoffs</span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Provide structured governance checkpoints. Check off roles once client requirements have been verified or elements validated.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="bg-[#0A0A0A] p-4 rounded-xl border border-[#2A2A2A] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold font-mono text-zinc-400">
                    <span>APPROVAL COMPLETION</span>
                    <span className="text-[#C5A059]">
                      {Math.round((approvals.filter(a => a.checked).length / approvals.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-[#2A2A2A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#C5A059] h-full transition-all duration-500" 
                      style={{ width: `${(approvals.filter(a => a.checked).length / approvals.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {approvals.map((app) => (
                    <div 
                      key={app.id} 
                      className="p-3 bg-[#161616] border border-[#2A2A2A] rounded flex items-start gap-3 hover:border-[#C5A059]/40 transition-colors"
                    >
                      <input 
                        id={`chk-app-toggle-${app.id}`}
                        type="checkbox" 
                        checked={app.checked}
                        onChange={() => toggleApprovalCheckbox(app.id)}
                        className="w-4.5 h-4.5 text-[#C5A059] bg-[#0A0A0A] border-[#2A2A2A] rounded focus:ring-0 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{app.role}</p>
                        <p className="text-[10px] text-zinc-500">Signatory: {app.name}</p>
                        {app.checked && app.date && (
                          <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded mt-1 inline-block">
                            Stamped {app.date}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#0A0A0A]/30 rounded border border-[#2A2A2A]/60 text-[10px] text-zinc-500 text-center leading-relaxed">
                  * Live collaborators and reviewers are notified automatically when all stamps are checked off.
                </div>
              </div>
            )}

          </div>

        </aside>

        {/* Center Canvas Viewport */}
        <main className="flex-1 bg-[#0A0A0A] p-6 overflow-y-auto flex flex-col items-center justify-start relative min-h-0">
          
          {/* Subheader bar with tools */}
          <div className="w-full max-w-4xl bg-[#0F0F0F] border border-[#2A2A2A] p-3 rounded-xl flex items-center justify-between mb-6 shrink-0 z-10 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">Workspace tool:</span>
              <button 
                id="tool-btn-comment-pin"
                onClick={() => setIsAddingComment(!isAddingComment)}
                className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all font-semibold ${isAddingComment ? 'bg-[#C5A059] text-[#0A0A0A]' : 'bg-[#161616] text-[#E4E4E4] hover:border-[#C5A059]/40 border border-[#2A2A2A]'}`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAddingComment ? 'Click canvas to pin comment' : 'Pin Feedback Annotation'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500">Edit elements directly on canvas by clicking text nodes</span>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="w-full max-w-4xl flex-1 relative min-h-0 flex justify-center items-start">
            
            {/* The actual viewport container */}
            <div 
              ref={canvasRef}
              onClick={handleCanvasClick}
              className={`w-full bg-[#faf8f5] text-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden border border-[#2A2A2A] relative transition-all ${isAddingComment ? 'cursor-crosshair ring-2 ring-[#C5A059]/40' : ''}`}
              style={{ minHeight: '680px', fontFamily: activeMockup?.fontFamily || 'sans-serif' }}
            >
              {activeMockup ? (
                <>
                  {/* Canvas Header */}
                  <header className="px-10 py-5 border-b border-[#ebdcd0]/40 flex items-center justify-between" style={{ color: activeMockup.theme.textColor }}>
                    <div className="font-semibold tracking-widest text-sm" style={{ color: activeMockup.theme.primaryColor }}>
                      {activeMockup.logoText}
                    </div>
                    <nav className="flex items-center gap-6 text-xs font-semibold">
                      {activeMockup.headerLinks.map((link, i) => (
                        <span key={i} className="opacity-80 hover:opacity-100 cursor-pointer">{link}</span>
                      ))}
                    </nav>
                  </header>

                  {/* Canvas Hero */}
                  <div 
                    className="relative px-10 py-20 text-center flex flex-col items-center justify-center group overflow-hidden border-b border-[#ebdcd0]/20"
                    style={{ backgroundColor: activeMockup.theme.bgColor }}
                  >
                    
                    {/* Editable Headline */}
                    <div className="relative group cursor-pointer max-w-2xl text-center mb-4">
                      <h1 
                        className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight hover:ring-1 hover:ring-[#C5A059] hover:bg-[#C5A059]/5 px-2 py-1 rounded transition-all"
                        style={{ color: activeMockup.theme.primaryColor, fontFamily: activeMockup.fontFamily }}
                        onClick={(e) => { e.stopPropagation(); setEditingTextNode({ type: 'headline', text: activeMockup.hero.headline }); }}
                      >
                        {activeMockup.hero.headline}
                      </h1>
                    </div>

                    {/* Editable Subheadline */}
                    <div className="relative group cursor-pointer max-w-xl text-center mb-8">
                      <p 
                        className="text-xs sm:text-sm md:text-base hover:ring-1 hover:ring-[#C5A059] hover:bg-[#C5A059]/5 px-2 py-1 rounded transition-all leading-relaxed"
                        style={{ color: activeMockup.theme.textColor, opacity: 0.85 }}
                        onClick={(e) => { e.stopPropagation(); setEditingTextNode({ type: 'subheadline', text: activeMockup.hero.subheadline }); }}
                      >
                        {activeMockup.hero.subheadline}
                      </p>
                    </div>

                    {/* Editable Hero Image drop target */}
                    {activeMockup.hero.imageUrl && (
                      <div className="w-full max-w-md h-40 rounded-lg overflow-hidden border border-[#ebdcd0] mb-8 relative group/img shadow-sm">
                        <img src={activeMockup.hero.imageUrl} alt="Hero Wallpaper" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all">
                          <span className="text-[10px] text-white font-mono bg-black/75 px-3 py-1.5 rounded-full border border-zinc-800">Drag Assets here to swap</span>
                        </div>
                      </div>
                    )}

                    {/* Editable CTA button */}
                    <div className="relative group cursor-pointer">
                      <button 
                        className="px-8 py-3.5 rounded text-xs uppercase tracking-widest font-bold transition-all shadow-sm text-white"
                        style={{ backgroundColor: activeMockup.theme.primaryColor }}
                        onClick={(e) => { e.stopPropagation(); setEditingTextNode({ type: 'ctaText', text: activeMockup.hero.ctaText }); }}
                      >
                        {activeMockup.hero.ctaText}
                      </button>
                    </div>

                  </div>

                  {/* Canvas Content Sections */}
                  <div className="space-y-12 py-16">
                    {activeMockup.sections.map((sect) => (
                      <div key={sect.id} className="px-10 py-6 border-b border-[#ebdcd0]/10 last:border-b-0">
                        <div className="max-w-2xl mx-auto text-center mb-10">
                          {/* Editable Section Title */}
                          <h2 
                            className="text-2xl sm:text-3xl font-medium tracking-tight hover:ring-1 hover:ring-[#C5A059] hover:bg-[#C5A059]/5 px-2 py-1 rounded cursor-pointer transition-all inline-block"
                            style={{ color: activeMockup.theme.primaryColor, fontFamily: activeMockup.fontFamily }}
                            onClick={(e) => { e.stopPropagation(); setEditingTextNode({ type: 'sectionTitle', sectionId: sect.id, text: sect.title }); }}
                          >
                            {sect.title}
                          </h2>
                          
                          {/* Editable Section Subtitle */}
                          {sect.subtitle && (
                            <p 
                              className="text-xs hover:ring-1 hover:ring-[#C5A059] hover:bg-[#C5A059]/5 px-2 py-1 rounded cursor-pointer transition-all mt-2"
                              style={{ color: activeMockup.theme.textColor, opacity: 0.7 }}
                              onClick={(e) => { e.stopPropagation(); setEditingTextNode({ type: 'sectionSubtitle', sectionId: sect.id, text: sect.subtitle || '' }); }}
                            >
                              {sect.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Layout grid cards */}
                        {sect.items && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {sect.items.map((item, itemIdx) => (
                              <div 
                                key={itemIdx} 
                                className="p-6 rounded-lg text-left border border-[#ebdcd0]/35 flex flex-col justify-between"
                                style={{ backgroundColor: activeMockup.theme.cardBg || '#ffffff' }}
                              >
                                <div>
                                  <span className="text-lg font-bold block mb-3" style={{ color: activeMockup.theme.accentColor }}>✦</span>
                                  {/* Editable Card Title */}
                                  <h4 
                                    className="text-sm font-bold tracking-tight hover:ring-1 hover:ring-[#C5A059] hover:bg-[#C5A059]/5 px-1 py-0.5 rounded cursor-pointer transition-all mb-2"
                                    style={{ color: activeMockup.theme.primaryColor }}
                                    onClick={(e) => { e.stopPropagation(); setEditingTextNode({ type: 'sectionItemTitle', sectionId: sect.id, itemId: itemIdx, text: item.title }); }}
                                  >
                                    {item.title}
                                  </h4>
                                  
                                  {/* Editable Card Desc */}
                                  <p 
                                    className="text-xs hover:ring-1 hover:ring-[#C5A059] hover:bg-[#C5A059]/5 px-1 py-0.5 rounded cursor-pointer transition-all leading-relaxed"
                                    style={{ color: activeMockup.theme.textColor, opacity: 0.8 }}
                                    onClick={(e) => { e.stopPropagation(); setEditingTextNode({ type: 'sectionItemDesc', sectionId: sect.id, itemId: itemIdx, text: item.description }); }}
                                  >
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Canvas Footer */}
                  <footer className="px-10 py-12 border-t border-[#ebdcd0]/30 text-center text-xs" style={{ color: activeMockup.theme.textColor, opacity: 0.7 }}>
                    <p>{activeMockup.footer.text}</p>
                  </footer>

                  {/* Floating Comments / Pins Markers on canvas */}
                  {comments.map((comment) => (
                    <div 
                      key={comment.id}
                      className="absolute group z-10"
                      style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
                    >
                      {/* Anchor Comment Pin circle */}
                      <button 
                        id={`btn-canvas-comment-pin-${comment.id}`}
                        onClick={(e) => { e.stopPropagation(); setActiveCommentId(activeCommentId === comment.id ? null : comment.id); }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg ring-2 ring-white border transition-all ${comment.avatarColor} hover:scale-110`}
                      >
                        {comment.authorInitials}
                      </button>

                      {/* Comment hover card tooltip */}
                      {activeCommentId === comment.id && (
                        <div className="absolute left-7 top-0 w-64 bg-white rounded-lg p-3 shadow-xl border border-[#ebdcd0] text-left text-xs z-30 text-zinc-800">
                          <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 mb-2">
                            <span className="font-bold text-gray-800">{comment.author}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{comment.text}</p>
                          <div className="pt-2 flex justify-end gap-1">
                            <button 
                              id={`btn-resolve-comment-${comment.id}`}
                              onClick={(e) => { e.stopPropagation(); setComments(prev => prev.filter(c => c.id !== comment.id)); }}
                              className="text-[9px] text-[#C5A059] uppercase font-bold"
                            >
                              Resolve
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Simulated Moving Cursors */}
                  {collaborators.map(collab => (
                    <div 
                      key={collab.id}
                      className="absolute pointer-events-none transition-all duration-300 z-10 text-[9px] font-semibold flex items-center gap-1 font-mono"
                      style={{ left: `${collab.cursorX}%`, top: `${collab.cursorY}%` }}
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-white drop-shadow">
                        <path d="M4.5,3 L19.5,12 L12,13.5 L13.5,21 L4.5,3 Z" />
                      </svg>
                      <span className={`px-1.5 py-0.5 rounded text-white shadow ${collab.avatarColor}`}>{collab.name.split(' ')[0]}</span>
                    </div>
                  ))}

                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-[#C5A059]" />
                  <p className="text-sm font-semibold font-mono">Compiling responsive elements layout from server...</p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* Text node Edit Overlay Popup modal */}
      <AnimatePresence>
        {editingTextNode && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 text-left">
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div>
                <span className="text-[9px] font-mono text-[#C5A059] uppercase tracking-wider font-bold">Element Property Panel</span>
                <h3 className="text-sm font-bold text-[#E4E4E4] mt-0.5 uppercase font-sans">Modify copy and typography nodes</h3>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-400 block uppercase font-semibold">Copy Text</label>
                <textarea 
                  id="inp-edit-node-text"
                  value={editingTextNode.text}
                  onChange={(e) => setEditingTextNode({ ...editingTextNode, text: e.target.value })}
                  className="w-full h-32 bg-[#0A0A0A] border border-[#2A2A2A] rounded p-3 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs font-bold uppercase tracking-wider">
                <button 
                  id="btn-cancel-node-edit"
                  onClick={() => setEditingTextNode(null)}
                  className="px-4 py-2 border border-[#2A2A2A] text-zinc-400 hover:text-white rounded"
                >
                  Cancel
                </button>
                <button 
                  id="btn-save-node-edit"
                  onClick={saveNodeTextChange}
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4B372] text-[#0A0A0A] rounded-full"
                >
                  Apply Tweak
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Export HTML / CSS Modal */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 text-left">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 max-w-3xl w-full h-[85vh] flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-1.5 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">Luxe Export Bundle</span>
                  <button 
                    id="btn-close-export"
                    onClick={() => setShowExportModal(false)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-[#2A2A2A] border border-transparent hover:border-[#2A2A2A]"
                  >
                    Close [x]
                  </button>
                </div>
                <h3 className="text-lg font-bold text-[#E4E4E4] font-sans">One-Click Web Handoff</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Below is fully responsive, pristine HTML/CSS structural source code representing your customized layout. Includes Tailwind-compatible CSS custom variables.
                </p>
              </div>

              <div className="flex-1 overflow-hidden my-4 grid grid-cols-2 gap-4 text-xs">
                
                {/* HTML Panel */}
                <div className="flex flex-col h-full overflow-hidden border border-[#2A2A2A] rounded-lg">
                  <div className="bg-[#0A0A0A] px-4 py-2.5 flex items-center justify-between border-b border-[#2A2A2A] font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    <span>Clean Responsive HTML & Styles</span>
                  </div>
                  <pre className="flex-1 overflow-auto bg-[#050505] p-4 text-[11px] font-mono text-[#b5a290] leading-relaxed select-all">
                    {generateExportHTMLAndCSS().html}
                  </pre>
                </div>

                {/* Tokens Panel */}
                <div className="flex flex-col h-full overflow-hidden border border-[#2A2A2A] rounded-lg">
                  <div className="bg-[#0A0A0A] px-4 py-2.5 flex items-center justify-between border-b border-[#2A2A2A] font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    <span>Figma-Compatible JSON Design Tokens</span>
                  </div>
                  <pre className="flex-1 overflow-auto bg-[#050505] p-4 text-[11px] font-mono text-[#4da6ff] leading-relaxed select-all">
                    {generateExportHTMLAndCSS().css}
                  </pre>
                </div>

              </div>

              <div className="flex items-center justify-between pt-2 shrink-0 border-t border-[#2A2A2A]">
                <span className="text-[11px] text-zinc-500 font-mono">SOC-2 Bank Grade Cryptographic Export Engine</span>
                <div className="flex gap-2 text-xs font-bold uppercase">
                  <button 
                    id="btn-copy-code"
                    onClick={handleCopyCode}
                    className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#D4B372] text-[#0A0A0A] rounded-full flex items-center gap-2 transition-all"
                  >
                    {exportCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied HTML!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy HTML to Clipboard</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
