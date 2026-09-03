/*
|--------------------------------------------------------------------------
| PROJECT DATA
|--------------------------------------------------------------------------
*/

const projects = [

    /*
    |--------------------------------------------------------------------------
    | 1. JAMESA STORE
    |--------------------------------------------------------------------------
    */

    {
        id: "jamesastore",
        slug: "jamesa-store",

        title: "Jamesa Store",
        shortTitle: "Jamesa Store",

        label: "FEATURED · LARAVEL E-COMMERCE",

        category: "ecommerce",
        categoryLabel: "E-Commerce",

        type: "E-Commerce Platform",

        status: "completed",
        featured: true,

        rarity: {
            id: "legendary",
            name: "Legendary",
            color: "gold",
            hex: "#facc15",
            chance: 0.26
        },

        description: `
            A full-stack Laravel e-commerce platform developed for
            Jamesa Store, designed to support a complete digital
            commerce workflow from product discovery and shopping
            cart management to checkout, payment processing,
            customer orders, reviews, and account-based services.
        `.replace(/\s+/g, " ").trim(),

        fullDescription: `
            Full-stack Laravel e-commerce platform developed for Jamesa
            Store with a complete customer and administrative workflow.
            The platform includes authentication, Google OAuth, email
            verification, password recovery, product and category
            management, hierarchical categories, product variants,
            product images, dynamic product form fields, session-based
            shopping cart, checkout, customer addresses, order management,
            payment processing, coupon system, product reviews,
            account-order workflows, and joki-order workflows.

            The administrative system provides role and permission based
            access control together with customer management, banners,
            news, FAQ, YouTube content, payment administration, and order
            monitoring.

            The application is structured using Laravel MVC architecture
            with dedicated services for payment processing and file
            uploads, database migrations, form request validation,
            middleware authorization, and responsive Blade-based
            frontend components.
        `.replace(/\s+/g, " ").trim(),

        technologies: [
            "Laravel",
            "PHP",
            "MySQL",
            "Blade",
            "Vite"
        ],

        features: [
            "E-Commerce",
            "Authentication",
            "Google OAuth",
            "Email Verification",
            "Password Recovery",
            "Role & Permission",
            "Product Management",
            "Category Management",
            "Hierarchical Categories",
            "Product Variants",
            "Product Images",
            "Dynamic Form Fields",
            "Shopping Cart",
            "Checkout System",
            "Customer Addresses",
            "Order Management",
            "Payment System",
            "Coupon System",
            "Review System",
            "Account Order",
            "Joki Order",
            "CMS",
            "Banner Management",
            "News Management",
            "FAQ Management",
            "YouTube Content",
            "Payment Administration",
            "File Upload",
            "Responsive Web"
        ],

        tags: [
            "Laravel",
            "PHP",
            "MySQL",
            "Blade",
            "Vite",
            "E-Commerce",
            "Authentication",
            "Google OAuth",
            "Email Verification",
            "Role & Permission",
            "Product Management",
            "Product Variants",
            "Dynamic Form Fields",
            "Shopping Cart",
            "Checkout System",
            "Order Management",
            "Payment System",
            "Coupon System",
            "Review System",
            "Account Order",
            "Joki Order",
            "CMS",
            "File Upload",
            "Responsive Web"
        ],

        url: "https://jamesastorecollab.gt.tc",

        demoAvailable: true,

        images: [
            "assets/projects/jamesastore/1.webp",
            "assets/projects/jamesastore/2.webp",
            "assets/projects/jamesastore/3.webp",
            "assets/projects/jamesastore/4.webp",
            "assets/projects/jamesastore/5.webp",
            "assets/projects/jamesastore/6.webp",
            "assets/projects/jamesastore/7.webp",
            "assets/projects/jamesastore/8.webp",
            "assets/projects/jamesastore/9.webp",
            "assets/projects/jamesastore/10.webp"
        ],

        thumbnail: "assets/projects/jamesastore/1.webp",

        alt: "Jamesa Store E-Commerce Platform",

        architecture: [
            "Laravel MVC",
            "Blade Templates",
            "Relational Database",
            "Form Request Validation",
            "Middleware Authorization",
            "Service Layer",
            "Database Migrations",
            "Responsive Frontend"
        ]
    },


    /*
    |--------------------------------------------------------------------------
    | 2. GRATIA
    |--------------------------------------------------------------------------
    */

    {
        id: "gratia",
        slug: "gratia-industrial",

        title: "Gratia Industrial",
        shortTitle: "Gratia",

        label: "COMPANY WEBSITE",

        category: "company",
        categoryLabel: "Company Website",

        type: "Industrial Company Website",

        status: "completed",
        featured: false,

        rarity: {
            id: "advanced",
            name: "Advanced",
            color: "purple",
            hex: "#a855f7",
            chance: 15.98
        },

        description: `
            A full-stack Laravel industrial company website developed
            for Gratia Corp, an Indonesian industrial processing machine
            manufacturer. The platform presents industrial processing
            solutions, machine products, company information, and
            business inquiries while implementing backend functionality
            for product management, database integration, authentication,
            and SMTP-based communication.
        `.replace(/\s+/g, " ").trim(),

        fullDescription: `
            Full-stack Laravel based industrial company website developed
            for Gratia Corp. The platform focuses on presenting industrial
            processing solutions including grinding, dispersing, and
            mixing machines.

            The system provides structured product and content management,
            authentication, database integration, responsive frontend
            components, and SMTP email communication for business inquiries.

            The website is designed to provide a professional digital
            presence for an industrial manufacturing company while
            maintaining a manageable backend architecture.
        `.replace(/\s+/g, " ").trim(),

        technologies: [
            "Laravel",
            "PHP",
            "MySQL",
            "Bootstrap"
        ],

        features: [
            "Authentication",
            "CRUD System",
            "Product Management",
            "Database Integration",
            "SMTP Email",
            "Business Inquiry",
            "Industrial Product Presentation",
            "Content Management",
            "Responsive Web"
        ],

        tags: [
            "Laravel",
            "PHP",
            "MySQL",
            "Bootstrap",
            "Authentication",
            "CRUD System",
            "Product Management",
            "Database Integration",
            "SMTP Email",
            "Responsive Web"
        ],

        url: "https://gratia.gt.tc",

        demoAvailable: true,

        images: [
            "assets/projects/gratia/1.png",
            "assets/projects/gratia/2.png",
            "assets/projects/gratia/3.png"
        ],

        thumbnail: "assets/projects/gratia/1.png",

        alt: "Gratia Industrial Processing Platform",

        architecture: [
            "Laravel MVC",
            "Relational Database",
            "CRUD Architecture",
            "Authentication",
            "SMTP Communication",
            "Responsive Frontend"
        ]
    },


    /*
    |--------------------------------------------------------------------------
    | 3. IKUZO
    |--------------------------------------------------------------------------
    */

    {
        id: "ikuzo",
        slug: "ikuzo",

        title: "Ikuzo",
        shortTitle: "Ikuzo",

        label: "COURSE MANAGEMENT",

        category: "course",
        categoryLabel: "Course Management",

        type: "Course Management Platform",

        status: "completed",
        featured: false,

        rarity: {
            id: "premium",
            name: "Premium",
            color: "pink",
            hex: "#ec4899",
            chance: 3.20
        },

        description: `
            A full-stack Laravel course management platform developed
            for Ikuzo, supporting Japanese language courses, Manga
            drawing classes, and 3DCG MAYA programs. The system provides
            scheduling for students and teachers, attendance management,
            learning progress tracking, room capacity management,
            recurring schedules, searchable scheduling, and
            calendar-based views.
        `.replace(/\s+/g, " ").trim(),

        fullDescription: `
            Full-stack Laravel based course management platform developed
            for Ikuzo.

            The system manages Japanese language courses, Manga drawing
            classes, and 3DCG MAYA programs with dedicated features for
            administrators, teachers, and students.

            It includes teacher and student scheduling, recurring
            schedules, searchable student and teacher selection,
            attendance, learning progress tracking, room capacity
            management, and weekly/monthly calendar views.
        `.replace(/\s+/g, " ").trim(),

        technologies: [
            "Laravel",
            "PHP",
            "MySQL",
            "Tailwind CSS"
        ],

        features: [
            "Schedule Management",
            "Calendar System",
            "Recurring Schedule",
            "CRUD System",
            "Attendance",
            "Student Progress",
            "Teacher Management",
            "Student Management",
            "Room Management",
            "Room Capacity Management",
            "Weekly Calendar",
            "Monthly Calendar",
            "Searchable Scheduling",
            "Course Management",
            "Responsive Web"
        ],

        tags: [
            "Laravel",
            "PHP",
            "MySQL",
            "Tailwind CSS",
            "Schedule Management",
            "Calendar System",
            "Recurring Schedule",
            "CRUD System",
            "Attendance",
            "Student Progress",
            "Room Management",
            "Responsive Web"
        ],

        url: "https://ikuzo.gt.tc",

        demoAvailable: true,

        images: [
            "assets/projects/ikuzo/1.png",
            "assets/projects/ikuzo/2.png",
            "assets/projects/ikuzo/3.png",
            "assets/projects/ikuzo/4.png",
            "assets/projects/ikuzo/5.png",
            "assets/projects/ikuzo/6.png",
            "assets/projects/ikuzo/7.png"
        ],

        thumbnail: "assets/projects/ikuzo/1.png",

        alt: "Ikuzo Japanese Learning and Creative Course Platform",

        architecture: [
            "Laravel MVC",
            "Relational Database",
            "Role-Based Workflow",
            "Calendar-Based Scheduling",
            "CRUD Architecture",
            "Responsive Frontend"
        ]
    },


    /*
    |--------------------------------------------------------------------------
    | 4. LARAVEL ERP
    |--------------------------------------------------------------------------
    */

    {
        id: "erp",
        slug: "laravel-erp",

        title: "Laravel ERP",
        shortTitle: "Laravel ERP",

        label: "INTERNAL TOOL · ERP",

        category: "erp",
        categoryLabel: "ERP / Management",

        type: "ERP Management System",

        status: "completed",
        featured: false,

        rarity: {
            id: "advanced",
            name: "Advanced",
            color: "purple",
            hex: "#a855f7",
            chance: 15.98
        },

        description: `
            A modular ERP-style management system built with Laravel
            for structured business and organizational data management.
            The application implements authentication, dashboard
            management, relational database architecture, CRUD operations,
            master-detail workflows, and export functionality within
            an integrated Laravel MVC application.
        `.replace(/\s+/g, " ").trim(),

        fullDescription: `
            An ERP-style Laravel application designed to manage software
            licensing and organizational data through an integrated
            modular system.

            The application implements authentication, dashboard
            management, master-detail data architecture, CRUD operations,
            database relationships, export functionality, and structured
            business workflows.

            Built using Laravel MVC architecture with Blade templates,
            Vite asset management, relational database design, and
            responsive frontend implementation.
        `.replace(/\s+/g, " ").trim(),

        technologies: [
            "Laravel",
            "PHP",
            "MySQL",
            "Blade",
            "Vite"
        ],

        features: [
            "Authentication",
            "Dashboard Management",
            "CRUD System",
            "ERP Module",
            "Master-Detail Architecture",
            "Database Relationship",
            "Software Licensing",
            "Organizational Data Management",
            "Export System",
            "Business Workflow",
            "Responsive Web"
        ],

        tags: [
            "Laravel",
            "PHP",
            "MySQL",
            "Blade Template",
            "Vite",
            "Authentication",
            "CRUD System",
            "ERP Module",
            "Database Relationship",
            "Export System"
        ],

        url: null,

        demoAvailable: false,

        images: [
            "assets/projects/software/1.png",
            "assets/projects/software/2.png",
            "assets/projects/software/3.png",
            "assets/projects/software/4.png",
            "assets/projects/software/5.png",
            "assets/projects/software/6.png"
        ],

        thumbnail: "assets/projects/software/1.png",

        alt: "Laravel ERP Management System",

        architecture: [
            "Laravel MVC",
            "Blade Templates",
            "Vite",
            "Relational Database",
            "Master-Detail Architecture",
            "Authentication",
            "CRUD Architecture"
        ]
    },


    /*
    |--------------------------------------------------------------------------
    | 5. FILAMENT ASSET ERP
    |--------------------------------------------------------------------------
    */

    {
        id: "filament",
        slug: "filament-asset-erp",

        title: "Filament Asset ERP",
        shortTitle: "Filament ERP",

        label: "INTERNAL TOOL · IT ASSET",

        category: "erp",
        categoryLabel: "ERP / Management",

        type: "IT Asset Management System",

        status: "completed",
        featured: false,

        rarity: {
            id: "elite",
            name: "Elite",
            color: "red",
            hex: "#ef4444",
            chance: 0.64
        },

        description: `
            An enterprise IT Asset Management system built with Laravel
            Filament. The platform centralizes asset management, software
            licensing, employee and department relationships, vendors,
            asset movements, maintenance services, reporting, and
            interactive dashboard analytics.
        `.replace(/\s+/g, " ").trim(),

        fullDescription: `
            Enterprise IT Asset Management ERP system developed using
            Laravel Filament.

            The system provides centralized management for assets,
            employees, departments, locations, vendors, software licenses,
            asset movements, maintenance services, reporting, and
            dashboard analytics.

            The application is designed to provide structured visibility
            over organizational IT resources while reducing manual asset
            tracking through a centralized administrative interface.
        `.replace(/\s+/g, " ").trim(),

        technologies: [
            "Laravel",
            "Filament PHP",
            "Livewire",
            "MySQL"
        ],

        features: [
            "ERP",
            "IT Asset Management",
            "Asset Tracking",
            "Employee Management",
            "Department Management",
            "Location Management",
            "Vendor Management",
            "Software License Management",
            "Asset Movement Tracking",
            "Maintenance Management",
            "Reporting",
            "Dashboard Analytics",
            "CRUD Management",
            "Centralized Administration"
        ],

        tags: [
            "Laravel",
            "Filament PHP",
            "Livewire",
            "MySQL",
            "ERP",
            "IT Asset Management",
            "Dashboard Analytics",
            "CRUD Management",
            "Asset Tracking",
            "Maintenance Management"
        ],

        url: null,

        demoAvailable: false,

        images: [
            "assets/projects/filament/1.png",
            "assets/projects/filament/2.png",
            "assets/projects/filament/3.png"
        ],

        thumbnail: "assets/projects/filament/1.png",

        alt: "Filament IT Asset Management ERP",

        architecture: [
            "Laravel",
            "Filament Admin Panel",
            "Livewire",
            "Relational Database",
            "Centralized Administration",
            "CRUD Architecture",
            "Dashboard Analytics"
        ]
    },


    /*
    |--------------------------------------------------------------------------
    | 6. DUNIA ANAK DAN BAPAK
    |--------------------------------------------------------------------------
    */

    {
        id: "duniaanak",
        slug: "dunia-anak-dan-bapak",

        title: "Dunia Anak dan Bapak",
        shortTitle: "Dunia Anak & Bapak",

        label: "E-COMMERCE",

        category: "ecommerce",
        categoryLabel: "E-Commerce",

        type: "E-Commerce Platform",

        status: "in-development",
        featured: false,

        rarity: {
            id: "standard",
            name: "Standard",
            color: "blue",
            hex: "#3b82f6",
            chance: 79.92
        },

        description: `
            A Laravel based e-commerce website developed with product
            management features, CRUD functionality, database integration,
            and a structured backend system for managing online store
            operations.

            The platform is designed to support core e-commerce workflows
            and product administration, while payment gateway integration
            is still under development.
        `.replace(/\s+/g, " ").trim(),

        fullDescription: `
            Laravel based e-commerce platform featuring product
            management, CRUD operations, database integration, and
            backend administration system.

            The platform is designed to support online store workflows,
            product management, and structured backend operations.

            Payment gateway integration has not been implemented yet
            and remains part of the future development roadmap.
        `.replace(/\s+/g, " ").trim(),

        technologies: [
            "Laravel",
            "PHP",
            "MySQL"
        ],

        features: [
            "CRUD",
            "E-Commerce",
            "Backend System",
            "Database Integration",
            "Product Management",
            "Online Store Workflow",
            "Responsive Web"
        ],

        tags: [
            "Laravel",
            "PHP",
            "MySQL",
            "CRUD",
            "E-Commerce",
            "Backend System",
            "Database Integration",
            "Responsive Web"
        ],

        url: "https://duniaanakdanbapak.gt.tc",

        demoAvailable: true,

        paymentGateway: {
            available: false,
            status: "under-development"
        },

        images: [
            "assets/projects/fp1.png",
            "assets/projects/fp2.png",
            "assets/projects/fp3.png"
        ],

        thumbnail: "assets/projects/featured-project.png",

        alt: "Dunia Anak dan Bapak E-Commerce",

        architecture: [
            "Laravel MVC",
            "Relational Database",
            "CRUD Architecture",
            "Backend Administration",
            "Responsive Frontend"
        ]
    },


    /*
    |--------------------------------------------------------------------------
    | 7. SPEECH RECOGNITION
    |--------------------------------------------------------------------------
    */

    {
        id: "speech",
        slug: "automated-speech-recognition",

        title: "Speech Recognition",
        shortTitle: "Speech Recognition",

        label: "AI · MACHINE LEARNING",

        category: "ai",
        categoryLabel: "AI / Machine Learning",

        type: "Automated Speech Recognition System",

        status: "completed",
        featured: false,

        rarity: {
            id: "standard",
            name: "Standard",
            color: "blue",
            hex: "#3b82f6",
            chance: 79.92
        },

        description: `
            An AI-based speech recognition application developed with
            Python and Whisper technology, designed to convert voice
            input into accurate text transcription. The project
            demonstrates the practical implementation of speech
            processing and machine learning for automated transcription.
        `.replace(/\s+/g, " ").trim(),

        fullDescription: `
            AI based speech recognition application developed using
            Python and Whisper technology for converting audio input
            into accurate text transcription.

            The system demonstrates the practical use of automatic
            speech recognition, machine learning, and audio processing
            to transform spoken input into machine-readable text.
        `.replace(/\s+/g, " ").trim(),

        technologies: [
            "Python",
            "Whisper"
        ],

        features: [
            "Artificial Intelligence",
            "Speech Recognition",
            "Machine Learning",
            "Audio Processing",
            "Automatic Transcription",
            "Voice-to-Text",
            "Audio Input Processing"
        ],

        tags: [
            "Python",
            "Artificial Intelligence",
            "Whisper",
            "Speech Recognition",
            "Machine Learning",
            "Audio Processing",
            "Automatic Transcription"
        ],

        url: null,

        demoAvailable: false,

        images: [
            "assets/projects/p1.png",
            "assets/projects/p1-1.png",
            "assets/projects/p1-2.png"
        ],

        thumbnail: "assets/projects/p1.png",

        alt: "Automated Speech Recognition System",

        architecture: [
            "Python",
            "Whisper",
            "Speech Processing",
            "Machine Learning",
            "Automatic Transcription"
        ]
    }

];


