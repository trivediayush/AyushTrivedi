    // Preloader DevOps pipeline animation
    const steps = document.querySelectorAll('#preloader .step');
    let current = 0;
    function activateStep(idx) {
      steps.forEach((step,s) => {
        step.classList.remove('active','success');
        if(s === idx) step.classList.add('active');
        if(idx === steps.length-1 && s === idx) step.classList.add('success');
      });
    }
    function pipelineAnim() {
      if(current < steps.length-1) {
        activateStep(current);
        current++; setTimeout(pipelineAnim, 950);
      } else {
        activateStep(current);
        setTimeout(() => {
          document.getElementById('preloader').style.opacity = 0;
          setTimeout(()=>{document.getElementById('preloader').style.display='none'},500);
        },950);
      }
    }
    window.addEventListener('DOMContentLoaded', ()=>pipelineAnim());
    // Navbar mobile toggle (accessibility enhancements)
    const menuBtn = document.getElementById('menuBtn');
    const navlinks = document.getElementById('navlinks');
    menuBtn.addEventListener('click', ()=>{
      const isOpen = navlinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    // Close mobile nav when a link is clicked (good for a11y)
    navlinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
      if(navlinks.classList.contains('open')){navlinks.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}
    }));
    // Theme toggle (persist & aria-pressed)
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      themeToggle.setAttribute('aria-pressed','true');
    }
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggle.setAttribute('aria-pressed', String(isLight));
    });

    // Helper for contact form: open mailto with subject and body
    function openMail(e){
      e.preventDefault();
  const sub = encodeURIComponent(document.getElementById('mailSub').value || 'Project inquiry');
  const body = encodeURIComponent(document.getElementById('mailBody').value || 'Hi Ayush,\n\nI would like to discuss...');
  window.location.href = `mailto:ayushtrivedi11jan@gmail.com?subject=${sub}&body=${body}`;
    }
    // Current year
    document.getElementById('year').textContent = new Date().getFullYear();
    // Scroll reveal for sections
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target);}
      })
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    // Skills show-more / show-less behaviour
    document.addEventListener('DOMContentLoaded', ()=>{
      const skillsGrid = document.getElementById('skillsGrid');
      const toggle = document.getElementById('skillsToggle');
      if(!skillsGrid || !toggle) return;
      const items = skillsGrid.querySelectorAll('.skill-icon-block');
      const VISIBLE = 10;
      // If there are more than VISIBLE items, collapse by default and show toggle
      if(items.length > VISIBLE){
        skillsGrid.classList.add('collapsed');
        toggle.style.display = 'inline-flex';
        toggle.setAttribute('aria-expanded','false');
        toggle.textContent = 'Show more';
      } else {
        // Hide toggle when not needed
        toggle.style.display = 'none';
      }

      toggle.addEventListener('click', ()=>{
        const expanded = skillsGrid.classList.toggle('collapsed') === false; // true when expanded
        toggle.setAttribute('aria-expanded', String(expanded));
        toggle.textContent = expanded ? 'Show less' : 'Show more';
        // Move focus back to toggle for keyboard users (keeps them in context)
        toggle.focus();
      });
    });