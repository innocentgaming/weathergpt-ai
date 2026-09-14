"use client";

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  RefreshCw,
  MessageSquare,
} from 'lucide-react';

import DisasterSimulationModal from './components/DisasterSimulationModal';
import EmergencyCenterModal from './components/EmergencyCenterModal';
import ClimateInsightsModal from './components/ClimateInsightsModal';
import ReportGeneratorModal from './components/ReportGeneratorModal';
import AuthModal from './components/AuthModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { AlertsView } from './components/alerts/AlertsView';
import { RouteView } from './components/route/RouteView';
import { SettingsView } from './components/settings/SettingsView';
import { ChatDrawer } from './components/chat/ChatDrawer';

import { useWeatherData } from './hooks/useWeatherData';
import { useSpeech } from './hooks/useSpeech';
import { useChatSession } from './hooks/useChatSession';

import {
  ActiveTab,
  UserRole,
  UserProfile,
} from './lib/types';
import {
  getStoredUser,
  setStoredUser,
  removeStoredUser,
  getStoredRole,
  setStoredRole,
} from './lib/auth';
import { DEFAULT_LOCATION } from './constants/location';
import {
  SupportedLanguage,
  getSavedLanguage,
  saveLanguagePreference,
} from './i18n';

import { ThemeToggle } from './components/ThemeToggle';
import { WeatherDebugPanel } from './components/WeatherDebugPanel';

// Dynamically import WeatherMap with SSR disabled (Leaflet requires window)
const WeatherMap = dynamic(() => import('./components/WeatherMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full items-center justify-center bg-surface-container-lowest text-outline">
      <RefreshCw className="h-8 w-8 animate-spin mr-3 text-primary" />
      Loading Interactive Weather Map...
    </div>
  ),
});