/*
|--------------------------------------------------------------------------
| GACHA RARITY CONFIGURATION
|--------------------------------------------------------------------------
|
| Total probability:
|
| Standard  = 79.92%
| Advanced  = 15.98%
| Premium   =  3.20%
| Elite     =  0.64%
| Legendary =  0.26%
|
| Total     = 100.00%
|
*/

const gachaRarities = [

    {
        id: "standard",

        name: "Standard",

        color: "blue",

        hex: "#3b82f6",

        chance: 79.92,

        displayChance: "79.92%",

        approx: "~4 in 5",

        description: "A standard project from the archive."
    },

    {
        id: "advanced",

        name: "Advanced",

        color: "purple",

        hex: "#a855f7",

        chance: 15.98,

        displayChance: "15.98%",

        approx: "~1 in 6",

        description: "A more specialized project."
    },

    {
        id: "premium",

        name: "Premium",

        color: "pink",

        hex: "#ec4899",

        chance: 3.20,

        displayChance: "3.20%",

        approx: "~1 in 31",

        description: "A highly valuable project from the archive."
    },

    {
        id: "elite",

        name: "Elite",

        color: "red",

        hex: "#ef4444",

        chance: 0.64,

        displayChance: "0.64%",

        approx: "~1 in 156",

        description: "An exceptionally rare project."
    },

    {
        id: "legendary",

        name: "Legendary",

        color: "gold",

        hex: "#facc15",

        chance: 0.26,

        displayChance: "0.26%",

        approx: "~1 in 385",

        description: "The rarest project in the archive."
    }

];


