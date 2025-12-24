export const lessonsData = [
    {
        id: '1',
        title: 'Constructing Triangles',
        description: 'Learn how to construct different types of triangles using geometry tools with step-by-step instructions and practical examples.',
        video: 'https://www.youtube.com/watch?v=YhAnUf5CRPc',
        duration: { hours: "25", mins: "45" },
        type: 'video',
        price: 50,
        isEnrolled: false,
        category: 'Mathematics',
        classLevel: 'Grade 1 Secondary',
        scheduledDate: '2025-06-24',
        instructor: 'Dr. Jane Smith',
        rating: 4.8,
        studentsEnrolled: 1248,
        isPaid: true,
        progress: 0,
        learningObjectives: [
            'Understand triangle properties',
            'Use geometry tools properly',
            'Construct different triangle types',
            'Solve practical geometry problems'
        ],
        materials: [
            { name: 'Lesson Notes', type: 'PDF', size: '2.4 MB' },
            { name: 'Practice Worksheet', type: 'PDF', size: '1.8 MB' },
            { name: 'Reference Guide', type: 'PDF', size: '3.2 MB' }
        ],
        level: "Beginner",
    },
    {
        id: '2',
        title: 'Algebraic Equations',
        description: 'Solve linear and quadratic equations with real-world applications and practice problems.',
        video: 'https://www.youtube.com/watch?v=abc123',
        duration: { hours: "20", mins: "30" },
        type: 'interactive',
        price: 50,
        isEnrolled: true,
        progress: 65,
        category: 'Mathematics',
        classLevel: 'Grade 1 Secondary',
        scheduledDate: '2025-06-25',
        instructor: 'Prof. John Davis',
        rating: 4.7,
        studentsEnrolled: 890,
        isPaid: true,
        learningObjectives: [
            'Solve linear equations',
            'Factor quadratic equations',
            'Apply equations to real-world problems',
            'Graph linear functions'
        ],
        materials: [
            { name: 'Equation Worksheet', type: 'PDF', size: '1.5 MB' },
            { name: 'Solution Guide', type: 'PDF', size: '2.1 MB' }
        ],
        level: "Beginner",
    },
    {
        id: '3',
        title: 'Chemical Reactions',
        description: 'Understanding chemical equations and reaction types through interactive simulations.',
        video: 'https://www.youtube.com/watch?v=def456',
        duration: { hours: "18", mins: "50" },
        type: 'video',
        price: null,
        isEnrolled: false,
        progress: 0,
        category: 'Science',
        classLevel: 'Grade 1 Secondary',
        scheduledDate: '2025-06-26',
        instructor: 'Ms. Emily Chen',
        rating: 4.9,
        studentsEnrolled: 1050,
        isPaid: true,
        learningObjectives: [
            'Balance chemical equations',
            'Identify reaction types',
            'Predict reaction products',
            'Understand reaction kinetics'
        ],
        materials: [
            { name: 'Lab Manual', type: 'PDF', size: '3.5 MB' },
            { name: 'Reaction Charts', type: 'PDF', size: '2.8 MB' }
        ]
    },
    {
        id: '4',
        title: 'English Grammar',
        description: 'Master tenses and sentence structures with comprehensive exercises.',
        video: 'https://www.youtube.com/watch?v=ghi789',
        duration: { hours: "19", mins: "30" },
        type: 'reading',
        price: null,
        isEnrolled: true,
        progress: 100,
        category: 'English',
        classLevel: 'Grade 1 Secondary',
        scheduledDate: '2025-06-23',
        instructor: 'Mr. David Wilson',
        rating: 4.6,
        studentsEnrolled: 750,
        isPaid: true,
        learningObjectives: [
            'Master verb tenses',
            'Construct complex sentences',
            'Use proper punctuation',
            'Improve writing skills'
        ],
        materials: [
            { name: 'Grammar Rules', type: 'PDF', size: '1.2 MB' },
            { name: 'Practice Exercises', type: 'PDF', size: '2.3 MB' }
        ]
    },
    {
        id: '5',
        title: 'Ancient Civilizations',
        description: 'Explore the history and contributions of ancient civilizations.',
        video: 'https://www.youtube.com/watch?v=jkl012',
        duration: { hours: "10", mins: "55" },
        type: 'video',
        price: 50,
        isEnrolled: false,
        progress: 0,
        category: 'History',
        classLevel: 'Grade 1 Secondary',
        scheduledDate: '2025-06-27',
        instructor: 'Dr. Michael Brown',
        rating: 4.5,
        studentsEnrolled: 680,
        isPaid: true,
        learningObjectives: [
            'Understand ancient societies',
            'Analyze historical artifacts',
            'Compare civilizations',
            'Study cultural contributions'
        ],
        materials: [
            { name: 'Timeline Chart', type: 'PDF', size: '2.0 MB' },
            { name: 'Study Guide', type: 'PDF', size: '1.8 MB' }
        ]
    },
    {
        id: '6',
        title: 'Photosynthesis Process',
        description: 'Learn how plants convert light energy into chemical energy.',
        video: 'https://www.youtube.com/watch?v=mno345',
        duration: { hours: "18", mins: "35" },
        type: 'interactive',
        price: 50,
        isEnrolled: true,
        progress: 30,
        category: 'Biology',
        classLevel: 'Grade 1 Secondary',
        scheduledDate: '2025-06-28',
        instructor: 'Dr. Sarah Johnson',
        rating: 4.8,
        studentsEnrolled: 920,
        isPaid: true,
        learningObjectives: [
            'Understand photosynthesis stages',
            'Identify plant cell structures',
            'Explain energy conversion',
            'Study plant adaptations'
        ],
        materials: [
            { name: 'Diagram Set', type: 'PDF', size: '1.9 MB' },
            { name: 'Lab Worksheet', type: 'PDF', size: '1.5 MB' }
        ]
    },
    {
        id: '7',
        title: 'Introduction to Programming',
        description: 'Learn basic programming concepts with Python.',
        video: 'https://www.youtube.com/watch?v=pqr678',
        duration: { hours: "11", mins: "30" },
        type: 'interactive',
        price: 50,
        isEnrolled: false,
        progress: 0,
        category: 'Computer Science',
        classLevel: 'Grade 1 Secondary',
        scheduledDate: '2025-06-29',
        instructor: 'Prof. Alex Chen',
        rating: 4.9,
        studentsEnrolled: 1150,
        isPaid: true,
        learningObjectives: [
            'Write basic Python programs',
            'Understand variables and data types',
            'Use conditional statements',
            'Create simple functions'
        ],
        materials: [
            { name: 'Coding Exercises', type: 'PDF', size: '1.7 MB' },
            { name: 'Python Cheat Sheet', type: 'PDF', size: '0.8 MB' }
        ]
    },
    {
        id: '8',
        title: 'Art of Storytelling',
        description: 'Develop creative writing and storytelling skills.',
        video: 'https://www.youtube.com/watch?v=stu901',
        duration: { hours: "18", mins: "30" },
        type: 'reading',
        price: 50,
        isEnrolled: true,
        progress: 80,
        category: 'Creative Writing',
        classLevel: 'Grade 1 Secondary',
        scheduledDate: '2025-06-30',
        instructor: 'Ms. Olivia Martinez',
        rating: 4.7,
        studentsEnrolled: 560,
        isPaid: true,
        learningObjectives: [
            'Create engaging characters',
            'Develop plot structures',
            'Use descriptive language',
            'Write compelling narratives'
        ],
        materials: [
            { name: 'Writing Prompts', type: 'PDF', size: '1.1 MB' },
            { name: 'Story Templates', type: 'PDF', size: '1.4 MB' }
        ]
    }
];