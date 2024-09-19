import { Groq } from 'groq-sdk'
import { SUPPORTED_LANGUAGES } from '../constants';
import { FromLanguage, Language } from '../types.d';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });

export async function translate({ 
    fromLanguage,
    toLanguage,
    text
}: {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}) {
    console.log("Calling the Groq API");

    const fromCode = fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const APIBody = {
      "model": "llama3-70b-8192",
      "temperature": 1,
      "max_tokens": 64,
      "top_p": 1,
      "stream": false,
      "messages": [
        {
          role: "system" as const,
          content: "You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surroundedn by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`."
        },
        {
          role: "user" as const,
          content: "Hola mundo {{Español}} [[English]]"
        },
        {
          role: "assistant" as const,
          content: "Hello world"
        },
        {
          role: "user" as const,
          content: "How are you? {{auto}} [[Deutsch]]"
        },
        {
          role: "assistant" as const,
          content: "Wie geht es dir?"
        },
        {
          role: "user" as const,
          content: "Bon dia, com estas? {{auto}} [[Español]]"
        },
        {
          role: "assistant" as const,
          content: "Buenos dias, ¿cómo estas?"
        },
        // Entrada del usuario
        {
          role: "user" as const,
          content: `${text} {{${fromCode}}} [[${toCode}]]`
        }
      ],
    };


    try {
      const chatCompletion = await groq.chat.completions.create(APIBody);

      // Handle the case where chatCompletion is a Stream<ChatCompletionChunk>
      if ('choices' in chatCompletion) {
        return chatCompletion.choices?.[0]?.message?.content?.trim();
      }

    } catch (err) {
      console.error("Error calling the Groq API:", err);
    }
  }