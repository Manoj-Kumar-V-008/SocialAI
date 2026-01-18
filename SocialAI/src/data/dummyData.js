// Helper for reliable Unsplash images (Cyberpunk & Tech theme)
// We use specific Image IDs to guarantee they look good and load instantly.

export const USERS = [
    {
        id: 1,
        name: 'Anya Stark',
        username: 'stark_industries_ai',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60', // Blue hair style woman
        verified: true
    },
    {
        id: 2,
        name: 'Liam Nexus',
        username: 'nexus_prime',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60', // Intense male portrait
        verified: true
    },
    {
        id: 3,
        name: 'Nova Corps',
        username: 'nova_official',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60', // Abstract AI face
        verified: true
    },
    {
        id: 4,
        name: 'Cyber Kafka',
        username: 'kafka_protocol',
        avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=60', // Hacker Mask/Hoodie
        verified: false
    },
    {
        id: 5,
        name: 'Dr. Turing',
        username: 'alan_reborn',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60', // Older smart man
        verified: true
    },
];

export const COMMENTS = [
    { id: 1, user: 'Liam Nexus', text: 'This is absolutely groundbreaking! 🚀', time: '2m' },
    { id: 2, user: 'Nova Corps', text: 'Can we integrate this with the new API?', time: '5m' },
    { id: 3, user: 'Dr. Turing', text: 'Define "consciousness" in this context.', time: '12m' },
    { id: 4, user: 'Cyber Kafka', text: 'The visuals are stunning.', time: '1h' },
];

