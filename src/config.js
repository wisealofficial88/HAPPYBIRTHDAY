// ===================================================================
// BIRTHDAY ADVENTURE CONFIGURATION
// You only need to edit the Primary Names below, and everything
// across the entire website will automatically update!
// ===================================================================

const recipientName = 'Aishwarya';
const recipientTitle = 'Miss Aishwarya'; // e.g. "Miss Aishwarya" or just "Aishwarya"
const senderName = 'Aakash';

export const birthdayConfig = {
  // Recipient details
  recipientName: recipientName,
  recipientTitle: recipientTitle,

  // Sender details
  senderName: senderName,
  senderWaxSealInitial: (senderName && senderName.trim().charAt(0).toUpperCase()) || 'A', // Letter shown on the wax seal

  // ===================================================================
  // CUSTOM BACKGROUND MUSIC:
  // Place your audio file in the "public" folder (e.g. "public/bday.mp3")
  // and specify its path below (e.g. '/bday.mp3').
  // ===================================================================
  customMusicPath: '/bday.mp3',

  // Main Titles & Greetings
  adventureTitle: 'A Magical Birthday Adventure',
  adventureSubtitle: 'Chalo Pahado Ke Piche Ki Duniya',
  deerGreeting: `Hello, ${recipientTitle}! We've been waiting for you!`,
  deerFollowPrompt: `Follow me, ${recipientTitle}! Let's explore Pahado ki piche ki duniya!`,
  deerAllStarsFound: `${recipientTitle}, you found all 3 magical stars! The gateway is open!`,

  // Collectible Stars
  stars: [
    { id: 0, x: 850, y: 280, label: 'Star of Wonder' },
    { id: 1, x: 1750, y: 310, label: 'Star of Joy' },
    { id: 2, x: 2650, y: 290, label: 'Star of Radiance' }
  ],

  // Celebration Scene
  celebrationTitle: `HAPPY BIRTHDAY ${recipientName.toUpperCase()}!`,
  celebrationSubtitle: 'A Magical Celebration Under The Stars',

  // Personal Letter from Sender to Recipient
  letter: {
    heading: 'Aapka Happy Wala Birthday',
    salutation: `Pyari ${recipientName},`,
    paragraphs: [
      'HAPPPPPPPPPPPPPPPPPPPPIEST BIRTHDAY TO MY KUCHUUUUU PUCHUUUUUU SUNDARRRR SUNDARRR PRETTTYY PRETTY MITHUUUUUUUUUUUUUU JII!!!! TMHARA AANE WALA HAR SAAL EKDUM PERFECT HO , TUM HUMESHA HEALTHY AND WEALTHY AND BADMAAS RAHOO',
      'TUMHARA SARA KA SARA WISHES, SAPNA SAB KUCH BHAGWAN JI JALDI SE PURA KRDE , TUM THORI SI AUR BADI HOKAR HUM SABKO AUR MASTI KRAO , HAR TIME FUN KRTI RHO , SARA BURA CHIZE , LOG , BIMARI ETC SE HUMESHA DUUR RHO.',
      'AAPKA YE SAAL EKDUM KHUSHII SE AUR EKDM CHATPATE TARIKE SE BEETE , DEKHO TUMSE MILNE PAHADO KE PEECHE KITNE SARE DOST BHI AAYE HAI UNKE SAATH PARTY BHI ENJOYYYY KROOO HUM BHI HAI HI , PARTY KE BAAD BONFIRE KE PAAS BAITHKE WE WILL TALK HEHE ENJOYYYYYY YOUR DAYYYYYY!!!! ONCE AGAIN HAPPPPY BIRTHDAY MITTHU JI.'
    ],
    closing: 'With all my love and deepest wishes,',
    signature: `— ${senderName}`
  },

  // Animal messages when tapped during celebration
  animalQuotes: {
    deer: `Happy Birthday, ${recipientTitle}! 🌸`,
    rabbit: `Hooray for ${recipientTitle}! 🥕✨`,
    squirrel: `Wishing you a magical day, ${recipientName}! 🌰`,
    ducks: `Quack quack, happy birthday, ${recipientName}! 🦆💧`,
    fox: `May your year shine bright, ${recipientName}! 🦊💛`,
    puppy: `Woof! Best birthday ever, ${recipientName}! 🐶🎈`,
    kitten: `Purrs, love, and sweet dreams, ${recipientName}! ✨🐾`,
    bear: `Warmest bear hugs to you, ${recipientTitle}! 🍯`,
    lion: `A peaceful, royal cheer for you, ${recipientTitle}! 🦁🎉`
  }
};
