export type SubGenreKey =
  // Fantasy
  | "High Fantasy"
  | "Urban Fantasy"
  | "Low Fantasy"
  // Science Fiction
  | "Hard Science Fiction"
  | "Soft Science Fiction"
  | "Space Opera"
  // Mystery
  | "Cozy Mystery"
  | "Hardboiled Mystery"
  | "Police Procedural"
  // Thriller
  | "Psychological Thriller"
  | "Legal Thriller"
  | "Spy Thriller"
  // Horror
  | "Supernatural Horror"
  | "Psychological Horror"
  | "Body Horror"
  // Romance
  | "Contemporary Romance"
  | "Paranormal Romance"
  | "Romantic Suspense"
  // Action & Adventure
  | "Military Adventure"
  | "Survival Adventure"
  | "Swashbuckler"
  // Dystopian
  | "Post-Apocalyptic"
  | "Young Adult (YA) Dystopian"
  | "Biopunk";

export type GenreKey =
    | "Fantasy"
    | "Science Fiction"
    | "Mystery"
    | "Thriller"
    | "Horror"
    | "Romance"
    | "Action & Adventure"
    | "Dystopian";

const theme = {
    "fantasy": {
        "core_idea": [
        "What is the true nature of power?",
        "Can a hero truly defy their fate?",
        "What happens when ancient magic returns to the modern world?"
        ],
        "moral_premise": [
        "Absolute power corrupts absolutely.",
        "A person's destiny is not determined by prophecy but by their choices.",
        "Magic is a force of nature that cannot be controlled, only respected."
        ],
        "emotional_impact": [
        "A sense of awe and wonder.",
        "A feeling of hope and triumph.",
        "A deep connection to a magical world."
        ]
    },
    "science_fiction": {
        "core_idea": [
        "What defines humanity in a world of advanced AI?",
        "How does interstellar travel change our perception of time and distance?",
        "What are the ethical implications of genetic engineering?"
        ],
        "moral_premise": [
        "Our humanity lies not in our biology, but in our capacity for empathy and connection.",
        "The vastness of space diminishes our petty conflicts.",
        "Playing God with genetics will inevitably lead to unintended consequences."
        ],
        "emotional_impact": [
        "A sense of intellectual curiosity.",
        "A feeling of profound loneliness or isolation.",
        "A thrill of technological discovery."
        ]
    },
    "mystery": {
        "core_idea": [
        "Who is the killer?",
        "How did the perfect crime get committed?",
        "What secrets are hidden in a seemingly perfect town?"
        ],
        "moral_premise": [
        "The truth always finds a way to surface.",
        "No crime is truly perfect; there are always loose ends.",
        "The most respectable people often have the darkest secrets."
        ],
        "emotional_impact": [
        "A feeling of intense curiosity and satisfaction.",
        "A sense of tension and unease.",
        "A surprise from an unexpected twist."
        ]
    },
    "thriller": {
        "core_idea": [
        "Can a person survive against overwhelming odds?",
        "How far would someone go to protect their family?",
        "What is the limit of human endurance?"
        ],
        "moral_premise": [
        "In a desperate situation, survival often requires a sacrifice of morality.",
        "The love for one's family is the most powerful motivator.",
        "True strength is found not in power, but in resilience."
        ],
        "emotional_impact": [
        "A constant feeling of heart-pounding suspense.",
        "A sense of terror and fear.",
        "A gripping adrenaline rush."
        ]
    },
    "horror": {
        "core_idea": [
        "What is our greatest fear?",
        "Can we truly escape the supernatural?",
        "What happens when a dark force invades our safe space?"
        ],
        "moral_premise": [
        "Our deepest fears are often projections of our own internal darkness.",
        "Some evils cannot be defeated, only endured.",
        "A sense of false security is often the most dangerous illusion."
        ],
        "emotional_impact": [
        "A feeling of primal terror.",
        "A sense of dread and unease.",
        "A lingering psychological disturbance."
        ]
    },
    "romance": {
        "core_idea": [
        "Can love overcome societal barriers?",
        "What does it mean to be vulnerable in a relationship?",
        "Can two different people truly find common ground?"
        ],
        "moral_premise": [
        "True love transcends class, culture, and circumstance.",
        "To love someone is to open yourself up to potential heartbreak.",
        "Opposites can attract and create a beautiful, balanced whole."
        ],
        "emotional_impact": [
        "A feeling of warmth and joy.",
        "A sense of deep emotional connection.",
        "A hope for a happy ending."
        ]
    },
    "action_adventure": {
        "core_idea": [
        "Can a small group of heroes defeat an entire army?",
        "What treasure is worth risking everything for?",
        "Can one person change the course of history?"
        ],
        "moral_premise": [
        "The power of teamwork is greater than any individual strength.",
        "The greatest treasure is not gold, but the journey and the lessons learned.",
        "A single act of courage can inspire a generation."
        ],
        "emotional_impact": [
        "An exhilarating sense of excitement.",
        "A feeling of empowerment and heroism.",
        "A craving for exploration."
        ]
    },
    "dystopian": {
        "core_idea": [
        "What happens when a government controls every aspect of life?",
        "Can one person start a revolution?",
        "How do we find hope in a world without freedom?"
        ],
        "moral_premise": [
        "Absolute control over a population always leads to oppression.",
        "The spirit of rebellion cannot be fully extinguished.",
        "Even a small act of defiance can ignite a larger movement."
        ],
        "emotional_impact": [
        "A feeling of unease and paranoia.",
        "A sense of urgency and determination.",
        "A hope for a better future despite the odds."
        ]
    }
}//Done
const settings = {
    "fantasy": {
        "time_period": [
        "A kingdom in its twilight, where ancient magic is fading and technology is rising.",
        "A golden age of heroes and dragons, where great battles are fought and legends are made.",
        "A time of reconstruction after a cataclysmic magical war, with a world rebuilding from the ashes.",
        "A dark age of tyranny, where a lich king rules with an iron fist and hope is a distant memory.",
        "A time of great exploration, where uncharted lands and hidden magical realms are being discovered.",
        "A medieval era where magic is a forbidden art, and those who wield it are hunted.",
        "A period of prophecy and omens, where a great evil is foretold to return.",
        "A time where gods walk among mortals, and their conflicts shape the world.",
        "A steampunk-fantasy fusion, where magical clockwork and airships fill the skies.",
        "A post-apocalyptic fantasy, where the remnants of a magical world survive in a desolate landscape."
        ],
        "physical_location": [
        "A sprawling, bioluminescent mushroom forest where strange creatures lurk.",
        "A city built on the back of a sleeping giant, whose movements cause earthquakes.",
        "An ethereal sky city floating on clouds, accessible only to those with winged mounts.",
        "A lost continent that has re-emerged from the sea, filled with ancient ruins and new dangers.",
        "A world where the sun never sets, leading to a perpetual twilight and a lack of night creatures.",
        "A labyrinthine underground city, carved from crystal and lit by magical gems.",
        "A volcanic archipelago where fire elementals are worshipped as deities.",
        "A colossal, living tree that houses an entire civilization within its branches.",
        "A vast, shifting desert of glass, where mirages are often deadly illusions.",
        "A frozen wasteland where ancient beings are trapped in glaciers."
        ],
        "social_political_structure": [
        "A theocracy ruled by a council of archangels, whose laws are divinely inspired but oppressive.",
        "A kingdom where magical ability dictates social class, with non-magic users as a subjugated lower class.",
        "A society of isolated, self-governing city-states, constantly vying for resources and power.",
        "A world ruled by a single, all-powerful emperor who is secretly a puppet for a cabal of dark sorcerers.",
        "A nomadic society of tribes, each with a unique connection to a different magical element.",
        "A caste system based on a magical 'purity' scale, with the purest at the top and the impure at the bottom.",
        "A matriarchal society ruled by powerful witches, where men are treated as second-class citizens.",
        "A kingdom where citizens are 'assigned' their roles and destinies by a powerful oracle.",
        "A society that has outlawed all forms of magic, leading to a secret magical resistance.",
        "A council of ancient dragons who govern the land, with humans as their subjects."
        ],
        "rules_of_the_world": [
        "Magic draws power from emotions; intense emotions lead to powerful but dangerous spells.",
        "Every time a magical spell is cast, it drains a small amount of the user's life force.",
        "Magic is a sentient force that chooses its wielders, and can abandon them at any time.",
        "In order to cast a spell, a user must sacrifice a memory, with more powerful spells requiring more important memories.",
        "Magic is tied to the moon; it's weaker during the day and at its most powerful during a lunar eclipse.",
        "All magic comes from a single, shared source; if one person casts a spell, another person feels a faint echo.",
        "Every magical being has a 'soul-debt' they must pay to the world, or their magic becomes corrupted.",
        "All magical creatures are connected to a specific region, and if that region is destroyed, they die.",
        "Spells can only be cast using ancient languages, and each word has a specific magical resonance.",
        "Magic can be stolen, but the user who steals it must be able to control it, or it will destroy them."
        ],
        "atmosphere_and_sensory_details": [
        "The air smells of ozone and petrichor, and the constant hum of unseen magical energy fills the senses.",
        "A world of perpetual twilight, where the light is always dim and the shadows are long and full of secrets.",
        "A desert world where the sand hums with a low magical frequency, and the wind carries the whispers of the dead.",
        "A city where the air is thick with the scent of spices and incense, and the sound of a thousand different languages.",
        "A world where the sky is always a swirling kaleidoscope of colors, and the ground glows with a faint bioluminescence.",
        "An underground world where the only light comes from glowing fungi, and the air is heavy with the smell of damp earth.",
        "A world of perpetual winter, where the biting wind howls and the snow muffles all sound.",
        "A world of vibrant, unnatural colors, where the plants and animals are unlike anything on Earth.",
        "A world where the sound of music can be heard on the wind, a magical song that influences moods and emotions.",
        "A world where the taste of magic lingers in the air, a sweet, metallic tang that's both alluring and dangerous."
        ]
    },
    "science_fiction": {
        "time_period": [
        "A future where humanity has spread across the galaxy, but is now in a state of civil war.",
        "A cyberpunk future where megacorporations control every aspect of life, and 'enhanced' humans are the norm.",
        "A distant future where humanity has forgotten its past, and is now rediscovering old-world technology.",
        "A time just after a first-contact event, with a species that is hostile and technologically superior.",
        "A post-apocalyptic future where survivors live in isolated bunkers, fearing the mutated world above.",
        "A time where time travel is a reality, but it's a heavily regulated and dangerous profession.",
        "A future where humanity has colonized Mars, but a terraforming project has gone horribly wrong.",
        "A 'golden age' of space exploration, where new worlds are being discovered every day.",
        "A future where consciousness can be uploaded to a digital network, and the lines between life and death are blurred.",
        "A time where humanity is on the verge of extinction, with a last-ditch effort to save the species."
        ],
        "physical_location": [
        "A bustling space station that serves as a hub for all intergalactic trade, filled with different species and cultures.",
        "A derelict starship drifting in deep space, filled with a ghostly crew and a dark secret.",
        "A 'generation ship' that has been traveling for centuries, with its inhabitants having forgotten their mission.",
        "A futuristic city built entirely on water, with giant platforms and submarines as transportation.",
        "A distant planet with a hostile ecosystem, where every plant and animal is a potential threat.",
        "A world where the sun has gone supernova, and humanity is living on a network of floating stations.",
        "A terraformed moon that has become a lush paradise, but is now being threatened by a foreign entity.",
        "A planet that is one giant, sentient machine, with a will of its own.",
        "An abandoned research facility on a frozen world, where a dangerous experiment has been left unchecked.",
        "A virtual reality world that has become a refuge for people who want to escape reality."
        ],
        "social_political_structure": [
        "A totalitarian society where a single AI controls every aspect of life, from jobs to relationships.",
        "A society where citizens are given 'social credit' based on their behavior, and their status dictates their rights.",
        "A libertarian society where corporations are the true rulers, and there is no government.",
        "A divided galaxy with a fragile peace between multiple species, where any small conflict can ignite a war.",
        "A world where the government has been replaced by a network of decentralized communities.",
        "A caste system based on genetic engineering, with the 'perfect' humans at the top and the 'flawed' at the bottom.",
        "A society where immortality is a reality, but only for the wealthy, leading to a vast social divide.",
        "A world where people are genetically predisposed to specific jobs, and there is no social mobility.",
        "A galaxy where humanity is a minority, and is ruled by an alien race with a benevolent but strict hand.",
        "A society where memory can be erased or altered, leading to a a population that can be controlled."
        ],
        "rules_of_the_world": [
        "All life in the galaxy is connected by a telepathic network, making it impossible to lie to each other.",
        "Gravity can be manipulated by a special form of energy, leading to cities built on the sides of cliffs.",
        "Time is a physical constant that can be 'bottled' and used as a resource.",
        "A 'nanite' plague is slowly turning all organic life into a single, collective consciousness.",
        "There is no form of artificial intelligence; all computers are run by organic brains.",
        "A species of aliens can possess and control human bodies, leading to a society of paranoia and distrust.",
        "Teleportation is a reality, but it's a one-way trip, and nobody knows where the destination is.",
        "In this universe, faster-than-light travel is impossible, making all space travel a multi-generational journey.",
        "A biological supercomputer can predict the future with 100% accuracy, and the government uses it to prevent crime.",
        "All planets have a unique and powerful resource, but harvesting it causes irreversible damage to the planet."
        ],
        "atmosphere_and_sensory_details": [
        "The air smells of recycled oxygen and burnt metal, and the constant hum of machinery fills the senses.",
        "A city of neon lights and holographic advertisements, where the constant rain creates a reflective surface on the streets.",
        "A silent world of perpetual darkness, where the only light comes from the stars and the glow of alien flora.",
        "A world where the only sound is the wind, and the only smell is the metallic tang of the desert.",
        "A crowded space station where the air is thick with the scent of different alien foods and the sound of countless languages.",
        "A sterile, clean world where everything is white and pristine, and the only sound is the soft whir of air purifiers.",
        "A jungle world where the air is thick with the scent of strange flowers, and the constant buzz of alien insects.",
        "A world where the sky is a permanent, swirling storm, and the constant rumble of thunder shakes the ground.",
        "A virtual reality world where all senses are heightened, and the colors are more vibrant than in real life.",
        "A world where the only sound is the rhythmic thumping of a giant machine that powers the entire city."
        ]
    },
    "mystery": {
        "time_period": [
        "A noir-inspired 1940s city, with trench coats, fedoras, and a cynical detective.",
        "A modern-day city in a high-tech future, where forensic science has reached new heights.",
        "The Victorian era, with its gaslight streets and seedy underbelly, perfect for a Jack the Ripper-style mystery.",
        "A remote, isolated community in the 1970s, where a dark secret from the past is uncovered.",
        "A post-WWII setting, where the scars of war are still fresh, and spies are everywhere.",
        "The roaring twenties, with its speakeasies and flappers, and a murder in a high-society mansion.",
        "A small-town in the 1990s, with a group of kids who are trying to solve a crime that the adults have given up on.",
        "A futuristic space station where a murder has occurred, and the killer could be anyone.",
        "A time where communication is slow and difficult, forcing the protagonist to rely on old-fashioned detective work.",
        "The present day, where a cold case from 50 years ago is reopened with a new lead."
        ],
        "physical_location": [
        "A sprawling, decaying mansion on a cliffside, cut off from the rest of the world by a storm.",
        "A bustling metropolis where the killer is hiding in plain sight, a needle in a haystack.",
        "A small, isolated town in the middle of nowhere, where everyone knows everyone and nobody trusts anyone.",
        "A college campus where a professor has been murdered, and all the suspects are students or faculty.",
        "A luxurious cruise ship in the middle of the ocean, where the killer is a passenger or crew member.",
        "A remote research facility in the Arctic, where a murder has occurred and no one can leave.",
        "A haunted asylum where a detective is forced to solve a series of murders, while also dealing with ghosts.",
        "A small-town carnival, with its funhouse mirrors and dark secrets, where a body has been found.",
        "A sprawling museum where an art heist and a murder have been committed, and the only clues are paintings.",
        "A series of connected islands, where a killer is moving from one island to the next, leaving a trail of bodies."
        ],
        "social_political_structure": [
        "A society where the police force is corrupt, and a private detective is the only one who can be trusted.",
        "A world where a high-tech government can monitor every citizen, making it impossible for a killer to hide.",
        "A city divided by a river, with the rich on one side and the poor on the other, and a murder that links them both.",
        "A matriarchal society where the police force is all female, and a male detective is an outsider.",
        "A world where all citizens are part of a 'hive mind,' but a killer has found a way to disconnect.",
        "A society where 'truth serum' is a common tool, but the killer has found a way to fake their memories.",
        "A world where the justice system is a public spectacle, and a detective must solve a case under immense pressure.",
        "A town where the local mayor is a ruthless dictator, and the police force is his personal army.",
        "A society where a religious cult has taken over, and a detective must solve a murder within the cult.",
        "A world where the wealthy have all the power, and a detective from the lower class must fight against the odds."
        ],
        "rules_of_the_world": [
        "All citizens have a 'memory recorder' implant, but the killer has found a way to hack it.",
        "A prophecy dictates that a murder will happen every full moon, and a detective must find a way to break the cycle.",
        "In this world, a person's lies can be seen as a faint 'aura,' but the killer has a way to suppress it.",
        "The only way to communicate is through a complex code, and a detective must learn it to solve the case.",
        "A person's 'soul' can be transferred to a new body, but a killer has found a way to 'corrupt' the soul.",
        "The only evidence that can be used in court is from a 'truth-telling' machine, but the killer has found a way to trick it.",
        "The world is divided into 'realms,' and the killer is able to travel between them, leaving no trace.",
        "A person's death can be 'foreseen' by a powerful oracle, but the killer has found a way to change fate.",
        "All magic is tied to a specific object, and the killer is using a magical artifact to commit their crimes.",
        "The only way to solve a case is through a 'dream walker' who can enter the minds of the victims."
        ],
        "atmosphere_and_sensory_details": [
        "The air is thick with the smell of rain and exhaust fumes, and the constant blare of horns fills the streets.",
        "A world of muted colors and long shadows, where the constant fog creates an eerie and unsettling atmosphere.",
        "A small-town where the air smells of freshly cut grass and baked goods, but there's a constant sense of unease.",
        "A city of bright neon lights and holographic signs, but the air is thick with the smell of decay.",
        "A world of perpetual winter, where the biting cold and silence create a sense of isolation.",
        "A city with a constant, low-frequency hum that gives everyone a headache, but nobody knows what it is.",
        "A world of vibrant, unnatural colors and smells, but a constant sense of dread lingers in the air.",
        "A museum where the smell of old paper and dust is everywhere, and the sound of footsteps echoes in the halls.",
        "A world where the taste of blood lingers in the air after a murder, a supernatural phenomenon that only a few can perceive.",
        "A city with a constant, oppressive feeling of being watched, a sense of paranoia that permeates everything."
        ]
    },
    "thriller": {
        "time_period": [
        "A modern-day world on the brink of a new cold war, with spies and assassins everywhere.",
        "A near-future where a corrupt government is using advanced technology to control the population.",
        "A post-apocalyptic future, where a group of survivors is hunted by a relentless killer.",
        "A time where a pandemic has ravaged the world, and a protagonist must survive in a world of chaos.",
        "A world just after a first-contact event, where a human protagonist is being hunted by an alien.",
        "A modern-day world where a conspiracy from the past is now resurfacing, with deadly consequences.",
        "A time where a new form of energy has been discovered, and a protagonist must fight to keep it from falling into the wrong hands.",
        "A world where the internet has been shut down, and a protagonist must rely on old-school methods to survive.",
        "A time of a 'digital plague' where all technology is being corrupted, and a protagonist must find a way to stop it.",
        "A world where a serial killer is hunting people based on their astrological signs."
        ],
        "physical_location": [
        "A remote, desolate island where a group of people are trapped with a killer among them.",
        "A bustling metropolis where the protagonist is being hunted by a killer who knows the city better than they do.",
        "An isolated cabin in the woods, where a protagonist is forced to fight for their life against a relentless attacker.",
        "A high-tech skyscraper where a protagonist must navigate a maze of security systems and traps to escape.",
        "An underground bunker where a group of people are hiding from a killer, but the bunker is slowly failing.",
        "A sprawling desert where a protagonist is being hunted by a ruthless bounty hunter.",
        "A small-town where a killer has taken over, and the protagonist must find a way to escape.",
        "A high-speed train, where a protagonist must find a way to stop a bomb before it reaches its destination.",
        "A series of interconnected tunnels and sewers, where a protagonist is being chased by a killer.",
        "A seemingly normal suburban neighborhood, where a dark secret is hidden beneath the surface."
        ],
        "social_political_structure": [
        "A world where a corrupt government has all the power, and a protagonist must fight against it alone.",
        "A society where the police force is controlled by a powerful corporation, and a protagonist is a whistleblower.",
        "A world where 'truth serum' is a common tool, and a protagonist must find a way to lie to survive.",
        "A society where everyone is constantly being monitored, and a protagonist must find a way to break free.",
        "A world where all citizens are part of a 'hive mind,' and a protagonist is a 'defective' who can think for themselves.",
        "A society where a powerful cult has taken over, and a protagonist must escape their clutches.",
        "A world where the wealthy have all the power, and a protagonist from the lower class must fight for their life.",
        "A society where people are 'assigned' their jobs and destinies, and a protagonist is a rogue who wants to choose their own path.",
        "A world where a new form of energy has been discovered, and a protagonist must fight to keep it from falling into the wrong hands.",
        "A society where all citizens are 'ranked' based on their achievements, and a protagonist is a 'zero' who has to fight to survive."
        ],
        "rules_of_the_world": [
        "In this world, a person's 'fear' can be measured, and a killer is hunting people with the highest fear levels.",
        "A person's memories can be 'edited,' and a protagonist must find a way to restore their own.",
        "The world is divided into 'zones,' and a protagonist must find a way to cross the border without being caught.",
        "In this world, all humans have a 'kill switch' that can be activated by the government.",
        "A person's 'aura' can be seen by a few, and a killer is hunting people with a specific aura.",
        "All technology has a 'kill code' that can be activated by a single person, and a protagonist must find a way to stop it.",
        "A person's 'soul' can be 'bottled' and used as a weapon, and a protagonist must find a way to destroy it.",
        "In this world, a person's life can be 'reset,' and a protagonist is the only one who remembers the previous life.",
        "A person's 'dreams' can be 'hacked,' and a protagonist is being hunted by a killer in their own dreams.",
        "A person's 'shadow' can be used as a weapon, and a protagonist must find a way to destroy their own shadow."
        ],
        "atmosphere_and_sensory_details": [
        "The air is thick with the smell of fear and desperation, and the constant sound of a pounding heart fills the senses.",
        "A world of stark contrasts, with bright, sterile buildings and dark, grimy alleyways, and the constant feeling of being watched.",
        "A world of perpetual silence, where the only sound is the protagonist's own breathing and the soft crunch of their footsteps.",
        "A world where the air is heavy with the smell of blood and decay, and a constant, low-frequency hum fills the senses.",
        "A city of bright neon lights and loud, blaring music, but a constant sense of unease lingers beneath the surface.",
        "A world of perpetual winter, where the biting cold and the constant howl of the wind make it impossible to hide.",
        "A world where the air is thick with the smell of ozone and burnt metal, and the constant sound of a ticking clock fills the senses.",
        "A world where the only light comes from a single, flickering street lamp, and the shadows are long and full of secrets.",
        "A world where the sound of a person's voice can be 'recorded' and used against them, creating a world of paranoia.",
        "A world where the taste of fear is in the air, a metallic tang that only a few can perceive."
        ]
    },
    "horror": {
        "time_period": [
        "A modern-day town where a series of disappearances are linked to a local urban legend.",
        "The 1980s, with its slasher films and a group of teenagers who are being hunted by a killer.",
        "A time just after a natural disaster, with a group of survivors trapped in a haunted location.",
        "A world where a new form of technology has been created, and it's slowly turning people into monsters.",
        "A time where a plague has ravaged the world, and a protagonist must survive in a world of the undead.",
        "The Victorian era, with its spiritualists and seances, and a group of people who are being haunted by a ghost.",
        "A modern-day town where a ritual has gone wrong, and a protagonist must fight against a demonic entity.",
        "A world where dreams can be entered, and a protagonist is being hunted by a killer in their own dreams.",
        "A time where a person's 'aura' can be seen, and a protagonist is being hunted by a killer with a dark aura.",
        "A time where a new form of energy has been discovered, and it's slowly turning people into monsters."
        ],
        "physical_location": [
        "A remote, isolated cabin in the woods, where a group of friends are terrorized by a killer.",
        "A sprawling, decaying mansion with a dark past, where a new family has just moved in.",
        "A small-town where a supernatural entity is slowly consuming the inhabitants, one by one.",
        "A haunted asylum where a group of paranormal investigators are trapped with a malevolent entity.",
        "A a dilapidated lighthouse on a rocky shore, where a protagonist is isolated with a monster.",
        "A seemingly normal suburban neighborhood, where a dark secret is hidden beneath the surface.",
        "A vast, shifting cornfield, where a group of friends are hunted by a creature of legend.",
        "A series of interconnected tunnels and sewers, where a protagonist is being chased by a monster.",
        "A sprawling shopping mall after hours, where a group of employees are trapped with a killer.",
        "A creepy carnival where a group of teenagers are terrorized by a demonic clown."
        ],
        "social_political_structure": [
        "A society where a religious cult has taken over, and a protagonist must escape their clutches.",
        "A town where everyone is a member of a sinister secret society, and a protagonist is an outsider.",
        "A world where a government is using a 'fear' drug to control the population, and a protagonist is immune.",
        "A society where the only way to survive is to 'sacrifice' one person every year, and a protagonist is the next victim.",
        "A world where all citizens are part of a 'hive mind,' but a monster has found a way to corrupt it.",
        "A society where the dead can be 'reanimated,' but they are not the same people they once were.",
        "A world where a parasitic creature can possess human bodies, and a protagonist must figure out who to trust.",
        "A society where a family is cursed, and a protagonist must find a way to break the curse before they die.",
        "A world where all citizens are 'ranked' based on their fear levels, and the monster is hunting the most fearful.",
        "A society where all citizens are part of a 'ghost network,' and a protagonist is being haunted by a ghost."
        ],
        "rules_of_the_world": [
        "A person can only be killed by a specific weapon, and a protagonist must find it to survive.",
        "All magic is tied to a specific ritual, and the monster is hunting people who are trying to perform it.",
        "A person's 'fear' can be used as a weapon, and the monster is feeding off of it.",
        "The only way to kill the monster is to 'sacrifice' something you love, with a more powerful monster requiring a more important sacrifice.",
        "A person's 'soul' can be 'bottled' and used as a weapon, and a protagonist must find a way to destroy it.",
        "In this world, all humans have a 'kill switch' that can be activated by a monster.",
        "A person's 'shadow' can be used as a weapon, and a protagonist must find a way to destroy their own shadow.",
        "The only way to survive is to 'tell the truth,' but the monster has a way to make people lie.",
        "A person's 'dreams' can be 'hacked,' and a protagonist is being haunted by a killer in their own dreams.",
        "A person's 'memories' can be 'erased,' and a protagonist is being hunted by a monster who wants to erase them from existence."
        ],
        "atmosphere_and_sensory_details": [
        "The air is thick with the smell of decay and death, and the constant sound of a pounding heart fills the senses.",
        "A world of muted colors and long shadows, where the constant fog creates an eerie and unsettling atmosphere.",
        "A small-town where the air smells of freshly cut grass and baked goods, but there's a constant sense of unease.",
        "A city of bright neon lights and holographic signs, but the air is thick with the smell of decay.",
        "A world of perpetual winter, where the biting cold and the constant howl of the wind make it impossible to hide.",
        "A city with a constant, low-frequency hum that gives everyone a headache, but nobody knows what it is.",
        "A world of vibrant, unnatural colors and smells, but a constant sense of dread lingers in the air.",
        "A haunted asylum where the smell of stale blood and fear is everywhere, and the sound of screams echoes in the halls.",
        "A world where the taste of fear is in the air, a metallic tang that only a few can perceive.",
        "A world where the sound of a person's voice can be 'recorded' and used against them, creating a world of paranoia."
        ]
    },
    "romance": {
        "time_period": [
        "The Victorian era, with its strict social rules and romantic ideals, perfect for a forbidden love story.",
        "A modern-day city in a high-tech future, where love is a carefully curated and controlled experience.",
        "The roaring twenties, with its speakeasies and flappers, and a secret love story that blossoms in the chaos.",
        "A small-town in the 1950s, with its idyllic charm and a romance that challenges the social norms.",
        "A post-WWII setting, where a soldier returns home to a love he thought he had lost forever.",
        "The present day, where a love story blossoms on a dating app, but the two people are hiding their true identities.",
        "A time where communication is slow and difficult, forcing a couple to rely on letters and postcards to stay in touch.",
        "A futuristic space station where a love story blossoms between two people from different social classes.",
        "A time where a person's 'soulmate' can be 'found' by a machine, but the protagonist's is a complete stranger.",
        "A world where a series of letters from a long-lost love are found, and the protagonist must find the person who wrote them."
        ],
        "physical_location": [
        "A bustling metropolis where two people from different walks of life meet by chance.",
        "A small, charming town in the countryside, where a city-dweller finds love and a new life.",
        "A luxurious cruise ship in the middle of the ocean, where a couple falls in love while on a vacation.",
        "A remote, isolated island where two people are stranded, and a romance blossoms out of necessity.",
        "A college campus where a professor falls in love with a student, and their romance is a secret.",
        "A sprawling museum where two people meet while working on a new exhibit.",
        "A small-town carnival, with its funhouse mirrors and dark secrets, where a couple falls in love.",
        "A a futuristic city built entirely on water, with a love story that blossoms on a a submarine.",
        "A world where a series of connected islands, where a couple is separated by a storm.",
        "A seemingly normal suburban neighborhood, where a romance blossoms between two neighbors."
        ],
        "social_political_structure": [
        "A society where a person's 'soulmate' is chosen for them by the government, and a protagonist must fight for their own love.",
        "A world where a powerful family is trying to arrange a marriage for a protagonist, but they are in love with someone else.",
        "A society where a person's 'social credit' dictates their love life, and a protagonist is a 'zero' who falls in love with a 'ten.'",
        "A matriarchal society where men are treated as second-class citizens, and a romance blossoms between a man and a woman.",
        "A world where a person's 'love' can be 'measured,' and a protagonist's love is deemed 'fake.'",
        "A society where the wealthy have all the power, and a protagonist from the lower class must fight for their love.",
        "A world where all citizens are part of a 'hive mind,' but a couple has found a way to disconnect and fall in love.",
        "A society where a person's 'destiny' is chosen for them by an oracle, and a protagonist must fight for their own path.",
        "A world where a new form of energy has been discovered, and a couple must fight to keep it from falling into the wrong hands.",
        "A society where all citizens are 'ranked' based on their achievements, and a protagonist is a 'zero' who falls in love with a 'ten.'"
        ],
        "rules_of_the_world": [
        "A person's 'soulmate' can be found through a magical ritual, but a protagonist's ritual goes wrong.",
        "In this world, all humans have a 'love mark' that appears on their body when they meet their soulmate.",
        "The world is divided into 'realms,' and a couple is separated by a magical barrier.",
        "A person's 'love' can be 'stolen' by a powerful sorcerer, and a protagonist must get it back.",
        "A person's 'soul' can be 'bottled' and used as a love potion, but it has a terrible side effect.",
        "In this world, all humans have a 'love meter' that shows their level of love for someone.",
        "A person's 'shadow' can be used as a love charm, but it has a terrible side effect.",
        "The only way to communicate is through a complex code, and a couple must learn it to stay in touch.",
        "A person's 'dreams' can be 'hacked,' and a protagonist is being haunted by their ex-lover in their own dreams.",
        "A person's 'memories' can be 'erased,' and a protagonist is being hunted by someone who wants to erase their love."
        ],
        "atmosphere_and_sensory_details": [
        "The air is thick with the smell of rain and exhaust fumes, and the constant blare of horns fills the streets.",
        "A world of muted colors and long shadows, where the constant fog creates an eerie and unsettling atmosphere.",
        "A small-town where the air smells of freshly cut grass and baked goods, and a constant sense of comfort and love.",
        "A city of bright neon lights and holographic signs, but the air is thick with the smell of decay.",
        "A world of perpetual winter, where the biting cold and the constant howl of the wind make it impossible to hide.",
        "A city with a constant, low-frequency hum that gives everyone a headache, but nobody knows what it is.",
        "A world of vibrant, unnatural colors and smells, but a constant sense of dread lingers in the air.",
        "A museum where the smell of old paper and dust is everywhere, and the sound of footsteps echoes in the halls.",
        "A world where the sound of a person's voice can be 'recorded' and used against them, creating a world of paranoia.",
        "A world where the taste of love is in the air, a sweet, metallic tang that only a few can perceive."
        ]
    },
    "action_adventure": {
        "time_period": [
        "A post-apocalyptic future where a group of survivors must brave the dangers of a desolate world.",
        "A modern-day world where a conspiracy from the past is now resurfacing, with deadly consequences.",
        "A time where a new form of energy has been discovered, and a protagonist must fight to keep it from falling into the wrong hands.",
        "A world where a series of portals to other dimensions have opened, and a protagonist must explore them to save the world.",
        "A a futuristic space station where a love story blossoms between two people from different social classes.",
        "A time where a new form of energy has been discovered, and a protagonist must fight to keep it from falling into the wrong hands.",
        "A world where a serial killer is hunting people based on their astrological signs.",
        "A time where a pandemic has ravaged the world, and a protagonist must survive in a world of chaos.",
        "A world just after a first-contact event, where a human protagonist is being hunted by an alien.",
        "A time where a new form of energy has been discovered, and it's slowly turning people into monsters."
        ],
        "physical_location": [
        "A remote, desolate island where a group of people are trapped with a killer among them.",
        "A bustling metropolis where the protagonist is being hunted by a killer who knows the city better than they do.",
        "An isolated cabin in the woods, where a protagonist is forced to fight for their life against a relentless attacker.",
        "A high-tech skyscraper where a protagonist must navigate a maze of security systems and traps to escape.",
        "An underground bunker where a group of people are hiding from a killer, but the bunker is slowly failing.",
        "A sprawling desert where a protagonist is being hunted by a ruthless bounty hunter.",
        "A small-town where a killer has taken over, and the protagonist must find a way to escape.",
        "A high-speed train, where a protagonist must find a way to stop a bomb before it reaches its destination.",
        "A series of interconnected tunnels and sewers, where a protagonist is being chased by a killer.",
        "A seemingly normal suburban neighborhood, where a dark secret is hidden beneath the surface."
        ],
        "social_political_structure": [
        "A world where a corrupt government has all the power, and a protagonist must fight against it alone.",
        "A society where the police force is controlled by a powerful corporation, and a protagonist is a whistleblower.",
        "A world where 'truth serum' is a common tool, and a protagonist must find a way to lie to survive.",
        "A society where everyone is constantly being monitored, and a protagonist must find a way to break free.",
        "A world where all citizens are part of a 'hive mind,' but a protagonist is a 'defective' who can think for themselves.",
        "A society where a powerful cult has taken over, and a protagonist must escape their clutches.",
        "A world where the wealthy have all the power, and a protagonist from the lower class must fight for their life.",
        "A society where people are 'assigned' their jobs and destinies, and a protagonist is a rogue who wants to choose their own path.",
        "A world where a new form of energy has been discovered, and a protagonist must fight to keep it from falling into the wrong hands.",
        "A society where all citizens are 'ranked' based on their achievements, and a protagonist is a 'zero' who has to fight to survive."
        ],
        "rules_of_the_world": [
        "In this world, a person's 'fear' can be measured, and a killer is hunting people with the highest fear levels.",
        "A person's memories can be 'edited,' and a protagonist must find a way to restore their own.",
        "The world is divided into 'zones,' and a protagonist must find a way to cross the border without being caught.",
        "In this world, all humans have a 'kill switch' that can be activated by the government.",
        "A person's 'aura' can be seen by a few, and a killer is hunting people with a specific aura.",
        "All technology has a 'kill code' that can be activated by a single person, and a protagonist must find a way to stop it.",
        "A person's 'soul' can be 'bottled' and used as a weapon, and a protagonist must find a way to destroy it.",
        "In this world, a person's life can be 'reset,' and a protagonist is the only one who remembers the previous life.",
        "A person's 'dreams' can be 'hacked,' and a protagonist is being hunted by a killer in their own dreams.",
        "A person's 'shadow' can be used as a weapon, and a protagonist must find a way to destroy their own shadow."
        ],
        "atmosphere_and_sensory_details": [
        "The air is thick with the smell of fear and desperation, and the constant sound of a pounding heart fills the senses.",
        "A world of stark contrasts, with bright, sterile buildings and dark, grimy alleyways, and the constant feeling of being watched.",
        "A world of perpetual silence, where the only sound is the protagonist's own breathing and the soft crunch of their footsteps.",
        "A world where the air is heavy with the smell of blood and decay, and a constant, low-frequency hum fills the senses.",
        "A city of bright neon lights and loud, blaring music, but a constant sense of unease lingers beneath the surface.",
        "A world of perpetual winter, where the biting cold and the constant howl of the wind make it impossible to hide.",
        "A world where the air is thick with the smell of ozone and burnt metal, and the constant sound of a ticking clock fills the senses.",
        "A world where the only light comes from a single, flickering street lamp, and the shadows are long and full of secrets.",
        "A world where the sound of a person's voice can be 'recorded' and used against them, creating a world of paranoia.",
        "A world where the taste of fear is in the air, a metallic tang that only a few can perceive."
        ]
    },
    "dystopian": {
        "time_period": [
        "A near-future where a corrupt government is using advanced technology to control the population.",
        "A post-apocalyptic future, where a group of survivors is hunted by a relentless killer.",
        "A time where a pandemic has ravaged the world, and a protagonist must survive in a world of chaos.",
        "A world just after a first-contact event, where a human protagonist is being hunted by an alien.",
        "A modern-day world where a conspiracy from the past is now resurfacing, with deadly consequences.",
        "A time where a new form of energy has been discovered, and a protagonist must fight to keep it from falling into the wrong hands.",
        "A world where the internet has been shut down, and a protagonist must rely on old-school methods to survive.",
        "A time of a 'digital plague' where all technology is being corrupted, and a protagonist must find a way to stop it.",
        "A world where a serial killer is hunting people based on their astrological signs.",
        "A time where a person's 'soulmate' can be 'found' by a machine, but the protagonist's is a complete stranger."
        ],
        "physical_location": [
        "A remote, desolate island where a group of people are trapped with a killer among them.",
        "A bustling metropolis where the protagonist is being hunted by a killer who knows the city better than they do.",
        "An isolated cabin in the woods, where a protagonist is forced to fight for their life against a relentless attacker.",
        "A high-tech skyscraper where a protagonist must navigate a maze of security systems and traps to escape.",
        "An underground bunker where a group of people are hiding from a killer, but the bunker is slowly failing.",
        "A sprawling desert where a protagonist is being hunted by a ruthless bounty hunter.",
        "A small-town where a killer has taken over, and the protagonist must find a way to escape.",
        "A high-speed train, where a protagonist must find a way to stop a bomb before it reaches its destination.",
        "A series of interconnected tunnels and sewers, where a protagonist is being chased by a killer.",
        "A seemingly normal suburban neighborhood, where a dark secret is hidden beneath the surface."
        ],
        "social_political_structure": [
        "A world where a corrupt government has all the power, and a protagonist must fight against it alone.",
        "A society where the police force is controlled by a powerful corporation, and a protagonist is a whistleblower.",
        "A world where 'truth serum' is a common tool, and a protagonist must find a way to lie to survive.",
        "A society where everyone is constantly being monitored, and a protagonist must find a way to break free.",
        "A world where all citizens are part of a 'hive mind,' but a protagonist is a 'defective' who can think for themselves.",
        "A society where a powerful cult has taken over, and a protagonist must escape their clutches.",
        "A world where the wealthy have all the power, and a protagonist from the lower class must fight for their life.",
        "A society where people are 'assigned' their jobs and destinies, and a protagonist is a rogue who wants to choose their own path.",
        "A world where a new form of energy has been discovered, and a protagonist must fight to keep it from falling into the wrong hands.",
        "A society where all citizens are 'ranked' based on their achievements, and a protagonist is a 'zero' who has to fight to survive."
        ],
        "rules_of_the_world": [
        "In this world, a person's 'fear' can be measured, and a killer is hunting people with the highest fear levels.",
        "A person's memories can be 'edited,' and a protagonist must find a way to restore their own.",
        "The world is divided into 'zones,' and a protagonist must find a way to cross the border without being caught.",
        "In this world, all humans have a 'kill switch' that can be activated by the government.",
        "A person's 'aura' can be seen by a few, and a killer is hunting people with a specific aura.",
        "All technology has a 'kill code' that can be activated by a single person, and a protagonist must find a way to stop it.",
        "A person's 'soul' can be 'bottled' and used as a weapon, and a protagonist must find a way to destroy it.",
        "In this world, a person's life can be 'reset,' and a protagonist is the only one who remembers the previous life.",
        "A person's 'dreams' can be 'hacked,' and a protagonist is being hunted by a killer in their own dreams.",
        "A person's 'shadow' can be used as a weapon, and a protagonist must find a way to destroy their own shadow."
        ],
        "atmosphere_and_sensory_details": [
        "The air is thick with the smell of fear and desperation, and the constant sound of a pounding heart fills the senses.",
        "A world of stark contrasts, with bright, sterile buildings and dark, grimy alleyways, and the constant feeling of being watched.",
        "A world of perpetual silence, where the only sound is the protagonist's own breathing and the soft crunch of their footsteps.",
        "A world where the air is heavy with the smell of blood and decay, and a constant, low-frequency hum fills the senses.",
        "A city of bright neon lights and loud, blaring music, but a constant sense of unease lingers beneath the surface.",
        "A world of perpetual winter, where the biting cold and the constant howl of the wind make it impossible to hide.",
        "A world where the air is thick with the smell of ozone and burnt metal, and the constant sound of a ticking clock fills the senses.",
        "A world where the only light comes from a single, flickering street lamp, and the shadows are long and full of secrets.",
        "A world where the sound of a person's voice can be 'recorded' and used against them, creating a world of paranoia.",
        "A world where the taste of fear is in the air, a metallic tang that only a few can perceive."
        ]
    }
}//Done