/*
|--------------------------------------------------------------------------
| GACHA UTILITY FUNCTIONS
|--------------------------------------------------------------------------
*/


function getRarity(rarityId) {

    return gachaRarities.find(
        rarity => rarity.id === rarityId
    );

}


function getProjectsByRarity(rarityId) {

    return projects.filter(
        project =>
            project.rarity &&
            project.rarity.id === rarityId
    );

}


function getRandomItem(array) {

    if (!array || array.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * array.length
    );

    return array[randomIndex];

}


/*
|--------------------------------------------------------------------------
| GET NORMALIZED PROJECT RARITY
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Project hanya menyimpan rarity.id.
| Informasi lengkap rarity selalu diambil dari
| gachaRarities agar tidak terjadi data seperti:
|
| Standard · undefined
|
*/

function getProjectRarity(project) {

    if (!project || !project.rarity) {
        return null;
    }

    const configuredRarity =
        getRarity(project.rarity.id);

    if (!configuredRarity) {
        return project.rarity;
    }

    return configuredRarity;

}


/*
|--------------------------------------------------------------------------
| RARITY ROLL
|--------------------------------------------------------------------------
*/

function rollRarity() {

    const random = Math.random() * 100;

    let cumulative = 0;

    for (const rarity of gachaRarities) {

        cumulative += rarity.chance;

        if (random < cumulative) {

            return rarity;

        }

    }

    return gachaRarities[
        gachaRarities.length - 1
    ];

}


