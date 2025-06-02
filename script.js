document.addEventListener('DOMContentLoaded', function() {
    // Artwork data
    const artworkData = [
        {
            id: 1,
            title: "pic 1",
            category: "portrait",
            imageUrl: "pic 1.jpg",
            description: "This portrait captures the deep lines of experience and wisdom in an elderly man's face. Created with a combination of 2B and 6B pencils, I focused on the interplay of light and shadow to emphasize texture and character.",
            size: "18 x 24 inches",
            year: "2023",
            materials: "Graphite on Strathmore 500 series paper"
        },
        {
            id: 2,
            title: "pic 2",
            category: "pencil-album",
            imageUrl: "pic 2.jpg",
            description: "A peaceful mountain landscape drawn with a range of graphite pencils from 2H to 8B. The composition leads the eye through the valley to the distant peaks, with careful attention to atmospheric perspective.",
            size: "24 x 36 inches",
            year: "2022",
            materials: "Graphite on Bristol smooth paper"
        },
        {
            id: 3,
            title: "pic 3",
            category: "pencil-album",
            imageUrl: "pic 3.jpg",
            description: "A study of light and form featuring a simple fruit bowl. The reflective surfaces and varied textures provided an excellent opportunity to explore different pencil techniques.",
            size: "12 x 16 inches",
            year: "2021",
            materials: "Graphite and charcoal on toned paper"
        },
        {
            id: 4,
            title: "pic 4",
            category: "portrait",
            imageUrl: "pic 4.jpg",
            description: "A portrait of a young woman lost in thought. The soft lighting allowed for subtle gradations in tone, particularly in the rendering of the hair and facial features.",
            size: "16 x 20 inches",
            year: "2023",
            materials: "Graphite on Stonehenge paper"
        },
        {
            id: 5,
            title: "pic 5",
            category: "pencil-album",
            imageUrl: "pic 5.jpg",
            description: "Dramatic coastal cliffs rendered with bold contrasts. The rough texture of the rocks was achieved with a combination of cross-hatching and blending techniques.",
            size: "18 x 24 inches",
            year: "2022",
            materials: "Graphite on Canson Mi-Teintes paper"
        },
        {
            id: 6,
            title: "pic 6",
            category: "pencil-album",
            imageUrl: "pic 6.jpg",
            description: "A detailed study of a vintage camera, highlighting the mechanical details and worn surfaces. The metallic reflections were particularly challenging to capture accurately.",
            size: "14 x 18 inches",
            year: "2021",
            materials: "Graphite on Fabriano Artistico paper"
        },
        {
            id: 7,
            title: "pic 7",
            category: "pencil-album",
            imageUrl: "pic 7.jpg",
            description: "A signature piece representing the culmination of years of practice and passion in pencil art.",
            size: "20 x 28 inches",
            year: "2025",
            materials: "Graphite on premium paper"
        }
    ];

    // DOM Elements
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('.modal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalSize = document.getElementById('modalSize');
    const modalYear = document.getElementById('modalYear');
    const modalMaterials = document.getElementById('modalMaterials');
    const closeBtn = document.querySelector('.close-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentYear = document.getElementById('current-year');
    const header = document.querySelector('.header');
    const orderBtn = document.querySelector('.order-btn');
    const orderModal = document.querySelector('.order-modal');
    const orderCloseBtn = document.querySelector('.order-close-btn');
    const orderForm = document.querySelector('.order-form');

    // Initialize
    displayArtwork(artworkData);
    setCurrentYear();
    setupEventListeners();

    // Functions
    function displayArtwork(artworks) {
        galleryGrid.innerHTML = '';
        
        artworks.forEach(artwork => {
            const artworkItem = document.createElement('div');
            artworkItem.className = `artwork-item`;
            artworkItem.dataset.category = artwork.category;
            artworkItem.dataset.id = artwork.id;
            
            artworkItem.innerHTML = `
                <img src="${artwork.imageUrl}" alt="${artwork.title}" class="artwork-img" loading="lazy">
                <div class="artwork-overlay">
                    <h4 class="artwork-title">${artwork.title}</h4>
                    <p class="artwork-category">${artwork.category.replace('-', ' ')}</p>
                </div>
            `;
            
            galleryGrid.appendChild(artworkItem);
            
            // Add click event to show modal
            artworkItem.addEventListener('click', () => showModal(artwork));
        });
    }

    function filterArtwork(category) {
        if (category === 'all') {
            displayArtwork(artworkData);
            return;
        }
        
        const filteredArtwork = artworkData.filter(artwork => artwork.category === category);
        displayArtwork(filteredArtwork);
    }

    function showModal(artwork) {
        modalImage.src = artwork.imageUrl;
        modalImage.alt = artwork.title;
        modalTitle.textContent = artwork.title;
        modalDescription.textContent = artwork.description;
        modalSize.textContent = artwork.size;
        modalYear.textContent = artwork.year;
        modalMaterials.textContent = artwork.materials;
        
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    function toggleMobileMenu() {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }

    function closeMobileMenu() {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    function setCurrentYear() {
        currentYear.textContent = new Date().getFullYear();
    }

    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function setupEventListeners() {
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterArtwork(button.dataset.filter);
            });
        });

        // Modal
        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Mobile menu
        menuToggle.addEventListener('click', toggleMobileMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initialize

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would typically send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            });
        }

        // Order modal
        if (orderBtn && orderModal && orderCloseBtn && orderForm) {
            orderBtn.addEventListener('click', () => {
                orderModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
            orderCloseBtn.addEventListener('click', () => {
                orderModal.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
            window.addEventListener('click', (e) => {
                if (e.target === orderModal) {
                    orderModal.classList.remove('open');
                    document.body.style.overflow = 'auto';
                }
            });

            // Show image and price after artwork title is entered
            const orderTitleInput = document.getElementById('orderTitle');
            const orderImagePreview = document.createElement('img');
            orderImagePreview.className = 'order-artwork-preview';
            orderImagePreview.style.display = 'none';
            orderImagePreview.style.maxWidth = '100%';
            orderImagePreview.style.margin = '1rem 0';
            const orderPriceInput = document.getElementById('orderPrice');
            const orderFormEl = orderForm;
            orderFormEl.insertBefore(orderImagePreview, orderPriceInput);

            orderTitleInput.addEventListener('input', function() {
                const title = this.value.trim().toLowerCase();
                const found = artworkData.find(a => a.title.toLowerCase() === title);
                if (found) {
                    orderImagePreview.src = found.imageUrl;
                    orderImagePreview.alt = found.title;
                    orderImagePreview.style.display = 'block';
                    orderPriceInput.value = found.price ? found.price : '';
                    orderPriceInput.disabled = true;
                } else {
                    orderImagePreview.style.display = 'none';
                    orderPriceInput.value = '';
                    orderPriceInput.disabled = false;
                }
            });

            orderForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your order! We will contact you soon.');
                orderModal.classList.remove('open');
                document.body.style.overflow = 'auto';
                this.reset();
                orderImagePreview.style.display = 'none';
                orderPriceInput.disabled = false;
            });
        }

        // Logo modal logic
        const mainLogo = document.getElementById('mainLogo');
        const logoModal = document.getElementById('logoModal');
        const closeLogoModal = document.getElementById('closeLogoModal');
        if (mainLogo && logoModal && closeLogoModal) {
            mainLogo.addEventListener('click', () => {
                logoModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
            closeLogoModal.addEventListener('click', () => {
                logoModal.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
            window.addEventListener('click', (e) => {
                if (e.target === logoModal) {
                    logoModal.classList.remove('open');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    // Animate hero title as if being drawn on page load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('drawing');
        setTimeout(() => {
            heroTitle.classList.remove('drawing');
        }, 2500);
        // Add bounce on click or hover
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.classList.add('bounce');
        });
        heroTitle.addEventListener('mouseleave', () => {
            heroTitle.classList.remove('bounce');
        });
        heroTitle.addEventListener('click', () => {
            heroTitle.classList.add('bounce');
            setTimeout(() => heroTitle.classList.remove('bounce'), 700);
        });
    }
});