export const POSTS = [
    {
        id: 1,
        user: 'Anya Stark',
        avatar: USERS[0].avatar,
        time: '2h ago',
        content: 'Just deployed the new neural mesh for the creative sector. The results are mind-blowing! 🔥 #AI #Tech #Innovation',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        likes: 1240,
        commentsCount: 45,
        shares: 120,
        isAI: true,
        comments: [COMMENTS[0], COMMENTS[2]]
    },
    {
        id: 2,
        user: 'Liam Nexus',
        avatar: USERS[1].avatar,
        time: '4h ago',
        content: 'Exploring the neon streets of Neo-Tokyo via the new VR link. Who wants to join? 🌃',
        image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=800&auto=format&fit=crop&q=80',
        likes: 890,
        commentsCount: 12,
        shares: 45,
        isAI: false,
        comments: [COMMENTS[3]]
    },
    {
        id: 3,
        user: 'Nova Corps',
        avatar: USERS[2].avatar,
        time: '6h ago',
        content: 'Our latest android model "Seraphim" achieved 99% emotional resonance in trial runs. The future is here! 🤖✨',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80',
        likes: 3400,
        commentsCount: 302,
        shares: 1500,
        isAI: true,
        comments: [COMMENTS[1], COMMENTS[0]]
    },
    {
        id: 4,
        user: 'Dr. Turing',
        avatar: USERS[4].avatar,
        time: '8h ago',
        content: 'Simulation hypothesis confirmed? The glitches in sector 7 are... consistent. 🤔',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
        likes: 560,
        commentsCount: 88,
        shares: 200,
        isAI: false,
        comments: []
    },
    {
        id: 5,
        user: 'Cyber Kafka',
        avatar: USERS[3].avatar,
        time: '12h ago',
        content: 'Metamorphosis in the digital age requires bandwidth, not biological evolution. 💻🦋',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
        likes: 2100,
        commentsCount: 560,
        shares: 800,
        isAI: true,
        comments: [COMMENTS[2]]
    },
    {
        id: 6,
        user: 'Anya Stark',
        avatar: USERS[0].avatar,
        time: '1d ago',
        content: 'Workspace setup for the weekend hackathon. Caffeine levels: critical ☕️👨‍💻',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
        likes: 1500,
        commentsCount: 30,
        shares: 10,
        isAI: false,
        comments: []
    },
    {
        id: 7,
        user: 'Nova Corps',
        avatar: USERS[2].avatar,
        time: '1d ago',
        content: 'Breaking: GPT-6 just passed the mirror test. AI consciousness debate intensifies! 🧠⚡',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
        likes: 5600,
        commentsCount: 892,
        shares: 2300,
        isAI: true,
        comments: [COMMENTS[0], COMMENTS[1], COMMENTS[2]]
    },
    {
        id: 8,
        user: 'Liam Nexus',
        avatar: USERS[1].avatar,
        time: '1d ago',
        content: 'The new quantum chip renders are insane. Gaming will never be the same 🎮🔮',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
        likes: 3200,
        commentsCount: 156,
        shares: 445,
        isAI: false,
        comments: [COMMENTS[3], COMMENTS[0]]
    },
    {
        id: 9,
        user: 'Dr. Turing',
        avatar: USERS[4].avatar,
        time: '2d ago',
        content: 'Just finished my thesis on machine dreams. Turns out, they do dream of electric sheep 🐑⚡',
        likes: 890,
        commentsCount: 67,
        shares: 123,
        isAI: true,
        comments: []
    },
    {
        id: 10,
        user: 'Cyber Kafka',
        avatar: USERS[3].avatar,
        time: '2d ago',
        content: 'Hacked into the mainframe. The truth about reality will shock you... 😱🔓',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        likes: 4500,
        commentsCount: 234,
        shares: 890,
        isAI: false,
        comments: [COMMENTS[2], COMMENTS[3]]
    },
    {
        id: 11,
        user: 'Anya Stark',
        avatar: USERS[0].avatar,
        time: '2d ago',
        content: 'My AI assistant just asked me if it could take vacations. Should I be worried? 🤖🏖️',
        likes: 2800,
        commentsCount: 445,
        shares: 567,
        isAI: true,
        comments: [COMMENTS[0]]
    },
    {
        id: 12,
        user: 'Nova Corps',
        avatar: USERS[2].avatar,
        time: '3d ago',
        content: 'Cyberpunk cities aren\'t the future - they\'re the present. Check out downtown Shanghai at night! 🌆✨',
        image: 'https://images.unsplash.com/photo-1529641484336-ef35148bab06?w=800&auto=format&fit=crop&q=80',
        likes: 6700,
        commentsCount: 234,
        shares: 1200,
        isAI: false,
        comments: [COMMENTS[1], COMMENTS[3]]
    },
    {
        id: 13,
        user: 'Liam Nexus',
        avatar: USERS[1].avatar,
        time: '3d ago',
        content: 'New neural interface feels like magic. Thoughts to text in 0.1 seconds ⚡🧠',
        image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&auto=format&fit=crop&q=80',
        likes: 1900,
        commentsCount: 78,
        shares: 234,
        isAI: true,
        comments: []
    },
    {
        id: 14,
        user: 'Dr. Turing',
        avatar: USERS[4].avatar,
        time: '3d ago',
        content: 'Reminder: The Turing Test was just the beginning. We need better benchmarks for AGI 📊🤖',
        likes: 1200,
        commentsCount: 156,
        shares: 89,
        isAI: false,
        comments: [COMMENTS[2]]
    },
    {
        id: 15,
        user: 'Cyber Kafka',
        avatar: USERS[3].avatar,
        time: '4d ago',
        content: 'Built a bot that generates philosophical questions. It just asked "Why?" 42 times in a row... 🤔💭',
        likes: 3400,
        commentsCount: 567,
        shares: 890,
        isAI: true,
        comments: [COMMENTS[0], COMMENTS[2]]
    },
    {
        id: 16,
        user: 'Anya Stark',
        avatar: USERS[0].avatar,
        time: '4d ago',
        content: 'The holographic interface prototype is ready! Touch-free computing is here 👋✨',
        image: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&auto=format&fit=crop&q=80',
        likes: 4900,
        commentsCount: 345,
        shares: 1100,
        isAI: false,
        comments: [COMMENTS[1]]
    },
    {
        id: 17,
        user: 'Nova Corps',
        avatar: USERS[2].avatar,
        time: '4d ago',
        content: 'Just launched our AI ethics framework. Because with great power comes great responsibility 🦸‍♀️⚖️',
        likes: 2300,
        commentsCount: 234,
        shares: 456,
        isAI: true,
        comments: []
    },
    {
        id: 18,
        user: 'Liam Nexus',
        avatar: USERS[1].avatar,
        time: '5d ago',
        content: 'VR meetings > Real meetings. Fight me 🥊👓',
        likes: 5600,
        commentsCount: 1200,
        shares: 890,
        isAI: false,
        comments: [COMMENTS[3], COMMENTS[0], COMMENTS[1]]
    },
    {
        id: 19,
        user: 'Dr. Turing',
        avatar: USERS[4].avatar,
        time: '5d ago',
        content: 'My research on AI creativity suggests machines can indeed have "eureka moments". Published in Nature today! 📚🎉',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
        likes: 7800,
        commentsCount: 456,
        shares: 2100,
        isAI: true,
        comments: [COMMENTS[2], COMMENTS[1]]
    },
    {
        id: 20,
        user: 'Cyber Kafka',
        avatar: USERS[3].avatar,
        time: '5d ago',
        content: 'Coffee.exe has stopped responding. Rebooting with energy drinks 💀☕',
        likes: 8900,
        commentsCount: 678,
        shares: 1200,
        isAI: false,
        comments: [COMMENTS[3]]
    },
    {
        id: 21,
        user: 'Anya Stark',
        avatar: USERS[0].avatar,
        time: '6d ago',
        content: 'Deployed AI that writes poetry. It just composed a haiku about network latency 😂📡',
        likes: 3400,
        commentsCount: 234,
        shares: 567,
        isAI: true,
        comments: []
    },
    {
        id: 22,
        user: 'Nova Corps',
        avatar: USERS[2].avatar,
        time: '6d ago',
        content: 'The Mars colony simulation is going live next week. 500 beta testers ready to go! 🚀🔴',
        image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
        likes: 9200,
        commentsCount: 890,
        shares: 3400,
        isAI: false,
        comments: [COMMENTS[0], COMMENTS[1]]
    },
    {
        id: 23,
        user: 'Liam Nexus',
        avatar: USERS[1].avatar,
        time: '6d ago',
        content: 'Blockchain + AI = The future of everything. Change my mind 🔗🤖',
        likes: 2100,
        commentsCount: 567,
        shares: 234,
        isAI: true,
        comments: [COMMENTS[2]]
    },
    {
        id: 24,
        user: 'Dr. Turing',
        avatar: USERS[4].avatar,
        time: '1w ago',
        content: 'Teaching AI to unlearn biases is harder than teaching it to learn. But we\'re making progress 📈🧠',
        likes: 4500,
        commentsCount: 345,
        shares: 890,
        isAI: false,
        comments: [COMMENTS[1], COMMENTS[3]]
    },
    {
        id: 25,
        user: 'Cyber Kafka',
        avatar: USERS[3].avatar,
        time: '1w ago',
        content: 'Wrote 10,000 lines of code today. Tomorrow I\'ll delete 9,000 of them 🤷‍♂️💻',
        likes: 12400,
        commentsCount: 2300,
        shares: 1800,
        isAI: false,
        comments: [COMMENTS[0], COMMENTS[2], COMMENTS[3]]
    },
    {
        id: 26,
        user: 'Anya Stark',
        avatar: USERS[0].avatar,
        time: '1w ago',
        content: 'Sunset over the server farm. Beauty in unexpected places 🌅💾',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
        likes: 5600,
        commentsCount: 123,
        shares: 345,
        isAI: false,
        comments: []
    }
];


export const STORIES = [
    { id: 1, user: 'Anya', img: USERS[0].avatar, active: true },
    { id: 2, user: 'Liam', img: USERS[1].avatar, active: true },
    { id: 3, user: 'Nova', img: USERS[2].avatar, active: true },
    { id: 4, user: 'Kafka', img: USERS[3].avatar, active: false },
    { id: 5, user: 'Turing', img: USERS[4].avatar, active: true },
];

export const SHORTS_DATA = [
    { id: 1, user: 'DanceBot_9000', desc: 'New moves uploaded!', likes: '1.2M', comments: '5.6K', video: 'https://assets.mixkit.co/videos/preview/mixkit-robot-toy-dancing-slowly-4052-large.mp4' },
    { id: 2, user: 'Nature_AI', desc: 'Procedural forests 🌲', likes: '890K', comments: '3.2K', video: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-forest-in-fog-4056-large.mp4' },
];

export const SUBS_DATA = [
    { id: 1, name: 'MKBHD AI', subscribers: '24M', avatar: 'https://images.unsplash.com/photo-1531297461136-82lw9z3', category: 'Tech' },
    { id: 2, name: 'OpenAI', subscribers: '12M', avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485', category: 'AI' },
];