/*
|--------------------------------------------------------------------------
| PROJECT ROLL
|--------------------------------------------------------------------------
|
| 1. Roll rarity.
| 2. Find projects belonging to that rarity.
| 3. Select random project.
| 4. Return normalized rarity configuration.
|
*/

function rollProject() {

    const rarity = rollRarity();

    const rarityProjects =
        getProjectsByRarity(
            rarity.id
        );

    const project =
        getRandomItem(
            rarityProjects
        );

    if (!project) {

        console.error(
            "Gacha failed: No project found for rarity:",
            rarity.id
        );

        return null;

    }

    return {

        project: project,

        /*
        |--------------------------------------------------------------------------
        | Use rarity from central configuration
        |--------------------------------------------------------------------------
        */

        rarity: rarity

    };

}


/*
|--------------------------------------------------------------------------
| MAIN GACHA FUNCTION
|--------------------------------------------------------------------------
*/

function playGacha() {

    const result = rollProject();

    if (!result) {

        console.error(
            "Gacha failed: Unable to generate result."
        );

        return null;

    }

    return result;

}


/*
|--------------------------------------------------------------------------
| GACHA RESULT HELPERS
|--------------------------------------------------------------------------
*/

function getGachaResult() {

    const result = playGacha();

    if (!result) {
        return null;
    }

    const rarity =
        getProjectRarity(
            result.project
        ) || result.rarity;

    return {

        projectId:
            result.project.id,

        projectTitle:
            result.project.title,

        rarityId:
            rarity.id,

        rarityName:
            rarity.name,

        rarityColor:
            rarity.color,

        rarityHex:
            rarity.hex,

        rarityChance:
            rarity.chance,

        rarityDisplayChance:
            rarity.displayChance,

        rarityApprox:
            rarity.approx,

        project:
            result.project

    };

}


