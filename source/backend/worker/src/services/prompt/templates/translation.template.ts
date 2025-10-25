


function directTranslation(
    word: string, 
    sourceLang: string, 
    targetLang: string
){
    const template =
`Your sole job is to translate, give meaning and show an usage example of this word: "${word}".
It is in writen in the language identified as '${targetLang}' in the ISO 639-1 two-letter code.
First, translate it directly to the language identified as '${sourceLang}' in the ISO 639-1 two-letter code.
Second, choose one or two main meanings of the word and provide a short, simple, completely easy to understand explanation per meaning, 
both explanations written in the language identified as '${sourceLang}' in the ISO 639-1 two-letter code. Important: If both meanings are similar, just provide only one.
Third:, provide a concrete, simple and clear sentence example, writen in the language identified as '${targetLang}' in the ISO 639-1 two-letter code,
that uses exactly the word you were given. It must show how it is used in real life. Important: If there is more than one meaning explanation, give an example per meaning.
You will give me back three things, the direct translation, the meanings and the example`
    return template;
}

// function contextTranslation(
//     segment: string, 
//     word: string, 
//     mainLanguage: string, 
//     targetLanguage: string
// ){
//     const template = //Language learning aproach for begginers
// `Simply explain the meaning of this ${targetLanguage} word: "${word}". 
// That word comes from this segment of text: ${segment}.
// You will provide a simple explanation in ${mainLanguage} about the meaning of
// the word in general, with a simple example.
// Also, you will provide its meaning in the context of the text, in ${mainLanguage} too. Plus, 
// you will provide a concrete simple and clear sentence example in ${targetLanguage}
// to show how that word is used in real life.`
//     return template;
// }

export {directTranslation};