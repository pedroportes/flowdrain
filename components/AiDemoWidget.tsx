import React, { useState, useRef, useEffect } from 'react';
import { Bot, Image as ImageIcon, Mic, Send, Upload, Volume2, X } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { AiMode, ChatMessage } from '../types';
import { Chat } from "@google/genai";

const AiDemoWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AiMode>(AiMode.CHAT);
  
  // Chat State
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Vision State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visionAnalysis, setVisionAnalysis] = useState<string>("");
  const [isVisionLoading, setIsVisionLoading] = useState(false);

  // TTS State
  const [ttsInput, setTtsInput] = useState("Bem-vindo ao FlowDrain. Sua gestão simplificada.");
  const [isTtsLoading, setIsTtsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !chatInstance) {
      setChatInstance(GeminiService.createChat());
      setMessages([{ role: 'model', text: 'Olá! Sou a IA do FlowDrain. Como posso ajudar sua desentupidora hoje?' }]);
    }
  }, [isOpen, chatInstance]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatSend = async () => {
    if (!chatInput.trim() || !chatInstance) return;
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setIsChatLoading(true);

    const response = await GeminiService.sendMessage(chatInstance, userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsChatLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setVisionAnalysis(""); // Reset previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    setIsVisionLoading(true);
    // Strip data url prefix for API
    const base64Data = selectedImage.split(',')[1];
    const result = await GeminiService.analyzeImage(base64Data, "Analise esta imagem no contexto de serviços hidráulicos ou manutenção. O que você vê?");
    setVisionAnalysis(result);
    setIsVisionLoading(false);
  };

  const handleSpeak = async () => {
    if (!ttsInput.trim()) return;
    setIsTtsLoading(true);
    await GeminiService.generateSpeech(ttsInput);
    setIsTtsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-green hover:bg-brand-green-dark text-white font-bold p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
      >
        <Bot className="w-6 h-6" />
        <span className="hidden md:inline">IA FlowDrain</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-light p-4 flex justify-between items-center text-white">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Bot className="w-5 h-5" /> FlowBot
        </h3>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-50 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab(AiMode.CHAT)}
          className={`flex-1 p-3 text-sm font-medium flex justify-center items-center gap-2 transition-colors ${activeTab === AiMode.CHAT ? 'text-brand-blue border-b-2 border-brand-blue bg-white' : 'text-gray-500 hover:text-brand-blue'}`}
        >
          <Bot className="w-4 h-4" /> Chat
        </button>
        <button 
          onClick={() => setActiveTab(AiMode.VISION)}
          className={`flex-1 p-3 text-sm font-medium flex justify-center items-center gap-2 transition-colors ${activeTab === AiMode.VISION ? 'text-brand-blue border-b-2 border-brand-blue bg-white' : 'text-gray-500 hover:text-brand-blue'}`}
        >
          <ImageIcon className="w-4 h-4" /> Visão
        </button>
        <button 
          onClick={() => setActiveTab(AiMode.TTS)}
          className={`flex-1 p-3 text-sm font-medium flex justify-center items-center gap-2 transition-colors ${activeTab === AiMode.TTS ? 'text-brand-blue border-b-2 border-brand-blue bg-white' : 'text-gray-500 hover:text-brand-blue'}`}
        >
          <Volume2 className="w-4 h-4" /> Fala
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        
        {/* CHAT MODE */}
        {activeTab === AiMode.CHAT && (
          <div className="h-full flex flex-col">
            <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-600 p-3 rounded-lg text-xs italic">Digitando...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="flex gap-2 border-t border-gray-200 pt-3">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Pergunte algo..."
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
              />
              <button 
                onClick={handleChatSend}
                disabled={isChatLoading}
                className="bg-brand-green text-white p-2 rounded-lg hover:bg-brand-green-dark disabled:opacity-50 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* VISION MODE */}
        {activeTab === AiMode.VISION && (
          <div className="h-full flex flex-col gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-brand-blue transition-colors relative bg-white">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="max-h-48 mx-auto rounded shadow-sm" />
              ) : (
                <div className="text-gray-400">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-brand-blue" />
                  <p className="text-sm">Clique para enviar uma foto</p>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleAnalyzeImage}
              disabled={!selectedImage || isVisionLoading}
              className="w-full bg-brand-blue text-white font-bold py-2 rounded-lg hover:bg-brand-blue-dark disabled:opacity-50 flex justify-center items-center gap-2 shadow-sm"
            >
               {isVisionLoading ? 'Analisando...' : <><ImageIcon className="w-4 h-4" /> Analisar Imagem</>}
            </button>

            {visionAnalysis && (
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-brand-blue text-xs font-bold uppercase mb-2">Análise da IA:</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{visionAnalysis}</p>
              </div>
            )}
          </div>
        )}

        {/* TTS MODE */}
        {activeTab === AiMode.TTS && (
          <div className="h-full flex flex-col gap-4 justify-center">
            <div className="text-center space-y-2">
              <Volume2 className="w-12 h-12 text-brand-blue mx-auto" />
              <h3 className="text-brand-dark font-bold">Gerador de Voz</h3>
              <p className="text-sm text-gray-500">Transforme texto em avisos de áudio para sua equipe.</p>
            </div>
            
            <textarea 
              value={ttsInput}
              onChange={(e) => setTtsInput(e.target.value)}
              className="w-full h-32 bg-white border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue resize-none"
              placeholder="Digite o texto aqui..."
            />

            <button 
              onClick={handleSpeak}
              disabled={isTtsLoading || !ttsInput}
              className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-brand-blue-dark disabled:opacity-50 flex justify-center items-center gap-2 shadow-sm"
            >
              {isTtsLoading ? 'Gerando Áudio...' : <><Mic className="w-5 h-5" /> Ouvir Agora</>}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AiDemoWidget;