/*
|--------------------------------------------------------------------------
| GACHA STATISTICS
|--------------------------------------------------------------------------
*/

function simulateGacha(
    totalRolls = 10000
) {

    const statistics = {};

    gachaRarities.forEach(
        rarity => {

            statistics[rarity.id] = {

                name:
                    rarity.name,

                expected:
                    rarity.chance,

                count:
                    0,

                percentage:
                    0

            };

        }
    );


    for (
        let i = 0;
        i < totalRolls;
        i++
    ) {

        const result =
            rollProject();

        if (!result) {
            continue;
        }

        const rarityId =
            result.rarity.id;

        statistics[
            rarityId
        ].count++;

    }


    Object.values(
        statistics
    ).forEach(
        stat => {

            stat.percentage =
                (stat.count / totalRolls) * 100;

        }
    );


    return statistics;

}


/*
|--------------------------------------------------------------------------
| PROJECT SEARCH
|--------------------------------------------------------------------------
*/

function searchProjects(query) {

    if (
        !query ||
        !query.trim()
    ) {

        return [
            ...projects
        ];

    }

    const searchTerm =
        query
            .toLowerCase()
            .trim();

    return projects.filter(
        project => {

            const rarity =
                getProjectRarity(
                    project
                );

            const searchableContent = [

                project.title,

                project.shortTitle,

                project.label,

                project.category,

                project.categoryLabel,

                project.type,

                project.status,

                project.description,

                project.fullDescription,

                rarity
                    ? rarity.name
                    : "",

                ...project.technologies,

                ...project.features,

                ...project.tags,

                ...project.architecture

            ]
                .join(" ")
                .toLowerCase();

            return searchableContent.includes(
                searchTerm
            );

        }
    );

}


