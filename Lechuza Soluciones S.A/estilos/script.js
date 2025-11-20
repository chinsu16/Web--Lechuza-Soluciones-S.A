/* LECHUZA SOLUCIONES S.A - JAVASCRIPT */

console.log(' Script cargado correctamente');

// Variables globales
let isMenuOpen = false;
let currentSlideIndex = 0;

//  Inicialización 
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  console.log('DOM cargado, inicializando...');
  initSmoothScroll();
  initFormValidation();
  initGalleryFilters();
  initDropdownMenu();
}

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.overlay');
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');



  // Menú movíl abrir/cerrar
  if (menuToggle && navMenu && overlay) {
    menuToggle.addEventListener('click', () => {
      console.log('Botón clickeado');
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      if (dropdown) dropdown.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      if (dropdown) dropdown.classList.remove('active');
    });
  }

  // Submenú "servicios" en móvil
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 968) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  }

  // Cerrar menú y submenú al cambiar a escritorio
  window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
      if (menuToggle) menuToggle.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      if (dropdown) dropdown.classList.remove('active');
    }
  });
});


// Dropdown menú "escritorio"
function initDropdownMenu() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (!dropdown || !dropdownMenu) return;

  let timeoutId;
  
  dropdown.addEventListener('mouseenter', function() {
    if (window.innerWidth > 968) {
      clearTimeout(timeoutId);
      dropdownMenu.style.opacity = '1';
      dropdownMenu.style.visibility = 'visible';
      dropdownMenu.style.transform = 'translateY(0)';
    }
  });
  
  dropdown.addEventListener('mouseleave', function() {
    if (window.innerWidth > 968) {
      timeoutId = setTimeout(function() {
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
        dropdownMenu.style.transform = 'translateY(-10px)';
      }, 200);
    }
  });
}


//  Scroll suave
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Validación de formulario
function initFormValidation() {
  const form = document.querySelector('#formulario-contacto');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const telefono = document.getElementById('telefono')?.value.trim();
    const servicio = document.getElementById('servicio')?.value;
    const mensaje = document.getElementById('mensaje')?.value.trim();
    
    let errores = [];
    
    if (!nombre || nombre.length < 3) {
      errores.push('Por favor ingrese un nombre válido');
    }
    
    if (!email || !validarEmail(email)) {
      errores.push('Por favor ingrese un email válido');
    }
    
    if (!telefono || telefono.length < 8) {
      errores.push('Por favor ingrese un teléfono válido');
    }
    
    if (!servicio) {
      errores.push('Por favor seleccione un servicio');
    }
    
    if (!mensaje || mensaje.length < 10) {
      errores.push('Por favor ingrese un mensaje de al menos 10 caracteres');
    }
    
    if (errores.length > 0) {
      alert(errores.join('\n'));
    } 
  });
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Filtros de galería
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filtro-btn');
  const categorySections = document.querySelectorAll('[data-category]');
  
  if (filterButtons.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      categorySections.forEach(section => {
        const category = section.getAttribute('data-category');
        
        if (filter === 'todos' || filter === category) {
          section.style.display = 'block';
          setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          }, 10);
        } else {
          section.style.opacity = '0';
          section.style.transform = 'translateY(20px)';
          setTimeout(() => {
            section.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.servicio-card, .valor-card, .testimonio-card, .galeria-item');
  animatedElements.forEach(el => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// Header sticky
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  }
});

// Botón CTA flotante
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
  const ctaFlotante = document.querySelector('.cta-flotante');
  if (!ctaFlotante) return;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 300) {
    ctaFlotante.style.transform = 'translateY(150px)';
  } else {
    ctaFlotante.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
});

