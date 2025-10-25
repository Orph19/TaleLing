export function getDefaultCredits(){
    const defaultCreditsString = process.env.DEFAULT_CREDITS
    try {
        const defaultCreditsObject = JSON.parse(defaultCreditsString);
        return defaultCreditsObject
    } catch (error) {
        console.error('Failed to parse DEFAULT_CREDITS:', error);
    }
    
}