/*
|--------------------------------------------------------------------------
| CATEGORY FILTER
|--------------------------------------------------------------------------
*/

function filterProjectsByCategory(
    category
) {

    if (
        !category ||
        category === "all"
    ) {

        return [
            ...projects
        ];

    }

    return projects.filter(
        project =>
            project.category === category
    );

}


/*
|--------------------------------------------------------------------------
| RARITY FILTER
|--------------------------------------------------------------------------
*/

function filterProjectsByRarity(
    rarityId
) {

    if (
        !rarityId ||
        rarityId === "all"
    ) {

        return [
            ...projects
        ];

    }

    return projects.filter(
        project =>
            project.rarity &&
            project.rarity.id === rarityId
    );

}


/*
|--------------------------------------------------------------------------
| FEATURED PROJECTS
|--------------------------------------------------------------------------
*/

function getFeaturedProjects() {

    return projects.filter(
        project =>
            project.featured === true
    );

}


/*
|--------------------------------------------------------------------------
| COMPLETED PROJECTS
|--------------------------------------------------------------------------
*/

function getCompletedProjects() {

    return projects.filter(
        project =>
            project.status === "completed"
    );

}


/*
|--------------------------------------------------------------------------
| PROJECT COUNT
|--------------------------------------------------------------------------
*/

