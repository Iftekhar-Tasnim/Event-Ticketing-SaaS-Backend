const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1234',
    database: 'Saas',
});

const themeData = {
    name: 'Career Connect',
    description: 'A professional and clean theme optimized for job fairs, networking events, and career expos.',
    category: 'Job Fair',
    isPremium: true,
    price: 49.99,
    status: 'active',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800',
    defaultProperties: {
        colors: {
            primary: '#2563EB', // Professional Blue
            secondary: '#1E40AF', // Dark Blue
            background: '#F8FAFC', // Slate 50
            text: '#0F172A', // Slate 900
            accent: '#3B82F6'
        },
        fonts: {
            heading: 'Inter, sans-serif',
            body: 'Inter, sans-serif'
        },
        layout: 'corporate'
    },
    templateStructure: {
        sections: {
            hero: { enabled: true, order: 1, style: 'standard' },
            about: { enabled: true, order: 2, style: 'standard' },
            features: { enabled: true, order: 3, style: 'grid' },
            speakers: { enabled: true, order: 4, style: 'list' },
            schedule: { enabled: true, order: 5, style: 'timeline' },
            tickets: { enabled: true, order: 6, style: 'cards' },
            venue: { enabled: true, order: 7, style: 'map' },
            gallery: { enabled: true, order: 8, style: 'masonry' },
            faq: { enabled: true, order: 9, style: 'accordion' }
        }
    },
    defaultContent: {
        hero: {
            title: 'Build Your Future at Career Connect 2026',
            subtitle: 'Connect with top-tier employers, participate in workshops, and land your dream job.',
            backgroundImage: 'https://images.unsplash.com/photo-1521737706096-31a310d68940?auto=format&fit=crop&q=80&w=2000',
            ctaText: 'View Job Openings'
        },
        about: {
            heading: 'Where Talent Meets Opportunity',
            content: 'Career Connect is the premier event for professionals looking to take the next step in their careers. We bring together industry leaders and ambitious job seekers for two days of networking, interviews, and professional development.',
            images: ['https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000']
        },
        features: [
            { icon: 'Users', title: '50+ Employers', description: 'Meet recruiters from multinational corporations and innovative startups.' },
            { icon: 'FileText', title: 'Resume Reviews', description: 'Get one-on-one feedback from industry experts on your CV and portfolio.' },
            { icon: 'Globe', title: 'Networking Lounge', description: 'Build valuable connections with peers and mentors in a relaxed environment.' }
        ],
        speakers: [
            { name: 'Sarah Jenkins', role: 'Head of Talent at TechCorp', bio: 'Expert in technical recruitment and employer branding.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
            { name: 'Michael Chen', role: 'Career Coach', bio: 'Helping thousands of professionals navigate the modern job market.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' }
        ],
        schedule: [
            { time: '09:00 AM', title: 'Opening Keynote', description: 'Future of Work: 2026 Predictions' },
            { time: '11:00 AM', title: 'Mock Interviews', description: 'Personalized feedback sessions with top recruiters.' },
            { time: '02:00 PM', title: 'Workshop: AI in Recruitment', description: 'How to stand out in the age of automation.' }
        ],
        tickets: [
            { name: 'Candidate Pass', price: '499', description: 'Access to main hall and employer booths.', features: ['Full Booth Access', 'Resume Upload', 'Digital Goodie Bag'] },
            { name: 'Professional Pass', price: '1499', description: 'Includes workshops and VIP lounge access.', features: ['All Candidate Benefits', 'Workshop Entrance', '1-on-1 Coaching', 'Lunch Voucher'] }
        ],
        venue: {
            name: 'Grand Convention Center',
            address: '123 Business Bay, Dhaka',
            directions: 'Adjacent to the central metro station.',
            parking: 'Underground parking available for all attendees.'
        },
        gallery: [
            'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800'
        ],
        faq: [
            { question: 'What should I bring?', answer: 'Bring multiple copies of your resume, a laptop/tablet, and dress in professional attire.' },
            { question: 'Are on-the-spot offers made?', answer: 'Yes, many participating companies conduct initial interviews and some may make offers.' }
        ]
    }
};

async function seed() {
    try {
        await client.connect();
        const query = `
            INSERT INTO themes (name, description, category, "isPremium", price, status, "thumbnailUrl", "defaultProperties", "templateStructure", "defaultContent")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id;
        `;
        const values = [
            themeData.name,
            themeData.description,
            themeData.category,
            themeData.isPremium,
            themeData.price,
            themeData.status,
            themeData.thumbnailUrl,
            JSON.stringify(themeData.defaultProperties),
            JSON.stringify(themeData.templateStructure),
            JSON.stringify(themeData.defaultContent)
        ];

        const res = await client.query(query, values);
        console.log('Job Fair Theme seeded successfully! ID:', res.rows[0].id);
    } catch (err) {
        console.error('Error seeding theme:', err);
    } finally {
        await client.end();
    }
}

seed();
