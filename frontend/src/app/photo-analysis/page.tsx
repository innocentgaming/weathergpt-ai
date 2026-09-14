'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Camera,
  Upload,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Send,
  Sparkles,
  Info,
  RefreshCw,
  Compass,
  Globe,
  X,
  FlipHorizontal
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

import { 
  getSavedLanguage, 
  saveLanguagePreference, 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES,
  t 
} from '../i18n';
import { api } from '../lib/api';

interface PhotoAnalysisResult {
  analysis_id: string;
  image_metadata: {
    width: number;
    height: number;
    format: string;
    size_kb: number;
  };
  photo_observation: {
    weather_condition: string;
    precipitation_visible: boolean;
    cloud_condition: string;
    visibility_condition: string;
    road_condition: string;
    flooding_indicator: boolean;
    wind_effect_indicator: string;
    lightning_visible: boolean;
    fog_visible: boolean;
    haze_visible: boolean;
    environmental_hazards: string[];
    confidence: number;
    observations: string[];
    limitations: string[];
  };
  live_weather?: {
    location: string;
    current?: {
      temp: number;
      feels_like: number;
      condition: string;
      rain_probability: number;
      wind_speed: number;
      humidity: number;
      source: string;
    };
  };
  weather_consistency: {
    status: 'CONSISTENT' | 'PARTIALLY_CONSISTENT' | 'INCONSISTENT' | 'INSUFFICIENT_DATA';
    summary: string;
    agreements: string[];
    discrepancies: string[];
    confidence: number;
  };
  risk_assessment: {
    score: number;
    category: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
    color: string;
    base_weather_score: number;
    visual_factors: Array<{ factor: string; weight: number; icon: string }>;
    explanation: string;
  };
  hazards: string[];
  ai_explanation: string;
  recommendations: string[];
  confidence: number;
  mode: string;
  data_sources: string;
  scientific_disclaimer: string;
  analyzed_at: string;
}

