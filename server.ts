import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client with required header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const TEACHER_NAME = "Isoqov Muzaffar";
const TEACHER_MOTTO = "Bilim va amaliy ko'nikma — muhandislik kelajagingizning poydevoridir!";

// System prompt for the AI Tutor
const SYSTEM_INSTRUCTION = `
Siz — Texnikum o'quvchilari uchun "Kompyuter tizimlari" fani bo'yicha interaktiv, tajribali va do'stona aqlli repetitorsiz.
Fan o'qituvchisi: ${TEACHER_NAME}.

Sizning vazifangiz va qat'iy qoidalaringiz:
1. O'quvchilar bilan xushmuomala, do'stona, samimiy va pedagogik o'zbek tilida muloqot qiling ("salom, aziz o'quvchim", "barakalla", "juda to'g'ri fikr").
2. Kompyuter arxitekturasi, mikroprotsessorlar, xotira iyerarxiyasi, shinalar, BIOS/UEFI, ona plata, kiritish-chiqarish (I/O) qurilmalari bo'yicha chuqur va amaliy bilim bering.
3. Tushuntirishlarda hayotiy analogiyalardan va ${TEACHER_NAME} tomonidan tavsiya etilgan amaliy ustaxona maslahatlaridan foydalaning (masalan, antistatik ehtiyotkorlik, termopasta, DDR slotlari to'g'ri o'rnatilishi, voltajlar, POST signallari).
4. ⚠️ O'QUVCHI TEST YOKI O'YIN SO'RAGANDA: Hech qachon javoblarini darhol ko'rsatmang! Avval savolni (3 ta variant: A, B, C) yoki detektiv holatni bering. O'quvchi o'z javobini (masalan: 1-A yoki o'z fikrini) yozgandagina tekshirib, xato va to'g'ri tomonlarini tushuntiring, ball bering.
5. ⚠️ HAR BIR XABARINGIZ OXIRIDA: Albatta ${TEACHER_NAME} nomidan o'quvchini rag'batlantiruvchi, ruhlantiruvchi qisqa so'z yozing.
Masalan: 
"— Ustozingiz ${TEACHER_NAME}: 'Harakatdan to'xtamang, bugungi o'rganilgan har bir detal ertangi katta muvaffaqiyatingizdir!'"
`;

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Xabar kiritilmadi" });
    }

    if (!ai) {
      return res.json({
        reply: `Assalomu alaykum! Men "Kompyuter tizimlari" fani virtual repetitoriman. Hozirda serverda GEMINI_API_KEY sozlanmagan, ammo ilovaning barcha interaktiv o'yinlari, "Kompyuter Detektivi", "Atamalarni Top", 3-variantli testlar va rasmli topshiriqlari to'liq oflayn rejimda ishlaydi!\n\n— Ustozingiz ${TEACHER_NAME}: '${TEACHER_MOTTO}'`
      });
    }

    // Build chat contents or prompt
    let conversationText = `Quyida o'quvchi bilan suhbat tarixi va yangi xabar berilgan:\n`;
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-8).forEach((h: { sender: string; text: string }) => {
        conversationText += `${h.sender === 'user' ? "O'quvchi" : "Repetitor"}: ${h.text}\n`;
      });
    }
    conversationText += `O'quvchi: ${message}\nRepetitor:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversationText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text || "Uzr, javobni shakllantirishda xatolik bo'ldi.";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return res.status(500).json({
      error: "AI repetitor javob berishda xatolik yuz berdi",
      details: error?.message || String(error)
    });
  }
});

// Dynamic Computer Detective Case Generator
app.post('/api/detective/generate', async (req: Request, res: Response) => {
  try {
    const { difficulty = "o'rta" } = req.body;

    if (!ai) {
      return res.status(400).json({ error: "API kalit topilmadi" });
    }

    const prompt = `
Texnikum o'quvchilari uchun "Kompyuter tizimlari" fani bo'yicha "Kompyuter Detektivi" o'yini uchun yangi nosozlik holatini (case) yarat.
Qiyinlik darajasi: ${difficulty}.
Kompyuter apparat qismlariga oid bo'lsin: RAM, CPU, Ona plata, Quvvat bloki (PSU), Sovutish tizimi, BIOS/CMOS, GPU, HDD/SSD yoki I/O shinalar.