export default function WeatherGPTApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => getSavedLanguage());
  const [currentMode, setCurrentMode] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      const user = getStoredUser();
      if (user?.role) return user.role;
      const savedRole = getStoredRole();
      if (savedRole) return savedRole;
    }
    return 'general';
  });
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      return getStoredUser();
    }
    return null;
  });

  const [searchLocation, setSearchLocation] = useState<string>(DEFAULT_LOCATION.fullName);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [simModalOpen, setSimModalOpen] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [climateModalOpen, setClimateModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  // Custom Hooks
  const {
    location,
    weather,
    risk,
    activeModel,
    loading: weatherLoading,
    error: weatherError,
    changeLocation,
    changeModel,
    refresh: refreshWeather,
  } = useWeatherData(DEFAULT_LOCATION.fullName);


  const {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useSpeech(currentLang);

  const {
    messages,
    loading: chatLoading,
    sendMessage,
    clearChat,
  } = useChatSession({
    userRole: currentMode,
    language: currentLang,
    currentLocation: location,
  });

  const handleLanguageChange = useCallback((lang: SupportedLanguage) => {
    setCurrentLang(lang);
    saveLanguagePreference(lang);
  }, []);

  const handleModeChange = useCallback((mode: UserRole) => {
    setCurrentMode(mode);
    setStoredRole(mode);
  }, []);

  const handleUseCurrentLocation = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude.toFixed(4)},${pos.coords.longitude.toFixed(4)}`;
          setSearchLocation(coords);
          changeLocation(coords);
        },
        () => {
          changeLocation(DEFAULT_LOCATION.fullName);
        }
      );
    }
  }, [changeLocation]);

  const handleVoiceQuery = useCallback(() => {
    startListening((transcript) => {
      setSearchLocation(transcript);
      changeLocation(transcript);
    });
  }, [startListening, changeLocation]);

  const handleSendPromptFromDashboard = useCallback(
    (promptText: string) => {
      setIsChatOpen(true);
      sendMessage(promptText);
    },
    [sendMessage]
  );

  return (
    <div className="app-shell flex w-full min-h-screen bg-background font-sans text-on-surface antialiased selection:bg-emerald-500 selection:text-white">
      {/* 1. SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col justify-between w-72 shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800/80 shadow-[4px_0_24px_rgba(15,23,42,0.03)] z-50 select-none sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 flex flex-col">
          {/* Logo Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md shadow-emerald-900/10 ring-1 ring-black/5 shrink-0 bg-slate-900 text-emerald-400 flex items-center justify-center group cursor-pointer transition-transform hover:scale-105 duration-200">
              <img
                alt="WeatherGPT Logo"
                className="w-full h-full object-cover relative z-10"
                src="https://lh3.googleusercontent.com/aida/AEtjO1V9jb9vJF87ZFEsIdfsIo_9mEjQZZXYYEtJcdjdaTsjOVV9D9d9OKY6zxFYlzSexisKi39DMm0wAM3RkOpCfACqow3XbOisQ5JeM-7yFuEu6EnxCmR2SFknbEJMICptZ6KVQerKa5gd92gm0W6YI4NG-t9oOfprAe-G2oHdj9RXEy5nEoZ82iKAnYSdeAyLM7uD2m5YhS4zywpQ_22jCIpvkKjYdluIyen0iPdLMC_F15MKvV5W6gLedJ4"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="material-symbols-outlined text-[26px] absolute">cyclone</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight">WeatherGPT</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800 uppercase">
                  AI 3.5
                </span>
              </div>
              <span className="font-mono text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wider">
                IMD COPILOT • MoES
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="pt-5">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 block mb-2">
              Intelligence Core
            </span>
            <nav className="flex flex-col gap-1">
              {[
                { id: 'dashboard', label: 'Live Telemetry', icon: 'sensors' },
                { id: 'map', label: 'Radar & Maps', icon: 'radar' },
                { id: 'route', label: 'Route Intel', icon: 'alt_route' },
                { id: 'alerts', label: 'Severe Alerts', icon: 'warning' },
                { id: 'settings', label: 'System Settings', icon: 'tune' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left group ${
                    activeTab === item.id
                      ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                        activeTab === item.id
                          ? 'text-emerald-400'
                          : 'text-slate-400 group-hover:text-emerald-600'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.id === 'dashboard' && (
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                    </span>
                  )}
                  {item.id === 'alerts' && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shadow-xs">
                      2
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Operational Modes Rail */}
          <div className="pt-6">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 block mb-2">
              Live Vector Engines
            </span>
            <div className="space-y-1.5">
              {[
                { id: 'farmer', label: 'Kisan / Agri Synoptic', icon: 'agriculture', tag: 'active-ping', color: 'emerald' },
                { id: 'aviation', label: 'Aviation Synoptic', icon: 'flight', tag: 'FL350', color: 'sky' },
                { id: 'smartcity', label: 'Smart City Matrix', icon: 'location_city', tag: 'METRO', color: 'cyan' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModeChange(m.id as UserRole)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                    currentMode === m.id
                      ? 'bg-slate-100 dark:bg-slate-800 border-emerald-400/80 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-lg ${
                        m.color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : m.color === 'sky'
                          ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                          : 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300'
                      } flex items-center justify-center material-symbols-outlined text-[15px]`}
                    >
                      {m.icon}
                    </span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{m.label}</span>
                  </div>
                  {m.tag === 'active-ping' ? (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-slate-400">{m.tag}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Tools */}
          <div className="pt-6">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 block mb-2">
              Advanced Intelligence Tools
            </span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSimModalOpen(true)}
                className="flex w-full items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">cyclone</span>
                <span>Disaster Simulator</span>
              </button>
              <button
                onClick={() => setEmergencyModalOpen(true)}
                className="flex w-full items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-600/10 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                <span>Emergency Center</span>
              </button>
              <button
                onClick={() => setClimateModalOpen(true)}
                className="flex w-full items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>Climate Insights</span>
              </button>
              <button
                onClick={() => setReportModalOpen(true)}
                className="flex w-full items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">description</span>
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Mini Widget: Sky Lens */}
        <div className="p-4 mx-3 mb-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all duration-300">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center material-symbols-outlined text-[17px]">
              center_focus_weak
            </span>
            <span className="font-display font-semibold text-xs tracking-tight text-white">Photo Weather AI</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
            Upload sky snapshots for barometric &amp; cloud genus classification.
          </p>
          <Link
            href="/photo-analysis"
            className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
            <span>Analyze Sky Snap</span>
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER & TOP HEADER */}
      <div className="main-content flex-1 min-w-0 flex flex-col min-h-screen bg-background w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 shadow-xs flex items-center justify-between px-6 w-full shrink-0">
          {/* Universal Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-xl mr-3">
            <div className="relative w-full flex items-center bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all shadow-xs">
              <span className="material-symbols-outlined text-slate-400 text-[19px] mr-2">search</span>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    changeLocation(searchLocation);
                  }
                }}
                placeholder="Search Observatory, AWS Station, City (e.g., Pune, IMD-411005)..."
                className="bg-transparent border-0 outline-none w-full text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-medium"
              />
              <button
                onClick={handleUseCurrentLocation}
                disabled={weatherLoading}
                title="Acquire GPS Location"
                className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600 text-[11px] font-mono font-medium hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-300 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[14px] text-emerald-600 dark:text-emerald-400">my_location</span>
                <span>GPS</span>
              </button>
            </div>
          </div>

          {/* Right Header Strip */}
          <div className="flex items-center gap-3">
            {/* WIS Telemetry */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono text-xs shadow-sm hover:border-emerald-300 transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              </span>
              <span>
                WIS 2.0 / MQTT: <strong className="font-bold text-emerald-950 dark:text-emerald-200">ACTIVE {weather?.wis2_telemetry?.latency_ms ?? 12}ms</strong>
              </span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 transition-colors">
              <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[17px]">translate</span>
              <select
                value={currentLang}
                onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-transparent border-0 outline-none text-xs font-semibold cursor-pointer pr-1"
              >
                <option value="en">EN (English)</option>
                <option value="hi">HI (हिंदी)</option>
                <option value="mr">MR (मराठी)</option>
                <option value="ta">TA (தமிழ்)</option>
                <option value="kn">KN (ಕನ್ನಡ)</option>
                <option value="bn">BN (বাংলা)</option>
                <option value="pa">PA (ਪੰਜਾਬੀ)</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Divider */}
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            {/* User Profile Pill */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2.5 pl-1 group cursor-pointer hover:opacity-90 transition text-left"
            >
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                  {currentUser ? currentUser.name : 'Guest Explorer'}
                </span>
                <span className="font-mono text-[10px] text-slate-400 tracking-wider">
                  {currentUser ? currentUser.role.toUpperCase() : 'IMD-CIVIL-PUBLIC'}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-700 text-white flex items-center justify-center shadow-md shadow-slate-900/10 ring-2 ring-white dark:ring-slate-800 group-hover:ring-emerald-300 transition-all">
                <span className="material-symbols-outlined text-[19px]">person</span>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Strip */}
        <div className="md:hidden flex bg-surface-container-lowest border-b border-surface-container-high p-2 overflow-x-auto whitespace-nowrap select-none shrink-0">
          <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'dashboard' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Live Telemetry</button>
          <button onClick={() => setActiveTab('map')} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'map' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Radar &amp; Maps</button>
          <button onClick={() => setActiveTab('route')} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'route' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Route Intel</button>
          <button onClick={() => setActiveTab('alerts')} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'alerts' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Severe Alerts</button>
          <button onClick={() => setActiveTab('settings')} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${activeTab === 'settings' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Settings</button>
        </div>

        {/* Dynamic Main View Router */}
        <main className="flex-1 min-w-0 w-full bg-background">
          {activeTab === 'dashboard' && (
            <DashboardView
              weather={weather}
              risk={risk}
              loading={weatherLoading}
              error={weatherError}
              activeModel={activeModel}
              currentMode={currentMode}
              currentLang={currentLang}
              onSelectHub={(hub) => {
                setSearchLocation(hub);
                changeLocation(hub);
              }}
              onSelectModel={changeModel}
              onSelectMode={handleModeChange}
              onRefresh={refreshWeather}
              onVoiceQuery={handleVoiceQuery}
              onSendChatPrompt={handleSendPromptFromDashboard}
            />
          )}

          {activeTab === 'map' && (
            <div className="p-4 lg:p-6 w-full flex flex-col gap-4">
              <WeatherMap
                searchCenter={[
                  weather?.coordinates?.lat || DEFAULT_LOCATION.lat,
                  weather?.coordinates?.lon || DEFAULT_LOCATION.lon,
                ]}
                activeLocation={weather?.location || DEFAULT_LOCATION.fullName}
                onMarkerClick={(loc) => {
                  setSearchLocation(loc);
                  changeLocation(loc);
                }}
              />
            </div>
          )}

          {activeTab === 'route' && (
            <RouteView initialFrom={weather?.location || 'Nashik'} initialTo="Mumbai" />
          )}

          {activeTab === 'alerts' && (
            <AlertsView
              weather={weather}
              loading={weatherLoading}
              error={weatherError}
              onRefresh={refreshWeather}
              onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              currentLang={currentLang}
              currentMode={currentMode}
              activeModel={activeModel}
              currentUser={currentUser}
              onLanguageChange={handleLanguageChange}
              onModeChange={handleModeChange}
              onModelChange={changeModel}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Floating Global Copilot Button */}
      <aside aria-label="Synoptic Copilot Chat Trigger" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-all hover:scale-110 active:scale-95 group cursor-pointer"
          title="Launch WeatherGPT Intelligent Copilot"
        >
          <span className="material-symbols-outlined text-[26px] group-hover:rotate-12 transition-transform">chat_bubble</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </span>
        </button>
      </aside>

      {/* Slide-Over AI Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        loading={chatLoading}
        currentLocation={location}
        currentRole={currentMode}
        currentLang={currentLang}
        onSendMessage={sendMessage}
        onClearChat={clearChat}
        isListening={isListening}
        isSpeaking={isSpeaking}
        onStartListening={() => {
          startListening((transcript) => {
            sendMessage(transcript);
          });
        }}
        onStopListening={stopListening}
        onSpeakText={speak}
        onStopSpeaking={stopSpeaking}
      />

      {/* Development Mode Weather Data Debug Panel */}
      <WeatherDebugPanel weather={weather} loading={weatherLoading} />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser ? {
          name: currentUser.name,
          email: currentUser.email || '',
          role: currentUser.role as 'general' | 'farmer',
          isGuest: !currentUser.email,
        } : null}
        onLogin={(user) => {
          const userProfile: UserProfile = {
            name: user.name,
            email: user.email,
            role: (user.role as UserRole) || 'general',
          };
          setCurrentUser(userProfile);
          setStoredUser(userProfile);
          if (user.role) handleModeChange(user.role as UserRole);
          setAuthModalOpen(false);
        }}
        onLogout={() => {
          setCurrentUser(null);
          removeStoredUser();
          handleModeChange('general');
          setAuthModalOpen(false);
        }}
        lang={currentLang}
      />

      <DisasterSimulationModal
        isOpen={simModalOpen}
        onClose={() => setSimModalOpen(false)}
        lang={currentLang}
      />

      <EmergencyCenterModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        location={weather?.location || DEFAULT_LOCATION.fullName}
        lang={currentLang}
      />

      <ClimateInsightsModal
        isOpen={climateModalOpen}
        onClose={() => setClimateModalOpen(false)}
        location={weather?.location || DEFAULT_LOCATION.fullName}
        lang={currentLang}
      />

      <ReportGeneratorModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        location={weather?.location || DEFAULT_LOCATION.fullName}
        weatherData={weather}
        lang={currentLang}
      />
    </div>
  );
}
