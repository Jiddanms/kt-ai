
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelectorAll('.nav-links li');
const pages = document.querySelectorAll('.page');
const featureTitle = document.getElementById('feature-title');
const featureDesc = document.getElementById('feature-desc');
const chatDisplay = document.getElementById('chatDisplay');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

const pageConfig = {
    title: { t: "Title Generator", d: "Crafting the perfect identity for your research." },
    scholar: { t: "Scholar Sync", d: "Mining data from global academic repositories." },
    grammar: { t: "Grammar Wizard", d: "Polishing your words to professional standards." },
    biblio: { t: "Bibliography Gen", d: "Automating your citation formats instantly." },
    qa: { t: "Q&A Predictor", d: "Preparing you for the toughest examiner questions." },
    abstract: { t: "Abstract One-Click Summary", d: "Condensing your hard work into a powerful summary." },
    citation: { t: "Citation Finder", d: "Locating the lost origins of your research quotes." },
    rewrite: { t: "Ethical Rewriter", d: "Paraphrasing with integrity and academic tone." }
};

function openFeature(id) {
    // Navigasi Terisolasi: Sembunyikan semua, munculkan satu
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (id === 'home') {
        document.getElementById('home').classList.add('active');
        document.querySelector('[data-page="home"]').classList.add('active');
    } else {
        const aiSection = document.getElementById('ai-interface');
        aiSection.classList.add('active');
        
        const activeNav = document.querySelector(`[data-page="${id}"]`);
        if(activeNav) activeNav.classList.add('active');

        featureTitle.innerText = pageConfig[id].t;
        featureDesc.innerText = pageConfig[id].d;
        
        // Reset Chat UI
        chatDisplay.innerHTML = `
            <div class="ai-msg">
                <div class="msg-avatar" style="width:35px; height:35px; background:var(--grad); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:bold;">AI</div>
                <div class="msg-content" style="background:rgba(255,255,255,0.05); padding:12px 18px; border-radius:0 15px 15px 15px; margin-top:5px;">
                    Welcome to <b>${pageConfig[id].t}</b>. How can I help with your paper today?
                </div>
            </div>`;
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const pageId = link.getAttribute('data-page');
        if(pageId) openFeature(pageId);
    });
});

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    const uDiv = document.createElement('div');
    uDiv.className = 'user-msg';
    uDiv.style = "align-self: flex-end; background: var(--grad); border-radius: 15px 15px 0 15px; padding: 12px 18px; color: white; margin-top:10px;";
    uDiv.innerText = text;
    chatDisplay.appendChild(uDiv);
    
    userInput.value = '';
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.style = "display:flex; gap:10px; margin-top:15px;";
        aiDiv.innerHTML = `
            <div style="width:35px; height:35px; background:var(--grad); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:bold;">AI</div>
            <div style="background:rgba(255,255,255,0.05); padding:12px 18px; border-radius:0 15px 15px 15px; max-width:80%;">
                Analyzing... <b>Great! </b><br>I've optimized your request using our worldwide database.
            </div>
        `;
        chatDisplay.appendChild(aiDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }, 1000);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
