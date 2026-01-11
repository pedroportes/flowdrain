import { GoogleGenAI, Chat, Modality } from "@google/genai";

// Note: In a production environment, never expose API keys on the client side.
// This is for demonstration purposes within the specified runtime.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to decode Base64 for Audio
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper to decode Audio Data
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const GeminiService = {
  // 1. Chat Logic
  createChat: (): Chat => {
    return ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "Você é um assistente virtual especialista em gestão de desentupidoras e serviços hidráulicos chamado FlowBot. Você trabalha para o software FlowDrain. Ajude os usuários com dúvidas sobre gestão, produtividade e o app FlowDrain.",
      },
    });
  },

  sendMessage: async (chat: Chat, message: string): Promise<string> => {
    try {
      const response = await chat.sendMessage({ message });
      return response.text || "Desculpe, não consegui processar sua resposta.";
    } catch (error) {
      console.error("Chat error:", error);
      return "Erro ao comunicar com o assistente.";
    }
  },

  // 2. Vision Logic (Image Analysis)
  analyzeImage: async (base64Image: string, prompt: string): Promise<string> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
            parts: [
                {
                    inlineData: {
                        mimeType: 'image/jpeg',
                        data: base64Image
                    }
                },
                { text: prompt }
            ]
        }
      });
      return response.text || "Não foi possível analisar a imagem.";
    } catch (error) {
      console.error("Vision error:", error);
      return "Erro ao analisar a imagem.";
    }
  },

  // 3. TTS Logic (Text to Speech)
  generateSpeech: async (text: string): Promise<void> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (!base64Audio) throw new Error("No audio data returned");

      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      const outputNode = outputAudioContext.createGain();
      outputNode.connect(outputAudioContext.destination);

      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        outputAudioContext,
        24000,
        1,
      );

      const source = outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputNode);
      source.start();

    } catch (error) {
      console.error("TTS error:", error);
      alert("Erro ao gerar áudio.");
    }
  }
};