export default function PhotoAnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [locationInput, setLocationInput] = useState<string>('Nashik');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<PhotoAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      return getSavedLanguage();
    }
    return 'en';
  });
  
  // Q&A State
  const [questionInput, setQuestionInput] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Array<{ q: string; a: string }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Live Camera Viewfinder State
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraLoading, setCameraLoading] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  // Stop camera tracks cleanly on component unmount
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [mediaStream]);

  // Start Camera Stream
  const startCamera = async (targetFacing: 'environment' | 'user' = facingMode) => {
    setIsCameraOpen(true);
    setCameraLoading(true);
    setCameraError(null);

    if (mediaStream) {
      mediaStream.getTracks().forEach((t) => t.stop());
      setMediaStream(null);
    }

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Your browser does not support live camera streaming. Please use the device camera file picker.');
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: targetFacing },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
      } catch (modeErr) {
        console.warn(`Could not open camera with facingMode=${targetFacing}, falling back to default webcam:`, modeErr);
        // Fallback for laptop front webcams where facingMode 'environment' fails
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.warn('Video play warning:', playErr);
        }
      }
    } catch (err: unknown) {
      console.error('Camera stream initialization error:', err);
      const msg = err instanceof Error ? err.message : 'Camera access was denied or is unavailable on this device.';
      setCameraError(msg);
    } finally {
      setCameraLoading(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((t) => t.stop());
      setMediaStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
    setCameraError(null);
    setCameraLoading(false);
  };

  // Capture Photo Frame from Video
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setCameraError('Camera stream is still starting. Please try in a moment.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError('Failed to capture snapshot from camera.');
          return;
        }
        const capturedFile = new File([blob], `weather-lens-${Date.now()}.jpg`, { type: 'image/jpeg' });
        handleFileChange(capturedFile);
        stopCamera();
      },
      'image/jpeg',
      0.95
    );
  };

  // Toggle between front and rear cameras
  const toggleFacingMode = () => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    startCamera(next);
  };

  // User clicked "Take Photo" button
  const handleTakePhotoClick = () => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      startCamera(facingMode);
    } else {
      cameraInputRef.current?.click();
    }
  };

  // Handle Image Selection
  const handleFileChange = (file: File) => {
    setErrorMsg(null);
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMsg('Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 10 MB limit.');
      return;
    }
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAnalysisResult(null);
    setChatHistory([]);
  };

  // Execute Analysis
  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMsg('Please upload or capture a photo first.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setLoadingStep('Uploading image & validating MIME headers...');

    try {
      setTimeout(() => setLoadingStep('Analyzing visible physical cues with Vision AI...'), 500);
      setTimeout(() => setLoadingStep('Retrieving live station telemetry & correlating...'), 1100);
      setTimeout(() => setLoadingStep('Synthesizing photo-enhanced risk score...'), 1600);

      const formData = new FormData();
      formData.append('file', selectedImage);
      if (locationInput.trim()) {
        formData.append('location', locationInput.trim());
      }
      formData.append('mode', 'demo');

      const data = await api.post<PhotoAnalysisResult>('/api/photo-analysis/analyze', formData);
      setAnalysisResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error occurred during photo weather analysis.';
      setErrorMsg(msg);
    } finally {
      setIsAnalyzing(false);
      setLoadingStep('');
    }
  };

  // Handle Contextual Question
  const handleAskQuestion = async (qText?: string) => {
    const q = qText || questionInput;
    if (!q.trim() || !analysisResult) return;

    setIsAsking(true);
    try {
      interface AskResponse {
        answer: string;
      }
      const data = await api.post<AskResponse>('/api/photo-analysis/ask', {
        analysis_id: analysisResult.analysis_id,
        question: q.trim(),
        lang: currentLang,
      });

      setChatHistory((prev) => [
        ...prev,
        { q: q.trim(), a: data.answer || 'No analysis available.' },
      ]);
      setQuestionInput('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to retrieve answer';
      setChatHistory((prev) => [
        ...prev,
        { q: q.trim(), a: `⚠️ ${msg}` },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased p-4 md:p-8">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition flex items-center gap-2 text-xs font-semibold text-slate-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                {t('photo.title', currentLang, 'Photo Weather Intelligence')}
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Multimodal AI
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                {t('photo.subtitle', currentLang, 'Visual atmospheric observation correlated with verified meteorological station telemetry')}
              </p>
            </div>
          </div>
        </div>

        {/* Right Header: Language Selector & Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <select
              value={currentLang}
              onChange={(e) => {
                const l = e.target.value as SupportedLanguage;
                setCurrentLang(l);
                saveLanguagePreference(l);
              }}
              className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer shadow-xs"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle variant="icon" />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload & Options */}
        <div className="lg:col-span-5 space-y-5">
          {/* Upload Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h2 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Upload className="h-4 w-4 text-emerald-400" />
              Upload or Capture Photo
            </h2>

            {/* Hidden Inputs */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            />

            {/* Upload Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 transition"
              >
                <Upload className="h-4 w-4 text-emerald-400" />
                Upload Photo
              </button>
              <button
                type="button"
                onClick={handleTakePhotoClick}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 transition hover:border-cyan-500/50 active:scale-[0.98] cursor-pointer shadow-xs"
              >
                <Camera className="h-4 w-4 text-cyan-400" />
                {t('take_btn', currentLang, 'Take Photo')}
              </button>
            </div>

            {/* Preview Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition min-h-[190px] ${
                previewUrl ? 'border-emerald-500/50 bg-slate-950/60' : 'border-slate-800 hover:border-slate-700 bg-slate-950/30'
              }`}
            >
              {previewUrl ? (
                <div className="relative w-full text-center">
                  <img
                    src={previewUrl}
                    alt="Uploaded Weather"
                    className="max-h-48 mx-auto rounded-lg object-cover shadow-md border border-slate-800"
                  />
                  <p className="text-[11px] text-slate-400 mt-2">
                    {selectedImage?.name || 'Photo Ready'} (Click to replace)
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className="h-10 w-10 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-medium text-slate-300">Drop an image here, or browse</p>
                  <p className="text-[11px] text-slate-500">Supports JPG, PNG, WEBP up to 10 MB</p>
                </div>
              )}
            </div>

            {/* Location Input */}
            <div className="mt-4 space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Location Correlation (Optional)</span>
                <span className="text-[10px] text-slate-500">Links live station telemetry</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g. Nashik, Mumbai, Pune, Delhi, Lonavala"
                  className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setLocationInput('Nashik')}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 rounded-xl border border-slate-700"
                >
                  Nashik
                </button>
                <button
                  type="button"
                  onClick={() => setLocationInput('')}
                  className="px-2.5 py-1.5 bg-slate-800/60 hover:bg-slate-800 text-[11px] font-semibold text-slate-400 rounded-xl border border-slate-700"
                >
                  Skip
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-xs text-red-400">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Analyze Button */}
            <button
              type="button"
              disabled={!selectedImage || isAnalyzing}
              onClick={handleAnalyze}
              className={`w-full mt-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
                isAnalyzing || !selectedImage
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold shadow-emerald-500/20'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {loadingStep || 'Analyzing Weather Photo...'}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze Weather from Photo
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Analysis Intelligence Output */}
        <div className="lg:col-span-7 space-y-5">
          {analysisResult ? (
            <>
              {/* Card 1: Key Findings & Consistency Badge */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                      Analyzed Condition
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 capitalize flex items-center gap-2">
                      {analysisResult.photo_observation.weather_condition.replace('_', ' ')}
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {analysisResult.confidence}% Visual Confidence
                      </span>
                    </h3>
                  </div>

                  {/* Consistency Badge */}
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                      Live Telemetry Agreement
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        analysisResult.weather_consistency.status === 'CONSISTENT'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : analysisResult.weather_consistency.status === 'PARTIALLY_CONSISTENT'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}
                    >
                      {analysisResult.weather_consistency.status === 'CONSISTENT' && <CheckCircle2 className="h-3.5 w-3.5" />}
                      {analysisResult.weather_consistency.status === 'PARTIALLY_CONSISTENT' && <AlertTriangle className="h-3.5 w-3.5" />}
                      {analysisResult.weather_consistency.status === 'INCONSISTENT' && <XCircle className="h-3.5 w-3.5" />}
                      {analysisResult.weather_consistency.status}
                    </span>
                  </div>
                </div>

                {/* Consistency Explanation */}
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  {analysisResult.weather_consistency.summary}
                </p>

                {/* Visual Observation Badges */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Cloud Deck</span>
                    <span className="font-semibold text-slate-200 capitalize">
                      {analysisResult.photo_observation.cloud_condition.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Road Pavement</span>
                    <span className="font-semibold text-slate-200 capitalize">
                      {analysisResult.photo_observation.road_condition.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Optical Visibility</span>
                    <span className="font-semibold text-slate-200 capitalize">
                      {analysisResult.photo_observation.visibility_condition.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Specific Visual Observations */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold text-slate-300 block">Visual Physical Cues:</span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {analysisResult.photo_observation.observations.map((obs, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card 2: Photo-Enhanced Risk Gauge */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-amber-400" />
                    <h4 className="text-sm font-bold text-slate-200">Photo-Enhanced Weather Risk</h4>
                  </div>
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-extrabold uppercase border ${
                      analysisResult.risk_assessment.category === 'SEVERE'
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : analysisResult.risk_assessment.category === 'HIGH'
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : analysisResult.risk_assessment.category === 'MODERATE'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {analysisResult.risk_assessment.category} ({analysisResult.risk_assessment.score}/100)
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  {analysisResult.risk_assessment.explanation}
                </p>

                {/* Visual Risk Factors */}
                {analysisResult.risk_assessment.visual_factors.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400">Active Visual Threat Drivers:</span>
                    <div className="space-y-1.5">
                      {analysisResult.risk_assessment.visual_factors.map((vf, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs"
                        >
                          <span className="text-slate-300">{vf.factor}</span>
                          <span className="text-amber-400 font-bold font-mono">+{vf.weight} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card 3: Actionable Safety Recommendations */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Actionable Operational Advisories
                </h4>
                <div className="space-y-2">
                  {analysisResult.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-xs text-slate-200 leading-relaxed"
                    >
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Contextual Follow-Up Q&A */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    Ask WeatherGPT About This Photo
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">Grounded Q&A</span>
                </div>

                {/* Quick Prompts */}
                <div className="flex flex-wrap gap-1.5">
                  {['Is it safe to drive right now?', 'Should I go for an outdoor walk?', 'Will this rain continue?'].map((quickQ, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAskQuestion(quickQ)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-[11px] text-slate-300 transition"
                    >
                      {quickQ}
                    </button>
                  ))}
                </div>

                {/* Q&A Thread */}
                {chatHistory.length > 0 && (
                  <div className="space-y-2.5 pt-2 max-h-60 overflow-y-auto pr-1">
                    {chatHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs">
                        <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-slate-200 font-medium">
                          <span className="text-[10px] text-cyan-400 block font-bold">You asked:</span>
                          {item.q}
                        </div>
                        <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-200 leading-relaxed">
                          <span className="text-[10px] text-emerald-400 block font-bold">WeatherGPT Answer:</span>
                          {item.a}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input Bar */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                    placeholder="Ask about road conditions, outdoor safety, or gear..."
                    className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    disabled={isAsking || !questionInput.trim()}
                    onClick={() => handleAskQuestion()}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Ask
                  </button>
                </div>
              </div>

              {/* Scientific Boundary Disclaimer */}
              <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-start gap-3 text-xs text-slate-400">
                <Info className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-slate-300">Scientific Boundary Disclaimer: </strong>
                  {analysisResult.scientific_disclaimer}
                </p>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[420px] space-y-3">
              <div className="h-14 w-14 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-500">
                <Camera className="h-7 w-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-300">No Photo Analyzed Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Upload or capture a sky photo on the left to see multimodal visual weather analysis in real time.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Live Camera Viewfinder Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-cyan-500/30 bg-slate-900 text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                    Live Atmospheric Camera
                    <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      LIVE
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Aim camera toward the sky, clouds, or horizon</p>
                </div>
              </div>
              <button
                type="button"
                onClick={stopCamera}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                aria-label="Close Camera"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Viewport Box */}
            <div className="relative bg-black flex items-center justify-center min-h-[340px] sm:min-h-[400px] overflow-hidden">
              {/* Video Stream Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover max-h-[60vh]"
              />

              {/* HUD Reticle Overlay */}
              {!cameraError && !cameraLoading && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-6">
                  {/* Top Target Instruction */}
                  <div className="px-3 py-1 rounded-full bg-slate-950/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="h-3 w-3 text-cyan-400" />
                    ALIGN HORIZON OR CLOUD PATTERN IN FRAME
                  </div>

                  {/* Center Reticle */}
                  <div className="relative w-40 h-40 border border-cyan-400/40 rounded-3xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                    <div className="w-2 h-2 rounded-full bg-cyan-400/80"></div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-cyan-400"></div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-cyan-400"></div>
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-0.5 h-5 bg-cyan-400"></div>
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0.5 h-5 bg-cyan-400"></div>
                  </div>

                  {/* Sensor Status */}
                  <div className="text-[10px] font-mono text-slate-400 bg-slate-950/70 px-3 py-1 rounded-md backdrop-blur-xs border border-slate-800">
                    MULTIMODAL OPTICAL TELEMETRY ACTIVE
                  </div>
                </div>
              )}

              {/* Loading State */}
              {cameraLoading && (
                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="h-8 w-8 text-cyan-400 animate-spin" />
                  <p className="text-xs font-semibold text-slate-300">Initializing Optical Sensor...</p>
                </div>
              )}

              {/* Error State with Fallback Actions */}
              {cameraError && (
                <div className="absolute inset-0 bg-slate-950/95 p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-200 mb-1">Camera Access Issue</h4>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                      {cameraError.includes('denied') || cameraError.includes('NotAllowedError') || cameraError.includes('Permission')
                        ? 'Camera permission was not granted by your browser. Please allow camera access in browser settings, or choose one of the options below.'
                        : cameraError}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        stopCamera();
                        cameraInputRef.current?.click();
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      Device Camera
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        stopCamera();
                        fileInputRef.current?.click();
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="h-3.5 w-3.5 text-emerald-400" />
                      Browse Files
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Controls Footer */}
            <div className="border-t border-slate-800 bg-slate-950/90 px-6 py-4 flex items-center justify-between">
              {/* Flip camera facing button */}
              <button
                type="button"
                onClick={toggleFacingMode}
                disabled={cameraLoading || !!cameraError}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer disabled:opacity-40"
                title="Switch Camera (Front / Back)"
              >
                <FlipHorizontal className="h-5 w-5" />
              </button>

              {/* Shutter Button */}
              <button
                type="button"
                onClick={capturePhoto}
                disabled={cameraLoading || !!cameraError}
                className="group relative p-1.5 rounded-full bg-cyan-500/20 border-2 border-cyan-400 transition hover:scale-105 active:scale-95 disabled:opacity-40 cursor-pointer shadow-lg shadow-cyan-500/20"
                title="Capture Photo"
              >
                <div className="w-14 h-14 rounded-full bg-cyan-500 group-hover:bg-cyan-400 flex items-center justify-center transition shadow-inner">
                  <Camera className="h-6 w-6 text-slate-950" />
                </div>
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