function getProjectCount() {

    return projects.length;

}


/*
|--------------------------------------------------------------------------
| GACHA CONFIG VALIDATION
|--------------------------------------------------------------------------
*/

function validateGachaProbabilities() {

    const total =
        gachaRarities.reduce(
            (sum, rarity) =>
                sum + rarity.chance,
            0
        );

    const roundedTotal =
        Math.round(
            total * 100
        ) / 100;

    if (
        roundedTotal !== 100
    ) {

        console.warn(
            `Gacha probability is ${roundedTotal}%, not 100%.`
        );

        return false;

    }

    console.log(
        "Gacha probability validated: 100%"
    );

    return true;

}


/*
|--------------------------------------------------------------------------
| VALIDATE PROJECT RARITIES
|--------------------------------------------------------------------------
|
| Memastikan semua project menggunakan rarity
| yang memang tersedia di konfigurasi Gacha.
|
*/

function validateProjectRarities() {

    let valid = true;

    projects.forEach(
        project => {

            const rarity =
                getRarity(
                    project.rarity?.id
                );

            if (!rarity) {

                console.warn(
                    `Project "${project.title}" has invalid rarity:`,
                    project.rarity?.id
                );

                valid = false;

            }

        }
    );

    if (valid) {

        console.log(
            "Project rarity configuration validated."
        );

    }

    return valid;

}


/*
|--------------------------------------------------------------------------
| GACHA DEBUG
|--------------------------------------------------------------------------
*/

function debugGacha() {

    console.group(
        "🎰 Project Gacha"
    );

    console.table(

        gachaRarities.map(
            rarity => ({

                Rarity:
                    rarity.name,

                Color:
                    rarity.color,

                Chance:
                    `${rarity.chance}%`,

                Approx:
                    rarity.approx,

                Projects:
                    getProjectsByRarity(
                        rarity.id
                    )
                        .map(
                            project =>
                                project.title
                        )
                        .join(", ")

            })
        )

    );


    console.log(
        "Total Projects:",
        projects.length
    );


    console.log(
        "Total Probability:",
        gachaRarities.reduce(
            (sum, rarity) =>
                sum + rarity.chance,
            0
        ) + "%"
    );


    console.log(
        "Project Rarity Validation:",
        validateProjectRarities()
    );


    console.groupEnd();

}


/*
|--------------------------------------------------------------------------
| INITIAL VALIDATION
|--------------------------------------------------------------------------
*/

validateGachaProbabilities();

validateProjectRarities();


/*
|--------------------------------------------------------------------------
| OPTIONAL GLOBAL ACCESS
|--------------------------------------------------------------------------
*/

window.ProjectGacha = {

    projects,

    rarities:
        gachaRarities,

    play:
        playGacha,

    rollProject,

    rollRarity,

    getRarity,

    getProjectRarity,

    getResult:
        getGachaResult,

    search:
        searchProjects,

    filterCategory:
        filterProjectsByCategory,

    filterRarity:
        filterProjectsByRarity,

    getFeatured:
        getFeaturedProjects,

    getCompleted:
        getCompletedProjects,

    getCount:
        getProjectCount,

    simulate:
        simulateGacha,

    validate:
        validateGachaProbabilities,

    validateProjectRarities,

    debug:
        debugGacha

};