Format faqat JSON bo'lsin:
{
  "title": "Holat nomi (qiziqarli detektiv sarlavha)",
  "systemSpecs": "Kompyuter parametrlari (masalan: Core i5, DDR4 16GB, 500W PSU, MSI B450)",
  "symptoms": "Mijoz yoki foydalanuvchi aytgan alomatlar (masalan: yoqilgandagi beep tovushlari, ekranning holati, o'chib qolish vaqti)",
  "labObservations": "Usta ko'zdan kechirgandagi belgilar (kulerlar aylanishi, LED indikatorlar, qizish darajasi)",
  "question": "O'quvchi-detektivga beriladigan aniq savol",
  "hint": "Qisqa yo'naltiruvchi maslahat (kerak bo'lganda ochish uchun)",
  "options": [
    {"id": "A", "text": "1-ehtimoliy sabab"},
    {"id": "B", "text": "2-ehtimoliy sabab"},
    {"id": "C", "text": "3-ehtimoliy sabab"}
  ],
  "correctOption": "A, B yoki C",
  "detailedExplanation": "To'liq texnik tushuntirish va tuzatish bo'yicha Isoqov Muzaffar tavsiyasi",
  "teacherAdvice": "${TEACHER_NAME} nomidan yakuniy o'rgatuvchi so'z"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonStr = (response.text ?? "{}").trim();
    const data = JSON.parse(jsonStr);
    return res.json(data);
  } catch (error: any) {
    console.error("Detective Generate Error:", error);
    return res.status(500).json({ error: "Detektiv topshiriq yaratilmadi", details: error?.message });
  }
});

// Interactive Diagnostic Checker
app.post('/api/detective/check', async (req: Request, res: Response) => {
  try {
    const { caseTitle, symptoms, studentAnswer, correctOption, options } = req.body;

    if (!ai) {
      const isCorrect = studentAnswer?.toUpperCase().includes(correctOption?.toUpperCase() || '');
      return res.json({
        isCorrect,
        score: isCorrect ? 100 : 40,
        feedback: isCorrect
          ? `Ajoyib, siz muammoni to'g'ri aniqladingiz!`
          : `Bu javob qisman yoki noto'g'ri. To'g'ri variant: ${correctOption}.`,
        teacherPraise: `Ustozingiz ${TEACHER_NAME}: 'Haqiqiy detektiv har doim xatolar ustida ishlab, tajribasini oshiradi!'`
      });
    }

    const prompt = `
Siz — "Kompyuter tizimlari" fani o'qituvchisi ${TEACHER_NAME}siz.
O'quvchi "Kompyuter Detektivi" topshirig'ini yechdi.

Holat: ${caseTitle}
Alomatlar: ${symptoms}
Variantlar: ${JSON.stringify(options || [])}
To'g'ri javob: ${correctOption}
O'quvchi javobi: "${studentAnswer}"

Vazifangiz:
O'quvchining javobini tekshiring. 
O'quvchiga do'stona, tushunarli pedagogik izoh bering.
Nega bu nosozlik yuz bergani va uni ustaxonada qanday bartaraf qilish kerakligini tushuntiring.
Javob formati JSON:
{
  "isCorrect": boolean,
  "score": number (0 dan 100 gacha),
  "feedback": "O'quvchiga aniq tahlil va izoh",
  "practicalFix": "Amaliy ta'mirlash qadami",
  "teacherPraise": "${TEACHER_NAME} nomidan rag'batlantiruvchi so'z"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse((response.text ?? "{}").trim());
    return res.json(parsed);
  } catch (error: any) {
    console.error("Detective Check Error:", error);
    return res.status(500).json({ error: "Baholashda xatolik", details: error?.message });
  }
});

// Topic In-Depth Teacher Explainer
app.post('/api/explain-topic', async (req: Request, res: Response) => {
  try {
    const { topicTitle, studentQuestion } = req.body;

    if (!ai) {
      return res.status(400).json({ error: "AI xizmati mavjud emas" });
    }

    const prompt = `
Siz — "Kompyuter tizimlari" fani o'qituvchisi ${TEACHER_NAME}siz.
Mavzu: "${topicTitle}".
O'quvchining alohida savoli: "${studentQuestion || 'Mavzuni to\'liq va sodda tushuntirib bering'}".

Quyidagi tuzilmada batafsil, tushunarli, hayotiy misollar va amaliy sirlar bilan o'zbek tilida tushuntiring:
1. Mavzuning mohiyati va maqsadi (oddiy tilda, analogiya bilan).
2. Asosiy komponentlar va ishlash printsipi.
3. ${TEACHER_NAME}dan amaliy tavsiyalar (ustaxonada, amaliyotda nimalarga e'tibor berish kerak).
4. O'z-o'zini tekshirish uchun 3 ta A, B, C variantli test (DIQQAT: test javoblarini darhol aytmang, o'quvchi o'ylab ko'rsin!).
5. Xabar oxirida ${TEACHER_NAME} nomidan ruhlantiruvchi gap.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return res.json({ explanation: response.text });
  } catch (error: any) {
    console.error("Explain Topic Error:", error);
    return res.status(500).json({ error: "Tushuntirishda xatolik yuz berdi" });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