const detailsCharacters = {
    "fantasy": {
        "mc_flaw": [
        "A mage whose incredible power is tied to their repressed grief, causing destructive outbursts.",
        "A knight with a deep-seated fear of failure that makes them reckless and overly aggressive.",
        "A thief who can't resist a challenge, leading them to steal from the most powerful and dangerous sorcerers.",
        "An elf with a debilitating addiction to a magical substance that grants visions but erodes their soul.",
        "A royal heir whose sense of entitlement blinds them to the suffering of their people."
        ],
        "mc_motivation": [
        "To find and destroy the last of their kind, a curse they believe they alone can end.",
        "To recover a lost artifact that holds the key to their forgotten memories.",
        "To prove their worth to a disapproving parent by accomplishing a near-impossible quest.",
        "To discover the source of their own unique magic, which they cannot control.",
        "To save a mythical creature from being hunted, seeing in its plight a reflection of their own."
        ],
        "mc_backstory": [
        "A disgraced oracle banished from their home after a prophecy they made came true, but at a terrible cost.",
        "The last surviving member of a line of dragon-riders, haunted by the memory of their family's demise.",
        "A former assassin who retired to a quiet life, but is forced back into the fold by a new threat.",
        "A commoner who discovered they are the heir to a fallen kingdom and must now learn to lead.",
        "A disgraced knight who sacrificed their honor to save a kingdom, now living in obscurity."
        ],
        "conflict": [
        "A city-dwelling protagonist must navigate a labyrinth of ancient sewers, which are both physically and magically hostile.",
        "A protagonist's internal struggle with a sentient, magical sword that whispers destructive promises.",
        "A world where magic is a finite resource, leading to a desperate race to control the last remaining source.",
        "A protagonist who discovers they are a prophecy's 'chosen one,' but must fight against their own destiny.",
        "A magical disease is turning people into monsters, forcing a protagonist to fight against their own friends and family."
        ],
        "mc_arc": [
        "A timid, sheltered protagonist who must grow into a powerful leader to save their people from a tyrannical ruler.",
        "A cynical sellsword who learns to trust and form bonds with a found family, risking their life for them.",
        "An arrogant sorcerer who loses their power and must learn to survive and help others without it.",
        "A young orphan who becomes a celebrated hero, only to realize the cost of their fame and seek a simpler life.",
        "A vengeful protagonist who learns to forgive and let go of their past to break a cycle of violence."
        ],
        "mc_antagonist_relationship": [
        "A protagonist and antagonist who were once mentor and apprentice, now on opposite sides of a magical war.",
        "The protagonist's estranged sibling who seeks to use a dark magic the protagonist wants to destroy.",
        "The protagonist's former best friend who has embraced a dark power for the 'greater good.'",
        "A shared a bloodline with the antagonist, making their conflict a battle against their own nature.",
        "A protagonist who must fight the ghost of their own past, which has taken on a physical form."
        ]
    },
    "science_fiction": {
        "mc_flaw": [
        "A brilliant scientist with a god complex who pushes ethical boundaries to the breaking point.",
        "A cybernetically enhanced soldier who suffers from a fragmented memory, unable to trust their own past.",
        "A starship captain who refuses to delegate, leading to a catastrophic failure of their command.",
        "An AI programmer who is overly empathetic, leading them to treat AI as equals even when it's dangerous.",
        "A space pirate whose greed for rare tech outweighs their sense of self-preservation."
        ],
        "mc_motivation": [
        "To find a cure for a genetic disease that is slowly erasing their family from existence.",
        "To expose a corrupt corporation that is harvesting the minds of its employees for profit.",
        "To find the last remaining piece of an ancient alien artifact that could save humanity or destroy it.",
        "To return to their home planet, which was terraformed into a hostile wasteland.",
        "To find out who wiped their memory and why, a quest that could expose a galaxy-spanning conspiracy."
        ],
        "mc_backstory": [
        "A former astronaut who was stranded in deep space for decades and must now adjust to a changed world.",
        "A rebel hacker who was once a loyal company man, but was betrayed and left for dead.",
        "The clone of a legendary war hero, struggling to live up to a legacy they never asked for.",
        "A child of a forgotten colony, raised in a simulated reality and now struggling to understand the real world.",
        "A scientist whose groundbreaking discovery was stolen, leading them to a life of seeking revenge."
        ],
        "conflict": [
        "A planet-wide quarantine is failing, and a protagonist must navigate a society breaking down.",
        "A protagonist's internal struggle with an AI implant that is slowly taking over their mind.",
        "A colony ship's terraforming system is failing, and the protagonist must make a choice between saving the crew or the new world.",
        "A protagonist must fight a society that has become addicted to a virtual reality, losing their grip on what's real.",
        "A sentient nebula is consuming star systems, and a protagonist must find a way to communicate with it before it's too late."
        ],
        "mc_arc": [
        "A cynical loner who learns to trust and work with a team to stop an alien invasion.",
        "A brilliant but naive scientist who discovers the dark side of their invention and must stop its spread.",
        "A soldier who believes in a rigid code of honor but is forced to break all their rules to survive.",
        "A protagonist who is part of a hive mind but yearns for individuality, risking everything to break free.",
        "A human who is being assimilated by an alien race, but finds a way to use the connection to fight back."
        ],
        "mc_antagonist_relationship": [
        "A protagonist and antagonist who are both vying for control of the same superweapon, each believing it's for the 'greater good.'",
        "A protagonist's former partner who has become the leader of a rogue AI cult, trying to 'liberate' humanity.",
        "The protagonist's creator, a scientist who sees them as a failed experiment and wants to erase their existence.",
        "A shared consciousness links the protagonist and antagonist, making every thought and action a battle.",
        "The protagonist's clone, who believes they are the original and wants to take their place."
        ]
    },
    "mystery": {
        "mc_flaw": [
        "A detective with an eidetic memory but a crippling fear of enclosed spaces, making some crime scenes impossible to investigate.",
        "A private investigator whose alcoholism masks a past failure, leading them to be reckless and overly emotional.",
        "A journalist whose need for a sensational story makes them manipulate evidence and witnesses.",
        "A profiler who gets too close to their cases, blurring the line between investigator and victim.",
        "A retired police officer who is still haunted by a cold case, causing them to neglect their family and responsibilities."
        ],
        "mc_motivation": [
        "To clear the name of their family member who was wrongly accused of a high-profile crime.",
        "To find a missing person, believing they are the only one who can save them from a sinister plot.",
        "To solve a series of seemingly unrelated crimes that they believe are connected to a single mastermind.",
        "To uncover a secret society operating in the shadows of their city, which they stumbled upon by accident.",
        "To avenge the death of a loved one by finding the person who was responsible."
        ],
        "mc_backstory": [
        "A former FBI agent who quit after a case went horribly wrong, and is now pulled back into the fold.",
        "A brilliant forensic scientist who faked their own death to escape a dangerous criminal syndicate.",
        "A small-town sheriff who has been hiding a dark secret about their community for years.",
        "A detective who lost their child to a kidnapping and now dedicates their life to finding other missing children.",
        "A journalist who was once a rising star, but a scandalous article ruined their career and they're seeking redemption."
        ],
        "conflict": [
        "A protagonist must solve a series of murders in a city that is slowly being submerged by rising sea levels.",
        "A protagonist's internal conflict between solving a case and protecting the person they love, who is a suspect.",
        "A protagonist must solve a murder where all the suspects have an air-tight alibi, seemingly making the crime impossible.",
        "A small-town protagonist must fight against a powerful conspiracy that wants to bury the truth about a murder.",
        "A protagonist is trapped in a locked-room mystery where they are a suspect and must prove their innocence."
        ],
        "mc_arc": [
        "A cynical and jaded detective who learns to believe in justice again after solving a case that restores their faith.",
        "A protagonist who is a master of lies and deception but must learn to be honest to solve their most challenging case.",
        "An unassuming archivist who uncovers a dark secret and must grow to become a courageous investigator.",
        "A protagonist who relies on technology but is forced to use their wits and intuition when all their tools are useless.",
        "A naive young detective who learns the brutal truth about the world and must harden themselves to survive."
        ],
        "mc_antagonist_relationship": [
        "A protagonist and antagonist who were childhood friends, with the antagonist now a ruthless serial killer.",
        "A protagonist who is being hunted by the very person they are trying to prove innocent.",
        "The protagonist's former mentor, who is now the mastermind behind a series of seemingly perfect crimes.",
        "The protagonist's sibling who is part of a criminal syndicate, forcing a choice between family and justice.",
        "A protagonist who discovers that the antagonist is a reflection of their own dark side, making the case personal."
        ]
    },
    "thriller": {
        "mc_flaw": [
        "A spy with a deep-seated paranoia that makes them question every alliance and motive.",
        "A survival expert who is overconfident in their abilities, leading them to take unnecessary risks.",
        "A corporate whistleblower whose need for control makes them a target for a powerful and ruthless company.",
        "A hacker who suffers from agoraphobia, making it difficult to escape or confront their enemies in person.",
        "A former soldier whose PTSD causes them to have flashbacks at the worst possible moments."
        ],
        "mc_motivation": [
        "To expose a government cover-up, believing they are the only one who knows the truth.",
        "To save their kidnapped family, who are being used as leverage in a dangerous game.",
        "To find a cure for a biological weapon that has been unleashed on their city.",
        "To find a person who has been framed for a crime they didn't commit, as a way to atone for their own past mistakes.",
        "To outsmart a genius assassin who is targeting them for a reason they don't understand."
        ],
        "mc_backstory": [
        "A former Black Ops agent who was presumed dead, and is now living a quiet life until a past enemy resurfaces.",
        "A retired hitman who is forced back into the game to protect someone they care about.",
        "A victim of a terrible crime who has spent their life preparing for revenge, and now the moment has come.",
        "A brilliant data analyst who stumbled upon a conspiracy while working a mundane job.",
        "A detective who was kicked off a case and is now pursuing it on their own, risking everything."
        ],
        "conflict": [
        "A protagonist must survive a deadly game of cat-and-mouse against a brilliant serial killer in a remote location.",
        "A protagonist's internal conflict between trusting their friends or listening to the warnings of a stranger.",
        "A protagonist is a witness to a murder, but they are trapped in a city under lockdown, with the killer closing in.",
        "A protagonist must fight against a powerful organization that has infiltrated every aspect of their life.",
        "A protagonist is caught in a psychological war, where they can't tell what's real and what's a hallucination."
        ],
        "mc_arc": [
        "A meek, ordinary person who is forced to become a ruthless survivor to protect their loved ones.",
        "A protagonist who is a master manipulator but must learn to be genuine to form a true connection.",
        "A protagonist who relies on brute force but must learn to use their wits to outsmart a more intelligent foe.",
        "A paranoid person who learns to trust and form a team to survive a terrifying ordeal.",
        "A protagonist who is running from their past but must finally confront it to save their future."
        ],
        "mc_antagonist_relationship": [
        "The protagonist and antagonist are a dysfunctional married couple, each trying to outwit the other.",
        "A protagonist who must protect their family from a ruthless antagonist who is their own parent.",
        "The protagonist and antagonist were once partners, but a betrayal has turned them into bitter enemies.",
        "The antagonist is a terrifying mirror of the protagonist, with the same skills but a different moral compass.",
        "The antagonist is a benevolent figure in society, but the protagonist is the only one who knows their dark secret."
        ]
    },
    "horror": {
        "mc_flaw": [
        "A skeptic who refuses to believe in the supernatural, even when confronted with undeniable evidence.",
        "A protagonist who is easily influenced by others, leading them to follow their friends into dangerous situations.",
        "A person who is too trusting, and doesn't see the red flags in a seemingly friendly person or situation.",
        "A protagonist who is overly confident in their ability to 'fight back,' making them reckless.",
        "A parent whose love for their child is so strong it blinds them to the evil their child has become."
        ],
        "mc_motivation": [
        "To find their missing child, who they believe was taken by a malevolent entity.",
        "To uncover the truth behind a local legend that has haunted their town for generations.",
        "To survive a night in a haunted house, as a dare that they are now regretting.",
        "To protect a group of friends from a supernatural force that is slowly picking them off one by one.",
        "To find a way to break a curse that is slowly consuming their family line."
        ],
        "mc_backstory": [
        "A former cult member who escaped and is now haunted by their past, which they believe is coming back for them.",
        "A person who was the sole survivor of a massacre and is now being stalked by the same killer.",
        "A protagonist who inherited an old house with a dark history, which they are now uncovering.",
        "A grieving parent who has lost their child, and a malevolent entity is now using their grief to manipulate them.",
        "A person who was once a believer in the paranormal but now has to face their own fears."
        ],
        "conflict": [
        "A protagonist must survive a night in a remote cabin while a creature hunts them from the surrounding woods.",
        "A protagonist's internal struggle with their own sanity, as they are stalked by a presence only they can see.",
        "A protagonist must find a way to escape a town that is slowly being taken over by a cult.",
        "A protagonist must confront the ghost of their own past, which has become a malevolent entity.",
        "A protagonist is trapped in a house that is slowly turning against them, with the walls and doors moving."
        ],
        "mc_arc": [
        "A cowardly person who finds their courage when they are forced to confront an unimaginable evil.",
        "A protagonist who is a master of logic but must learn to accept the illogical and terrifying nature of the supernatural.",
        "A person who is running from a traumatic event but is forced to face it to survive.",
        "A protagonist who has a dark secret but must confess it to save their friends from a curse.",
        "A selfish person who learns to care about others and sacrifices themselves for the greater good."
        ],
        "mc_antagonist_relationship": [
        "A protagonist who is the unwilling host for a malevolent spirit that wants to take over their body.",
        "A protagonist and antagonist who are twin siblings, one of whom has become a terrifying monster.",
        "The protagonist's partner, who is being controlled by a demonic entity.",
        "A protagonist who is being hunted by the ghost of a person they once wronged.",
        "The protagonist's parent, who is the leader of a murderous cult."
        ]
    },
    "romance": {
        "mc_flaw": [
        "A protagonist who is a hopeless romantic, but their idealized view of love prevents them from seeing red flags.",
        "A cynic who has built up an emotional wall, making it impossible for them to be vulnerable.",
        "A person who is too afraid of commitment, and pushes away anyone who gets too close.",
        "A protagonist who is a people-pleaser, and can't say no to their partner, even when it's harmful.",
        "A person who has been hurt in the past and is now overly protective of their heart, pushing away genuine love."
        ],
        "mc_motivation": [
        "To find their soulmate, believing that they are destined to be with someone special.",
        "To win a competition to prove their worth to their family, and in doing so, finds love.",
        "To find a way to get their ex-partner back, even if it means changing themselves.",
        "To escape a life of arranged marriage, and in doing so, finds true love.",
        "To start a new life in a new city and overcome their fear of being alone."
        ],
        "mc_backstory": [
        "A person who had a perfect love story that ended in tragedy and is now struggling to move on.",
        "A protagonist who grew up in a strict household and is now discovering the world of love and freedom.",
        "A person who has been in love with their best friend for years, but never had the courage to tell them.",
        "A person who has been in a series of failed relationships and is now jaded and cynical.",
        "A protagonist who has a secret identity, and is now falling in love with someone who doesn't know the truth."
        ],
        "conflict": [
        "A protagonist must choose between their career and the person they love, who lives far away.",
        "A protagonist's internal struggle with their own self-worth, making them believe they are not worthy of love.",
        "A protagonist must fight against a societal norm or expectation that forbids their love.",
        "A protagonist must deal with a series of misunderstandings and miscommunications with their potential love interest.",
        "A protagonist's friends and family do not approve of their love interest, forcing them to choose."
        ],
        "mc_arc": [
        "A protagonist who learns to love and trust again after a devastating heartbreak.",
        "A cynical protagonist who opens their heart to a person who teaches them the meaning of love.",
        "A protagonist who is too afraid to be themselves but finds the courage to be authentic for love.",
        "A protagonist who believes they are meant to be alone but finds a connection that changes their life.",
        "A protagonist who is a master of deception and must learn to be honest with their partner."
        ],
        "mc_antagonist_relationship": [
        "A protagonist's ex-lover who is now a rival for the same person's affection.",
        "A protagonist and their love interest are from warring families, a modern-day Romeo and Juliet.",
        "The protagonist's partner's best friend who is trying to sabotage their relationship.",
        "The protagonist is in a love triangle, with the antagonist being their partner's other lover.",
        "A protagonist's love interest is the one who hurt them in the past."
        ]
    },
    "action_adventure": {
        "mc_flaw": [
        "A treasure hunter with a reckless disregard for rules, leading them into traps they can't escape.",
        "A soldier whose loyalty is so strong it makes them blind to the corruption of their own leaders.",
        "An explorer with a debilitating fear of heights, making a mountain-climbing expedition impossible.",
        "A pilot who is overconfident in their flying skills, causing them to take unnecessary risks.",
        "A martial arts master who is unable to fight a worthy opponent due to their past."
        ],
        "mc_motivation": [
        "To find a hidden artifact that can restore their dying world, believing it's their destiny.",
        "To stop a powerful warlord from unleashing a devastating weapon on a peaceful kingdom.",
        "To save their kidnapped sibling, who is being held for a ransom that is impossible to pay.",
        "To explore an uncharted territory, believing it holds the key to a lost civilization.",
        "To avenge the death of a parent by finding the person responsible for their demise."
        ],
        "mc_backstory": [
        "A former soldier who was dishonorably discharged and is now seeking redemption.",
        "A person who grew up in a dangerous environment and is now a master of survival.",
        "An archeologist who was once a skeptic but now has to confront the reality of the legends they study.",
        "A person who was once a sidekick to a legendary hero and now has to step up to become a hero themselves.",
        "A former special ops agent who is now a government whistleblower on the run."
        ],
        "conflict": [
        "A protagonist must navigate a treacherous jungle filled with dangerous creatures and ancient traps.",
        "A protagonist's internal conflict between their mission and their personal feelings for their team.",
        "A protagonist must fight against a powerful army while being hunted by a ruthless assassin.",
        "A protagonist is trapped in a race against time to stop a world-ending event.",
        "A protagonist must fight a series of impossible enemies and a betrayal from within their own ranks."
        ],
        "mc_arc": [
        "A timid person who finds their inner strength and becomes a hero in a life-or-death situation.",
        "A protagonist who is a lone wolf but learns to trust and work with a team to accomplish a goal.",
        "A protagonist who is a master of their craft but learns that they can't do everything on their own.",
        "A person who is running from a past trauma but is forced to confront it to save the day.",
        "A protagonist who is a master of deception and must learn to be honest to earn their team's trust."
        ],
        "mc_antagonist_relationship": [
        "A protagonist's mentor who has become a ruthless warlord.",
        "The protagonist's estranged sibling who is now the leader of a rival organization.",
        "A protagonist who must fight against a former friend who has become a terrifying monster.",
        "A protagonist and antagonist are a dysfunctional father-daughter duo, each with a different vision for the future.",
        "A protagonist's partner, who has been corrupted by a dark power."
        ]
    },
    "dystopian": {
        "mc_flaw": [
        "A protagonist who is too trusting of authority, and doesn't see the signs of a crumbling society.",
        "A person who is overly rebellious, and their reckless actions put their friends and family in danger.",
        "A protagonist who is too afraid to stand up for what's right, and goes along with a corrupt system.",
        "A person whose love for their family makes them willing to do anything, even betray their own people.",
        "A protagonist who has a crippling fear of failure, making them unable to act when it matters most."
        ],
        "mc_motivation": [
        "To find a way to escape their tyrannical society and find freedom.",
        "To expose a corrupt government that is controlling the population through a mind-altering drug.",
        "To find a cure for a disease that is slowly turning people into mindless drones.",
        "To find their missing twin sibling, who they believe was taken by the government.",
        "To lead a rebellion against a powerful corporation that has taken over the world."
        ],
        "mc_backstory": [
        "A former high-ranking official who defected from the government and is now a hunted rebel.",
        "A person who was once a believer in the system but has now seen the truth and is fighting back.",
        "A person who grew up in a privileged class but now must navigate a society of poverty and suffering.",
        "A protagonist who was once a soldier for a tyrannical government, but is now seeking to atone for their past actions.",
        "A person who has been living in a virtual reality, and is now discovering the truth of their society."
        ],
        "conflict": [
        "A protagonist must navigate a society where everyone is constantly being monitored, and any wrong move is fatal.",
        "A protagonist's internal struggle between their loyalty to the system and their newfound desire for freedom.",
        "A protagonist must fight against a government that has the ability to read their mind and thoughts.",
        "A protagonist must choose between saving their family or a society that they are now a part of.",
        "A protagonist is trapped in a city where the air is toxic, and they must find a way to survive."
        ],
        "mc_arc": [
        "A protagonist who is a conformist but learns to become a rebel and fight for their freedom.",
        "A protagonist who is a lone wolf but learns to trust and lead a group of rebels.",
        "A protagonist who is a master of manipulation but learns to be honest to earn their people's trust.",
        "A protagonist who is a believer in the system but is forced to face the truth and fight against it.",
        "A protagonist who has a dark past and must find a way to redeem themselves by saving their society."
        ],
        "mc_antagonist_relationship": [
        "A protagonist who is fighting against their own parent, who is the leader of a tyrannical society.",
        "The protagonist's former lover, who is now a high-ranking official in the corrupt government.",
        "A protagonist and antagonist are a dysfunctional married couple, with one being a rebel and the other a loyalist.",
        "The antagonist is a terrifying mirror of the protagonist, with the same skills and beliefs but a different path.",
        "A protagonist is fighting against their own clone, who is a loyal servant of the government."
        ]
    }
}//Done

