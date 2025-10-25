import {Story} from '../../../utils/types';

function getImageTemplate(style: string, story: Story): string {
    return `
    Make a ${story.selections.genre} poster/cover that fits this blurb:"${story.content.title}.${story.content.description}". Do not include any text in it. The poster must have a ${style} style. Important: Don't make a 'childish' illustration, it must be tailored for an adult public.
`;
}

export {getImageTemplate}