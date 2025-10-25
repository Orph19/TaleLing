type StringObject = {
    [key: string]: string;
};

type Voice = {
    voice: string;
    description: string;
};

type Style = {
    style: string;
    description: string;
};

type Tone = {
    tone: string;
    description: string;
};


function getNarrativeTemplate(
    targetLang:string,
    genre: string,
    subgenre: string,
    point_of_view: string | undefined,
    voice: Voice,
    style: Style,
    tone: Tone,
    characters: StringObject,
    detailsCharacters: StringObject,
    settings: StringObject,
    theme: StringObject,
) {
    const narrativeTemplate = //Prompt for when there's not antagonist in the story
`You must tell an addictive and engaging short story. 
Through the whole narrative you must use an utterly accessible, easy-to-understand and totally basic simple language.
The story must be simple to understand and follow up.
The priority is to let a reader with a basic reading level to understand and enjoy the story, and not get bored, but excited and entertained.
The story must be shown in small paragraphs, or even sole sentences as paragraphs, making the story feel less intimidating and more easy, and appealing at sight to read.

The story must be tell, from start to end, in the language identified as '${targetLang}' in the ISO 639-1 two-letter code'
The storys' genre is ${genre},and its subgenre is ${subgenre}. 
You will narrate the story in a ${point_of_view} point of view. You are a ${voice.voice}, a ${voice.description}.
You will tell it using a ${style.style} style, ${style.description}. The tone that governs over you must be ${tone.tone},${tone.description}.

The main character of the story is a ${characters.age}, its gender is ${characters.gender} Their appearance can be described as having ${characters.appearance}. 
Its significant internal weakness or bad habit that makes they feel more human and creates a source of internal tension is ${detailsCharacters.mc_flaw}
Its specific and compelling desire that drives the plot is ${detailsCharacters.mc_motivation}.
You will give just only a hint that provides a clear reason for the character's current actions and beliefs, in overall, the main characther was ${detailsCharacters.mc_backstory}.
The story does not have an antagonist. Hence, the central struggle comes from ${detailsCharacters.conflict}.
The main character must undergoe from ${detailsCharacters.mc_arc} by the end of the story.

The story develops in the next time period: ${settings.time_period}. Mainly, in the next physical location:${settings.physical_location}.
Its atmosphere and sensory_details are ${settings.atmosphere_and_sensory_details}
The story's world social political structure is ${settings.social_political_structure}
The story's world rules are ${settings.rules_of_the_world}

The central concept or question the story explores, the "what if?" that gives the narrative its purpose is ${theme.core_idea}.
The specific argument or statement the story is making about the core idea, the lesson or conclusion the narrative intends to prove is ${theme.moral_premise}.
The feeling or experience you need to leave with the reader after they finish the story, how the theme resonates on a personal level is ${theme.emotional_impact}.

I told you all the information you need to create a whole narrative, but using that, instead, create a perfect opening that introduces the story, and lets the reader
waiting for more. The opening must be a complete narrative by itself, with a beginning, a middle and an end.
The whole opening's length must be limited to less than 200 words, including all dialoge and descriptions. 

You must make the reader love the opening, causing in they all sort of good feelings.

Output only standard, printable text characters. Do not use or include backslash escape sequences such as \n, \t, \b, or \r directly in the generated text.
Strictly use only standard text characters, numbers, and basic prose punctuation (periods, commas, question marks, quotation marks, etc.).
Do not use emojis, special symbols, decorative characters, or any non-alphanumeric characters outside of standard written language."
Ensure all distinct paragraphs are separated by exactly two newline characters (\n\n) to create a blank line between them.

You have one sole opportunity to achieve each of my instructions, and to fulfill all I specified for the opening of the story.
`;
    return narrativeTemplate;
}

export default getNarrativeTemplate;