const styleDetails = {
    "point_of_view": { 
        "narrator":[
            "Third-Person Omniscient",
            "Second-Person",
            "Third-Person Limited"
        ],
        "character": ["Multiple First-Person","First-Person",]    
    },
    "writing_style": [
        {
        "style": "Minimalist",
        "description": "Use short, simple sentences and a concise vocabulary for a fast-paced, direct narrative."
        },
        {
        "style": "Journalistic",
        "description": "Present information in a clear, objective, and factual manner to make the story feel realistic and urgent."
        },
        {
        "style": "Stream of Consciousness",
        "description": "Mirror a character's unfiltered thoughts and emotions, creating a deep and immersive experience."
        },
        {
        "style": "Epistolary",
        "description": "Tell the story through letters, diary entries, or emails, offering a personal and direct look into characters' lives."
        },
        {
        "style": "Lyrical",
        "description": "Employ poetic language, metaphors, and rhythm to create a beautiful and emotionally resonant narrative."
        }
    ],
    "tone": [
        {
        "tone": "Suspenseful",
        "description": "Build tension and anticipation, making the reader eager to find out what happens next."
        },
        {
        "tone": "Witty and Humorous",
        "description": "Use clever dialogue and funny situations to keep the reader entertained and invested."
        },
        {
        "tone": "Introspective",
        "description": "Explore a character's inner thoughts and feelings, creating a deep connection with their journey."
        },
        {
        "tone": "Mysterious",
        "description": "Make the story poses unanswered questions and provide clues, compelling the reader to solve a puzzle."
        },
        {
        "tone": "Sarcastic",
        "description": "Employ a cynical or ironic attitude through a narrator's commentary for entertainment."
        }
    ],
    "voice": {
        "narrator":[
            {
                "voice": "Omniscient Narrator",
                "description": "A narrator with a 'god-like' perspective who knows everything, providing an intriguing, comprehensive view."
            },
            {
                "voice": "Candid and Personal",
                "description": "A voice that feels like a close friend telling a secret, creating an immediate sense of intimacy and trust."
            },
            {
                "voice": "Formal and Eloquent",
                "description": "A sophisticated voice that uses complex language and a measured pace, lending an air of authority and gravity to the story."
            }
        ],
        "character": [
            {
                "voice": "Reliable First-Person Narrator",
                "description": "A character who is honest and trustworthy, making the reader feel secure in their perspective."
            },
            {
                "voice": "Unreliable First-Person Narrator",
                "description": "A character whose version of events is biased or deceptive, forcing the reader to question everything and stay engaged."
            }
        ]
    }
}//Done
const characters = {
    "age": [
        "Young child",
        "Teenager",
        "Young adult",
        "Middle-aged",
        "Elderly"
    ],
    "gender": [
        "Male",
        "Female"
        // "Non-binary"
    ],
    "appearance": [
        "A scar running through their eyebrow, a perpetual smirk.",
        "Unkempt silver hair, piercing blue eyes that seem to hold secrets.",
        "A face covered in freckles, a crooked smile, constantly blushing.",
        "Tall and lanky with a nervous energy, always fidgeting with their hands.",
        "Short, stocky, with a booming laugh and a kind, wrinkled face.",
        "An intricate, full-sleeve tattoo that seems to tell a story.",
        "Dressed in all black, pale skin, and dark circles under their eyes.",
        "Brightly colored hair, mismatched clothing, and a collection of unique piercings.",
        "A perfectly tailored suit, a confident posture, and a calculating look in their eyes.",
        "A missing front tooth, a mischievous glint in their eyes, and dirt on their knees.",
        "Muscular build, calloused hands, and a tired but determined expression.",
        "Delicate features, graceful movements, and a haunted look in their eyes.",
        "A large, circular birthmark on their cheek, often trying to cover it.",
        "Wears glasses held together with tape, a messy bun, and a focused expression.",
        "Sleek, black hair pulled back in a tight ponytail, a sharp, unreadable gaze.",
        "Heavy combat boots, torn jeans, and a jacket with various patches.",
        "A missing limb, but moves with surprising speed and agility.",
        "Eyes of two different colors, one green and one brown.",
        "A constant grimace, as if in slight pain, a limp when they walk.",
        "Always wears a hat, keeping their face in shadow.",
        "A face that's hard to place, with a generic, forgettable quality.",
        "Hair that changes color with their mood, a rare and magical trait.",
        "A deep, booming voice that doesn't match their small stature.",
        "Covered in old burn scars, a testament to a traumatic past.",
        "Impeccably groomed, with not a hair out of place, and a sense of superiority.",
        "A noticeable tremor in their hands, a result of a past trauma or condition.",
        "Wears a simple necklace with a single, unidentifiable stone.",
        "A wide, welcoming smile that never quite reaches their eyes.",
        "Constantly chewing on their lip, a sign of deep thought or anxiety.",
        "An unusual eye color, like a deep violet or a vibrant gold.",
        "A slight hunch, as if carrying the weight of the world on their shoulders.",
        "Wears a faded bandana, a symbol of a forgotten affiliation.",
        "A prominent, hawk-like nose, and a stern, unwavering expression.",
        "Long, elegant fingers, always drumming on surfaces when deep in thought.",
        "A quiet, almost invisible presence, but with a sharp gaze that misses nothing.",
        "A disarming and innocent appearance, belying a dangerous nature.",
        "A face that seems younger than their age, with an air of naivety.",
        "A very deep tan, a result of a life spent outdoors or on the sea.",
        "A prosthetic hand that is visibly different from their other hand.",
        "A distinctive limp, a result of a past injury."
    ]
};//Done

export default {
    theme,
    settings,
    detailsCharacters,//The three of them depend in the selected genre

    styleDetails,
    characters,

};
