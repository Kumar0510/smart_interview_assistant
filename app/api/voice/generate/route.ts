import Groq from 'groq-sdk';
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  return Response.json({ success: true, data: 'THANK YOU!' }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } =
    await request.json();

      try {
        const prompt = `
    Prepare questions for a job interview.
    The job role is ${role}.
    The job experience level is ${level}.
    The tech stack used in the job is: ${techstack}.
    The focus between behavioural and technical questions should lean towards: ${type}.
    The amount of questions required is: ${amount}.
    
    Please return ONLY a valid JSON array like:
    ["Question 1", "Question 2", "Question 3"]
    
    Do NOT include any extra text.
    Do NOT use special characters like / * -.
    These questions will be read by a voice assistant.
    `;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
    });

    const questionsText =
      completion.choices[0]?.message?.content || '[]';

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(','),
      questions: JSON.parse(questionsText),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection('interviews').add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        success: false,
        err: String(err),
      },
      { status: 500 }
    );
  }
}