/* =========================================================
   FLOATING NAVIGATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const floatingNav =
            document.getElementById(
                "floating-nav"
            );


        const trigger =
            document.getElementById(
                "floating-nav-trigger"
            );


        const menu =
            document.getElementById(
                "floating-nav-menu"
            );


        if (
            !floatingNav ||
            !trigger ||
            !menu
        ) {

            return;

        }


        const items =
            Array.from(
                menu.querySelectorAll(
                    ".floating-nav-item"
                )
            );


        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* =================================================
           DETECT CURRENT PAGE
           ================================================= */

        const currentPath =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        let currentPage;


        if (
            currentPath === "" ||
            currentPath === "index.html"
        ) {

            currentPage =
                "home";

        } else if (
            currentPath === "project.html"
        ) {

            currentPage =
                "projects";

        }


        /* =================================================
           ACTIVE PAGE
           ================================================= */

        items.forEach(
            item => {

                const page =
                    item.dataset.page;


                if (
                    page === currentPage
                ) {

                    item.classList.add(
                        "is-active"
                    );

                    item.setAttribute(
                        "aria-current",
                        "page"
                    );

                }

            }
        );


        /* =================================================
           GSAP AVAILABLE?
           ================================================= */

        const hasGSAP =
            typeof gsap !== "undefined";


        /* =================================================
           OPEN MENU
           ================================================= */

        function openMenu() {

            floatingNav.classList.add(
                "is-open"
            );


            trigger.setAttribute(
                "aria-expanded",
                "true"
            );


            trigger.setAttribute(
                "aria-label",
                "Close navigation"
            );


            menu.setAttribute(
                "aria-hidden",
                "false"
            );


            /* ---------------------------------------------
               ANIMATION
               --------------------------------------------- */

            if (
                hasGSAP &&
                !prefersReducedMotion
            ) {

                gsap.killTweensOf(
                    items
                );


                gsap.to(
                    items,
                    {

                        opacity: 1,

                        y: 0,

                        scale: 1,

                        duration: 0.35,

                        stagger: 0.055,

                        ease:
                            "power3.out"

                    }
                );

            } else {

                items.forEach(
                    item => {

                        item.style.opacity =
                            "1";

                        item.style.transform =
                            "translateY(0) scale(1)";

                    }
                );

            }

        }


        /* =================================================
           CLOSE MENU
           ================================================= */

        function closeMenu() {

            floatingNav.classList.remove(
                "is-open"
            );


            trigger.setAttribute(
                "aria-expanded",
                "false"
            );


            trigger.setAttribute(
                "aria-label",
                "Open navigation"
            );


            menu.setAttribute(
                "aria-hidden",
                "true"
            );


            /* ---------------------------------------------
               ANIMATION
               --------------------------------------------- */

            if (
                hasGSAP &&
                !prefersReducedMotion
            ) {

                gsap.killTweensOf(
                    items
                );


                gsap.to(
                    items,
                    {

                        opacity: 0,

                        y: 12,

                        scale: 0.96,

                        duration: 0.22,

                        stagger: 0.035,

                        ease:
                            "power2.in"

                    }
                );

            } else {

                items.forEach(
                    item => {

                        item.style.opacity =
                            "0";

                        item.style.transform =
                            "translateY(12px) scale(0.96)";

                    }
                );

            }

        }


        /* =================================================
           TOGGLE
           ================================================= */

        trigger.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                if (
                    floatingNav.classList.contains(
                        "is-open"
                    )
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        /* =================================================
           NAVIGATION CLICK
           ================================================= */

        items.forEach(
            item => {

                item.addEventListener(
                    "click",
                    () => {

                        /*
                         * Jangan mencegah default link.
                         *
                         * Browser akan langsung menuju:
                         *
                         * ./index.html
                         * ./project.html
                         */

                        closeMenu();

                    }
                );

            }
        );


        /* =================================================
           CLICK OUTSIDE
           ================================================= */

        document.addEventListener(
            "click",
            event => {

                if (
                    !floatingNav.contains(
                        event.target
                    )
                ) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           ESC
           ================================================= */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    floatingNav.classList.contains(
                        "is-open"
                    )
                ) {

                    event.preventDefault();

                    closeMenu();

                    trigger.focus();

                }

            }
        );


        /* =================================================
           INITIAL STATE
           ================================================= */

        items.forEach(
            item => {

                item.style.opacity =
                    "0";

            }
        );

    }
);

